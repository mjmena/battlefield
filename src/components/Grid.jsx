import React from 'react';
import Immutable from 'immutable';
import {Rect, Group} from 'react-konva';

export default ({columns, rows, cellSize}) => {
  const cells = Immutable.Range(0, columns).map((column) => {
      return Immutable.Range(0, rows).map((row) => {
          const square = {
            key: "(" + (column + 1) + "," + (row + 1) + ")",
            x: column * cellSize,
            y: row * cellSize,
            width: cellSize,
            height: cellSize,
            stroke: 'grey',
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