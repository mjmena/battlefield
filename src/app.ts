import Location from './Location';
import Character from './Character';
import Grid from './Grid';
import Battlefield from './Battlefield';
import * as io from 'socket.io-client';

var socket = io();

var grid = new Grid(20, 15, 50);

var canvas =  <HTMLCanvasElement> document.getElementById("battlefield");

var battlefield = new Battlefield(canvas, grid);

var selected_entity : Character = null;
var controlled_entities : Character[] = [];

document.getElementById('create_chracter').addEventListener('click', (event) => {
	socket.emit('create_character');
});

socket.on('create_character', function(character){
	console.log(character);
	var new_entity = new Character(character.id, new Location(character.x,character.y));
	controlled_entities.push(new_entity);
	selected_entity = new_entity;
	battlefield.addEntity(new_entity);
	battlefield.draw(selected_entity);
 });

socket.on('move_character', function(character){
	battlefield.entities[character.id] = character;
	if(selected_entity.id === character.id){
		selected_entity = character;
	}
	controlled_entities[character.id] = character;
	battlefield.draw(selected_entity);
});

document.addEventListener("keydown", (event) => {
	var updated = true; 

	if(event.key === 'Tab'){
		event.preventDefault();
		if(controlled_entities && controlled_entities.length > 1){
			var i = controlled_entities.indexOf(selected_entity) + 1;
			if (i >= controlled_entities.length){
				i = 0;
			}
			selected_entity = controlled_entities[i];
		}
	}else if(event.key === 'ArrowRight'){
		event.preventDefault();
		selected_entity.location.x += 1;
		if(selected_entity.location.x > battlefield.grid.columns){
			selected_entity.location.x = battlefield.grid.columns;
		}
		socket.emit('move_character', selected_entity);
	}else if(event.key === 'ArrowLeft'){
		event.preventDefault();
		selected_entity.location.x -= 1;
		if(selected_entity.location.x < 1){
			selected_entity.location.x = 1;
		}
		socket.emit('move_character', selected_entity);
	}else if(event.key === 'ArrowUp'){	
		event.preventDefault();
		selected_entity.location.y -= 1;
		if(selected_entity.location.y < 1){
			selected_entity.location.y = 1;
		}
		socket.emit('move_character', selected_entity);
	}else if(event.key === 'ArrowDown'){
		event.preventDefault();
		selected_entity.location.y += 1;
		if(selected_entity.location.y > battlefield.grid.rows){
			selected_entity.location.y = battlefield.grid.rows;
		}
		socket.emit('move_character', selected_entity);
	}else{ 
		updated = false;
	}

	if(updated){
		battlefield.draw(selected_entity);
	}
}) 

battlefield.draw(selected_entity);