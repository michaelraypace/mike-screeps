// Imports
const roleGeneral = require('role.general');
const roleUpgrader = require('role.upgrader');
const roleMiner = require('role.miner');
const actions = require('creep.actions');
const roomActions = require('room.actions');
const phaseConfig = require('phase.config');

module.exports.loop = function () {

  // Creep Body Configurations
  const generalCreep = [MOVE,CARRY,WORK];
  

  // Handle non-existant creep memory
  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }
  // changed word from filter to map
  _.map(Game.rooms, (room) => {
    const roomSpawn = room.find(FIND_MY_SPAWNS);
    //console.log(JSON.stringify(roomSpawns));
    if(roomSpawn.length > 0) {


      // find room phase
      const roomPhase = roomActions.calcPhase(room);
      
      // set room phase in memory if not correct
      if(room.memory.phase != roomPhase) {
        room.memory.phase = roomPhase;
      }
      
      // this method handles config such as number of creeps to spawn
      // uses roomActions for finding creeps in room
      // roomSpawn is the 0-indexed spawn in the room
      phaseConfig.automate(room, roomActions, roomSpawn);
    }
  })

  for(const name in Game.creeps) {
    const creep = Game.creeps[name];
    if(creep.memory.role == 'general') {
      roleGeneral.run(creep, actions);
    }
    if(creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep, actions);
    }
    if(creep.memory.role == 'miner') {
      roleMiner.run(creep, actions);
    }
  }
}
