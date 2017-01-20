import React from 'react';
import Immutable from 'immutable';
import {Text, Group} from 'react-konva';
import {Measurement} from './../Records';

export default class DistanceGrid extends React.Component {
  render() {
    const columns = Immutable.Range(0, this.props.columns);
    const rows = Immutable.Range(0, this.props.rows);
    const cell = this.props.cell;
    const entity = this.props.entity;
    const measurement = new Measurement(entity.transform.x, entity.transform.y, entity.transform.x, entity.transform.y) 
    console.log("Made it from the bottom")
    const cells = columns.map((column) => {
      return rows.map((row) => {

          const text = {
            x: column * cell - cell,
            y: row * cell - cell,
            text:  measurement.to(column, row).getOneTwoDistance() * 5 + " ft.",
            fontSize:cell/4

          }
          return (<Text {...text}></Text>)
      });
    }).flatten();

    console.log("here")
    return(
      <Group>
        {cells}
      </Group>
    );
  }
}
