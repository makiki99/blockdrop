lineClearAnim = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

function redrawBoard() {

  var offX, offY

  //the screen should be already cleared, so no need to do it twice and potentially break something

  //background
  offX = 2
  offY = 1

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
          ctx.drawImage(tiles[matrix[y][x]-1],(x+offX)*tilesize,(y+offY)*tilesize)
        } else {
          ctx.drawImage(tiles[7],(x+offX)*tilesize,(y+offY)*tilesize)
        }
      }
    }
  }

  //current piece
  if (areFrame <= 0) {
    for (i = 0; i < 4; i++) {

      var x = minoData[game.currentPiece]["rotation"+game.currentRotation][i][0]+game.piecePos[1]
      var y = minoData[game.currentPiece]["rotation"+game.currentRotation][i][1]+game.piecePos[0]

      if (deadFrame == 0){
        ctx.drawImage(tiles[minoData[game.currentPiece].color-1],(x+offX)*tilesize,(y+offY)*tilesize)
      } else {
        ctx.drawImage(tiles[7],(x+offX)*tilesize,(y+offY)*tilesize)
      }

    }
  }

  //line clear animation
  for (var i = 0; i < lineClearAnim.length; i++) {
    lineClearAnim[i]
  }

  //next piece
  offX = 15
  offY = 2
  for (i = 0; i < 4; i++) {
    var x = minoData[game.nextPiece].rotation0[i][0]
    var y = minoData[game.nextPiece].rotation0[i][1]
    ctx.drawImage(tiles[minoData[game.nextPiece].color-1],(x+offX)*tilesize,(y+offY)*tilesize)
  }

  //lock delay bar for testing purposes
  if (deadFrame == 0) {
    offX = 2
    offY = 21
    ctx.fillStyle = "#00ff00"
    ctx.fillRect(offX*tilesize,offY*tilesize+6,(tilesize*10)*(lockdelay-lockframe)/lockdelay,4)
  }

  //GAME OVER sign
  if (deadFrame > 30) {
    ctx.font = tilesize + "px 'Orbitron',monospace"
    ctx.fillStyle = "#ffffff"
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 6
    ctx.strokeText("GAME OVER",tilesize*3.5,tilesize*9)
    ctx.fillText("GAME OVER",tilesize*3.5,tilesize*9)
  }

}
