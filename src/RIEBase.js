import React from 'react';
import PropTypes from 'prop-types';

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
        shouldBlockWhileLoading: PropTypes.bool,
        classLoading: PropTypes.string,
        classEditing: PropTypes.string,
        classDisabled: PropTypes.string,
        classInvalid: PropTypes.string,
        className: PropTypes.string,
        renderEditingComponent: PropTypes.func,
        renderNormalComponent: PropTypes.func
    };

    doValidations = (value) => {
        if(this.props.validate) {
            this.setState({invalid: !this.props.validate(value)});
        } else if (this.validate) {
            this.setState({invalid: !this.validate(value)});
        }
    };

    selectInputText = (element) => {
        if (element.setSelectionRange) element.setSelectionRange(0, element.value.length);
    };

    elementClick = (event) => {
        throw "RIEBase must be subclassed first: use a concrete class like RIEInput, RIEToggle, RIEDate et.c";
    };

    componentWillReceiveProps = (nextProps) => {
        if ('value' in nextProps) this.setState({loading: false, editing: false, invalid: false, newValue: null});
    };

    commit = (value) => {
        if(!this.state.invalid) {
            let newProp = {};
            newProp[this.props.propName] = value;
            this.setState({loading: true, newValue: value});
            this.props.change(newProp);
        }
    };

    makeClassString = () => {
        var classNames = [];
        if (this.props.className) classNames.push(this.props.className);
        if (this.state.editing && this.props.classEditing) classNames.push(this.props.classEditing);
        if (this.state.loading && this.props.classLoading) classNames.push(this.props.classLoading);
        if (this.state.disabled && this.props.classDisabled) classNames.push(this.props.classDisabled);
        if (this.state.invalid && this.props.classInvalid) classNames.push(this.props.classInvalid);
        return classNames.join(' ');
    };

    render = () => {
        return <span {...this.props.defaultProps} tabindex="0" className={this.makeClassString()} onClick={this.elementClick}>{this.props.value}</span>;
    };
}
