import React from 'react';
import PropTypes from 'prop-types';
import RIEBase from './RIEBase';

export default class RIEToggle extends RIEBase {

    static propTypes = {
        textTrue: PropTypes.string,
        textFalse: PropTypes.string
    };

    elementClick = (e) => {
        this.setState({value: !this.props.value});
        this.commit(!this.props.value);
    };

    render = () => {
        let valueToRender = this.state.loading ? this.state.value : this.props.value;
        return <span
            tabIndex="0"
            onKeyPress={this.elementClick}
            onClick={this.elementClick}
            className={this.makeClassString()}
            {...this.props.defaultProps}>
            {valueToRender ? (this.props.textTrue || 'yes') : (this.props.textFalse || 'no')}
        </span>;
    };
}
