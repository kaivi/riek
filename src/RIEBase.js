import React from 'react';
import * as classname from 'classnames';

export default class RIEBase extends React.Component
{
    static KEY_ENTER = 13;
    static KEY_ESCAPE = 27;
    static KEY_BACKSPACE = 8;

    static propTypes = {
        value: React.PropTypes.any.isRequired,
        change: React.PropTypes.func.isRequired,
        propName: React.PropTypes.string.isRequired,
        editProps: React.PropTypes.object,
        defaultProps: React.PropTypes.object,
        isDisabled: React.PropTypes.bool,
        validate: React.PropTypes.func,
        shouldBlockWhileLoading: React.PropTypes.bool,
        classLoading: React.PropTypes.string,
        classEditing: React.PropTypes.string,
        classDisabled: React.PropTypes.string,
        classInvalid: React.PropTypes.string,
        className: React.PropTypes.string
    };

    refs;

    constructor(props){
        super(props);

        if (!this.props.propName) {
            throw "RTFM: missing 'propName' prop";
        }

        if (!this.props.change) {
            throw "RTFM: missing 'change' prop";
        }

        if (this.props.value === undefined) {
            throw "RTFM: missing 'value' prop";
        }

        this.state = {
            editing: false,
            loading: false,
            disabled: false,
            invalid: false
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if ('value' in nextProps) {
            this.setState({
                loading: false,
                editing: false,
                invalid: false,
                newValue: null
            });
        }
    };

    render = () => {
        return (
            <span
                {...this.props.defaultProps}
                className={this.makeClassString()}
                onClick={this.elementClick}
            >
                {this.props.value}
            </span>
        );
    };

    doValidations = (value) => {
        if(this.props.validate) {
            this.setState({
                invalid: !this.props.validate(value)
            });
        } else if (this.validate) {
            this.setState({
                invalid: !this.validate(value)
            });
        }
    };

    selectInputText = (element) => {
        if (element.setSelectionRange) {
            element.setSelectionRange(0, element.value.length);
        }
    };

    commit = (value) => {
        if(this.state.invalid) {
           return;
        }

        const newProp = {};
        newProp[this.props.propName] = value;

        this.setState({
            loading: true,
            newValue: value
        });

        this.props.change(newProp);
    };

    makeClassString = () => {
        return classname(
            this.props.className,
            {
                [this.props.classEditing]: this.state.editing && this.props.classEditing,
                [this.props.classLoading]: this.state.loading && this.props.classLoading,
                [this.props.classDisabled]: this.state.disabled && this.props.classDisabled,
                [this.props.classInvalid]: this.state.invalid && this.props.classInvalid,
            }
        )
    };

    elementClick = () => {
        throw "RIEBase must be subclassed first: use a concrete class like RIEInput, RIEToggle, RIEDate et.c";
    };
}
