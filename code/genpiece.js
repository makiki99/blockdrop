function generatePiece() {

  var randomNum

  for (i = 0; i < 6; i++) {
    randomNum = Math.floor(Math.random()*7)
    for (ii of game.history) {
      if (ii == randomNum) {
        continue
      }
      game.currentPiece = game.nextPiece
      game.piecePos[0] = minoData[randomNum].spawnpos[0]
      game.piecePos[1] = minoData[randomNum].spawnpos[1]
      game.nextPiece = randomNum
      game.currentRotation = 0
      game.history.splice(0,1)
      game.history.push(randomNum)
      return
    }
  }

}
