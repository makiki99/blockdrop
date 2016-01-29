//later I'll move this to variables.js... maybe.
var das = 14,
  dasFrame = 0,
  gravity = 4, // 256 gravity = 1 tile/frame (1G)
  softDropGravity = 128,
  miniTilesDown = 0 // how to name a variable part one

function inputClassic() {

  var axisX = 0

  //left-right input

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
      if (colCheck(game.piecePos[0],game.piecePos[1]-1,game.currentRotation) == false) {game.piecePos[1] -= 1}
    }
    dasFrame ++
  } else if (axisX == 1) {
    if (dasFrame == 0 || dasFrame >= das) {
      if (colCheck(game.piecePos[0],game.piecePos[1]+1,game.currentRotation) == false) {game.piecePos[1] += 1}
    }
    dasFrame ++
  } else {
    dasFrame = 0
  }

  //gravity
  if (keys[40]) {
    //down arrow
    //later I'll disallow up-down click at once
    miniTilesDown += softDropGravity
  } else {
    miniTilesDown += gravity
  }

  while (miniTilesDown >= 256) {
    miniTilesDown -= 256
    if (colCheck(game.piecePos[0]+1,game.piecePos[1],game.currentRotation) == false) {game.piecePos[0]++}
  }

}
