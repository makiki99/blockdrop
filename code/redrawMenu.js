function redrawMenu() {

  var offX, offY

  //screen clear
  ctx.fillStyle = "#000000"
  ctx.fillRect(0,0,canvas.width,canvas.height)

  //menu selections
  ctx.fillStyle = "#ffffff"
  ctx.font = tilesize*2 + "px 'Orbitron',monospace"
  ctx.fillText("Normal",tilesize*3,tilesize*3)
  ctx.fillText("???",tilesize*3,tilesize*5)

  //menu selector
  ctx.fillText(">",tilesize*1,tilesize*(3+menu.currentSelection*2))

  //version number
  ctx.font = tilesize/2 + "px sans-serif"
  ctx.fillText("version 0.0.1a",0,tilesize/2)

}
