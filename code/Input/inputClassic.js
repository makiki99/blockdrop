var scoreSegment = -1,
	speedLevel = -1,
	haveLockedPiece = false,
	linesCleared = 0,
	diffMult = 0,
	countdown = 180;

function inputClassic(submode) {

	// special checks
	if (game.level >= submode.endlevel && deadFrame === 0) {
		game.level = submode.endlevel;
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

	//check difficulty score multipler
	(function() {
		if (gravity < 5120) {
			diffMult = 0.9371+Math.sqrt(gravity)/32;
		} else {
			diffMult = (57-areDelay)/48+(90-lineDelay)/275+Math.pow(30/lockDelay,1.75)+0.55;
		}
		diffMult *= 1+Math.floor(game.level/100)/50;
		if (invisMode) {
			diffMult *= 1+Math.floor(game.level/100)/10;
		}
	}());

	if (areFrame <= 0) {
		if (invisMode) {
			game.score -= diffMult/60;
		} else {
			game.score -= diffMult/30;
		}
	}

	movement();

	//process eventual piece lock
	haveLockedPiece = false;
	linesCleared = 0;
	lockPiece();

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
