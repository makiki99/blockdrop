function inputEndurance(endlevel) {
	// special checks
	if (game.level >= endlevel && deadFrame === 0) {
		game.level = endlevel;
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

	gravity = 5632;
	softDropGravity = gravity + 256;
	areDelay = 30;
	lineDelay = 20;
	lockDelay = 30;
	das = 8;

	movement();

	//process eventual piece lock
	haveLockedPiece = false;
	linesCleared = 0;
	lockPiece();

	//process level and score
	game.level += linesCleared;
	if (haveLockedPiece && game.level !== endlevel-1) {
		game.level++;
	}
	if (linesCleared > 0) {
		areFrame += lineDelay;
	}

}
