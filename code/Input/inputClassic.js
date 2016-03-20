var scoreSegment = -1,
  speedLevel = -1,
  haveLockedPiece = false,
  linesCleared = 0;

function inputClassic() {

  if (countdown > 0) {
    countdown--;
    return;
  }

  if (deadFrame === 0) {
    framecount++;
  }
  movement();

  //process eventual piece lock
  haveLockedPiece = false;
  linesCleared = 0;
  if (colCheck(game.piecePos[0]+1,game.piecePos[1],game.currentRotation) === true) {
    if (lockframe < lockdelay) {
      if (areFrame <= 0) {
        lockframe++;
      }
    } else {
      for (i = 0; i < 4; i++) {
        var x = minoData[game.currentPiece]["rotation"+game.currentRotation][i][0]+game.piecePos[1];
        var y = minoData[game.currentPiece]["rotation"+game.currentRotation][i][1]+game.piecePos[0];
        if (matrix[y] === undefined) {
          //top out
          ++deadFrame;
          return;
        }
        matrix[y][x] = minoData[game.currentPiece].color;
      }
      lockframe = 0;
      miniTilesDown = 0;
      //clear lines
      (function() {
        for(y = 0; y < 20; y++){
          var foo = 0;
          for (x = 0;x < 10; x++) {
            if (matrix[y][x] > 0) {
              foo++;
            } else {
              break;
            }
          }
          if (foo >= 10) {
            matrix.splice(y,1);
            matrix.unshift([0,0,0,0,0,0,0,0,0,0]);
            lineClearAnim[y] = 5;
            linesCleared++;
          }
        }
      }());
      areFrame = areDelay;
      generatePiece();
      lockframe = 0;
      haveLockedPiece = true;
      floorkicks = 0;
      cwIsPressed = false;
      ccwIsPressed = false;
    }
  }

}
