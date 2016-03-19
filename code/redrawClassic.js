function redrawClassic() {

  var offX, offY;

  //screen clear
  ctx.fillStyle = "#000000";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  //level
  offX = 14;
  offY = 15;

  ctx.fillStyle = "#ffffff";
  ctx.font = tilesize + "px 'Orbitron',monospace";
  ctx.fillText("LVL",offX*tilesize,(offY-1.5)*tilesize);
  ctx.fillText(game.level,offX*tilesize,offY*tilesize);

  //matrix and minos
  redrawBoard();

  //score
  if (deadFrame > 60) {
    ctx.font = tilesize + "px 'Orbitron',monospace";
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 6;
    ctx.strokeText("SCORE: " +Math.floor(game.score),tilesize*3.5,tilesize*11);
    ctx.fillText("SCORE: " + Math.floor(game.score),tilesize*3.5,tilesize*11);
  }

  //debug.showScore
  if (debug.showScore) {
    ctx.font = tilesize + "px 'Orbitron',monospace";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("SCORE: " + game.score,tilesize*14,tilesize*18);
  }

}
