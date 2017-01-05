export default class Grid{
	constructor(public columns: number, public rows: number, public cell_size: number){}
	
	width(){
		return this.columns * this.cell_size;
	}

	height(){
		return this.rows * this.cell_size;
	}

	draw(context: CanvasRenderingContext2D){
		
		
		for (var x = 0; x <= this.columns * this.cell_size; x += this.cell_size) {
		    context.moveTo(x, 0);
		    context.lineTo(x, this.rows * this.cell_size);
		}


		for (var y = 0; y <= this.rows * this.cell_size; y += this.cell_size) {
		    context.moveTo(0, y);
		    context.lineTo(this.columns*this.cell_size, y);
		}

		context.strokeStyle = "grey";
		context.stroke();
	}
}