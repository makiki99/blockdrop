var scoreSegment = -1,
  speedLevel = -1,
  haveLockedPiece = false,
  linesCleared = 0,
	diffMult = 0;

function inputClassic(submode) {

	// special checks
  if (game.level >= submode.endlevel && deadFrame === 0) {
    deadFrame++;
    modeClear = true;
    submitScore(game.score);
  }

  if (countdown > 0) {
    countdown -= 1;
    return;
  }

  if (deadFrame > 0) {
    if (keys[controls.keyCodes[10]] || keys[controls.keyCodes[11]]) {
      gamestate = 0;
      keys[controls.keyCodes[10]] = false;
      keys[controls.keyCodes[11]] = false;
    }
    deadFrame++;
    return;
  }

	if (deadFrame === 0) {
		framecount++;
	}


  if (game.level >= submode.ghostEnd) {
    drawGhost = false;
  } else {
    drawGhost = true;
  }

	if (submode.invisible) {
		invisMode = true;
	} else {
		invisMode = false;
	}

  speedLevel = -1;
  while (game.level >= submode.speedCurve[speedLevel+1][0]) {
    speedLevel++;
    gravity = submode.speedCurve[speedLevel][1];
    softDropGravity = gravity + 256;
    areDelay = submode.speedCurve[speedLevel][2];
    lineDelay = submode.speedCurve[speedLevel][3];
    lockDelay = submode.speedCurve[speedLevel][4];
    das = submode.speedCurve[speedLevel][5];
    if (submode.speedCurve[speedLevel+1] === undefined) {
      break;
    }
  }

  // scoreSegment = -1;
  // while (game.level >= submode.scoreGain[scoreSegment+1][0]) {
  //   scoreSegment++;
  //   if (submode.scoreGain[scoreSegment+1] === undefined) {
  //     break;
  //   }
  // }

	//check difficulty score multipler
	(function() {
		if (gravity < 5120) {
			diffMult = 0.9371+Math.sqrt(gravity)/32;
		} else {
			diffMult = (60-areDelay)/50+(100-lineDelay)/300+(30/lockDelay)+0.48;
		}
		diffMult *= 1+Math.round(game.level/100)/56;
		if (invisMode) {
			diffMult *= 3.33;
		}
	}());

	if (areFrame === 0) {
		game.score -= diffMult/(15+lockDelay/2);
	}

  movement();

  //process eventual piece lock
  haveLockedPiece = false;
  linesCleared = 0;
  if (colCheck(game.piecePos[0]+1,game.piecePos[1],game.currentRotation) === true) {
    if (lockframe < lockdelay) {
      if (areFrame <= 0) {
        lockframe++;
      }
    } else {
      for (i = 0; i < 4; i++) {
        var x = minoData[game.currentPiece]["rotation"+game.currentRotation][i][0]+game.piecePos[1];
        var y = minoData[game.currentPiece]["rotation"+game.currentRotation][i][1]+game.piecePos[0];
        if (matrix[y] === undefined) {
          //top out
          submitScore(game.score);
          ++deadFrame;
          return;
        }
        matrix[y][x] = minoData[game.currentPiece].color;
      }
      lockframe = 0;
      miniTilesDown = 0;
      //clear lines
      (function() {
        for(y = 0; y < 20; y++){
          var foo = 0;
          for (x = 0;x < 10; x++) {
            if (matrix[y][x] > 0) {
              foo++;
            } else {
              break;
            }
          }
          if (foo >= 10) {
            matrix.splice(y,1);
            matrix.unshift([0,0,0,0,0,0,0,0,0,0]);
            lineClearAnim[y] = 5;
            linesCleared++;
          }
        }
      }());
      areFrame = areDelay;
      generatePiece();
      lockframe = 0;
      haveLockedPiece = true;
      floorkicks = 0;
		  buttonAIsPressed = false;
		  buttonBIsPressed = false;
		  buttonCIsPressed = false;
    }
  }

  if (game.score < game.level/5) {
    game.score = game.level/5;
  }

  //process level and score
  if (haveLockedPiece && (game.level + 1) % 100 !== 0) {
    game.level++;
    game.score += diffMult;
  }
  game.level += linesCleared;
  game.score += linesCleared*diffMult;
  switch (linesCleared) {
    case 1:
      game.score += diffMult*0.1;
      break;
    case 2:
      game.score += diffMult*0.6;
      break;
    case 3:
      game.score += diffMult*1.8;
      break;
    case 4:
      game.score += diffMult*3.6;
      break;
  }
  if (linesCleared > 0) {
    areFrame += lineDelay;
  }

}
