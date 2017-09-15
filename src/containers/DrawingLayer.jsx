import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import Drawing from '../components/Drawing'

class DrawingLayer extends React.PureComponent {
  render() {
    let drawings = this.props.drawings.map((drawing) => {
      return <Drawing key={drawing.get("id")} coordinates={drawing.get("coordinates")} color={drawing.get("color")} />
    }).toList()

    if(this.props.localDrawing){
      drawings = drawings.push(<Drawing coordinates={this.props.localDrawing.get("coordinates")} color={this.props.localDrawing.get("color")}/>)
    }

    return (
      <svg width="100%" height="100%" style={{position:'absolute', top:0, left:0, zIndex:-10}}>
        {drawings}
      </svg>
    )

  }
}

DrawingLayer.propTypes = {
  localDrawing: PropTypes.instanceOf(Immutable.List),
  drawings: PropTypes.instanceOf(Immutable.List)
}


export default DrawingLayer;
