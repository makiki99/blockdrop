// THIS FILE IS NOT MEANT TO BE LOADED - THIS IS MERELY A BASE FOR FUTURE MODES
function input???() {

	// special checks
	if (game.level >= submode.endlevel && deadFrame === 0) {
		game.level = submode.endlevel;
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
	switch (linesCleared) {
		case 1:
			break;
		case 2:
			break;
		case 3:
			break;
		case 4:
			break;
	}
	if (linesCleared > 0) {
		areFrame += lineDelay;
	}

}
