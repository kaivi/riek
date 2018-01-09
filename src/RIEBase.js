import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

class RIEBase extends React.Component
{
  static KEY_ENTER = 13;
  static KEY_ESCAPE = 27;
  static KEY_BACKSPACE = 8;

  refs;

  constructor(props) {
    super(props);

    if (!this.props.propName) {
      throw Error("RTFM: missing 'propName' prop");
    }

    if (!this.props.change) {
      throw Error("RTFM: missing 'change' prop");
    }

    if (this.props.value === undefined) {
      throw Error("RTFM: missing 'value' prop");
    }

    this.state = {
      editing: false,
      loading: false,
      disabled: false,
      invalid: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        loading: false,
        editing: false,
        invalid: false,
        newValue: null,
      });
    }
  }

  render() {
    const { defaultProps, value } = this.props;

    return (
      <span
        {...defaultProps}
        className={this.makeClassString()}
        onClick={this.elementClick}
      >
        {value}
      </span>
    );
  }

  doValidations = value => {
    const { validate } = this.props;

    if (validate) {
      this.setState({
        invalid: !validate(value),
      });
    } else if (this.validate) {
      this.setState({
        invalid: !this.validate(value),
      });
    }
  };

  selectInputText = element => {
    if (element.setSelectionRange) {
      element.setSelectionRange(0, element.value.length);
    }
  };

  commit = value => {
    if (this.state.invalid) {
      return;
    }

    this.setState({
      loading: true,
      newValue: value,
    });

    this.props.change({
        [this.props.propName]: value,
    });
  };

  makeClassString = () => {
    const {
      className, classEditing, classLoading, classInvalid, classDisabled,
    } = this.props;

    return classNames(
      className,
      {
        [classEditing]: this.state.editing && classEditing,
        [classLoading]: this.state.loading && classLoading,
        [classDisabled]: this.state.disabled && classDisabled,
        [classInvalid]: this.state.invalid && classInvalid,
      },
    );
  };

  elementClick = () => {
    throw Error('RIEBase must be subclassed first: use a concrete class like RIEInput, RIEToggle, RIEDate etc');
  };
}

RIEBase.propTypes = {
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
};

export default RIEBase;
