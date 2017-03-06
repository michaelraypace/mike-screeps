const roleUpgrader = {
  run: function(creep, actions) {
    
    if(creep.memory.upgrading && creep.carry.energy == 0) {
        creep.memory.upgrading = false;
        creep.say(' harvest');
      }
    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say(' upgrade');
    }
    
    if(creep.memory.upgrading) {
      creep.moveTo(creep.room.controller);
      creep.upgradeController(creep.room.controller);
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
      }
    }
    else {
      /*
      var containers = creep.room.find(FIND_STRUCTURES, { 
        filter: (structure) => { 
          return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0); 
        }
      });
      var source = creep.pos.findClosestByPath(containers);
      if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { 
        creep.moveTo(source);
      }
      */
      actions.creep.harvest(creep);
    }
  }
}

module.exports = roleUpgrader;
