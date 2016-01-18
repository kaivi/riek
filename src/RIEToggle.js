import React from 'react';
import RIEBase from './RIEBase';

export default class RIEToggle extends RIEBase {

    static propTypes = {
        textTrue: React.PropTypes.string,
        textFalse: React.PropTypes.string
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
            className={this.makeClassString()}>
            {valueToRender ? (this.props.textTrue || 'yes') : (this.props.textFalse || 'no')}
        </span>;
    };
}
