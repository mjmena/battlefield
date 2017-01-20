var Immutable = require('immutable');

var TransformRecord = Immutable.Record({
  x: 0,
  y: 0
});

var EntityRecord = Immutable.Record({
  id: undefined,
  transform: new TransformRecord()
});

var MeasurementRecord = Immutable.Record({
  start: new TransformRecord(),
  end: new TransformRecord()
})

class Measurement extends MeasurementRecord{
  constructor(startx,starty, endx, endy){
    super({start: new TransformRecord({x:startx,y:starty}), end: new TransformRecord({x:endx,y:endy})});
  }

  to(x, y){
    return this.set('end', new TransformRecord({x:x, y:y}));
  }

  asPointList(){
    return Immutable.List([this.start.x, this.start.y, this.end.x, this.end.y]);
  }

  getEuclideanDistance(){
    const delta = {
      x: Math.abs(this.start.x - this.end.x),
      y: Math.abs(this.start.y - this.end.y)
    }
    return Math.sqrt(delta.x * delta.x + delta.y * delta.y);
  }


  getOneTwoDistance(){
    const delta = {
      x: Math.abs(this.start.x - this.end.x),
      y: Math.abs(this.start.y-this.end.y)
    }
    return Math.floor(Math.max(delta.x,delta.y) + Math.floor(Math.min(delta.x, delta.y)) / 2);
  } 
}

class Entity extends EntityRecord{
	constructor(entity){
		super({id:entity.id, transform: new TransformRecord(entity.transform)})
	}

	move(delta_transform){
    var entity = this.set('transform', new TransformRecord({x:delta_transform.x + this.transform.x, y:delta_transform.y + this.transform.y}));
		return entity;
	}

  move_exact(transform){
    return this.set('transform', new TransformRecord(transform));
  }

  get_transform_entity(delta_x, delta_y){
    return this.set('transform', new TransformRecord({x:delta_x, y:delta_y}))
  }
}

module.exports = {
  TransformRecord : TransformRecord,
  EntityRecord : EntityRecord,
  Entity: Entity,
  Measurement: Measurement
}
