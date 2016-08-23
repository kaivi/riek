import React from 'react';
import RIEStatefulBase from './RIEStatefulBase';

export default class RIENumber extends RIEStatefulBase {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        format: React.PropTypes.func
    };

    validate = (value) => {
        return !isNaN(value) && isFinite(value) && value.length > 0;
    };

    renderNormalComponent = () => {
        return <span
            tabIndex="0"
            className={this.makeClassString()}
            onFocus={this.startEditing}
            onClick={this.startEditing}>{this.props.format ? this.props.format(this.state.newValue || this.props.value) : (this.state.newValue || this.props.value)}</span>;
    };

    renderEditingComponent = () => {
        return <input disabled={(this.props.shouldBlockWhileLoading && this.state.loading)}
                      type="number"
                      className={this.makeClassString()}
                      defaultValue={this.props.value}
                      onInput={this.textChanged}
                      onBlur={this.finishEditing}
                      ref="input"
                      onKeyDown={this.keyDown} />;
    };
}
