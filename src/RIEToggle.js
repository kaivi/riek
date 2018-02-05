import React from 'react';
import PropTypes from 'prop-types';
import RIEBase from './RIEBase';

export default class RIEToggle extends RIEBase {

    static propTypes = {
        textTrue: PropTypes.string,
        textFalse: PropTypes.string,
    };

    elementClick = (e) => {
        if(this.props.isDisabled) return;
        this.setState({value: !this.props.value});
        this.commit(!this.props.value);
    };

    render = () => {
        let valueToRender = this.state.loading ? this.state.value : this.props.value;
        const editingHandlers = {
            onKeyPress: this.elementClick,
            [!this.props.shouldStartEditOnDoubleClick ? 'onClick' : 'onDoubleClick']: this.elementClick,
        } 
        return <span
            tabIndex="0"
            {...editingHandlers}
            className={this.makeClassString()}
            {...this.props.defaultProps}>
            {valueToRender ? (this.props.textTrue || 'yes') : (this.props.textFalse || 'no')}
        </span>;
    };
}
