import React from 'react';
import RIEBase from './RIEBase';

export default class RIEToggle extends RIEBase
{
    static propTypes = {
        textTrue: React.PropTypes.string,
        textFalse: React.PropTypes.string
    };

    render = () => {
        return (
            <span
                tabIndex="0"
                onKeyPress={this.elementClick}
                onClick={this.elementClick}
                className={this.makeClassString()}
                {...this.props.defaultProps}
            >
                {this.getValue()}
            </span>
        );
    };

    getValue = () => {
        const valueToRender = this.state.loading ? this.state.value : this.props.value;

        if (valueToRender) {
            return (this.props.textTrue || 'yes');
        }

        return (this.props.textFalse || 'no');
    };

    elementClick = () => {
        this.setState({
            value: !this.props.value
        });

        this.commit(!this.props.value);
    };
}
