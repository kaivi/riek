import React from 'react';
import ReactDOM from 'react-dom';
import RIEStatefulBase from './RIEStatefulBase';

export default class RIETextArea extends RIEStatefulBase {
    keyDown = (event) => {
        if (event.keyCode === 27) { this.cancelEditing() }     // Escape
    };

    renderEditingComponent = () => {
        return <textarea
            rows={this.props.rows}
            cols={this.props.cols}
            disabled={this.state.loading}
            className={this.makeClassString()}
            defaultValue={this.getValue()}
            onInput={this.textChanged}
            onBlur={this.finishEditing}
            ref="input"
            onKeyDown={this.keyDown}
            {...this.props.editProps} />;
    };

    renderNormalComponent = () => {
        const value = this.state.newValue || this.props.value;
		const spans_and_brs_and_whitespaces = [];

		let i = 0;

        value.split("\n").map(line => {
          spans_and_brs_and_whitespaces.push(<span key={i}>{line.replace(/ /gi, '\u00A0')}</span>);
          spans_and_brs_and_whitespaces.push(<br key={i+1} />);
          i += 2;
		});

        spans_and_brs_and_whitespaces.pop(); // remove last br tag

        const editingHandlers = !this.props.shouldStartEditOnDoubleClick ? {
            onFocus: this.startEditing,
            onClick: this.startEditing,
        } : {
            onDoubleClick: this.startEditing,
		};

		return (
			<span
				tabIndex="0"
				className={this.makeClassString()}
				{...editingHandlers}
				{...this.props.defaultProps}
			>
				{spans_and_brs_and_whitespaces}
			</span>
		);
    };
}
