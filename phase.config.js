let phaseConfig = {};

phaseConfig.automate = function(room, roomActions, roomSpawn) {

  // ROOM PHASE is calculated in roomActions
  if(room.memory.phase === 0) {
    
    const generalCreep = [MOVE,CARRY,WORK];
    const roomCreeps = roomActions.findRoomCreeps(room);
    const generalCreeps = _.filter(roomCreeps, (creep) => (creep.memory.role === 'general'));
    const upgraderCreeps = _.filter(roomCreeps, (creep) => (creep.memory.role === 'upgrader'));
    if (generalCreeps.length < 3) {
      const newGeneralCreep = Game.spawns[roomSpawn[0].name].createCreep(generalCreep, undefined, {role: 'general'});
      console.log(`Spawning general creep: ${newGeneralCreep}`);
    }
    if (upgraderCreeps.length < 1) {
      const newUpgraderCreep = Game.spawns[roomSpawn[0].name].createCreep(generalCreep, undefined, {role: 'upgrader'});
      console.log(`Spawning upgrader creep: ${newUpgraderCreep}`);
    }
  }

  else if(room.memory.phase === 1) {

    const generalCreep = [MOVE,CARRY,WORK];
    const minerCreep = [WORK,WORK,MOVE,MOVE]
    const roomCreeps = roomActions.findRoomCreeps(room);
    const generalCreeps = _.filter(roomCreeps, (creep) => (creep.memory.role === 'general'));
    const upgraderCreeps = _.filter(roomCreeps, (creep) => (creep.memory.role === 'upgrader'));
    const minerCreeps = _.filter(roomCreeps, (creep) => (creep.memory.role === 'miner'));
    if(!room.memory.containers) {
      containers = roomActions.findContainersInRoom(room);
      room.memory.containers = containers;
    }
    if (generalCreeps.length < 3) {
      const newGeneralCreep = Game.spawns[roomSpawn[0].name].createCreep(generalCreep, undefined, {role: 'general'});
      console.log(`Spawning general creep: ${newGeneralCreep}`);
    }
    if (upgraderCreeps.length < 1) {
      const newUpgraderCreep = Game.spawns[roomSpawn[0].name].createCreep(generalCreep, undefined, {role: 'upgrader'});
      console.log(`Spawning upgrader creep: ${newUpgraderCreep}`);
    }
    if (minerCreeps.length < 1) {
      const newMinerCreep = Game.spawns[roomSpawn[0].name].createCreep(minerCreep, undefined, {role: 'miner', container: room.memory.containers[0]});
      console.log(`Spawning miner creep: ${newMinerCreep}`);
    }
  }
  else if(room.memory.phase === 2) {

    const generalCreep = [MOVE,MOVE,MOVE,CARRY,CARRY,WORK,WORK,WORK];
    const minerCreep = [WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE]
    const roomCreeps = roomActions.findRoomCreeps(room);
    const generalCreeps = _.filter(roomCreeps, (creep) => (creep.memory.role === 'general'));
    const upgraderCreeps = _.filter(roomCreeps, (creep) => (creep.memory.role === 'upgrader'));
    const minerCreeps = _.filter(roomCreeps, (creep) => (creep.memory.role === 'miner'));
    if (generalCreeps.length < 3) {
      const newGeneralCreep = Game.spawns[roomSpawn[0].name].createCreep(generalCreep, undefined, {role: 'general'});
      console.log(`Spawning general creep: ${newGeneralCreep}`);
    }
    if (upgraderCreeps.length < 1) {
      const newUpgraderCreep = Game.spawns[roomSpawn[0].name].createCreep(generalCreep, undefined, {role: 'upgrader'});
      console.log(`Spawning upgrader creep: ${newUpgraderCreep}`);
    }
    if (minerCreeps.length < 1) {
      const newMinerCreep = Game.spawns[roomSpawn[0].name].createCreep(minerCreep, undefined, {role: 'miner'});
      console.log(`Spawning miner creep: ${newMinerCreep}`);
    }
  }

  else if(room.memory.phase === 3) {
    
    const generalCreep = [MOVE,MOVE,MOVE,CARRY,CARRY,WORK,WORK,WORK];
    const minerCreep = [WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE]
    const roomCreeps = roomActions.findRoomCreeps(room);
    const generalCreeps = _.filter(roomCreeps, (creep) => (creep.memory.role === 'general'));
    const upgraderCreeps = _.filter(roomCreeps, (creep) => (creep.memory.role === 'upgrader'));
    const minerCreeps = _.filter(roomCreeps, (creep) => (creep.memory.role === 'miner'));
    if (generalCreeps.length < 3) {
      room.memory.whichSource == 0 ? room.memory.whichSource = 1 : room.memory.whichSource = 0;
      const newGeneralCreep = Game.spawns[roomSpawn[0].name].createCreep(generalCreep, undefined, {role: 'general', whichSource: room.memory.whichSource});
      if(_.isString(newGeneralCreep)){
        console.log(`Spawning general creep: ${newGeneralCreep}`);
      } else {
        room.memory.whichSource == 0 ? room.memory.whichSource = 1 : room.memory.whichSource = 0;
      }
    }
    if (upgraderCreeps.length < 1) {
      const newUpgraderCreep = Game.spawns[roomSpawn[0].name].createCreep(generalCreep, undefined, {role: 'upgrader'});
      console.log(`Spawning upgrader creep: ${newUpgraderCreep}`);
    }
    if (minerCreeps.length < 2) {
      room.memory.mineIndex == 0 ? room.memory.mineIndex = 1 : room.memory.mineIndex = 0;
      const newMinerCreep = Game.spawns[roomSpawn[0].name].createCreep(minerCreep, undefined, {role: 'miner', mineIndex: room.memory.mineIndex});
      if(_.isString(newMinerCreep)) {
        console.log(`Spawning miner creep: ${newMinerCreep}`);
      } else {
        room.memory.mineIndex == 0 ? room.memory.mineIndex = 1 : room.memory.mineIndex = 0;
      }
    }
    
  }

}

module.exports = phaseConfig;
