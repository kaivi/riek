import React from "react";
import PropTypes from "prop-types";
import RIEBase from "./RIEBase";

const debug = require("debug")("RIEToggle");

class RIEToggle extends RIEBase {
  static defaultProps = {
    ...RIEBase.defaultProps,
    defaultValue: false,
  };

  elementClick = () => {
    if (this.props.isDisabled) {
      return;
    }
    this.setState({ value: !this.props.value });
    this.commit(!this.props.value);
  };

  render () {
    debug("render()");
    const { defaultProps } = this.props;

    const editingHandlers = {
      onKeyPress: this.elementClick,
      [!this.props.shouldStartEditOnDoubleClick
        ? "onClick"
        : "onDoubleClick"]: this.elementClick,
    };

    return (
      <span
        tabIndex="0"
        {...defaultProps}
        {...editingHandlers}
        className={this.makeClassString()}
      >
        {this.formatValue()}
      </span>
    );
  }

  formatValue (value = this.getValue()) {
    return value
      ? this.props.textTrue || "yes"
      : this.props.textFalse || "no"
  }

  getValue() {
    return this.state.loading ? this.state.value : this.props.value;
  }
}

RIEToggle.propTypes = {
  textTrue: PropTypes.string,
  textFalse: PropTypes.string,
};

export default RIEToggle;
