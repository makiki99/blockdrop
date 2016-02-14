var das = 14,
  dasFrame = 0,
  gravity = 4, // 256 gravity = 1 tile/frame (1G)
  softDropGravity = 128,
  miniTilesDown = 0,
  lockframe = 0,
  lockdelay = 30

//these variables
var cwIsPresed = false,
  ccwIsPressed = false

function inputClassic() {

  var axisX = 0,
    axisY = 0

  //left-right move

  if (keys[37]) {
    //left arrow
    axisX --
  }

  if (keys[39]) {
    //right arrow
    axisX ++
  }

  if (axisX == -1) {
    if (dasFrame == 0 || dasFrame >= das) {
      if (colCheck(game.piecePos[0],game.piecePos[1]-1,game.currentRotation) == false) {
        game.piecePos[1] -= 1
      }
    }
    dasFrame ++
  } else if (axisX == 1) {
    if (dasFrame == 0 || dasFrame >= das) {
      if (colCheck(game.piecePos[0],game.piecePos[1]+1,game.currentRotation) == false) {
        game.piecePos[1] += 1
      }
    }
    dasFrame ++
  } else {
    dasFrame = 0
  }

  //TODO: ARE

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
    //lockframe = 999999 //just a random big number
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
        if (false) {
          topOut()
        }
        matrix[y][x] = minoData[game.currentPiece].color
      }
      lockframe = 0
      miniTilesDown = 0
      generatePiece()
    }
  }

}
