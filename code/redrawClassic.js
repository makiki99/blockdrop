function redrawClassic() {

    var offX, offY

    //screen clear
    ctx.fillStyle = "#000000"
    ctx.fillRect(0,0,canvas.width,canvas.height)

    //margins for design purposes
    // ctx.strokeStyle = "#cccccc"
    // ctx.strokeRect(tilesize*1,tilesize*1,canvas.width-tilesize*2,canvas.height-tilesize*2)

    //level
    offX = 14
    offY = 15

    ctx.fillStyle = "#ffffff"
    ctx.font = tilesize + "px 'Orbitron',monospace"
    ctx.fillText(game.level,offX*tilesize,offY*tilesize)

    //matrix and minos
    redrawBoard()

}
