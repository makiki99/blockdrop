function redrawBoard() {
  
  var offX, offY

  //background
  offX = 1
  offY = 1
  ctx.strokeStyle = "#666666"
  ctx.lineWidth = 1
  for (x = 0; x < 10; x++) {
    for (y = 0; y < 20; y++) {
      ctx.strokeRect((x+offX)*tilesize,(y+offY)*tilesize,tilesize,tilesize)
    }
  }
  ctx.strokeStyle = "#ffffff"
  ctx.lineWidth = 2
  ctx.strokeRect(offX*tilesize,offY*tilesize,tilesize*10,tilesize*20)

  //pieces

}
