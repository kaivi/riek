import React from 'react';
import PropTypes from 'prop-types';

const debug = require('debug')('RIEBase');

export default class RIEBase extends React.Component {
    constructor(props){
        super(props);

        if (!this.props.propName) throw "RTFM: missing 'propName' prop";
        if (!this.props.change) throw "RTFM: missing 'change' prop";
        if (typeof this.props.value == 'undefined') throw "RTFM: missing 'value' prop";

        this.state = {
            editing: false,
            loading: false,
            disabled: false,
            invalid: false
        };
    }

    static propTypes = {
        value: PropTypes.any.isRequired,
        change: PropTypes.func.isRequired,
        propName: PropTypes.string.isRequired,
        editProps: PropTypes.object,
        defaultProps: PropTypes.object,
        isDisabled: PropTypes.bool,
        validate: PropTypes.func,
        handleValidationFail: PropTypes.func,
        shouldBlockWhileLoading: PropTypes.bool,
        shouldRemainWhileInvalid: PropTypes.bool,
        classLoading: PropTypes.string,
        classEditing: PropTypes.string,
        classDisabled: PropTypes.string,
        classInvalid: PropTypes.string,
        className: PropTypes.string,
        beforeStart: PropTypes.func,
        afterStart: PropTypes.func,
        beforeFinish: PropTypes.func,
        afterFinish: PropTypes.func,
    };

    doValidations = (value) => {
        debug(`doValidations(${value})`)
        let isValid;
        if(this.props.validate) {
            debug('using this.props.validate')
            isValid = this.props.validate(value);
        } else if (this.validate) {
            debug('using this.validate')
            isValid = this.validate(value);
        } else return true
        this.setState({invalid: !isValid});
        return isValid;
    };

    selectInputText = (element) => {
        debug(`selectInputText(${element.value})`)
        if (element.setSelectionRange) element.setSelectionRange(0, element.value.length);
    };

    elementClick = (event) => {
        throw "RIEBase must be subclassed first: use a concrete class like RIEInput, RIEToggle et.c";
    };

    componentWillReceiveProps = (nextProps) => {
        debug(`componentWillReceiveProps(${nextProps})`)
        if ('value' in nextProps && !(nextProps.shouldRemainWhileInvalid && this.state.invalid)) {
            this.setState({loading: false, editing: false, invalid: false, newValue: null});
        }
    };

    commit = (value) => {
        debug(`commit(${value})`)
        if(!this.state.invalid) {
            let newProp = {};
            newProp[this.props.propName] = value;
            this.setState({loading: true, newValue: value});
            this.props.change(newProp);
        }
    };

    makeClassString = () => {
        debug(`makeClassString()`)
        var classNames = [];
        if (this.props.className) classNames.push(this.props.className);
        if (this.state.editing && this.props.classEditing) classNames.push(this.props.classEditing);
        if (this.state.loading && this.props.classLoading) classNames.push(this.props.classLoading);
        if (this.state.disabled && this.props.classDisabled) classNames.push(this.props.classDisabled);
        if (this.state.invalid && this.props.classInvalid) classNames.push(this.props.classInvalid);
        return classNames.join(' ');
    };

    render = () => {
        debuf(`render()`)
        return <span {...this.props.defaultProps} tabindex="0" className={this.makeClassString()} onClick={this.elementClick}>{this.props.value}</span>;
    };
}
