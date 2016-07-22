var timeAttack = {
	speedCurve : [
		[1,0,30,10,30,10], // [level,gravity,ARE,line delay,lock delay,DAS]
		[100,0,27,9,30,9],
		[200,0,24,8,30,9],
		[300,0,21,7,30,9],
		[400,0,18,6,30,8],
		[500,0,15,5,30,8],
		[600,0,12,4,30,8],
		[700,0,10,3,30,7],
		[800,0,10,2,30,7],
		[900,0,10,1,30,7],
	],
	endlevel: 300,
	speedLevel : 1,
};

function inputTimeAttack() {

	// special checks
	if (game.level >= timeAttack.endlevel && deadFrame === 0) {
		game.level = timeAttack.endlevel;
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

	drawGhost = true;
	invisMode = false;

	speedLevel = -1;
	while (timeAttack.speedLevel >= timeAttack.speedCurve[speedLevel+1][0]) {
		speedLevel++;
		gravity = 0;
		softDropGravity = 256;
		areDelay = timeAttack.speedCurve[speedLevel][2];
		lineDelay = timeAttack.speedCurve[speedLevel][3];
		lockDelay = timeAttack.speedCurve[speedLevel][4];
		das = timeAttack.speedCurve[speedLevel][5];
		if (timeAttack.speedCurve[speedLevel+1] === undefined) {
			break;
		}
	}

	movement();

	//process eventual piece lock
	haveLockedPiece = false;
	linesCleared = 0;
	lockPiece();

	//process level and score
	if (haveLockedPiece && (game.level + 1) % 300 !== 0) {
		game.level++;
		timeAttack.speedLevel++;
	}
	game.level += linesCleared;
	switch (linesCleared) {
		case 1:
			timeAttack.speedLevel += 1;
			break;
		case 2:
			timeAttack.speedLevel += 4;
			break;
		case 3:
			timeAttack.speedLevel += 12;
			break;
		case 4:
			timeAttack.speedLevel += 24;
			break;
	}
	if (linesCleared > 0) {
		areFrame += lineDelay;
	}

}
