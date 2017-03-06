/* - General creep hierarchy of deeds -
 *
 * Harvest
 * Build
 * Repair // danger close to death
 * Upgrade
 *
 *
 * - Phase structure -
 *
 * 1: Can't afford miner structure yet
 * 2: Got that miner
 *
 */


const roleGeneral = {
  run: function(creep, actions, room) {
    
    if(!creep.whichSource) { creep.whichSource = 0 }
    
    // consts for build items
    const containers = actions.creep.findContainersInRoom(creep);
    
    // Room Phase 1
    if (creep.room.memory.phase === 0) {
      
      // Harvest them resources
      if(!creep.memory.stockpiling) {
        actions.general.harvestClosestResource(creep);
      }

      // Unit has maxed carry
      if(!creep.memory.stockpiling && creep.carry.energy == creep.carryCapacity) {
        creep.memory.stockpiling = true;
        creep.say('stockpiling');
      }
      
      // Ran out of energy while filling structures
      if(creep.memory.stockpiling && creep.carry.energy == 0) {
        creep.memory.stockpiling = false;
        creep.say('🔄 harvest');
        
      }
      
      // Carry is max and we're ready to work
      actions.general.doWork(creep);
    }

    if (creep.room.memory.phase === 1 || creep.room.memory.phase === 2) {
      actions.creep.healLowStructures(creep);
      if(!creep.memory.stockpiling) {
        actions.creep.harvest(creep);
      }

      // Unit has maxed carry
      if(!creep.memory.stockpiling && creep.carry.energy == creep.carryCapacity) {
        creep.memory.stockpiling = true;
        creep.say('stockpiling');
      }
      
      // Ran out of energy while filling structures
      if(creep.memory.stockpiling && creep.carry.energy == 0) {
        creep.memory.stockpiling = false;
        creep.say('🔄 harvest');
        
      }
      
      // Carry is max and we're ready to work
      actions.general.doWork(creep);

    }
    
    if (creep.room.memory.phase === 3) {
      actions.creep.healLowStructures(creep);
      if(!creep.memory.stockpiling) {
        actions.creep.harvest(creep);
      }
      
      // Unit has maxed carry
      if(!creep.memory.stockpiling && creep.carry.energy == creep.carryCapacity) {
        creep.memory.stockpiling = true;
        creep.say('stockpiling');
      }
      
      // Ran out of energy while filling structures
      if(creep.memory.stockpiling && creep.carry.energy == 0) {
        creep.memory.stockpiling = false;
        creep.say('🔄 harvest');
        
      }
      
      // Carry is max and we're ready to work
      actions.general.doWork(creep);
      
    }
  }
}

module.exports = roleGeneral;
