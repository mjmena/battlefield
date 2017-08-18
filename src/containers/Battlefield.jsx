import React from 'react';
import {connect} from 'react-redux';
import Grid from '../components/GridCSS';
import Entity from '../components/Entity';

import {selectEntity, moveEntity} from '../actions/EntityActions';

const Battlefield = ({entities, players, localPlayerID, cellSize, onSelectEntity, onMoveEntity}) => {
  console.log(entities)
  const drawnEntities = entities.map((entity) => {

    const highlight = players.find((player)=>{
      return player.get("selectedEntityID") === entity.get("id")
    });
    const circle = {
      key: entity.get("id"),
      entityId: entity.get("id"),
      playerId: localPlayerID,
      x: entity.get("transform").get("x") * cellSize - cellSize,
      y: entity.get("transform").get("y") * cellSize - cellSize,
      radius: cellSize/2,
      selected:  highlight ? highlight.get("selectedColor") : "",
      onSelectEntity: onSelectEntity,
      onMoveEntity: onMoveEntity
    }
    return <Entity {...circle}></Entity>
  });

  return (
    <div>
      <Grid rows={50} columns={50} cellSize={cellSize}></Grid>
      {drawnEntities}  
    </div>
  )
}

const mapStateToProps = (state) => {
  const entities = state.get("entities");
  const grid = state.get("grid");
  const playerID = state.getIn(["local", "id"]);
  return{
    entities: entities,
    players: state.get("players"),
    localPlayerID: playerID,
    cellSize: grid.get("cellSize")
  }
}

export default connect(mapStateToProps, {onSelectEntity:selectEntity, onMoveEntity: moveEntity})(Battlefield);