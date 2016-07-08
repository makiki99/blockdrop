function inputSpecial() {

	// special checks
	if (game.level >= normal.endlevel && deadFrame === 0) {
		deadFrame++;
		modeClear = true;
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
		canvas.style.transform = "none";
		deadFrame++;
		return;
	}

	if (deadFrame === 0) {
		framecount++;
	}


	if (game.level >= normal.ghostEnd) {
		drawGhost = false;
	} else {
		drawGhost = true;
	}

	if (normal.invisible) {
		invisMode = true;
	} else {
		invisMode = false;
	}

	speedLevel = -1;
	while (game.level >= normal.speedCurve[speedLevel+1][0]) {
		speedLevel++;
		gravity = normal.speedCurve[speedLevel][1];
		softDropGravity = gravity + 256;
		areDelay = normal.speedCurve[speedLevel][2];
		lineDelay = normal.speedCurve[speedLevel][3];
		lockDelay = normal.speedCurve[speedLevel][4];
		das = normal.speedCurve[speedLevel][5];
		if (normal.speedCurve[speedLevel+1] === undefined) {
			break;
		}
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

	//process level and score
	if (haveLockedPiece && (game.level + 1) % 100 !== 0) {
		game.level++;
	}
	game.level += linesCleared;
	if (linesCleared > 0) {
		areFrame += lineDelay;
	}

}
