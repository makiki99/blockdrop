function redrawBoard() {

  var offX, offY

  //the screen should be already cleared, so no need to do it twice and potentially break something

  //background
  offX = 1
  offY = 1
  //idk if this is a good design, I'll leave this commented for now
  // ctx.strokeStyle = "#666666"
  // ctx.lineWidth = 1
  // for (x = 0; x < 10; x++) {
  //   for (y = 0; y < 20; y++) {
  //     ctx.strokeRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
  //   }
  // }
  ctx.strokeStyle = "#ffffff"
  ctx.lineWidth = 3
  ctx.strokeRect(offX*tilesize,offY*tilesize,tilesize*10,tilesize*20)
  ctx.lineWidth = 1

  //placed pieces
  for (x = 0; x < 10; x++) {
    for (y = 0; y < 20; y++) {

      //it's probably faster without calling Array.length property in for loop
      //and I am lazy
      switch (matrix[y][x]) {
        case 0:
          break;
        case 1:
          ctx.fillStyle = colorCode[0]
          ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
          break;
        case 2:
          ctx.fillStyle = colorCode[1]
          ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
          break;
        case 3:
          ctx.fillStyle = colorCode[2]
          ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
          break;
        case 4:
          ctx.fillStyle = colorCode[3]
          ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
          break;
        case 5:
          ctx.fillStyle = colorCode[4]
          ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
          break;
        case 6:
          ctx.fillStyle = colorCode[5]
          ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
          break;
        case 7:
          ctx.fillStyle = colorCode[6]
          ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
          break;
        default:
          //for debugging, will have to change colour of this
          ctx.fillStyle = colorCode[7]
          ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
          break;

      }

    }
  }

  //current piece
  for (i = 0; i < 4; i++) {

    //I tried to make this look good
    var x = minoData[game.currentPiece]["rotation"+game.currentRotation][i][0]+game.piecePos[1]
    var y = minoData[game.currentPiece]["rotation"+game.currentRotation][i][1]+game.piecePos[0]

    switch (minoData[game.currentPiece].color) {
      case 0:
        break;
      case 1:
        ctx.fillStyle = colorCode[0]
        ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
        break;
      case 2:
        ctx.fillStyle = colorCode[1]
        ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
        break;
      case 3:
        ctx.fillStyle = colorCode[2]
        ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
        break;
      case 4:
        ctx.fillStyle = colorCode[3]
        ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
        break;
      case 5:
        ctx.fillStyle = colorCode[4]
        ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
        break;
      case 6:
        ctx.fillStyle = colorCode[5]
        ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
        break;
      case 7:
        ctx.fillStyle = colorCode[6]
        ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
        break;
      default:
        //for debugging, will have to change colour of this
        ctx.fillStyle = colorCode[7]
        ctx.fillRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
        break;

    }


  }

}
