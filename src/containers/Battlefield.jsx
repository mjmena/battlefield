import React from 'react';
import {connect} from 'react-redux';
import {Stage, Layer, Circle} from 'react-konva'
import Grid from '../components/Grid';
import {moveEntity} from './../actions/EntityActions';
import {selectEntity} from './../actions/PlayerActions';

const Battlefield = ({entities, players, localPlayerID, columns, rows, cellSize, onMoveEntity, onSelectEntity}) => {
  const drawnEntities = entities.map((entity) => {

    const highlight = players.find( (player)=>{
      return player.get("selectedEntityID") === entity.get("id")
    });

    const circle = {
      key: entity.get("id"),
      x: entity.get("transform").get("x") * cellSize - cellSize/2,
      y: entity.get("transform").get("y") * cellSize - cellSize/2,
      radius: cellSize/2 - 2,
      fill: 'orange',
      stroke: highlight ? highlight.get("selectedColor") : "",
      strokeWidth: 4,
      draggable: true,
      onClick: (event) => {
        onSelectEntity(localPlayerID, entity.get("id"));
      },
      onDragEnd:(event)=>{
        const x = Math.ceil(event.target.x() / cellSize);
        const y = Math.ceil(event.target.y() / cellSize); 
        onMoveEntity(entity.get("id"),x,y) 
      }
    }

    const text = { 
      x: entity.get("transform").get("x") * cellSize - cellSize/2,
      y: entity.get("transform").get("y") * cellSize - cellSize/2,
      
    }

    return <Circle {...circle} />
  });

  return (
    <Stage width={columns * cellSize} height={rows * cellSize}>
      <Layer>
          <Grid columns={columns} rows={rows} cellSize={cellSize} />
          {drawnEntities}
      </Layer>
    </Stage>
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
    columns: grid.get("columns"),
    rows: grid.get("rows"),
    cellSize: grid.get("cellSize")
  }
}

export default connect(mapStateToProps, {onMoveEntity:moveEntity, onSelectEntity:selectEntity})(Battlefield);