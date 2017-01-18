import React from 'react';
import Entity from './Entity';
import Immutable from 'immutable';

export default class EntityList extends React.Component {
	render(){
		return (<div>
      {this.props.entities.map((entity) => {
        return (<Entity key={entity.id} entity={entity} isSelected={this.props.current_entity_id === entity.id} ></Entity>)
      })}
    </div>)
	}
}
