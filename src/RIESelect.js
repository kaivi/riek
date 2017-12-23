import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import RIEStatefulBase from './RIEStatefulBase';

class RIESelect extends RIEStatefulBase {
  renderNormalComponent() {
    const { defaultProps } = this.props;

    return (
      <span
        tabIndex="0"
        className={this.makeClassString()}
        onFocus={this.startEditing}
        onClick={this.startEditing}
        {...defaultProps}
      >
        {this.getValue()}
      </span>
    );
  }

  renderEditingComponent() {
    const { editProps, value } = this.props;

    if (!value.id) {
      throw Error('every value needs an id field');
    }

    return (
      <select
        ref="input"
        disabled={this.isDisabled()}
        value={value.id}
        className={this.makeClassString()}
        onChange={this.finishEditing}
        onBlur={this.cancelEditing}
        onKeyDown={this.keyDown}
        {...editProps}
      >
        {this.renderOptions()}
      </select>
    );
  }

  renderOptions() {
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

    finishEditing = () => {
      const { options, value } = this.props;

      // get the object from options that matches user selected value
      const newValue = options.find(option => option.id === ReactDOM.findDOMNode(this.refs.input).value);

      this.doValidations(newValue);

      if (!this.state.invalid && value !== newValue) {
        this.commit(newValue);
      }

      this.cancelEditing();
    };

    getValue = () => this.state.newValue ? this.state.newValue.text : this.props.value.text
}

RIESelect.propTypes = {
  options: PropTypes.array.isRequired,
};

export default RIESelect;
