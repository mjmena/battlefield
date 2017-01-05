export default class Battlefield {
	private entities: Location[];

	constructor(private canvas: HTMLCanvasElement, public grid: Grid){
		this.canvas.width = this.grid.width();
		this.canvas.height = this.grid.height();	
		this.entities = [];
	}

	addEntity(entity: Location){
		this.entities.push(entity);
	}

	draw(selected_entity: Location){
		var context = this.canvas.getContext('2d')
		context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.entities.forEach((entity: Location) => {
			context.beginPath();
			context.arc(entity.x * this.grid.cell_size - this.grid.cell_size /2, entity.y * this.grid.cell_size - this.grid.cell_size /2, this.grid.cell_size/2, 0, 2 * Math.PI, false);
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
}