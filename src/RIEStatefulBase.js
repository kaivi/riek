import React from 'react';
import ReactDOM from 'react-dom';
import RIEBase from './RIEBase';

const debug = require('debug')('RIEStatefulBase');

export default class RIEStatefulBase extends RIEBase {
    constructor(props){
        super(props);
    }

    startEditing = () => {
        debug('startEditing')
        this.props.beforeStart ? this.props.beforeStart() : null;
        if(this.props.isDisabled) return;
        this.setState({editing: true});
        this.props.afterStart ? this.props.afterStart() : null;
    };

    finishEditing = () => {
        debug('finishEditing')
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
        debug('cancelEditing')
        this.setState({editing: false, invalid: false});
    };

    keyDown = (event) => {
        debug('keyDown(${event.keyCode})')
        if(event.keyCode === 13) { this.finishEditing() }           // Enter
        else if (event.keyCode === 27) { this.cancelEditing() }     // Escape
    };

    textChanged = (event) => {
        debug('textChanged(${event.target.value})')
        this.doValidations(event.target.value.trim());
    };

    componentDidUpdate = (prevProps, prevState) => {
        debug(`componentDidUpdate(${prevProps}, ${prevState})`)
        var inputElem = ReactDOM.findDOMNode(this.refs.input);
        debug(inputElem)
        if (this.state.editing && !prevState.editing) {
            debug('entering edit mode')
            inputElem.focus();
            this.selectInputText(inputElem);
        } else if (this.state.editing && prevProps.text != this.props.text) {
            debug('not editing && text not equal previous props -- finishing editing')
            this.finishEditing();
        }
    };

    renderEditingComponent = () => {
        debug('renderEditingComponent()')
        return <input
            disabled={this.state.loading}
            className={this.makeClassString()}
            defaultValue={this.props.value}
            onInput={this.textChanged}
            onBlur={this.elementBlur}
            ref="input"
            onKeyDown={this.keyDown}
            {...this.props.editProps} />;
    };

    renderNormalComponent = () => {
        debug('renderNormalComponent')
        return <span
            tabIndex="0"
            className={this.makeClassString()}
            onFocus={this.startEditing}
            onClick={this.startEditing}
            {...this.props.defaultProps}>{this.state.newValue || this.props.value}</span>;
    };

    elementBlur = (event) => {
        debug(`elementBlur(${event})`)
        this.finishEditing();
    };

    elementClick = (event) => {
        debug(`elementClick(${event})`)
        if (this.state.loading) return;
        this.startEditing();
        event.target.element.focus();
    };

    render = () => {
        debug('render()')
        if(this.state.editing) {
            return this.renderEditingComponent();
        } else {
            return this.renderNormalComponent();
        }
    };
}
