import Location from './Location';
import Character from './Character';
import Grid from './Grid';
import Battlefield from './Battlefield';
import * as io from 'socket.io-client';
import * as Immutable from 'immutable';

var socket = io();

var grid = new Grid(20, 15, 50);

var canvas =  <HTMLCanvasElement> document.getElementById("battlefield");

var battlefield = new Battlefield(canvas, grid);

var selected_entity : Character = null;
var controlled_entities = Immutable.List<number>();

document.getElementById('create_chracter').addEventListener('click', (event) => {
	socket.emit('create_character');
});

socket.on('create_battlefield', function(characters){
	characters.forEach((character) => {
		var new_character = new Character(character.id, new Location(character.location.x,character.location.y));	
		battlefield.addEntity(new_character);
	});

	battlefield.draw(selected_entity);
});

socket.on('create_controlled_character', function(character){
	var new_entity = new Character(character.id, new Location(character.location.x,character.location.y));
	controlled_entities = controlled_entities.push(character.id);
	selected_entity = new_entity;
	battlefield.addEntity(new_entity);
	battlefield.draw(selected_entity);	
 });

socket.on('create_character', function(character){
	var new_entity = new Character(character.id, new Location(character.location.x,character.location.y));
	controlled_entities = controlled_entities.push(character.id);
	selected_entity = new_entity;
	battlefield.addEntity(new_entity);
	battlefield.draw(selected_entity);	
 });

socket.on('move_character', function(character){
	battlefield.updateCharacter(character);
	if(selected_entity && selected_entity.id === character.id){
		selected_entity = character;
	}
	battlefield.draw(selected_entity);
});

document.addEventListener("keydown", (event) => {
	var updated = true; 

	if(event.key === 'Tab'){
		event.preventDefault();
		if(controlled_entities.size > 1){
			var index = controlled_entities.findIndex((character_id) => {
				return character_id === selected_entity.id;
			}) + 1;

			if (index >= controlled_entities.size){
				index = 0;
			}
			
			selected_entity = battlefield.getCharacter(controlled_entities.get(index));
		}
	}else if(selected_entity){
		var moved = false; 
		if(event.key === 'ArrowRight'){
			event.preventDefault();
			selected_entity.location.x += 1;
			if(selected_entity.location.x > battlefield.grid.columns){
				selected_entity.location.x = battlefield.grid.columns;
			}
			moved = true;
			
		}else if(event.key === 'ArrowLeft'){
			event.preventDefault();
			selected_entity.location.x -= 1;
			if(selected_entity.location.x < 1){
				selected_entity.location.x = 1;
			}
			moved = true; 
		}else if(event.key === 'ArrowUp'){	
			event.preventDefault();
			selected_entity.location.y -= 1;
			if(selected_entity.location.y < 1){
				selected_entity.location.y = 1;
			}
			moved = true; 
		}else if(event.key === 'ArrowDown'){
			event.preventDefault();
			selected_entity.location.y += 1;
			if(selected_entity.location.y > battlefield.grid.rows){
				selected_entity.location.y = battlefield.grid.rows;
			}
			moved = true; 
		}else{
			updated = false;
		}

		if(moved){
			battlefield.updateCharacter(selected_entity);
			socket.emit('move_character', selected_entity);
		}
	}else{ 
		updated = false;
	}

	if(updated){
		battlefield.draw(selected_entity);
	}
}) 

document.addEventListener('onload', () =>{
	battlefield.draw(selected_entity);
})