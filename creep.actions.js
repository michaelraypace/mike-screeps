let actions = {};

actions.creep = {};
actions.creep.findContainersInRoom = function(creep) {
  const containers = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType == STRUCTURE_CONTAINER)
    }
  });
  return containers;
}

actions.creep.healLowStructures = function(creep) {

  var targets = creep.room.find(FIND_STRUCTURES, {
    filter: object => object.hits < (object.hitsMax/6)
  });

  targets.sort((a,b) => a.hits - b.hits);

  if(targets.length > 0) {
    if(Game.tick % 5 === 0) {creep.say('Repairing'); }
    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0]);    
    }
  }

}

actions.creep.mine = function(creep, mineIndex) {
  const containers = actions.creep.findContainersInRoom(creep)
  if(creep.pos.getRangeTo(containers[mineIndex]) == 0) { 
      var source = creep.pos.findClosestByPath(FIND_SOURCES); 
      creep.harvest(source); 
  } else { 
      creep.moveTo(containers[mineIndex]); 
  } 
}

actions.creep.harvest = function(creep) {
  const containers = actions.creep.findContainersInRoom(creep);
  const source = creep.memory.whichSource //creep.pos.findClosestByPath(containers);
  const energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 5);
  if (energy.length) {
        console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
        if(creep.pickup(energy[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(energy[0]);
        }
  }
  else if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { 
    creep.moveTo(source);
  } else {
  
    var sources = creep.room.find(FIND_SOURCES);
    var closestSource = creep.pos.findClosestByPath(sources);
    if(creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
       creep.moveTo(closestSource, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
  }

}

actions.general = {};
actions.general.doWork = function(creep) {
  
  const buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
  const closestBuildTarget = creep.pos.findClosestByPath(buildTargets);
  if(creep.memory.stockpiling) {

    // First priority is filling energy reserves
    // Set targets for energy fill
    const fillTargets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
      }
    });
    if(fillTargets.length > 0) {
          if(creep.transfer(fillTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(fillTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
          }
      }
    // secondary action if spawn, towers, and extensions are full
    // BUILD
    else if (buildTargets.length > 0) {
      if(Game.time % 3 === 0) { creep.say('Building') };
      // later can prioritize to more important structures rather than index
      if(creep.build(closestBuildTarget) == ERR_NOT_IN_RANGE) {
          creep.moveTo(closestBuildTarget, {visualizePathStyle: {stroke: '#ffffff'}});
      }
      
    }
    
    // If nothing else, upgrade
    else {
      creep.say('upgrading');
      creep.moveTo(creep.room.controller);
      creep.upgradeController(creep.room.controller);
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
      }
    }
  }
}

actions.general.harvestClosestResource = function(creep) {

  const sources = creep.room.find(FIND_SOURCES);
  const closestSource = creep.pos.findClosestByPath(sources);
  if (creep.harvest(closestSource) === ERR_NOT_IN_RANGE) {
    creep.moveTo(closestSource, {visualizePathStyle: {stroke: '#ffaa00'}});
  }

}

actions.moo = function() { console.log('moo'); }
actions.sayName = function(creep) { console.log(creep.name) };

module.exports = actions;
