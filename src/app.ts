import Location from './Location';
import Grid from './Grid';

var grid = new Grid(20, 15, 50);

var canvas =  <HTMLCanvasElement> document.getElementById("battlefield");

class Battlefield {
	private entities: Location[];

	constructor(private canvas: HTMLCanvasElement, public grid: Grid){
		canvas.width = grid.width();
		canvas.height = grid.height();	
		this.entities = [];
	}

	addEntity(entity: Location){
		this.entities.push(entity);
	}

	draw(){
		var context = canvas.getContext('2d')
		context.clearRect(0, 0, canvas.width, canvas.height);

		this.entities.forEach((entity: Location) => {
			context.beginPath();
			context.arc(entity.x * grid.cell_size - grid.cell_size /2, entity.y * grid.cell_size - grid.cell_size /2, grid.cell_size/2, 0, 2 * Math.PI, false);
	   		context.closePath();

	   		if(entity === selected_entity){
	   			context.fillStyle = 'green';	
			}else{
		   		context.fillStyle = 'red';
		   	}
		
		    context.fill();
		
		})

		grid.draw(context);
	}
}

var battlefield = new Battlefield(canvas, grid);

var ranger = new Location(3,3);
var pet = new Location(3,4);

var selected_entity = ranger;

document.addEventListener("keydown", (event) => {
	var updated = true; 

	if(event.key === '1'){
		selected_entity = ranger;
	}else if(event.key === '2'){
		selected_entity = pet;
	}else if(event.key === 'ArrowRight'){
		event.preventDefault();
		selected_entity.x += 1;
		if(selected_entity.x > battlefield.grid.columns){
			selected_entity.x = battlefield.grid.columns;
		}
	}else if(event.key === 'ArrowLeft'){
		event.preventDefault();
		selected_entity.x -= 1;
		if(selected_entity.x < 1){
			selected_entity.x = 1;
		}
	}else if(event.key === 'ArrowUp'){
		event.preventDefault();
		selected_entity.y -= 1;
		if(selected_entity.y < 1){
			selected_entity.y = 1;
		}
	}else if(event.key === 'ArrowDown'){
		event.preventDefault();
		selected_entity.y += 1;
		if(selected_entity.y > battlefield.grid.rows){
			selected_entity.y = battlefield.grid.rows;
		}
	}else{ 
		updated = false;
	}

	if(updated){
		battlefield.draw();
	}
})

battlefield.addEntity(ranger);
battlefield.addEntity(pet);

battlefield.draw();