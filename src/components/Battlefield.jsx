import React from 'react';
import Immutable from 'immutable';
import {Stage, Layer, Circle, Line, Text} from 'react-konva';
import Grid from './Grid';
import DistanceGrid from './DistanceGrid';
import {Tool} from './../Enums';

export default class Battlefield extends React.Component {
  render() {
    const cell = this.props.cell;
    const entities = this.props.entities.map((entity) => {
      const circle = {
        key: entity.id,
        x: entity.transform.x * cell - cell/2,
        y: entity.transform.y * cell - cell/2,
        radius: this.props.cell/2 - 2,
        fill: 'orange',
        stroke: this.props.current_entity_id === entity.id ? 'green': '',
        strokeWidth: 4,
        draggable: this.props.current.tool === Tool.SELECT,
        dragBoundFunc: (pos) => {
          let x = pos.x;
          let y = pos.y;

          const bounds = {
            x: this.props.columns * cell - cell/2,
            y: this.props.rows * cell - cell/2
          }

          if(x < cell/2){
            x = cell/2;
          }else if(x > bounds.x){
            x = bounds.x;
          }

          if(y < cell/2){
            y = cell/2;
          }else if(y > bounds.y){
            y = bounds.y;
          }

          return {
              x: x,
              y: y
          }
        }
      }

      return (<Circle {...circle} 
        onClick={this.props.handleSelectClick.bind(this, entity.id)} 
        onDragStart={this.props.handleSelectClick.bind(this, entity.id)} 
        onDragEnd={this.props.handleDragEnd.bind(this, entity)} ></Circle>)
    });

    const grid = (<Grid columns={this.props.columns} rows={this.props.rows} cell={this.props.cell} rulerEvents={this.props.rulerEvents}></Grid>)
    const measurement = {
      points: this.props.current.measurement.asPointList().map((point) => point * cell - cell/2).toArray(),
      stroke: 'red',
      strokeWidth: 5
    }

    const text = {
      x: this.props.current.measurement.end.x * cell - cell/2,
      y: this.props.current.measurement.end.y * cell - cell/2,
      text: (this.props.current.measurement.getOneTwoDistance() * 5) + "ft",
      fontSize:cell/4
    } 
   
    if(this.props.current.tool === Tool.SELECT){
      return(
        <Stage width={this.props.columns * this.props.cell} height={this.props.rows * this.props.cell}>
          <Layer>
          {grid}
          {entities}
          </Layer>
        </Stage>
      );
    }else{
      return(
        <Stage width={this.props.columns * this.props.cell} height={this.props.rows * this.props.cell}>
          <Layer>

            {entities}
            <Line {...measurement}></Line>
            <Text {...text}></Text>
            {grid}
          </Layer>
        </Stage>
      );
    }
  }
}
