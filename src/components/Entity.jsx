import React from 'react';
import PropTypes from 'prop-types';

class Entity extends React.PureComponent {
  render() {
    const {x, y, radius, color, onClick} = this.props;
    return (
      <svg>
        <circle cx={radius} cy={radius} r={radius} fill={color} onClick={onClick} />
      </svg>
    )
  }
}

Entity.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

Entity.defaultProps = {
  color:"black",
}

export default Entity;
