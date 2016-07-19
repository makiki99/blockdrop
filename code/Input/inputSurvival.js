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
	lockPiece();

	if (linesCleared > 0) {
		areFrame += lineDelay;
	}

}
