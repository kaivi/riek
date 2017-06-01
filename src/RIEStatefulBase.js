import React from 'react';
import ReactDOM from 'react-dom';
import RIEBase from './RIEBase';

export default class RIEStatefulBase extends RIEBase {
    constructor(props){
        super(props);
    }

    startEditing = () => {
        this.props.beforeStart ? this.props.beforeStart() : null;
        if(this.props.isDisabled) return;
        this.setState({editing: true});
        this.props.afterStart ? this.props.afterStart() : null;
    };

    finishEditing = () => {
        this.props.beforeFinish ? this.props.beforeFinish() : null;
        let newValue = ReactDOM.findDOMNode(this.refs.input).value;
        const result = this.doValidations(newValue);
        if(result && this.props.value !== newValue) {
            this.commit(newValue);
        }
        if(!result && this.props.handleValidationFail) {
            this.props.handleValidationFail(result, newValue, () => this.cancelEditing());
        } else {
            this.cancelEditing();
        }
        this.props.afterFinish ? this.props.afterFinish() : null;
    };

    cancelEditing = () => {
        this.setState({editing: false, invalid: false});
    };

    keyDown = (event) => {
        if(event.keyCode === 13) { this.finishEditing() }           // Enter
        else if (event.keyCode === 27) { this.cancelEditing() }     // Escape
    };

    textChanged = (event) => {
        this.doValidations(event.target.value.trim());
    };

    componentDidUpdate = (prevProps, prevState) => {
        var inputElem = ReactDOM.findDOMNode(this.refs.input);
        if (this.state.editing && !prevState.editing) {
            inputElem.focus();
            this.selectInputText(inputElem);
        } else if (this.state.editing && prevProps.text != this.props.text) {
            this.finishEditing();
        }
    };

    renderEditingComponent = () => {
        return <input
            disabled={this.state.loading}
            className={this.makeClassString()}
            defaultValue={this.props.value}
            onInput={this.textChanged}
            onBlur={this.finishEditing}
            ref="input"
            onKeyDown={this.keyDown}
            {...this.props.editProps} />;
    };

    renderNormalComponent = () => {
        return <span
            tabIndex="0"
            className={this.makeClassString()}
            onFocus={this.startEditing}
            onClick={this.startEditing}
            {...this.props.defaultProps}>{this.state.newValue || this.props.value}</span>;
    };

    elementBlur = (event) => {
        this.finishEditing();
    };

    elementClick = (event) => {
        this.startEditing();
        event.target.element.focus();
    };

    render = () => {
        if(this.state.editing) {
            return this.renderEditingComponent();
        } else {
            return this.renderNormalComponent();
        }
    };
}
