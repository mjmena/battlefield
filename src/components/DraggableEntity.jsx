import React from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';

import Entity from './Entity';
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
  },
  canDrag(props){
    return props.tool === "SELECT";
  }
}

const collect = (connect) => {
  return {
    connectDragSource: connect.dragSource()
  }
}

function getStyles(props) {
  const { x, y, isDragging } = props;
  const transform = `translate3d(${x}px, ${y}px, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  };
}

class DraggableEntity extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    if(this.props.tool === "SELECT"){
        this.props.onSelectEntity(this.props.playerId, this.props.entityId);
    }
  }

  render() {
    const {x, y, radius, color, connectDragSource} = this.props;
    return connectDragSource(
      <div  style={getStyles(this.props)}>
        <Entity x={x} y={y} radius={radius} color={color} onClick={this.onClick}/>
      </div>
    )
  }
}

DraggableEntity.propTypes = {
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

export default DragSource(ItemTypes.ENTITY, entitySource, collect)(DraggableEntity);
