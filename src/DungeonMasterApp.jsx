import io from 'socket.io-client';
import * as Immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import {Entity, Measurement} from './Records';
import {Tool} from './Enums';
import EntityList from './components/EntityList';
import App from './components/App';

const socket = io();

let measuring = false;
let entities = Immutable.Map();
let current_entity_id = -1;
let current = {
	tool: Tool.SELECT,
	measurement: new Measurement(0,0)
}
const columns = 20; 
const rows = 15;
const cell = 50;

function update(){
	ReactDOM.render(<div>
		<App
			entities={entities.toList()}
			current_entity_id={current_entity_id}
			current={current}
			columns={columns}
			rows={rows}
			cell={cell}
			handleSelectClick={handleSelectClick}
			handleDragEnd={handleDragEnd}
			rulerEvents = {rulerEvents}>
		</App>
		<button onClick={(event)=>socket.emit('create_character')}>Add Entity</button>
	</div>
		, document.getElementById('root'));
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

const handleSelectClick = (entity_id) => {
	if(current.tool === Tool.SELECT){
		current_entity_id = entity_id;
		update();
	}
};

const handleDragEnd = (entity, event) => {
	if(current.tool === Tool.SELECT){
		socket.emit('move_entity_exact', entity.move_exact({
			x: Math.ceil(event.target.x() / cell),
			y: Math.ceil(event.target.y() / cell)
		}));
	}
};

const rulerEvents = {
	start: (event) => {
		if(current.tool === Tool.RULER){
			measuring = true; 
			const x = Math.ceil(event.target.x()/cell) + 1;
			const y = Math.ceil(event.target.y()/cell) + 1;
			current.measurement = new Measurement(x,y,x,y);
			update();
		}
	},
	move: (event) => {
		if(current.tool === Tool.RULER && measuring){
			const newMeasurement = current.measurement.to(Math.ceil(event.target.x()/cell) + 1, Math.ceil((event.target.y())/cell) + 1);
			if(!Immutable.is(current.measurement, newMeasurement)){
				current.measurement = newMeasurement;
				update();
			}			
		}
	},
	stop: (event) => {
		measuring = false; 
		current.measurement = new Measurement(0,0,0,0);
		update();
	}
}


document.addEventListener('keydown', (event) => {
	if(current_entity_id >= 0){
		const selected_entity = entities.get(current_entity_id)
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
			if(selected_entity.transform.x < columns){
				socket.emit('move_entity', entities.get(current_entity_id).get_transform_entity(1,0));	
			}
		}else if(event.key === 'ArrowLeft'){
			event.preventDefault();
			if(selected_entity.transform.x > 1){
				socket.emit('move_entity', entities.get(current_entity_id).get_transform_entity(-1,0));
			}
		}else if(event.key === 'ArrowUp'){
			event.preventDefault();
			if(selected_entity.transform.y > 1){
				socket.emit('move_entity', entities.get(current_entity_id).get_transform_entity(0,-1));	
			}
		}else if(event.key === 'ArrowDown'){
			event.preventDefault();
			if(selected_entity.transform.y < rows){
				socket.emit('move_entity', entities.get(current_entity_id).get_transform_entity(0,1));
			}
		}
	}
	if(event.key === '1'){
		current.tool = Tool.SELECT;
	}
	if(event.key === '2'){
		current.tool = Tool.RULER;
	}

	update();

});