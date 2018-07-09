import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import RIEStatefulBase from "./RIEStatefulBase";
import RIEBase from "./RIEBase";

const debugTag = require("debug")("RIETag");

class RIETag extends React.Component {
  constructor(props) {
    super(props);
  }
  remove = () => {
    this.props.removeHandler(this.props.text);
  }

  render () {
    debugTag("render()");
    const { className, text } = this.props;
    return (
      <div className={ className } style={{ cursor: "default" }}>
        { text }
        <div
          onClick={ this.remove }
          className={ className ? `${className}-remove` : "remove" }
          style={{ margin: "3px", cursor: "pointer" }}
        >
          {" "}
          ×{" "}
        </div>
      </div>
    );
  }
}

RIETag.propTypes = {
  text: PropTypes.string.isRequired,
  removeHandler: PropTypes.func,
  className: PropTypes.string,
};

const debug = require("debug")("RIETags");

class RIETags extends RIEStatefulBase {
  constructor(props) {
    super(props);

    this.state = {
      currentText: "",
      blurTimer: null,
    };
  }

  static defaultProps = {
    ...RIEStatefulBase.defaultProps,
    defaultValue: ["default"],
    minTags: 1,
  };

  addTag (tag) {
    debug(`addTag(${tag})`);
    if (
      this.doValidations(tag) &&
      this.props.value.length < (this.props.maxTags || 65535)
    ) {
      const value = [...this.props.value, tag];
      this.commit([...new Set(value)]);
    }
  }

  removeTag = tag => {
    debug(`removeTag(${tag})`);
    clearTimeout(this.state.blurTimer);

    const value = [...this.props.value];
    value.splice(value.indexOf(tag), 1);

    if (value.length < this.props.minTags - 1) {
      if (typeof this.defaultValue === "function") {
        this.commit(this.defaultValue(value));
      } else if (this.props.defaultValue instanceof Array) {
        let valueIndex = value.length - 1 >= 0 ? value.length - 1 : 0;

        while (value.length < this.props.minTags - 1) {
          if (valueIndex >= this.props.defaultValue.length) {
            valueIndex = 0;
          }

          value.push(this.props.defaultValue[valueIndex]);
          valueIndex++;
        }

        this.commit(value);
      } else {
        value.push(this.props.defaultValue);
        this.commit(value);
      }
    } else {
      this.commit(value);
    }
  };

  componentWillReceiveProps (nextProps) {
    if ("value" in nextProps) {
      this.setState({
        loading: false,
        invalid: false,
      });
    }
  }

  keyDown = event => {
    debug(`removeTag(${event.keyCode})`);
    switch (event.keyCode) {
      case RIEBase.KEY_BACKSPACE:
        if (event.target.value.length === 0) {
          const tagToRemove = this.props.value[this.props.value.length - 1];
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
        // eslint-disable-next-line
        event.target.value = "";
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

  componentDidUpdate () {
    const inputElem = ReactDOM.findDOMNode(this.refs.input);
    if (this.state.editing) {
      inputElem.focus();
    }
  }

  renderNormalComponent () {
    debug("renderNormalComponent()");
    const editingHandlers = !this.props.shouldStartEditOnDoubleClick
      ? {
          onFocus: this.startEditing,
        }
      : {
          onDoubleClick: this.startEditing,
        };

    if (this.props.wrapper) {
      const tags = this.props.value.map((value, index) => {
        const wrapper = React.createElement(this.props.wrapper, {
          key: index,
          children: [value],
          className: this.props.wrapperClass,
        });

        return wrapper;
      });

      return (
        <span
          tabIndex="0"
          className={this.makeClassString()}
          {...editingHandlers}
          {...this.props.defaultProps}
        >
          {tags.reduce((result, el, index, arr) => {
            result.push(el);

            if (index < arr.length - 1) {
              result.push(this.props.separator || ", ");
            }

            return result;
          }, [])}
        </span>
      );
      // eslint-disable-next-line
    } else {
      const tags = this.props.value.join(this.props.separator || ", ");

      return (
        <span
          tabIndex="0"
          className={this.makeClassString()}
          {...editingHandlers}
          {...this.props.defaultProps}
        >
          {tags}
        </span>
      );
    }
  }

  renderTagElement = (text, index) => {
    return (
      <RIETag
        className={this.props.wrapperEditing}
        key={index}
        text={text}
        removeHandler={this.removeTag}
      />
    );
  };

  renderEditingComponent () {
    debug("renderEditingComponent()");
    const elements = this.props.value.map(this.renderTagElement);
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
          placeholder={this.props.placeholder || "New tag"}
          ref="input"
        />
      </div>
    );
  }
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
