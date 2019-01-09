import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const debug = require("debug")("RIEBase");

class RIEBase extends React.Component {
  static KEY_ENTER = 13;
  static KEY_ESCAPE = 27;
  static KEY_BACKSPACE = 8;

  refs;

  constructor(props) {
    super(props);

    if (!this.props.propName) {
      throw new Error("RTFM: missing 'propName' prop");
    }
    if (!this.props.change) {
      throw new Error("RTFM: missing 'change' prop");
    }
    if (typeof this.props.value == "undefined") {
      throw new Error("RTFM: missing 'value' prop");
    }

    this.state = {
      editing: this.props.editing,
      loading: false,
      disabled: false,
      invalid: false,
    };
  }

  static defaultProps = {
    shouldStartEditOnDoubleClick: false,
    defaultValue: "CLICK TO EDIT",
  };

  getValue (oldValue = this.props.value) {
    if (oldValue || this.props.defaultValue === undefined) {
      return oldValue;
    }
    if (typeof this.props.defaultValue === "function") {
      return this.props.defaultValue(oldValue);
    }
    return this.props.defaultValue;
  }

  formatValue (value = this.getValue()) {
    return value;
  }

  doValidations (value) {
    debug(`doValidations(${value})`);
    let isValid;

    if (this.props.validate) {
      isValid = this.props.validate(value);
    } else if (this.validate) {
      isValid = this.validate(value);
    } else {
      return true;
    }

    this.setState({ invalid: !isValid });

    return isValid;
  }

  selectInputText (element) {
    debug(`selectInputText(${element.value})`);
    if (element.setSelectionRange) {
      element.setSelectionRange(0, element.value.length);
    }
  }

  elementClick = () => {
    throw new Error(
      "RIEBase must be subclassed first: use a concrete class like RIEInput, RIEToggle etc."
    );
  };

  elementDoubleClick = () => {
    throw new Error(
      "RIEBase must be subclassed first: use a concrete class like RIEInput, RIEToggle etc."
    );
  };

  componentWillReceiveProps (nextProps) {
    debug(`componentWillReceiveProps(${nextProps})`);
    const isNewValue = this.props.value !== nextProps.value;
    if (
      isNewValue &&
      !(nextProps.shouldRemainWhileInvalid && this.state.invalid)
    ) {
      this.setState({
        loading: false,
        editing: false,
        invalid: false,
        newValue: null,
      });
    }

    if (nextProps.editing !== this.state.editing) {
      this.setState({ editing: nextProps.editing });
    }
  }

  commit (value) {
    if (this.state.invalid) {
      return;
    }
    const newValue = this.getValue(value);
    debug(`commit(${value} -> ${newValue})`);

    this.setState({
      loading: true,
      newValue,
    });

    this.props.change({
      [this.props.propName]: newValue,
    });
  }

  makeClassString () {
    debug(`makeClassString()`);
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
  }

  render () {
    debug(`render()`);

    return (
      <span
        {...this.props.defaultProps}
        tabindex="0"
        className={this.makeClassString()}
        onClick={this.elementClick}
      >
        {this.formatValue()}
      </span>
    );
  }
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
