import React from 'react';
import ReactDOM from 'react-dom';
import RIEStatefulBase from './RIEStatefulBase';

export default class RIESelect extends RIEStatefulBase
{
    static propTypes = {
        options: React.PropTypes.array.isRequired
    };

    renderNormalComponent = () => {
        return (
            <span
                tabIndex="0"
                className={this.makeClassString()}
                onFocus={this.startEditing}
                onClick={this.startEditing}
                {...this.props.defaultProps}
            >
                {this.getValue()}
            </span>
        );
    };

    renderEditingComponent = () => {
        const optionNodes = this.props.options.map(function(option) {
            return (
                <option
                    key={option.id}
                    value={option.id}
                >
                    {option.text}
                </option>
            )
        });

        return (
            <select
                ref="input"
                disabled={this.isDisabled()}
                value={this.props.value.id}
                className={this.makeClassString()}
                onChange={this.finishEditing}
                onBlur={this.cancelEditing}
                onKeyDown={this.keyDown}
                {...this.props.editProps}
            >
                {optionNodes}
            </select>
        )
    };

    finishEditing = () => {
        // get the object from options that matches user selected value
        const newValue = this.props.options.find((option) => {
            return option.id === ReactDOM.findDOMNode(this.refs.input).value;
        });

        this.doValidations(newValue);

        if(!this.state.invalid && this.props.value !== newValue) {
            this.commit(newValue);
        }

        this.cancelEditing();
    };

    getValue = () => {
        return (!!this.state.newValue) ? this.state.newValue.text : this.props.value.text;
    }
}
