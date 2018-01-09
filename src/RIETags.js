import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import RIEStatefulBase from './RIEStatefulBase';
import RIEBase from './RIEBase';

class RIETag extends React.Component
{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div key={this.props.text}>
        {this.props.text}
        <div
          onClick={this.remove}
          className={this.props.className || 'remove'}
        > ×
        </div>
      </div>
    );
  }

  remove = () => this.props.removeHandler(this.props.text);
}

RIETag.propTypes = {
  text: PropTypes.string.isRequired,
  removeHandler: PropTypes.func,
  className: PropTypes.string,
};


class RIETags extends RIEStatefulBase {
  constructor(props) {
    super(props);
    this.state.currentText = '';
    this.state.blurTimer = null;
  }

  componentWillReceiveProps(nextProps){
    if ('value' in nextProps) {
      this.setState({
        loading: false,
        invalid: false,
      });
    }
  }

  componentDidUpdate() {
    const inputElem = ReactDOM.findDOMNode(this.refs.input);
    if (this.state.editing) {
      inputElem.focus();
    }
  }

  renderNormalComponent = () => {
    const tags = [...this.props.value].join(this.props.separator || ', ');
    return (
      <span
        tabIndex="0"
        className={this.makeClassString()}
        onFocus={this.startEditing}
        {...this.props.defaultProps}
      >
        {tags}
      </span>
    );
  };

  renderEditingComponent = () => {
    const elements = [...this.props.value].map(this.renderTagElement);
    return (
      <div
        tabIndex="1"
        onClick={this.startEditing}
        className={this.makeClassString()}
        {...this.props.editProps}
      >
        {elements}
        <input
          onBlur={this.cancelEditingDelayed}
          onKeyDown={this.keyDown}
          placeholder={(this.props.placeholder || 'New tag')}
          ref="input"
        />
      </div>
    );
  };

  renderTagElement = text =>
    <RIETag
      key={text}
      text={text}
      removeHandler={this.removeTag}
    />
  ;

  addTag = tag => {
    if ([...this.props.value].length < (this.props.maxTags || 65535)) {
      this.commit(this.props.value.add(tag));
    }
  };

  removeTag = tag => {
    clearTimeout(this.state.blurTimer);

    if ([...this.props.value].length >= (this.props.minTags || 1)) {
      const newSet = this.props.value;
      newSet.delete(tag);
      this.commit(newSet);
    }
  };

  keyDown = event => {
    switch (event.keyCode) {
      case RIEBase.KEY_BACKSPACE:
        if (event.target.value.length === 0) {
          const tagToRemove = [...this.props.value].pop();
          this.removeTag(tagToRemove);
        }
        break;
      case RIEBase.KEY_ENTER:
        event.preventDefault();
        if (event.target.value.length === 0) {
          this.cancelEditing();
          return;
        }

        this.addTag(event.target.value);
        break;
      case RIEBase.KEY_ESCAPE:
        this.cancelEditing();
        break;
    }
  };

  cancelEditingDelayed = () => {
    this.setState({
      blurTimer: setTimeout(
        this.cancelEditing,
        this.props.blurDelay || 180,
      ),
    });
  };

  cancelEditing = () => {
    this.setState({
      editing: false,
      invalid: false,
    });
  };
}

RIETags.propTyes = {
  value: PropTypes.object.isRequired,
  maxTags: PropTypes.number,
  minTags: PropTypes.number,
  separator: PropTypes.string,
  elementClass: PropTypes.string,
  blurDelay: PropTypes.number,
  placeholder: PropTypes.string,
};

export default RIETags;
