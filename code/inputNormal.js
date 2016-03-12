var normal = {
  speedCurve : [
    [1,4,30,30,30,14], // [level,gravity,ARE,line delay,lock delay,DAS]
    [25,6,30,30,30,14],
    [50,8,30,30,30,14],
    [75,12,30,30,30,14],
    [100,16,30,30,30,14],
    [125,24,30,30,30,14],
    [150,32,30,30,30,14],
    [175,48,30,30,30,14],
    [200,64,30,30,30,14],
    [225,96,30,30,30,14],
    [250,128,30,30,30,14],
    [275,192,30,30,30,14],
    [300,256,30,30,30,14],
    [325,384,30,30,30,14],
    [350,512,30,30,30,14],
    [375,768,30,30,30,14],
    [400,1024,30,30,30,14],
    [450,1280,30,30,30,14],
    [500,5632,30,30,30,12],
    [900,5632,24,20,24,12],
  ],
  scoreGain: [
    [1,1,1.32,-0.0166],
    [100,1.3,1.35,-0.0168],
    [200,1.6,1.38,-0.0170],
    [300,1.9,1.41,-0.0173],
    [400,2.2,1.44,-0.0176],
    [500,2.5,1.56,-0.0180],
    [600,2.5,1.56,-0.0208],
    [700,2.5,1.59,-0.0208],
    [800,2.5,1.59,-0.0212],
    [900,3,1.8,-0.0286]
  ],
  endlevel: 1000
}

function inputNormal() {

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

  if (game.score < game.level/10) {game.score = game.level/10}

  var speedLevel = -1
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

  var scoreSegment = -1
  while (game.level >= normal.scoreGain[scoreSegment+1][0]) {
    scoreSegment++
    if (normal.speedCurve[speedLevel+1] == undefined) {
      break
    }
  }
  game.score += normal.scoreGain[scoreSegment][3]

  movement()

  //process eventual piece lock
  var linesCleared = 0
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
      //process level and score
      if ((game.level + 1) % 100 != 0) {
        game.level++
        game.score += normal.scoreGain[scoreSegment][2]
      }
      game.level += linesCleared
      game.score += linesCleared*normal.scoreGain[scoreSegment][2]
      switch (linesCleared) {
        case 1:
          game.score += normal.scoreGain[scoreSegment][1]*0.1
          break;
        case 2:
          game.score += normal.scoreGain[scoreSegment][1]*0.8
          break;
        case 3:
          game.score += normal.scoreGain[scoreSegment][1]*2.4
          break;
        case 4:
          game.score += normal.scoreGain[scoreSegment][1]*6.4
          break;
      }
      areFrame = areDelay
      if (linesCleared > 0) {
        areFrame += lineDelay
      }
      generatePiece()
      lockframe = 0
    }
  }

}
