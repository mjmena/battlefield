import React from 'react';
import PropTypes from 'prop-types';

class Entity extends React.PureComponent {
  render() {
    const {radius, color} = this.props;
    const strokeWidth = 4
    return (
      <circle cx={radius} cy={radius} r={radius - strokeWidth/2} stroke={color} strokeWidth={strokeWidth} fill="black" onMouseDown={(event) => {
      	event.preventDefault()
      }}/>
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
