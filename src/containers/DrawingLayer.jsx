import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import Drawing from '../components/Drawing'

class DrawingLayer extends React.PureComponent {
  render() {
    const paths = this.props.drawings.map((coordinates) => {
      return <Drawing coordinates={coordinates} color="black" />
    }).toList()

    return <g>
      <Drawing coordinates={this.props.localDrawing} color="black"/>
      {paths}
    </g>
  }
}

DrawingLayer.propTypes = {
  localDrawing: PropTypes.instanceOf(Immutable.List),
  drawings: PropTypes.instanceOf(Immutable.List)
}


export default DrawingLayer;
