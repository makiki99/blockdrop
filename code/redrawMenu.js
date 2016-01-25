function redrawMenu() {

  var offX, offY

  //screen clear
  ctx.fillStyle = "#000000"
  ctx.fillRect(0,0,canvas.width,canvas.height)

  //menu selections
  ctx.fillStyle = "#ffffff"
  ctx.font = tilesize*2 + "px monospace"
  ctx.fillText("Classic",tilesize*3,tilesize*3)
  ctx.fillText("Preferences",tilesize*3,tilesize*5)

  //menu


}
