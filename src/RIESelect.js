import React from 'react';
import RIEStatefulBase from './RIEStatefulBase';

export default class RIESelect extends RIEStatefulBase {
    static propTypes = {
        options: React.PropTypes.object.isRequired
    };

    renderEditingComponent = () => {
        const optionNodes = [];
        for (var value in this.props.options) {
            optionNodes.push(
                <option value={value} key={value}>{this.props.options[value]}</option>
            );
        };
        return <select disabled={(this.props.shouldBlockWhileLoading && this.state.loading)}
                       value={this.props.value}
                       className={this.makeClassString()}
                       onChange={this.finishEditing}
                       onBlur={this.cancelEditing}
                       ref="input"
                       onKeyDown={this.keyDown}>{optionNodes}</select>
    };

    renderNormalComponent = () => {
        return <span
            tabIndex="0"
            className={this.makeClassString()}
            onFocus={this.startEditing}
            onClick={this.startEditing}>{this.props.options[this.state.newValue] || this.props.options[this.props.value]}</span>;
    };
}
