import React from "react";
import PropTypes from "prop-types";
import RIEStatefulBase from "./RIEStatefulBase";

const debug = require("debug")("RIENumber");

class RIENumber extends RIEStatefulBase {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    ...RIEStatefulBase.defaultProps,
    defaultValue: 0,
  };

  validate (value) {
    debug(`validate(${value})`);

    let result = value;
    if (result === "") {
      result = `${this.props.defaultValue}`;
    }

    return !isNaN(result) && isFinite(result) && result.length > 0;
  }

  selectInputText (element) {
    debug(`selectInputText(${element})`);
    // element.setSelectionRange won't work for an input of type "number"
    setTimeout(() => {
      element.select();
    }, 10);
  }

  elementBlur = element => {
    debug(`elementBlur(${element})`);
    /*
            Firefox workaround
            Found at https://tirdadc.github.io/blog/2015/06/11/react-dot-js-firefox-issue-with-onblur/
*/
    if (
      element.nativeEvent.explicitOriginalTarget &&
      element.nativeEvent.explicitOriginalTarget ===
        element.nativeEvent.originalTarget
    ) {
      return;
    }
    this.finishEditing();
  };

  renderNormalComponent () {
    debug(`renderNormalComponent()`);
    const editingHandlers = !this.props.shouldStartEditOnDoubleClick
      ? {
          onFocus: this.startEditing,
          onClick: this.elementClick,
        }
      : {
          onDoubleClick: this.elementDoubleClick,
        };

    return (
      <span
        tabIndex="0"
        className={this.makeClassString()}
        {...editingHandlers}
        {...this.props.defaultProps}
      >
        {this.formatValue()}
      </span>
    );
  }

  renderEditingComponent () {
    debug(`renderEditingComponent()`);
    const { value } = this.props;
    return (
      <input
        disabled={this.isDisabled()}
        type="number"
        className={this.makeClassString()}
        defaultValue={value}
        onInput={this.textChanged}
        onBlur={this.elementBlur}
        ref="input"
        onKeyDown={this.keyDown}
        {...this.props.editProps}
      />
    );
  }

  formatValue (value = this.getValue()) {
    const { format } = this.props;

    if (format && value !== undefined) {
      return String(format(value));
    }

    return value;
  }
}


RIENumber.propTypes = {
  format: PropTypes.func,
};

export default RIENumber;
