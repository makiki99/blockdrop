var das = 14,
  dasFrameLeft = 0,
  dasFrameRight = 0,
  gravity = 4, // 256 gravity = 1 tile/frame (1G)
  softDropGravity = 128,
  miniTilesDown = 0,
  lockframe = 0,
  lockdelay = 30,
  areFrame = 0,
  deadFrame = 0,
  cwIsPresed = false,
  ccwIsPressed = false

var normal = {
  speedCurve : [
    [1,4], // [level,gravity]
    [25,6],
    [50,8],
    [75,12],
    [100,16],
    [125,24],
    [150,32],
    [175,48],
    [200,64],
    [225,96],
    [250,128],
    [275,192],
    [300,256],
    [325,384],
    [350,512],
    [375,768],
    [400,1024],
    [450,1280],
    [500,5632]
  ],
  scoreGain: [
    [1,1,1.32,-0.0165],
    [100,1.3,1.35,-0.0169],
    [200,1.6,1.38,-0.0188],
    [300,1.9,1.41,-0.0173],
    [400,2.2,1.44,-0.0176],
    [500,2.5,1.56,-0.0180],
    [600,2.5,1.56,-0.0208],
    [700,2.5,1.59,-0.0208],
    [800,2.5,1.59,-0.0212],
    [900,3,1.8,-0.0286]
  ]
}

