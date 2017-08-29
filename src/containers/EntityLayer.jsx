import React from 'react';
import {connect} from 'react-redux';
import PropType from 'prop-types';
import Immutable from 'immutable';

import {selectEntity} from '../actions/PlayerActions';
import {moveEntity} from '../actions/EntityActions';
import Entity from '../components/Entity';

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
        selected: highlight
          ? highlight.get("color")
          : "",
        onSelectEntity: this.props.onSelectEntity,
        onMoveEntity: this.props.onMoveEntity
      }

      return <Entity {...circle}></Entity>
    });

    return <g>
      {entities}
    </g>
  }
}

EntityLayer.propTypes = {
  playerId: PropType.string,
  entities: PropType.instanceOf(Immutable.Map),
  players: PropType.instanceOf(Immutable.Map),
  cellSize: PropType.number,
  onSelectEntity: PropType.func,
  onMoveEntity: PropType.func
}

const mapStateToProps = (state) => {
  return {
    playerId: state.getIn(["local", "playerId"]),
    cellSize: state.getIn(["grid","cellSize"]),
    entities: state.get('entities'),
    players: state.get('players')
  }
}

export default connect(mapStateToProps, {
  onSelectEntity: selectEntity,
  onMoveEntity: moveEntity
})(EntityLayer);
