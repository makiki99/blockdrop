function inputSurvival() {

	// special checks
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

	drawGhost = false;
	invisMode = false;
	gravity = 5600;
	softDropGravity = 5600;

	//speed
	(function() {
		var speed;
		var seconds = framecount / 60;
		if (seconds >= 120) {
			speed = seconds * 5/3;
		} else {
			speed = 100 + seconds * 5/6;
		}
		lockDelay = Math.ceil(4000/speed);
		areDelay = Math.ceil(2000/speed);
		lineDelay = Math.ceil(2500/(50+speed/2));
		if (lockDelay > 24) {
			das = 12;
		} else {
			das = Math.ceil(lockDelay/(1,6+lockDelay/100));
		}
	}());

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

	if (linesCleared > 0) {
		areFrame += lineDelay;
	}

}
