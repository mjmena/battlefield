var Immutable = require('immutable');

var TransformRecord = Immutable.Record({
  x: 0,
  y: 0,
  direction: 0
});

var EntityRecord = Immutable.Record({
  id: undefined,
  position: new TransformRecord()
})

class Entity extends EntityRecord{
	constructor(entity){
		super({id:entity.id, position: new TransformRecord(entity.position)})
	}

	move(delta_position){
    var entity = this.set('position', new TransformRecord({x:delta_position.x + this.position.x, y:delta_position.y + this.position.y}));
    console.log(entity.toJS())
		return entity;
	}

  get_transform_entity(delta_x, delta_y){
    return this.set('position', new TransformRecord({x:delta_x, y:delta_y}))
  }
}

module.exports = {
  TransformRecord : TransformRecord,
  EntityRecord : EntityRecord,
  Entity: Entity
}
