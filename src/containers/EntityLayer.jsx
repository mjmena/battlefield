import React from 'react';
import {connect} from 'react-redux';
import PropType from 'prop-types';
import Immutable from 'immutable';

import {selectEntity} from '../actions/PlayerActions';
import {moveEntity} from '../actions/EntityActions';
import DraggableEntity from '../components/DraggableEntity';

class EntityLayer extends React.Component{
  render(){
    const entities = this.props.entities.map((entity) => {
      const highlight = this.props.players.find((player) => {
        return player.get("selectedEntityId") === entity.get("id")
      });
      const circle = {
        key: entity.get("id"),
        entityId: entity.get("id"),
        playerId: this.props.playerId,
        x: entity.get("transform").get("x") * this.props.cellSize - this.props.cellSize,
        y: entity.get("transform").get("y") * this.props.cellSize - this.props.cellSize,
        radius: this.props.cellSize / 2,
        color: highlight
          ? highlight.get("color")
          : "black",
        tool:this.props.tool,
        onSelectEntity: this.props.onSelectEntity,
        onMoveEntity: this.props.onMoveEntity
      }


      return <DraggableEntity {...circle}></DraggableEntity>
    });

    return(
      <span>
        {entities}
      </span>
    )
  }
}

EntityLayer.propTypes = {
  playerId: PropType.string,
  entities: PropType.instanceOf(Immutable.Map),
  players: PropType.instanceOf(Immutable.Map),
  cellSize: PropType.number,
  tool: PropType.string,
  onSelectEntity: PropType.func,
  onMoveEntity: PropType.func
}

const mapStateToProps = (state) => {
  return {
    playerId: state.getIn(["local", "playerId"]),
    cellSize: state.getIn(["grid","cellSize"]),
    entities: state.get('entities'),
    players: state.get('players'),
    tool: state.getIn(["local", "tool"])
  }
}

export default connect(mapStateToProps, {
  onSelectEntity: selectEntity,
  onMoveEntity: moveEntity
})(EntityLayer);
