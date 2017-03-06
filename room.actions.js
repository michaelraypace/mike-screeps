let roomActions = {};

roomActions.calcPhase = function(room) {
  const roomContainers = room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType == STRUCTURE_CONTAINER);
    }
  });
  const roomExtensions = room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType == STRUCTURE_EXTENSION);
    }
  })

  if (roomContainers.length === 2 && roomExtensions.length === 5 ) { return 3 }
  else if (roomContainers.length === 1 && roomExtensions.length === 5 ) { return 2 }
  else if (roomContainers.length === 1) { return 1 }
  else if (roomContainers.length === 0) { return 0 }
}

roomActions.findContainersInRoom = function(room) {
  containers = room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType == STRUCTURE_CONTAINER)
    }
  });
  return containers;

}

roomActions.findRoomCreeps = function(room) {
  return _.map(room.find(FIND_MY_CREEPS));

}

module.exports = roomActions;
