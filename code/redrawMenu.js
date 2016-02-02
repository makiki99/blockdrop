function redrawMenu() {

  var offX, offY

  //screen clear
  ctx.fillStyle = "#000000"
  ctx.fillRect(0,0,canvas.width,canvas.height)

  //menu selections
  ctx.fillStyle = "#ffffff"
  ctx.font = tilesize*2 + "px 'Orbitron'"
  ctx.fillText("Classic",tilesize*3,tilesize*3)
  ctx.fillText("Preferences",tilesize*3,tilesize*5)
  ctx.fillText("test string",tilesize*3,tilesize*7)
  ctx.fillText("test string 2",tilesize*3,tilesize*9)
  ctx.fillText("test string c",tilesize*3,tilesize*11)

  //menu selector
  ctx.fillText(">",tilesize*1,tilesize*(3+menu.currentSelection*2))

}
