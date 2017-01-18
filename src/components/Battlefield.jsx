
import React from 'react';
import Immutable from 'immutable';
import {Stage, Layer, Circle} from 'react-konva';
import Grid from './Grid';



export default class Battlefield extends React.Component {
  render() {
    const entities = this.props.entities.map((entity) => {
      const cell = this.props.cell;
      const circle = {
        key: entity.id,
        x: entity.transform.x * this.props.cell - this.props.cell/2,
        y: entity.transform.y * this.props.cell - this.props.cell/2,
        radius: this.props.cell/2 - 2,
        fill: 'orange',
        stroke: this.props.current_entity_id === entity.id ? 'green': '',
        strokeWidth: 4,
        draggable: true,
        dragBoundFunc: function(pos) {
           return {
               x: Math.ceil(pos.x / cell) * cell - cell/2,
               y: Math.ceil(pos.y / cell) * cell - cell/2
           };
         }
      }
      return (<Circle {...circle} onClick={this.props.handleSelectClick.bind(this, entity.id)} onDragEnd={this.props.handleDragEnd.bind(this, entity)}></Circle>)
    })

    return(
        <Stage width={this.props.columns * this.props.cell} height={this.props.rows * this.props.cell}>
            <Layer>
              {entities}
              <Grid columns={this.props.columns} rows={this.props.rows} cell={this.props.cell}></Grid>
            </Layer>
        </Stage>
    );
  }
}
