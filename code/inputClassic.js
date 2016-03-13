var scoreSegment, speedLevel, haveLockedPiece, linesCleared

function inputClassic() {

  if (game.level >= normal.endlevel && deadFrame == 0) {
    deadFrame++
  }

  if (deadFrame > 0) {
    if (keys[13] || keys[27]) {
      gamestate = 0
      keys[13] = false
      keys[27] = false
    }
    deadFrame++
    return
  }

  if (game.level >= normal.ghostEnd) {
    drawGhost = false
  } else {
    drawGhost = true
  }

  speedLevel = -1
  while (game.level >= normal.speedCurve[speedLevel+1][0]) {
    speedLevel++
    gravity = normal.speedCurve[speedLevel][1]
    softDropGravity = gravity + 256
    areDelay = normal.speedCurve[speedLevel][2]
    lineDelay = normal.speedCurve[speedLevel][3]
    lockDelay = normal.speedCurve[speedLevel][4]
    das = normal.speedCurve[speedLevel][5]
    if (normal.speedCurve[speedLevel+1] == undefined) {
      break
    }
  }

  scoreSegment = -1
  while (game.level >= normal.scoreGain[scoreSegment+1][0]) {
    scoreSegment++
    if (normal.speedCurve[speedLevel+1] == undefined) {
      break
    }
  }
  game.score += normal.scoreGain[scoreSegment][3]

  movement()

  //process eventual piece lock
  haveLockedPiece = false
  linesCleared = 0
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
      lockframe = 0
      miniTilesDown = 0
      //clear lines
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
          lineClearAnim[y] = 5
          linesCleared++
        }
      }
      areFrame = areDelay
      generatePiece()
      lockframe = 0
      haveLockedPiece = true
    }
  }

}
