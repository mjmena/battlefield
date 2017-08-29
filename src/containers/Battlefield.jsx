import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import simplify from 'simplify-js';

import Grid from '../components/Grid';
import EntityLayer from './EntityLayer';
import MeasurementLayer from "./MeasurementLayer";
import DrawingLayer from "./DrawingLayer";
import {startMeasurement, updateMeasurement, stopMeasurement} from '../actions/PlayerActions';
import {startDrawing, updateDrawing, stopDrawing} from '../actions/LocalActions';
import {saveDrawing} from '../actions/DrawingActions'

class Battlefield extends React.Component {
  constructor(props) {
    super(props)
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseDown(event) {
    if (this.props.tool === "RULER") {
      const x = Math.floor(event.clientX / this.props.cellSize);
      const y = Math.floor(event.clientY / this.props.cellSize);
      this.props.startMeasurement(this.props.playerId, x, y)
    } else if (this.props.tool === "DRAW") {
      const x = event.clientX;
      const y = event.clientY;
      this.props.startDrawing(x, y)
    }
  }

  onMouseMove(event) {
    const measurement = this.props.players.getIn([this.props.playerId, 'measurement'])
    if (measurement) {
      const x = Math.floor(event.clientX / this.props.cellSize);
      const y = Math.floor(event.clientY / this.props.cellSize);
      if (measurement.get("endX") !== x || measurement.get("endY") !== y) {
        this.props.updateMeasurement(this.props.playerId, x, y)
      }
    } else if (this.props.localDrawing) {
      const x = event.clientX;
      const y = event.clientY;
      this.props.updateDrawing(x, y)
    }
  }

  onMouseUp() {
    if (this.props.players.getIn([this.props.playerId, 'measurement'])) {
      this.props.stopMeasurement(this.props.playerId)
    } else if (this.props.localDrawing) {
      const simplifedCoordinates = simplify(this.props.localDrawing.toJS(), 4);
      this.props.saveDrawing(simplifedCoordinates);
      this.props.stopDrawing();
    }
  }

  render() {
    return (
      <Grid rows={50} columns={50} cellSize={this.props.cellSize}>
        <svg style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        }} width="100%" height="100%" onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}>
          <EntityLayer/>
          <DrawingLayer drawings={this.props.drawings} localDrawing={this.props.localDrawing}/>
          <MeasurementLayer/>
        </svg>
      </Grid>
    )
  }
}

Battlefield.propTypes = {
  playerId: PropTypes.string,
  players: PropTypes.instanceOf(Immutable.Map),
  cellSize: PropTypes.number,
  tool: PropTypes.string,
  localDrawing: PropTypes.instanceOf(Immutable.List),
  drawings: PropTypes.instanceOf(Immutable.List),
  startMeasurement: PropTypes.func,
  updateMeasurement: PropTypes.func,
  stopMeasurement: PropTypes.func,
  startDrawing: PropTypes.func,
  updateDrawing: PropTypes.func,
  stopDrawing: PropTypes.func,
  saveDrawing: PropTypes.func
}

const mapStateToProps = (state) => {
  const grid = state.get("grid");
  const playerId = state.getIn(["local", "playerId"]);
  return {
    playerId: playerId,
    players: state.get('players'),
    cellSize: grid.get("cellSize"),
    tool: state.getIn(["local", "tool"]),
    localDrawing: state.getIn(["local", "drawing"]),
    drawings: state.get("drawings")
  }
}

export default connect(mapStateToProps, {
  startMeasurement,
  updateMeasurement,
  stopMeasurement,
  startDrawing,
  updateDrawing,
  stopDrawing,
  saveDrawing
})(Battlefield);
