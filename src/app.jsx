import io from 'socket.io-client';
import * as Immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import {Entity} from './Records';
import EntityList from './components/EntityList';
import Battlefield from './components/Battlefield';
const socket = io();

let entities = Immutable.Map();
let current_entity_id = -1;

let cell = 50;

function update(){
	ReactDOM.render(<App
		entities={entities.toList()}
		current_entity_id={current_entity_id}
		handleSelectClick={handleSelectClick}
		handleDragEnd={handleDragEnd}
		></App>, document.getElementById('root'));
}

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
	update();
});
const handleSelectClick = (entity_id, event) => {
	console.log("select by click")
	current_entity_id = entity_id;
	update();
}

const handleDragEnd = (entity, event) => {
	socket.emit('move_entity_exact', entity.move_exact({
			x: Math.ceil(event.target.x() / cell),
			y: Math.ceil(event.target.y() / cell)
		}));
}

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
	update();

});

class App extends React.Component {
	render(){
		const entity_list = this.props.entities.toList();
		return (
			<div>
				<div style={{float:'left', width:500}}>
						<button onClick={(event)=>socket.emit('create_character')}>Add Entity</button>
						<EntityList entities={entity_list} current_entity_id={this.props.current_entity_id} handleSelectClick={this.props.handleSelectClick}></EntityList>
				</div>
`			`				<div style={{float:'left'}}>
					<Battlefield
						entities={entity_list}
						current_entity_id={this.props.current_entity_id}
						columns={20}
						rows={15}
						cell={cell}
						handleSelectClick={this.props.handleSelectClick}
						handleDragEnd={this.props.handleDragEnd}
					></Battlefield>
				</div>


    	</div>
		)
	}
}
