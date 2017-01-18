var Immutable = require('immutable');

var TransformRecord = Immutable.Record({
  x: 0,
  y: 0
});

var EntityRecord = Immutable.Record({
  id: undefined,
  transform: new TransformRecord()
});

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
  Entity: Entity
}
