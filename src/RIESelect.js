import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import RIEStatefulBase from "./RIEStatefulBase";

const debug = require("debug")("RIESelect");

class RIESelect extends RIEStatefulBase {
  finishEditing = () => {
    debug("finishEditing()");
    const { options, value } = this.props;

    // get the object from options that matches user selected value
    const newValue = options.find(option => {
      return option.id === ReactDOM.findDOMNode(this.refs.input).value;
    }, this);

    this.doValidations(newValue);

    if (!this.state.invalid && value !== newValue) {
      this.commit(newValue);
    }

    this.cancelEditing();
  };

  renderEditingComponent () {
    debug("renderEditingComponent()");
    const { editProps, value } = this.props;

    if (!value.id) {
      throw Error('every value needs an id field');
    }

    return (
      <select
        disabled={this.isDisabled()}
        value={value.id}
        className={this.makeClassString()}
        onChange={this.finishEditing}
        onBlur={this.cancelEditing}
        ref="input"
        onKeyDown={this.keyDown}
        {...editProps}
      >
        {this.renderOptions()}
      </select>
    );
  }

  renderOptions () {
    const { options } = this.props;

    return options.map(option =>
      <option
        key={option.id}
        value={option.id}
      >
        {option.text}
      </option>
    );
  }

  renderNormalComponent () {
    debug("renderNormalComponent()");
    const { defaultProps } = this.props;
    const editingHandlers = !this.props.shouldStartEditOnDoubleClick
      ? {
          onFocus: this.startEditing,
          onClick: this.startEditing,
        }
      : {
          onDoubleClick: this.startEditing,
        };
    return (
      <span
        tabIndex="0"
        className={this.makeClassString()}
        {...editingHandlers}
        {...defaultProps}
      >
        {this.formatValue()}
      </span>
    );
  }

  formatValue (value = this.getValue()) {
    return value.text
  }
}

RIESelect.propTypes = {
  value: PropTypes.object,
  options: PropTypes.array.isRequired,
};

export default RIESelect;
