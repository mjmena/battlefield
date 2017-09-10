import React from 'react';
import PropTypes from 'prop-types';

class Entity extends React.PureComponent {
  render() {
    const {radius, color} = this.props;
    return (
      <circle cx={radius} cy={radius} r={radius} fill={color} />
    )
  }
}

Entity.propTypes = {
  radius: PropTypes.number.isRequired,
  color: PropTypes.string,
}

Entity.defaultProps = {
  color:"black",
}

export default Entity;
