import React from "react";
import ReactDOM from "react-dom";
import RIEBase from "./RIEBase";

const debug = require("debug")("RIEStatefulBase");

class RIEStatefulBase extends RIEBase {
  constructor(props) {
    super(props);
  }

  startEditing = () => {
    debug("startEditing");
    const { beforeStart, afterStart, isDisabled } = this.props;
    if (beforeStart) {
      beforeStart();
    }
    if (isDisabled) {
      return;
    }
    this.setState({ editing: true });
    if (afterStart) {
      afterStart();
    }
  };

  componentWillReciveProps (nextProps) {
    if (nextProps.editing && !this.state.editing) {
      this.startEditing();
    }
  }

  finishEditing = () => {
    debug("finishEditing");
    const { beforeFinish, afterFinish } = this.props
    if (beforeFinish) {
      beforeFinish();
    }

    const newValue = ReactDOM.findDOMNode(this.refs.input).value;
    const valid = this.doValidations(newValue);

    debug(`finishEditing: value=${this.props.value} newValue=${newValue} valid=${valid}`);

    if (valid && this.props.value !== newValue) {
      this.commit(newValue);
    } else if (this.props.handleValidationFail) {
      this.props.handleValidationFail(valid, newValue, this.cancelEditing);
    } else {
      this.cancelEditing();
    }

    if (afterFinish) {
      afterFinish();
    }
  }

  cancelEditing = () => {
    debug("cancelEditing");
    this.setState({
      editing: false,
      invalid: false,
    });
  };

  keyDown = event => {
    debug(`keyDown(${event.keyCode})`);
    switch (event.keyCode) {
      case RIEStatefulBase.KEY_ENTER:
        this.finishEditing();
        break;
      case RIEStatefulBase.KEY_ESCAPE:
        this.cancelEditing();
        break;
    }
  };

  keyUp = () => {
    debug("keyUp");
    this.resizeInput(this.refs.input);
  };

  resizeInput (input) {
    if (!input.startW) {
      // eslint-disable-next-line
      input.startW = input.offsetWidth;
    }
    const style = input.style;
    style.width = 0; // recalculate from 0, in case characters are deleted
    let desiredW = input.scrollWidth;
    desiredW += input.offsetHeight; // pad to reduce jerkyness when typing
    style.width = Math.max(desiredW, input.startW) + "px";
  }

  textChanged = event => {
    debug(`textChanged(${event.target.value})`);
    this.doValidations(event.target.value.trim());
  };

  componentDidUpdate (prevProps, prevState) {
    debug(`componentDidUpdate(${prevProps}, ${prevState})`);
    const inputElem = ReactDOM.findDOMNode(this.refs.input);
    debug(inputElem);
    if (this.state.editing && !prevState.editing) {
      debug("entering edit mode");
      inputElem.focus();
      this.resizeInput(inputElem);

      if (typeof this.props.selectAll === "undefined" || this.props.selectAll) {
        this.selectInputText(inputElem);
      }
    } else if (this.state.editing && prevProps.text !== this.props.text) {
      debug(
        "not editing && text not equal previous props -- finishing editing"
      );
      this.finishEditing();
    }
  }

  renderEditingComponent () {
    debug("renderEditingComponent()");
    const { editProps, value } = this.props;
    return (
      <input
        disabled={this.isDisabled()}
        className={this.makeClassString()}
        defaultValue={value}
        onInput={this.textChanged}
        onBlur={this.elementBlur}
        ref="input"
        onKeyDown={this.keyDown}
        onKeyUp={this.keyUp}
        {...editProps}
      />
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

  elementBlur = event => {
    debug(`elementBlur(${event})`);
    this.finishEditing();
  };

  elementClick = event => {
    debug(`elementClick(${event})`);
    this.startEditing();
    if (event.target.element) {
      event.target.element.focus();
    }
  };

  elementDoubleClick = event => {
    debug(`elementDoubleClick(${event})`);
    this.startEditing();
    if (event.target.element) {
      event.target.element.focus();
    }
  };

  render () {
    debug("render()");
    if (this.state.editing) {
      return this.renderEditingComponent();
    }
    return this.renderNormalComponent();
  }

  isDisabled () {
    return this.props.shouldBlockWhileLoading && this.state.loading;
  }
}

RIEStatefulBase.propTypes = {
  selectAll: PropTypes.bool,
};

export default RIEStatefulBase;
