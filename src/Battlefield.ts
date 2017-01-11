import Character from './Character';
import Grid from './Grid';
import * as Immutable from 'immutable';

export default class Battlefield {
	private entities: Immutable.List<Character>;

	constructor(private canvas: HTMLCanvasElement, public grid: Grid){
		this.canvas.width = this.grid.width();
		this.canvas.height = this.grid.height();	
		this.entities = Immutable.List<Character>();
	}

	addEntity(entity: Character){
		this.entities = this.entities.push(entity);
	}

	draw(selected_entity: Character){
		console.log(this.entities.toJS())
		document.getElementById('characters').innerText = this.entities.toJS();
		var context = this.canvas.getContext('2d')
		context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		console.log(this.entities.size);
		this.entities.forEach((entity: Character) => {
			context.beginPath();
			context.arc(entity.location.x * this.grid.cell_size - this.grid.cell_size /2, entity.location.y * this.grid.cell_size - this.grid.cell_size /2, this.grid.cell_size/2, 0, 2 * Math.PI, false);
	   		context.closePath();

	   		if(entity === selected_entity){
	   			context.fillStyle = 'green';	
			}else{
		   		context.fillStyle = 'red';
		   	}
		
		    context.fill();
		
		})

		this.grid.draw(context);
	}

	updateCharacter(updated_character: Character){
		var index = this.entities.findIndex((character) => {
			return updated_character.id === character.id;
		});

		this.entities = this.entities.set(index, updated_character);
	}

	getCharacter(id: number){ 
		return this.entities.find((entity) => {
			return entity.id == id;
		});;
	}
}