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
import {startDrawing, updateDrawing, stopDrawing, saveCoordinate} from '../actions/LocalActions';
import {saveDrawing} from '../actions/DrawingActions';
import {addEntity} from '../actions/EntityActions';

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const uuid = require('uuid/v4')

class Battlefield extends React.Component {
  constructor(props) {
    super(props)
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
  }

  onMouseDown(event) {
    if (this.props.tool === "RULER") {
      const x = Math.floor(event.clientX / this.props.cellSize);
      const y = Math.floor(event.clientY / this.props.cellSize);
      this.props.startMeasurement(this.props.playerId, x, y)
    } else if (this.props.tool === "DRAW") {
      const x = event.clientX;
      const y = event.clientY;
      this.props.startDrawing(uuid(), x, y)
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
      const simplifedDrawing = this.props.localDrawing.update('coordinates', (coordinates)=>{
        if (coordinates > 1) {
          return simplify(coordinates.toJS(), 4);
        }
        return coordinates;
      })


      this.props.saveDrawing(simplifedDrawing);
      this.props.stopDrawing();
    }
  }

  onContextMenu(event) {
    this.props.saveCoordinate(event.pageX, event.pageY);
  }

  addEntity(event, data) {
    console.log(data);
    const x = Math.ceil(data.coordinate.get('x') / this.props.cellSize);
    const y = Math.ceil(data.coordinate.get('y') / this.props.cellSize);
    this.props.addEntity(uuid(), x, y);
  }

  render() {
    return (
      <div>
        <ContextMenuTrigger id="battlefield_contextmenu" holdToDisplay={-1}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width:"100vw",
            height:"100vh",
          }} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} onContextMenu={this.onContextMenu}>
            <Grid rows={50} columns={50} cellSize={this.props.cellSize}>
              <EntityLayer/>
              <MeasurementLayer />
              <DrawingLayer drawings={this.props.drawings} localDrawing={this.props.localDrawing} />
            </Grid>
          </div>

        </ContextMenuTrigger >
        <ContextMenu id="battlefield_contextmenu">
          <MenuItem data={{coordinate:this.props.savedCoordinate}} onClick={this.addEntity.bind(this)}>
            Add Entity
          </MenuItem>
        </ContextMenu>
      </div>

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
  saveDrawing: PropTypes.func,
  addEntity: PropTypes.func,
  saveCoordinate: PropTypes.func,
  savedCoordinate: PropTypes.instanceOf(Immutable.Map)
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
    drawings: state.get("drawings"),
    savedCoordinate: state.getIn(['local', 'coordinate'])
  }
}

export default connect(mapStateToProps, {
  startMeasurement,
  updateMeasurement,
  stopMeasurement,
  startDrawing,
  updateDrawing,
  stopDrawing,
  saveDrawing,
  saveCoordinate,
  addEntity
})(Battlefield);
