import React from 'react';
import PropTypes from 'prop-types';

import RIEBase from './RIEBase';

class RIEToggle extends RIEBase {
  render() {
    const { defaultProps } = this.props;
    return (
      <span
        tabIndex="0"
        onKeyPress={this.elementClick}
        onClick={this.elementClick}
        className={this.makeClassString()}
        {...defaultProps}
      >
        {this.getValue()}
      </span>
    );
  }

  getValue() {
    const { textTrue, textFalse, value } = this.props;

    const valueToRender = this.state.loading ? this.state.value : value;

    if (valueToRender) {
      return textTrue || 'yes';
    }

    return textFalse || 'no';
  }

    elementClick = () => {
      const { value } = this.props;

      this.setState({
        value,
      });

      this.commit(!value);
    };
}

RIEToggle.propTypes = {
  textTrue: PropTypes.string,
  textFalse: PropTypes.string,
};

export default RIEToggle;
