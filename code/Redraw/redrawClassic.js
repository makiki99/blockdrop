var lineClearAnim = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  drawGhost = true,
  modeClear = false,
  nextBuffer = 0;

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
  offX = 2;
  offY = 1;

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;
  ctx.strokeRect(offX*tilesize,(offY-2)*tilesize,tilesize*10,tilesize*22);
  ctx.strokeStyle = "#ff0000";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(offX*tilesize,offY*tilesize);
  ctx.lineTo((offX+10)*tilesize,offY*tilesize);
  ctx.stroke();

  if (countdown <= 0) {

    //placed pieces
    (function() {
      for (x = 0; x < 10; x++) {
        for (y = 0; y < 20; y++) {
          if (matrix[y][x] > 0) {
            if (deadFrame === 0){
              ctx.drawImage(tiles[matrix[y][x]-1],(x+offX)*tilesize,(y+offY)*tilesize);
            } else {
              ctx.drawImage(tiles[7],(x+offX)*tilesize,(y+offY)*tilesize);
            }
          }
        }
      }
    }());

    (function() {
      //ghost piece
      if (areFrame <= 0 && drawGhost) {
        var ghostPos = [0,0];
        ghostPos[0] = game.piecePos[0];
        ghostPos[1] = game.piecePos[1];
        while (!colCheck(ghostPos[0]+1, ghostPos[1], game.currentRotation)) {
          ghostPos[0] += 1;
        }
        if (ghostPos != game.piecePos) {
          ctx.strokeStyle = "#aaaaaa";
          ctx.lineWidth = 2;
          for (i = 0; i < 4; i++) {
            var x = minoData[game.currentPiece]["rotation"+game.currentRotation][i][0]+ghostPos[1];
            var y = minoData[game.currentPiece]["rotation"+game.currentRotation][i][1]+ghostPos[0];
            if (deadFrame === 0){
              ctx.strokeRect(tilesize*(offX+x)+2,tilesize*(offY+y)+2,tilesize-4,tilesize-4);
            }
          }
        }
      }
    }());

    (function() {
      //current piece
      if (areFrame <= 0) {
        for (i = 0; i < 4; i++) {

          var x = minoData[game.currentPiece]["rotation"+game.currentRotation][i][0]+game.piecePos[1];
          var y = minoData[game.currentPiece]["rotation"+game.currentRotation][i][1]+game.piecePos[0];

          if (deadFrame === 0){
            ctx.drawImage(tiles[minoData[game.currentPiece].color-1],(x+offX)*tilesize,(y+offY)*tilesize);
          } else {
            ctx.drawImage(tiles[7],(x+offX)*tilesize,(y+offY)*tilesize);
          }

        }
      }
    }());

    //line clear animation
    for (i = 0; i < lineClearAnim.length; i++) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(tilesize*offX,tilesize*(offY+i+(0.1*(5-lineClearAnim[i]))),tilesize*10,tilesize*(0.2*lineClearAnim[i]));
      if (lineClearAnim[i] > 0) {
        lineClearAnim[i]--;
      }
    }

    //next piece
    offX = 15;
    offY = 2.5;
    for (i = 0; i < 4; i++) {
      if (areFrame > 0) {
        nextBuffer = game.currentPiece;
      } else {
        nextBuffer = game.nextPiece;
      }
      var x = minoData[nextBuffer].rotation0[i][0];
      var y = minoData[nextBuffer].rotation0[i][1];
      ctx.drawImage(tiles[minoData[nextBuffer].color-1],(x+offX)*tilesize,(y+offY)*tilesize);
    }

    //lock delay bar for testing purposes
    if (deadFrame === 0) {
      offX = 2;
      offY = 21;
      ctx.fillStyle = "#00ff00";
      ctx.fillRect(offX*tilesize,offY*tilesize+6,(tilesize*10)*(lockdelay-lockframe)/lockdelay,4);
    }

    (function() {
      //timer
      var minutes = (Math.floor(framecount / 3600)).toString();
      var seconds = (Math.floor((framecount % 3600) / 60)).toString();
      var centiseconds = (Math.floor((framecount % 60)*10/6)).toString();
      if (minutes.length === 1) {
        minutes = "0" + minutes;
      }
      if (seconds.length === 1) {
        seconds = "0" + seconds;
      }
      if (centiseconds.length === 1) {
        centiseconds = "0" + centiseconds;
      }
      offX = 4.5;
      offY = 22.5;
      ctx.font = tilesize + "px 'Orbitron',monospace";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(minutes+":"+seconds+"."+centiseconds,tilesize*offX,tilesize*offY);
    }());
  }

  //countdown
  offX = 5.5;
  offY = 10;
  ctx.font = tilesize*3 + "px 'Orbitron',monospace";
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 8;
  if (countdown > 0 && countdown < 60) {
    ctx.strokeText("1",tilesize*offX,tilesize*offY);
    ctx.fillText("1",tilesize*offX,tilesize*offY);
  }
  if (countdown > 60 && countdown < 120) {
    ctx.strokeText("2",tilesize*offX,tilesize*offY);
    ctx.fillText("2",tilesize*offX,tilesize*offY);
  }
  if (countdown > 120) {
    ctx.strokeText("3",tilesize*offX,tilesize*offY);
    ctx.fillText("3",tilesize*offX,tilesize*offY);
  }

  //GAME OVER/CLEAR sign
  if (deadFrame > 30) {
    ctx.font = tilesize + "px 'Orbitron',monospace";
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 6;
    if (modeClear) {
      ctx.strokeText("MODE CLEAR",tilesize*3,tilesize*9);
      ctx.fillText("MODE CLEAR",tilesize*3,tilesize*9);
    } else {
      ctx.strokeText("GAME OVER",tilesize*3.5,tilesize*9);
      ctx.fillText("GAME OVER",tilesize*3.5,tilesize*9);
    }
  }

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

  //FPS counter
  (function() {
    offX = 21;
    offY = 23.5;
    ctx.font = tilesize/2 + "px 'Orbitron',monospace";
    ctx.fillText("FPS: "+fps,offX*tilesize,offY*tilesize);
  }());

  //name
  ctx.font = tilesize/2 + "px sans-serif";
  if (!isGuest) {
    ctx.fillText("PLAYER:",tilesize*13,tilesize/2);
    ctx.fillText(currentProfile.name,tilesize*16,tilesize/2);
    ctx.fillText("GRADE:",tilesize*13,tilesize);
    ctx.fillStyle = grade[currentProfile.grade][0];
    ctx.fillText(grade[currentProfile.grade][1],tilesize*16,tilesize);
  }

}
