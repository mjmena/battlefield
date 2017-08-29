import React from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';

import {ItemTypes} from '../Enums';

const entitySource = {
  beginDrag(props){
    return{
      entityId: props.entityId
    }
  },
  endDrag(props, monitor){
    const coordinate = monitor.getClientOffset();
    const x = Math.ceil(coordinate.x / (props.radius * 2));
    const y = Math.ceil(coordinate.y / (props.radius * 2));
    props.onMoveEntity(props.entityId, x, y)
  }
}

const collect = (connect) => {
  return {
    connectDragSource: connect.dragSource()
  }
}

class Entity extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.props.onSelectEntity(this.props.playerId, this.props.entityId);
  }

  render() {
    const {x, y, radius, connectDragSource} = this.props;
    return (connectDragSource(<circle cx={x + radius} cy={y + radius} r={radius} fill={this.props.selected} onClick={this.onClick} onMouseDown={(event)=>event.preventDefault()} />))
  }
}

Entity.propTypes = {
  entityId: PropTypes.string,
  playerId: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  radius: PropTypes.number,
  selected: PropTypes.string,
  onSelectEntity: PropTypes.func,
  onMoveEntity: PropTypes.func,
  connectDragSource: PropTypes.func.isRequired,
}

export default DragSource(ItemTypes.ENTITY, entitySource, collect)(Entity);
