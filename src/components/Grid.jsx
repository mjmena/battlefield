
import React from 'react';
import Immutable from 'immutable';
import {Line, Group} from 'react-konva';

export default class Grid extends React.Component {
  render() {
    const columns = Immutable.Range(0, this.props.columns).map((column) => {
      const x = column * this.props.cell;

      const line = {
        key:column,
        points:[x, 0, x, this.props.rows * this.props.cell],
        stroke: 'grey',
        strokeWidth: 1
      }
      return (<Line {...line}></Line>)
    });

    const rows = Immutable.Range(0, this.props.rows).map((row) => {
      const y = row * this.props.cell;

      const line = {
        key:row,
        points:[0, y, this.props.columns * this.props.cell, y],
        stroke: 'grey',
        strokeWidth: 1
      }
      return (<Line {...line}></Line>)
    });

    return(
      <Group>
        {columns}
        {rows}
      </Group>
    );
  }
}
