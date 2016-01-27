//this is an object of special importance, that's why it isn't in variables.js file

var minoData = [
  {
    // z-mino
    color: 1, //red
    spawnpos: [1,4],
    rotation0: [[-1,-1],[0,0],[0,-1],[1,0]],
    rotation1: [[0,1],[0,0],[1,0],[1,-1]],
    rotation2: [[1,1],[0,0],[0,1],[-1,0]],
    rotation3: [[0,-1],[0,0],[-1,0],[-1,1]],
  },
  {
    // s-mino
    color: 2, //green
    spawnpos: [1,4],
    rotation0: [[1,-1],[0,0],[0,-1],[-1,0]],
    rotation1: [[0,-1],[0,0],[1,0],[1,1]],
    rotation2: [[-1,1],[0,0],[0,1],[1,0]],
    rotation3: [[0,1],[0,0],[-1,0],[-1,-1]],
  },
  {//TODO
    // j-mino
    color: 3, //blue
    spawnpos: [1,4],
    rotation0: [[0,0],[0,1],[1,0],[1,1]],
    rotation1: [[0,0],[0,1],[1,0],[1,1]],
    rotation2: [[0,0],[0,1],[1,0],[1,1]],
    rotation3: [[0,0],[0,1],[1,0],[1,1]],
  },
  {//TODO
    // l-mino
    color: 4, //orange
    spawnpos: [1,4],
    rotation0: [[0,0],[0,1],[1,0],[1,1]],
    rotation1: [[0,0],[0,1],[1,0],[1,1]],
    rotation2: [[0,0],[0,1],[1,0],[1,1]],
    rotation3: [[0,0],[0,1],[1,0],[1,1]],
  },
  {//TODO
    // i-mino
    color: 5, //cyan
    spawnpos: [0,4],
    rotation0: [[0,0],[0,0],[0,0],[0,0]],
    rotation1: [[0,0],[0,1],[1,0],[1,1]],
    rotation2: [[0,0],[0,0],[0,0],[0,0]],
    rotation3: [[0,0],[0,1],[1,0],[1,1]],
    //this is the reason why I didn't use mathematical rotation
  },
  {//TODO
    // t-mino
    color: 6, //purple
    spawnpos: [1,4],
    rotation0: [[0,0],[0,1],[1,0],[1,1]],
    rotation1: [[0,0],[0,1],[1,0],[1,1]],
    rotation2: [[0,0],[0,1],[1,0],[1,1]],
    rotation3: [[0,0],[0,1],[1,0],[1,1]],
  },
  {
    // o-mino
    color: 7, //yellow
    spawnpos: [1,4],
    rotation0: [[-1,-1],[0,-1],[-1,0],[0,0]],
    rotation1: [[-1,-1],[0,-1],[-1,0],[0,0]],
    rotation2: [[-1,-1],[0,-1],[-1,0],[0,0]],
    rotation3: [[-1,-1],[0,-1],[-1,0],[0,0]],
    //yes, it rotates without rotating
  },

]
