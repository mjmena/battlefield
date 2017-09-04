import React from 'react'
import { DragLayer } from 'react-dnd'

const defaultStyle = (item, currentOffset) => (
  {
    left: item.left + currentOffset.x,
    top: item.top + currentOffset.y,
    position: 'fixed'
  }
)

const DragPreview = React.createClass({
  render() {
    const {
      isDragging,
      currentOffset,
      item
    } = this.props
    return !isDragging || !currentOffset ?
      null
    :
      <div style={defaultStyle(item, currentOffset)}>Dragging</div>

  }
})

const collect = (monitor) => (
  {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }
)

export default DragLayer(collect)(DragPreview)
