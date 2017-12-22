import React from 'react';
import RIEStatefulBase from './RIEStatefulBase';

export default class RIENumber extends RIEStatefulBase
{
    static propTypes = {
        format: React.PropTypes.func
    };

    constructor(props) {
        super(props);
    }

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
        const {value} = this.props;

        return (
            <input
                ref="input"
                type="number"
                disabled={this.isDisabled()}
                className={this.makeClassString()}
                defaultValue={value}
                onInput={this.textChanged}
                onBlur={this.finishEditing}
                onKeyDown={this.keyDown}
                {...this.props.editProps}
            />
        );
    };

    validate = (value) => {
        return !isNaN(value) && isFinite(value) && value.length > 0;
    };

    selectInputText = (element) => {
        // element.setSelectionRange won't work for an input of type "number"
        setTimeout(() => { element.select(); }, 10);
    };

    getValue = () => {
        const { format, value } = this.props;
        const { newValue } = this.state;

        if (format) {
            return format(newValue || value);
        }

        return (newValue || value)
    };
}
