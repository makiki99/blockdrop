var deathCurve = {
	speedCurve : [
		[1,5632,16,8,30,10], // [level,gravity,ARE,line delay,lock delay,DAS]
		[101,5632,12,0,26,10],
		[200,5632,12,0,26,9],
		[201,5632,12,0,22,9],
		[300,5632,12,0,22,8],
		[301,5632,6,6,18,8],
		[400,5632,6,6,18,6],
		[401,5632,5,5,15,6],
		[500,5632,4,4,15,6]
	],
	endlevel: 999,
};

function inputDeath() {

	// special checks
	if (game.level >= deathCurve.endlevel && deadFrame === 0) {
		game.level = deathCurve.endlevel;
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
		deadFrame++;
		return;
	}

	if (deadFrame === 0) {
		framecount++;
	}

	drawGhost = false;
	invisMode = false;

	speedLevel = -1;
	while (game.level >= deathCurve.speedCurve[speedLevel+1][0]) {
		speedLevel++;
		gravity = deathCurve.speedCurve[speedLevel][1];
		softDropGravity = gravity + 256;
		areDelay = deathCurve.speedCurve[speedLevel][2];
		lineDelay = deathCurve.speedCurve[speedLevel][3];
		lockDelay = deathCurve.speedCurve[speedLevel][4];
		das = deathCurve.speedCurve[speedLevel][5];
		if (deathCurve.speedCurve[speedLevel+1] === undefined) {
			break;
		}
	}



	movement();

	//process eventual piece lock
	haveLockedPiece = false;
	linesCleared = 0;
	lockPiece();

	//process level
	if (haveLockedPiece && (game.level + 1) % 100 !== 0 && (game.level + 1) !== deathCurve.endlevel) {
		game.level++;
	}
	game.level += linesCleared;
	if (linesCleared > 0) {
		areFrame += lineDelay;
	}
	//torikan
	if (!game.torikan && game.level >= 500) {
		if (framecount > 12300) {
			deadFrame++;
		} else {
			game.torikan = true;
		}
	}

}
