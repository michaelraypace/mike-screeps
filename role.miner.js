const roleMiner = {
  run: function(creep, creepActions) {
    if(!creep.room.memory.mineIndex) {
      creep.room.memory.mineIndex = 0;
    }
    if(!creep.mineIndex) { creep.mineIndex = 0 }
    creepActions.creep.mine(creep, creep.mineIndex)
    
  }
}

module.exports = roleMiner;
