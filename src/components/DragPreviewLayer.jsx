import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';
import Entity from './Entity';
import {ItemTypes} from '../Enums'

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
    pointerEvents: 'none',
    zIndex: 1,
    opacity:.5,
  };
}

class DragPreviewLayer extends Component {

  renderItem(type, item) {
    switch (type) {
      case ItemTypes.ENTITY:
        return (<Entity {...item} />);
      default:
        return null;
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <svg style={getItemStyles(this.props)}>
        {this.renderItem(itemType, item)}
      </svg>
    );
  }
}

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))(DragPreviewLayer);
