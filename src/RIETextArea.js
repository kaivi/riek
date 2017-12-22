import React from 'react';
import RIEStatefulBase from './RIEStatefulBase';
import RIEBase from "./RIEBase";

export default class RIETextArea extends RIEStatefulBase
{
    renderNormalComponent = () => {
        return (
            <span
                tabIndex="0"
                className={this.makeClassString()}
                onFocus={this.startEditing}
                onClick={this.startEditing}
                {...this.props.defaultProps}
            >
                {this.transformNewlineToBr()}
            </span>
        );
    };

    renderEditingComponent = () => {
        return (
            <textarea
                rows={this.props.rows}
                cols={this.props.cols}
                disabled={this.isDisabled()}
                className={this.makeClassString()}
                defaultValue={this.props.value}
                onInput={this.textChanged}
                onBlur={this.finishEditing}
                ref="input"
                onKeyDown={this.keyDown}
                {...this.props.editProps}
            />
        );
    };

    transformNewlineToBr = () => {
        const value = String(this.state.newValue || this.props.value);
        const spansAndBreaks = [];
        let i = 0;

        value.split("\n").forEach(line => {
            spansAndBreaks.push(<span key={i}>{line}</span>);
            spansAndBreaks.push(<br key={i+1} />);
            i += 2
        });

        spansAndBreaks.pop(); // remove last br tag
        return spansAndBreaks;
    };

    keyDown = (event) => {
        if (event.keyCode === RIEBase.KEY_ESCAPE) {
            this.cancelEditing()
        }
    };
}
