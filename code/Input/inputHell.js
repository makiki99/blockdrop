var hell = {
	speedCurve : [
		[1,5632,4,2,15,6], // [level,gravity,ARE,line delay,lock delay,DAS]
		[100,5632,4,2,14,6],
		[200,5632,4,2,13,6],
		[300,5632,4,2,12,6],
		[400,5632,4,2,11,6],
		[500,5632,4,2,10,6],
		[600,5632,4,2,8,6]
	],
	endlevel: 666,
	garbage: 0
};

function inputHell() {

	// special checks
	if (game.level >= hell.endlevel && deadFrame === 0) {
		game.level = hell.endlevel;
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
		if (framecount%300 === 299) {
			hell.garbage++;
		}
	}

	drawGhost = false;

	invisMode = false;

	speedLevel = -1;
	while (game.level >= hell.speedCurve[speedLevel+1][0]) {
		speedLevel++;
		gravity = hell.speedCurve[speedLevel][1];
		softDropGravity = gravity + 256;
		areDelay = hell.speedCurve[speedLevel][2];
		lineDelay = hell.speedCurve[speedLevel][3];
		lockDelay = hell.speedCurve[speedLevel][4];
		das = hell.speedCurve[speedLevel][5];
		if (hell.speedCurve[speedLevel+1] === undefined) {
			break;
		}
	}

	movement();

	//process eventual piece lock
	haveLockedPiece = false;
	linesCleared = 0;
	lockPiece();
	if (!deadFrame && haveLockedPiece && hell.garbage > 0) {
		//copy bottom line as garbage
		matrix.shift()
		matrix.push([0,0,0,0,0,0,0,0,0,0])
		for (var i = 0; i < matrix[19].length; i++) {
			if (matrix[18][i] > 0) {
				matrix[19][i] = 8
			}
		}
		hell.garbage--;
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
