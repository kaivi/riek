import React from 'react';
import ReactDOM from 'react-dom';

import RIEBase from './RIEBase';

class RIEStatefulBase extends RIEBase {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    const inputElem = ReactDOM.findDOMNode(this.refs.input);
    if (this.state.editing && !prevState.editing) {
      inputElem.focus();
      this.selectInputText(inputElem);
    } else if (this.state.editing && prevProps.text !== this.props.text) {
      this.finishEditing();
    }
  }

  render() {
    if (this.state.editing) {
      return this.renderEditingComponent();
    }

    return this.renderNormalComponent();
  }

  renderNormalComponent() {
    const { defaultProps, value } = this.props;

    return (
      <span
        tabIndex="0"
        className={this.makeClassString()}
        onFocus={this.startEditing}
        onClick={this.startEditing}
        {...defaultProps}
      >
        {this.state.newValue || value}
      </span>
    );
  }

  renderEditingComponent() {
    const { editProps, value } = this.props;

    return (
      <input
        ref="input"
        defaultValue={value}
        disabled={this.isDisabled()}
        className={this.makeClassString()}
        onInput={this.textChanged}
        onBlur={this.finishEditing}
        onKeyDown={this.keyDown}
        {...editProps}
      />
    );
  }

  startEditing = () => {
    this.setState({
      editing: true,
    });
  };

  finishEditing = () => {
    const newValue = ReactDOM.findDOMNode(this.refs.input).value;
    this.doValidations(newValue);

    if (!this.state.invalid && this.props.value !== newValue) {
      this.commit(newValue);
    }

    this.cancelEditing();
  };

  cancelEditing = () => {
    this.setState({
      editing: false,
      invalid: false,
    });
  };

  keyDown = event => {
    switch (event.keyCode) {
      case RIEStatefulBase.KEY_ENTER:
        this.finishEditing();
        break;
      case RIEStatefulBase.KEY_ESCAPE:
        this.cancelEditing();
        break;
    }
  };

  textChanged = event => {
    this.doValidations(event.target.value.trim());
  };

  elementBlur = () => {
    this.finishEditing();
  };

  elementClick = event => {
    this.startEditing();
    event.target.element.focus();
  };

  isDisabled = () => this.props.shouldBlockWhileLoading && this.state.loading
}

export default RIEStatefulBase;
