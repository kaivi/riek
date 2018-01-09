import React from 'react';

import RIEStatefulBase from './RIEStatefulBase';
import RIEBase from './RIEBase';

class RIETextArea extends RIEStatefulBase
{
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
        {this.transformNewlineToBr()}
      </span>
    );
  }

  renderEditingComponent() {
    const {
      rows, cols, value, editProps,
    } = this.props;

    return (
      <textarea
        ref="input"
        rows={rows}
        cols={cols}
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

  transformNewlineToBr = () => {
    const value = String(this.state.newValue || this.props.value);
    const spansAndBreaks = [];
    let i = 0;

    value.split('\n').forEach(line => {
      spansAndBreaks.push(<span key={i}>{line}</span>);
      spansAndBreaks.push(<br key={i + 1} />);
      i += 2;
    });

    spansAndBreaks.pop(); // remove last br tag
    return spansAndBreaks;
  };

  keyDown = event => {
    if (event.keyCode === RIEBase.KEY_ESCAPE) {
      this.cancelEditing();
    }
  };
}

export default RIETextArea;

