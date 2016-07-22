function inputSpecial() {

	// special checks
	if (game.level >= normal.endlevel && deadFrame === 0) {
		game.level = normal.endlevel;
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
		if (gamestate === 13) {
			framecount--;
			if (framecount <= 0) {
				deadFrame++;
			}
		} else {
			framecount++;
		}
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
	lockPiece();

	//process level and score
	var prevLevelSegment = Math.floor(game.level/100);
	if (haveLockedPiece && (game.level + 1) % 100 !== 0) {
		game.level++;
	}
	game.level += linesCleared;
	if (linesCleared > 0) {
		areFrame += lineDelay;
	}
	var currentLevelSegment = Math.floor(game.level/100);
	if (gamestate === 13 && currentLevelSegment>prevLevelSegment) {
		framecount += 3600;
	}

}
