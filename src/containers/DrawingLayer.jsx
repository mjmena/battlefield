import React from 'react';
import {connect} from 'react-redux';

import {startDrawing, updateDrawing, stopDrawing} from '../actions/LocalActions'

const DrawingLayer = ({drawing, tool, startDrawing, updateDrawing, stopDrawing}) => {
  const onMouseDown = (event) => {
      if(tool === "DRAW"){
        const x = event.clientX;
        const y = event.clientY;
        startDrawing(x, y)
      }
    }

    const onMouseMove = (event) => {
      if(drawing){
        const x = event.clientX;
        const y = event.clientY;
        updateDrawing(x, y)
      }
    }

    const onMouseUp = (event) => {
      if(drawing){
        const x = event.clientX;
        const y = event.clientY;
        stopDrawing(x, y)
      }
    }

  return (
    <svg width="100%" height="100%" onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
    </svg>
  )
}

const mapStateToProps = (state) => {
  return{
    drawing: state.getIn(["local", "drawing"]),
    tool: state.getIn(["local", "tool"])
  }
}

export default connect(mapStateToProps, {
  startDrawing:startDrawing, 
  updateDrawing:updateDrawing, 
  stopDrawing:stopDrawing
})(DrawingLayer);