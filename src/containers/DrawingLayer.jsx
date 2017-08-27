import React from 'react';
import {connect} from 'react-redux';
import simplify from 'simplify-js';

import {startDrawing, updateDrawing, stopDrawing} from '../actions/LocalActions'
import {saveDrawing} from '../actions/DrawingActions'
import Drawing from '../components/Drawing'

const DrawingLayer = ({localDrawing, tool, color, drawings, startDrawing, updateDrawing, stopDrawing, saveDrawing}) => {
  const onMouseDown = (event) => {
    if(tool === "DRAW"){
      const x = event.clientX;
      const y = event.clientY;
      startDrawing(x, y)
    }
  }

  const onMouseMove = (event) => {
    if(localDrawing){
      const x = event.clientX;
      const y = event.clientY;
      updateDrawing(x, y)
    }
  }

  const onMouseUp = (event) => {
    if(localDrawing){
      const x = event.clientX;
      const y = event.clientY;
      saveDrawing(localDrawing)
      stopDrawing()
    }
  }

  const paths = drawings.map((coordinates) => {
    return <Drawing coordinates={coordinates} color={color} />
  }).toList()

  return (
    <svg width="100%" height="100%" onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      <Drawing coordinates={localDrawing} color={color} />
      {paths}
    </svg>
  )
}

const mapStateToProps = (state) => {
  return{
    localDrawing: state.getIn(["local", "drawing"]),
    tool: state.getIn(["local", "tool"]),
    color: state.getIn(["players", state.getIn(["local", "playerId"]), "color"]),
    drawings: state.get("drawings")
  }
}

export default connect(mapStateToProps, {
  startDrawing, 
  updateDrawing, 
  stopDrawing,
  saveDrawing
})(DrawingLayer);