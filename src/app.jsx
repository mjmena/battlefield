import io from 'socket.io-client';
import * as Immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import {Entity} from './Records';
import EntityList from './components/EntityList';

const socket = io();

let entities = Immutable.Map();
let current_entity_id = -1;
document.getElementById('create_character').addEventListener('click', (event) => {
	socket.emit('create_character')
});

socket.on('update_entities', function(updated_entities){
	entities = Immutable.fromJS(updated_entities, (key, value) => {
		if(/^[0-9]+$/.test(key)){
				return new Entity(value.toJS());
		}
		return value;
	});

	if(entities.size > 0 && current_entity_id < 0){
		current_entity_id = 0;
	}

	ReactDOM.render(<EntityList entities={entities.toList()} current_entity_id={current_entity_id}></EntityList>, document.getElementById('root'));
});

document.addEventListener("keydown", (event) => {
	if(current_entity_id >= 0){
		if(event.key === 'Tab'){
			event.preventDefault();
			if(entities.size > 1){
				current_entity_id++;
				if (current_entity_id >= entities.size){
					current_entity_id = 0;
				}
			}
		}else if(event.key === 'ArrowRight'){
				event.preventDefault();
				socket.emit('move_entity', entities.get(current_entity_id).get_transform_entity(1,0));
		}else if(event.key === 'ArrowLeft'){
				event.preventDefault();
				socket.emit('move_entity', entities.get(current_entity_id).get_transform_entity(-1,0));
		}else if(event.key === 'ArrowUp'){
				event.preventDefault();
				socket.emit('move_entity', entities.get(current_entity_id).get_transform_entity(0,-1));
		}else if(event.key === 'ArrowDown'){
				event.preventDefault();
				socket.emit('move_entity', entities.get(current_entity_id).get_transform_entity(0,1));
		}
	}
	ReactDOM.render(<EntityList entities={entities.toList()} current_entity_id={current_entity_id}></EntityList>, document.getElementById('root'));
});

document.addEventListener('onload', () =>{
	ReactDOM.render(<EntityList entities={entities.toList()}></EntityList>, document.getElementById('root'));
})
