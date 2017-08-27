import React from 'react';
import {connect} from 'react-redux';

import Measurement from '../components/Measurement';
import {startMeasurement, updateMeasurement, stopMeasurement} from '../actions/PlayerActions'

const MeasurementLayer = ({players, playerId, cellSize, tool, startMeasurement, updateMeasurement, stopMeasurement}) => {
  const onMouseDown = (event) => {
      if(tool === "RULER"){
        const x = Math.floor(event.clientX/cellSize);
        const y = Math.floor(event.clientY/cellSize);
        startMeasurement(playerId, x, y)
      }
    }

    const onMouseMove = (event) => {
      const measurement = players.getIn([playerId, 'measurement'])
      if(measurement){
        const x = Math.floor(event.clientX/cellSize);
        const y = Math.floor(event.clientY/cellSize);
        if(measurement.get("endX") !== x || measurement.get("endY") !== y){
          updateMeasurement(playerId, x, y)
        }
      }
    }

    const onMouseUp = (event) => {
      if(players.getIn([playerId, 'measurement'])){
        stopMeasurement(playerId)
      }
    }
  const measurements = players.map((player) => {
    const measurement = player.get('measurement');
    if(measurement){
      return <Measurement {...measurement.toJSON()} cellSize={cellSize} color={player.get('color')}></Measurement>
    }
  });

  return (
    <svg width="100%" height="100%" onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      {measurements}
    </svg>
  )
}

const mapStateToProps = (state) => {
  return{
    players: state.get("players"),
    playerId: state.getIn(["local", "playerId"]),
    cellSize: state.getIn(["grid", "cellSize"]),
    tool:state.getIn(["local", "tool"])

  }
}

export default connect(mapStateToProps, {startMeasurement:startMeasurement, updateMeasurement:updateMeasurement, stopMeasurement:stopMeasurement})(MeasurementLayer);