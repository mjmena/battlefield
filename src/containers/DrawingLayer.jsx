import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import Drawing from '../components/Drawing'

class DrawingLayer extends React.PureComponent {
  render() {
    let drawings = this.props.drawings.map((drawing) => {
      return <Drawing key={drawing.get("id")} coordinates={drawing.get("coordinates")} color="black" />
    }).toList()

    if(this.props.localDrawing){
      drawings = drawings.push(<Drawing coordinates={this.props.localDrawing.get("coordinates")} color="black"/>)
    }

    return <g>  
      {drawings}
    </g>
  }
}

DrawingLayer.propTypes = {
  localDrawing: PropTypes.instanceOf(Immutable.List),
  drawings: PropTypes.instanceOf(Immutable.List)
}


export default DrawingLayer;
