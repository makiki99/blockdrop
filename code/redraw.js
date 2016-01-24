var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  tilesize = 24

canvas.width = tilesize*24
canvas.height = tilesize*22

function redraw() {
    var offX, offY

    //screen clear
    ctx.fillStyle = "#000000"
    ctx.fillRect(0,0,canvas.width,canvas.height)

    //margins for design
    // ctx.strokeStyle = "#cccccc"
    // ctx.strokeRect(tilesize*1,tilesize*1,canvas.width-tilesize*2,canvas.height-tilesize*2)

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
