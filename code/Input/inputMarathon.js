var marathon = {
	speedCurve : [
		[0,4,30,22,30,12], // [level,gravity,ARE,line delay,lock delay,DAS]
		[10,8,30,22,30,12],
		[20,16,30,22,30,12],
		[30,32,30,22,30,12],
		[40,64,30,22,30,12],
		[50,128,30,22,30,12],
		[60,256,30,22,30,10],
		[70,512,30,22,30,10],
		[80,1024,30,22,30,10],
		[90,1280,30,22,30,10],
		[100,5632,30,20,30,8],
	],
	ghostEnd: 30,
	endlevel: 200,
	lineClears: {
		single: 0,
		double: 0,
		triple: 0,
		quad: 0
	},
	b2bBonus: 0,
	b2b: true
};

function inputMarathon() {
	// special checks
	if (game.level >= marathon.endlevel && deadFrame === 0) {
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


	if (game.level >= marathon.ghostEnd) {
		drawGhost = false;
	} else {
		drawGhost = true;
	}

	invisMode = false;

	speedLevel = -1;
	while (game.level >= marathon.speedCurve[speedLevel+1][0]) {
		speedLevel++;
		gravity = marathon.speedCurve[speedLevel][1];
		softDropGravity = gravity + 256;
		areDelay = marathon.speedCurve[speedLevel][2];
		lineDelay = marathon.speedCurve[speedLevel][3];
		lockDelay = marathon.speedCurve[speedLevel][4];
		das = marathon.speedCurve[speedLevel][5];
		if (marathon.speedCurve[speedLevel+1] === undefined) {
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
	game.level += linesCleared;
	switch (linesCleared) {
		case 1:
			marathon.lineClears.single++;
			marathon.b2b = false;
			break;
		case 2:
			marathon.lineClears.double++;
			marathon.b2b = false;
			break;
		case 3:
			marathon.lineClears.triple++;
			marathon.b2b = false;
			break;
		case 4:
			marathon.lineClears.quad++;
			if (marathon.b2b) {
				marathon.b2bBonus++;
			} else {
				marathon.b2bBonus = true;
			}
			break;
		default:

	}
	var completionMult = (0.5+0.5*game.level/marathon.endlevel)*game.level/marathon.endlevel;
	var consistencyMult = (
		marathon.lineClears.quad*4+
		marathon.lineClears.triple*0.766667*3+
		marathon.lineClears.double*0.533333*2+
		marathon.lineClears.single*0.3
	)/game.level;
	var b2bMult = (8+marathon.b2bBonus/25)/10;
	if (game.level <= 0) {
		consistencyMult = 0;
	}
	completionMult = completionMult > 1 ? 1 : completionMult;
	game.score = 9999*b2bMult*consistencyMult*completionMult;
	if (linesCleared > 0) {
		areFrame += lineDelay;
	}

}
