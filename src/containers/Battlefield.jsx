import React from 'react';
import {connect} from 'react-redux';
import Grid from '../components/Grid';
import Entity from '../components/Entity';
import MeasurementLayer from "./MeasurementLayer"

import {selectEntity} from '../actions/PlayerActions';
import {moveEntity} from '../actions/EntityActions';

const Battlefield = ({entities, players, playerId, cellSize, tool, onSelectEntity, onMoveEntity}) => {
  
  const drawnEntities = entities.map((entity) => {

    const highlight = players.find((player)=>{
      return player.get("selectedEntityId") === entity.get("id")
    });
    const circle = {
      key: entity.get("id"),
      entityId: entity.get("id"),
      playerId: playerId,
      x: entity.get("transform").get("x") * cellSize - cellSize,
      y: entity.get("transform").get("y") * cellSize - cellSize,
      radius: cellSize/2,
      selected:  highlight ? highlight.get("color") : "",
      onSelectEntity: onSelectEntity,
      onMoveEntity: onMoveEntity
    }
    return <Entity {...circle}></Entity>
  });

  

  return (
    <div>
      <Grid rows={50} columns={50} cellSize={cellSize}>
        {drawnEntities}
        <MeasurementLayer />
      </Grid>  
    </div>
  )
}

const mapStateToProps = (state) => {
  const entities = state.get("entities");
  const grid = state.get("grid");
  const playerId = state.getIn(["local", "playerId"]);
  return{
    entities: entities,
    players: state.get("players"),
    playerId: playerId,
    cellSize: grid.get("cellSize"),
    tool: state.getIn(["local", "tool"])
  }
}

export default connect(mapStateToProps, {onSelectEntity:selectEntity, onMoveEntity: moveEntity})(Battlefield);