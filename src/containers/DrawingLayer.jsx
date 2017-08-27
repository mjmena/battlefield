import React from 'react';
import {connect} from 'react-redux';

import {startDrawing, updateDrawing, stopDrawing} from '../actions/LocalActions'

const DrawingLayer = ({drawing, tool, color, startDrawing, updateDrawing, stopDrawing}) => {
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

  let path = ""
  if (drawing) {
    path = drawing.reduce((accum, coordinate) => {
        if (accum !== "M") {
          accum += " L"
        }
        return accum + coordinate.get("x") + " " + coordinate.get("y")
    }, "M")
  }

  return (
    <svg width="100%" height="100%" onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      <path d={path} stroke={color} strokeWidth="3" fill="none"/>
    </svg>
  )
}

const mapStateToProps = (state) => {
  return{
    drawing: state.getIn(["local", "drawing"]),
    tool: state.getIn(["local", "tool"]),
    color: state.getIn(["players", state.getIn(["local", "playerId"]), "color"])
  }
}

export default connect(mapStateToProps, {
  startDrawing:startDrawing, 
  updateDrawing:updateDrawing, 
  stopDrawing:stopDrawing
})(DrawingLayer);