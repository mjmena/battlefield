import React from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';

import Entity from './Entity';
import {ItemTypes} from '../Enums';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const entitySource = {
  beginDrag(props){
    const {radius, localColor, handleSelectEntity, entityId, playerId} = props;
    handleSelectEntity(playerId, entityId)
    return{
      radius:radius,
      color:localColor,
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

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
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
  };
}

class DraggableEntity extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.handleDeleteEntityClick = this.handleDeleteEntityClick.bind(this);
  }

  onClick() {
    if(this.props.tool === "SELECT"){
        this.props.handleSelectEntity(this.props.playerId, this.props.entityId);
    }
  }

  handleDeleteEntityClick(event, data){
    this.props.handleDeleteEntity(data.entityId);
  }

  render() {
    const {entityId, radius, color, connectDragSource} = this.props;
    return (
      <span>
        <svg width="50" height="50" viewBox='0 0 50 50' style={getStyles(this.props)}>
            {connectDragSource(
              <g onClick={this.onClick} onContextMenu={(event)=>console.log("onContextMenu")}>
                <ContextMenuTrigger id={entityId + "EntityContextMenu"} renderTag='g' holdToDisplay={-1}>
                  <Entity radius={radius} color={color} />
                </ContextMenuTrigger>
              </g>
            )}
        </svg>
        <ContextMenu id={entityId + "EntityContextMenu"}>
          <MenuItem onClick={this.handleDeleteEntityClick} data={{entityId}}>Delete Entity</MenuItem>
        </ContextMenu>
      </span>
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
  color: PropTypes.string.isRequired,
  handleSelectEntity: PropTypes.func,
  onMoveEntity: PropTypes.func,
  handleDeleteEntity: PropTypes.func,
  connectDragSource: PropTypes.func.isRequired,
}

export default DragSource(ItemTypes.ENTITY, entitySource, collect)(DraggableEntity);
