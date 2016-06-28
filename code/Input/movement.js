var das = 14,
	dasFrameLeft = 0,
	dasFrameRight = 0,
	gravity = 4, // 256 gravity = 1 tile/frame (1G)
	softDropGravity = 260,
	miniTilesDown = 0,
	lockframe = 0,
	lockdelay = 30,
	lineDelay = 30,
	areFrame = 0,
	areDelay = 0,
	deadFrame = 0,
	floorkicks = 0,
	canSoftDrop = true,
	buttonAIsPressed = false,
	buttonBIsPressed = false,
	buttonCIsPressed = false;

function movement() {

	var axisX = 0,
		axisY = 0;

	if (keys[controls.keyCodes[0]]) {
		//left arrow
		axisX --;
	}

	if (keys[controls.keyCodes[1]]) {
		//right arrow
		axisX ++;
	}

	if (axisX == -1) {
		if (dasFrameLeft === 0 || dasFrameLeft >= das) {
			if (colCheck(game.piecePos[0],game.piecePos[1]-1,game.currentRotation) === false) {
				if (areFrame <= 0) {
					game.piecePos[1] -= 1;
				}
			}
		}
		dasFrameLeft ++;
		dasFrameRight = 0;
	} else if (axisX == 1) {
		if (dasFrameRight === 0 || dasFrameRight >= das) {
			if (colCheck(game.piecePos[0],game.piecePos[1]+1,game.currentRotation) === false) {
				if (areFrame <= 0){
					game.piecePos[1] += 1;
				}
			}
		}
		dasFrameRight ++;
		dasFrameLeft = 0;
	} else {
		dasFrameLeft = 0;
		dasFrameRight = 0;
	}

	if (areFrame > 0) {
		areFrame--;
		return;
	}

	(function() {
		if (keys[controls.keyCodes[2]]) {
			// A button
			if (!buttonAIsPressed){
				if (!prefMenu.preflist[0]) {
					if (rotateLeft()) {
						buttonAIsPressed = true;
					}
				} else {
					if (rotateRight()) {
						buttonAIsPressed = true;
					}
				}
			}
		} else {
			buttonAIsPressed = false;
		}
	}());

	(function() {
		if (keys[controls.keyCodes[3]]) {
			// B button
			if (!buttonBIsPressed){
				if (!prefMenu.preflist[0]) {
					if (rotateRight()) {
						buttonBIsPressed = true;
					}
				} else {
					if (rotateLeft()) {
						buttonBIsPressed = true;
					}
				}
			}
		} else {
			buttonBIsPressed = false;
		}
	}());

	(function() {
		if (keys[controls.keyCodes[4]]) {
			// C button
			if (!buttonCIsPressed){
				if (!prefMenu.preflist[0]) {
					if (rotateLeft()) {
						buttonCIsPressed = true;
					}
				} else {
					if (rotateRight()) {
						buttonCIsPressed = true;
					}
				}
			}
		} else {
			buttonCIsPressed = false;
		}
	}());

	if (keys[controls.keyCodes[5]]) {
		//up arrow - hard drop
		axisY --;
	}

	if (keys[controls.keyCodes[6]]) {
		//down arrow - soft drop
		axisY ++;
	}

	if (axisY == -1) {
		miniTilesDown += 5120;
		canSoftDrop = true;
	} else if (axisY == 1) {
		if (canSoftDrop) {
			miniTilesDown += softDropGravity;
			if (colCheck(game.piecePos[0]+1,game.piecePos[1],game.currentRotation)) {
				lockframe += 1000;
				canSoftDrop = false;
			}
		} else {
			if (colCheck(game.piecePos[0]+1,game.piecePos[1],game.currentRotation) === false) {
				miniTilesDown += gravity;
			}
		}
	} else {
		if (colCheck(game.piecePos[0]+1,game.piecePos[1],game.currentRotation) === false) {
			miniTilesDown += gravity;
			canSoftDrop = true;
		}
	}

	//process vertical movement
	while (miniTilesDown >= 256) {
		if (colCheck(game.piecePos[0]+1,game.piecePos[1],game.currentRotation) === false) {
			miniTilesDown -= 256;
			game.piecePos[0]++;
			lockframe = 0;
		} else {
			miniTilesDown = 0;
			break;
		}
	}

	if (keys[controls.keyCodes[7]]) {
		if (deadFrame === 0) {
			if (gamestate <= 8) {
				submitScore(game.score);
			}
		}
		deadFrame++;
	}

}

function rotateLeft() {
	var newRotation = game.currentRotation -1;
	if (newRotation < 0) {
		newRotation = 3;
	}
	if (colCheck(game.piecePos[0],game.piecePos[1],newRotation) === false) {
		game.currentRotation = newRotation;
		return true;
	} else if (colCheck(game.piecePos[0],game.piecePos[1]-1,newRotation) === false) {
		game.currentRotation = newRotation;
		game.piecePos[1] -= 1;
		return true;
	} else if (colCheck(game.piecePos[0],game.piecePos[1]+1,newRotation) === false) {
		game.currentRotation = newRotation;
		game.piecePos[1] += 1;
		return true;
	} else if (colCheck(game.piecePos[0]+1,game.piecePos[1],newRotation) === false) {
		game.currentRotation = newRotation;
		game.piecePos[0] += 1;
		return true;
	} else if (colCheck(game.piecePos[0]+1,game.piecePos[1]-1,newRotation) === false) {
		game.currentRotation = newRotation;
		game.piecePos[1] -= 1;
		game.piecePos[0] += 1;
		return true;
	} else if (colCheck(game.piecePos[0]+1,game.piecePos[1]+1,newRotation) === false) {
		game.currentRotation = newRotation;
		game.piecePos[1] += 1;
		game.piecePos[0] += 1;
		return true;
	} else if (colCheck(game.piecePos[0]-1,game.piecePos[1],newRotation) === false) {
		if (floorkicks < 2) {
			game.currentRotation = newRotation;
			game.piecePos[0] -= 1;
			floorkicks++;
			return true;
		}
	}
	else {
		return false;
	}
}

function rotateRight() {
	var newRotation = game.currentRotation + 1;
	if (newRotation > 3) {
		newRotation = 0;
	}
	if (colCheck(game.piecePos[0],game.piecePos[1],newRotation) === false) {
		game.currentRotation = newRotation;
		return true;
	} else if (colCheck(game.piecePos[0],game.piecePos[1]+1,newRotation) === false) {
		game.currentRotation = newRotation;
		game.piecePos[1] += 1;
		return true;
	} else if (colCheck(game.piecePos[0],game.piecePos[1]-1,newRotation) === false) {
		game.currentRotation = newRotation;
		game.piecePos[1] -= 1;
		return true;
	} else if (colCheck(game.piecePos[0]+1,game.piecePos[1],newRotation) === false) {
		game.currentRotation = newRotation;
		game.piecePos[0] += 1;
		return true;
	} else if (colCheck(game.piecePos[0]+1,game.piecePos[1]+1,newRotation) === false) {
		game.currentRotation = newRotation;
		game.piecePos[1] += 1;
		game.piecePos[0] += 1;
		return true;
	} else if (colCheck(game.piecePos[0]+1,game.piecePos[1]-1,newRotation) === false) {
		game.currentRotation = newRotation;
		game.piecePos[1] -= 1;
		game.piecePos[0] += 1;
		return true;
	} else if (colCheck(game.piecePos[0]-1,game.piecePos[1],newRotation) === false) {
		if (floorkicks < 2) {
			game.currentRotation = newRotation;
			game.piecePos[0] -= 1;
			floorkicks++;
			return true;
		}
	}
}
