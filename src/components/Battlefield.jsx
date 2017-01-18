
import React from 'react';
import Immutable from 'immutable';
import {Line, Circle, Group, Util} from 'react-konva';
import Grid from './Grid';

export default class Battlefield extends React.Component {
  render() {
    const entities = this.props.entities.map((entity) => {
      const circle = {
        key: entity.id,
        x: entity.transform.x * this.props.cell - this.props.cell/2,
        y: entity.transform.y * this.props.cell - this.props.cell/2,
        radius: this.props.cell/2 - 2,
        fill: 'red',
        stroke: this.props.current_entity_id === entity.id ? 'green': '',
        strokeWidth: 4
      }
      return (<Circle {...circle} onClick={this.props.handleSelectClick.bind(this, entity.id)}></Circle>)
    })

    return(
      <Group>
        {entities}
        <Grid columns={this.props.columns} rows={this.props.rows} cell={this.props.cell}></Grid>
      </Group>
    );
  }
}
