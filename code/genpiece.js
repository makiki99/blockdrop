function generatePiece() {

  var randomNum

  for (i = 0; i < 6; i++) {
    randomNum = Math.floor(Math.random()*7)
    for (ii of game.history) {
      if (ii == randomNum) {
        continue
      }
      game.currentPiece = game.nextPiece
      game.nextPiece = randomNum
      game.history.splice(0,1)
      game.history.push(randomNum)
      return
    }
  }

}
