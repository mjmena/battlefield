import React from 'react';
import {connect} from 'react-redux';
import {addEntity, selectEntity} from '../actions/EntityActions';

const Entity = ({entity, selected, onEntityClick}) => (
	<li style={selected ? {fontWeight:"bold"} : {}}>
		{JSON.stringify(entity)}
	</li>)

const EntityList = ({entities, selectedEntity, onEntityClick, onAddEntity}) => {
	const style = {
		fontWeight: "bold"
	}

	return (<ul>
      {entities.map((entity) => {
		return (<Entity key={entity.get("id")} entity={entity} selected={entity === selectedEntity} onEntityClick={onEntityClick}></Entity>)
      })}
    <button onClick={(event)=>onAddEntity(10,10)}>Add Entity</button>
	</ul>)
}

const mapStateToProps = (state) => {
	const entities = state.get("entities");

	return{
		entities: entities,
		selectedEntity: entities.get(state.get("selectedEntityId"))
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		onEntityClick: (entity) => {
			dispatch(selectEntity(entity))
		}
	}
}

export default connect(
	mapStateToProps,
	{ 
		onEntityClick : selectEntity,
		onAddEntity: addEntity
	}
)(EntityList);