function colCheck(newPosY, newPosX, newRotation) {
   for (i=0; i < 4; i++) {

    var x = minoData[game.currentPiece]["rotation"+newRotation][i][0]+newPosX
    var y = minoData[game.currentPiece]["rotation"+newRotation][i][1]+newPosY

    if (x < 0 || x > 9 || y < 0 || y > 19) {
      return true //bounduary collision detected
    }

    if (false) {
      return true //block-to-block collision detected
    }

   }
   return false //no collision detected
}