function inputClassic() {

  var axisX = 0,
    axisY = 0

  //left-right move

  if (deadFrame > 0) {
    if (deadFrame > 60) {
      if (keys[90] || keys[88]) {
        gamestate = 0
      }
    }
    deadFrame++
    return
  }

  var scoreSegment = -1
  while (game.level >= normal.scoreGain[scoreSegment+1][0]) {
    scoreSegment++
  }
  game.score += normal.scoreGain[scoreSegment][3]

  if (keys[37]) {
    //left arrow
    axisX --
  }

  if (keys[39]) {
    //right arrow
    axisX ++
  }

  if (axisX == -1) {
    if (dasFrameLeft == 0 || dasFrameLeft >= das) {
      if (colCheck(game.piecePos[0],game.piecePos[1]-1,game.currentRotation) == false) {
        if (areFrame <= 0) {
          game.piecePos[1] -= 1
        }
      }
    }
    dasFrameLeft ++
    dasFrameRight = 0
  } else if (axisX == 1) {
    if (dasFrameRight == 0 || dasFrameRight >= das) {
      if (colCheck(game.piecePos[0],game.piecePos[1]+1,game.currentRotation) == false) {
        if (areFrame <= 0){
          game.piecePos[1] += 1
        }
      }
    }
    dasFrameRight ++
    dasFrameLeft = 0
  } else {
    dasFrameLeft = 0
    dasFrameRight = 0
  }

  if (areFrame > 0) {
    areFrame--
    return
  }

  //rotation
  if (keys[90]) {
    //z - ccw rotation
    if (!ccwIsPressed) {
      var newRotation = game.currentRotation -1
      if (newRotation < 0) {
        newRotation = 3
      }
      if (colCheck(game.piecePos[0],game.piecePos[1],newRotation) == false) {
        game.currentRotation = newRotation
      } else if (colCheck(game.piecePos[0],game.piecePos[1]-1,newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[1] -= 1
      } else if (colCheck(game.piecePos[0],game.piecePos[1]+1,newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[1] += 1
      } else if (colCheck(game.piecePos[0]+1,game.piecePos[1],newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[0] += 1
      } else if (colCheck(game.piecePos[0]-1,game.piecePos[1],newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[0] -= 1
      }
    }
    ccwIsPressed = true
  } else {
    ccwIsPressed = false
  }

  if (keys[88]) {
    //x - cw rotation
    if (!cwIsPressed) {
      var newRotation = game.currentRotation + 1
      if (newRotation > 3) {
        newRotation = 0
      }
      if (colCheck(game.piecePos[0],game.piecePos[1],newRotation) == false) {
        game.currentRotation = newRotation
      } else if (colCheck(game.piecePos[0],game.piecePos[1]+1,newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[1] += 1
      } else if (colCheck(game.piecePos[0],game.piecePos[1]-1,newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[1] -= 1
      } else if (colCheck(game.piecePos[0]+1,game.piecePos[1],newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[0] += 1
      } else if (colCheck(game.piecePos[0]-1,game.piecePos[1],newRotation) == false) {
        game.currentRotation = newRotation
        game.piecePos[0] -= 1
      }
    }
    cwIsPressed = true
  } else {
    cwIsPressed = false
  }

  //gravity

  if (keys[38]) {
    //up arrow - hard drop
    axisY --
  }

  if (keys[40]) {
    //down arrow - soft drop
    axisY ++
  }

  if (axisY == -1) {
    miniTilesDown += 5120
  } else if (axisY == 1) {
    miniTilesDown += softDropGravity
    if (colCheck(game.piecePos[0]+1,game.piecePos[1],game.currentRotation)) {
      lockframe += 1000
    }
  } else {
    if (colCheck(game.piecePos[0]+1,game.piecePos[1],game.currentRotation) == false) {
      miniTilesDown += gravity
    }
  }

  //process vertical movement
  while (miniTilesDown >= 256) {
    if (colCheck(game.piecePos[0]+1,game.piecePos[1],game.currentRotation) == false) {
      miniTilesDown -= 256
      game.piecePos[0]++
      lockframe = 0
    } else {
      miniTilesDown = 0
      break
    }
  }


  //process eventual piece lock
  if (colCheck(game.piecePos[0]+1,game.piecePos[1],game.currentRotation) == true) {
    if (lockframe < lockdelay) {
      lockframe++
    } else {
      for (i = 0; i < 4; i++) {
        var x = minoData[game.currentPiece]["rotation"+game.currentRotation][i][0]+game.piecePos[1]
        var y = minoData[game.currentPiece]["rotation"+game.currentRotation][i][1]+game.piecePos[0]
        if (matrix[y] == undefined) {
          //top out
          ++deadFrame
          return
        }
        matrix[y][x] = minoData[game.currentPiece].color
      }
      var linesCleared = 0
      lockframe = 0
      miniTilesDown = 0
      //clear lines
      //NOTE: this is ugly af
      for(y = 0; y < 20; y++){
        var foo = 0
        for (x = 0;x < 10; x++) {
          if (matrix[y][x] > 0) {
            foo++
          } else {
            break
          }
        }
        if (foo >= 10) {
          matrix.splice(y,1)
          matrix.unshift([0,0,0,0,0,0,0,0,0,0])
          linesCleared++
        }
      }
      //process level and score
      if ((game.level + 1) % 100 != 0) {
        game.level++
        game.score += normal.scoreGain[scoreSegment][2]
      }
      game.level += linesCleared
      game.score += linesCleared*normal.scoreGain[scoreSegment][2]
      switch (linesCleared) {
        case 1:
          game.score += normal.scoreGain[scoreSegment][1]*0,1
          break;
        case 2:
          game.score += normal.scoreGain[scoreSegment][1]*0,5
          break;
        case 3:
          game.score += normal.scoreGain[scoreSegment][1]*1,5
          break;
        case 4:
          game.score += normal.scoreGain[scoreSegment][1]*5
          break;
      }
      areFrame = 30
      if (linesCleared > 0) {
        areFrame += 30
      }
      generatePiece()
      // increase gravity
      // NOTE: probably not the optimal way to do this
      var speedLevel = -1
      while (game.level >= normal.speedCurve[speedLevel+1][0]) {
        speedLevel++
        gravity = normal.speedCurve[speedLevel][1]
        softDropGravity = gravity + 256
      }
    }
  }

}
