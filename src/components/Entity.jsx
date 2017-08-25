import React from 'react';

const Entity = ({entityId, playerId, x, y, radius, selected, onSelectEntity, onMoveEntity}) => {
	const style = {
		position: 'absolute',
		top: y+1,
		left: x+1,
		width: radius * 2 - 1,
		height: radius * 2 - 1,
		borderRadius: '50%',
		backgroundColor: selected ? selected : 'black'
	}

	const onDragEnd = (event) =>{
		const x = Math.ceil(event.clientX / (radius * 2));
        const y = Math.ceil(event.clientY / (radius * 2)); 
        onMoveEntity(entityId, x, y) 
	}

	const selectEntity = () => onSelectEntity(playerId, entityId);

	return (
		<div style={style} onClick={selectEntity} onDragEnd={onDragEnd} draggable='true'></div>
	)
}

export default Entity;