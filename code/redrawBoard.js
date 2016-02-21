function redrawBoard() {

  var offX, offY

  //the screen should be already cleared, so no need to do it twice and potentially break something

  //background
  offX = 1
  offY = 3

  ctx.strokeStyle = "#ffffff"
  ctx.lineWidth = 3
  ctx.strokeRect(offX*tilesize,(offY-2)*tilesize,tilesize*10,tilesize*22)
  ctx.strokeStyle = "#ff0000"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(offX*tilesize,offY*tilesize)
  ctx.lineTo((offX+10)*tilesize,offY*tilesize)
  ctx.stroke()

  //placed pieces
  for (x = 0; x < 10; x++) {
    for (y = 0; y < 20; y++) {
      if (matrix[y][x] > 0) {
        if (deadFrame == 0){
          ctx.fillStyle = colorCode[matrix[y][x]-1]
        } else {
          ctx.fillStyle = "#888888"
        }
        ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
      }
    }
  }

  //current piece
  if (areFrame <= 0) {
    for (i = 0; i < 4; i++) {

      var x = minoData[game.currentPiece]["rotation"+game.currentRotation][i][0]+game.piecePos[1]
      var y = minoData[game.currentPiece]["rotation"+game.currentRotation][i][1]+game.piecePos[0]

      if (deadFrame == 0){
        ctx.fillStyle = colorCode[minoData[game.currentPiece].color-1]
      } else {
        ctx.fillStyle = "#888888"
      }
      ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)

    }
  }

  //next piece
  offX = 15
  offY = 3
  for (i = 0; i < 4; i++) {
    var x = minoData[game.nextPiece].rotation0[i][0]
    var y = minoData[game.nextPiece].rotation0[i][1]
    ctx.fillStyle = colorCode[minoData[game.nextPiece].color-1]
    ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
  }

  //lock delay bar for testing purposes
  if (deadFrame == 0) {
    offX = 1
    offY = 23
    ctx.fillStyle = "#00ff00"
    ctx.fillRect(offX*tilesize,offY*tilesize+6,(tilesize*10)*(lockdelay-lockframe)/lockdelay,4)
  }

  //GAME OVER SIGN
}
