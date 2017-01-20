
import React from 'react';
import Immutable from 'immutable';
import {Rect, Group} from 'react-konva';

export default class Grid extends React.Component {
  render() {
    const columns = Immutable.Range(0, this.props.columns);
    const rows = Immutable.Range(0, this.props.rows);
    const cell = this.props.cell;

    const cells = columns.map((column) => {
      return rows.map((row) => {
          const square = {
            key: "(" + (column + 1) + "," + (row + 1) + ")",
            x: column * cell,
            y: row * cell,
            width: cell,
            height: cell,
            stroke: 'grey',
            onMouseDown: this.props.rulerEvents.start,
            onMouseMove: this.props.rulerEvents.move,
            onMouseUp: this.props.rulerEvents.stop,
          }

          return (<Rect {...square}></Rect>)
      });
    }).flatten();

    return(
      <Group>
        {cells}
      </Group>
    );
  }
}
