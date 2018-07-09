
import React from "react";
import RIEBase from './RIEBase';
import RIEStatefulBase from "./RIEStatefulBase";

const debug = require("debug")("RIETextArea");

class RIETextArea extends RIEStatefulBase {
  keyDown = event => {
    if (event.keyCode === RIEBase.KEY_ESCAPE) {
      this.cancelEditing();
    }
  };

  renderEditingComponent () {
    debug("renderEditingComponent()");
    const {
      rows, cols, value, editProps,
    } = this.props;
    return (
      <textarea
        rows={rows}
        cols={cols}
        disabled={this.isDisabled()}
        className={this.makeClassString()}
        defaultValue={value}
        onInput={this.textChanged}
        onBlur={this.finishEditing}
        ref="input"
        onKeyDown={this.keyDown}
        {...editProps}
      />
    );
  }

  transformNewlineToBr () {
    const value = this.formatValue();
    const contents = [];

    const lines = value.split("\n");
    lines.map((line, index) => {
      contents.push(line);

      if (index < lines.length - 1) {
        contents.push(<br key={index} />);
      }
    });

    return contents;
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
        {this.transformNewlineToBr()}
      </span>
    );
  }
}

export default RIETextArea;

