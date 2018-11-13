ultraSpecial = {
    speedCurve : [
        [0,8,30,22,30,12], // [level,gravity,ARE,line delay,lock delay,DAS]
        [1,16,30,22,30,12],
        [2,32,30,22,30,12],
        [3,64,30,22,30,12],
        [4,128,30,22,30,12],
        [5,256,30,22,30,12],
        [6,512,30,22,30,12],
        [7,768,30,22,30,12],
        [8,1024,30,22,30,12],
        [9,1280,30,22,30,12],
        [10,5600,24,20,30,10],
        [11,5600,21,18,28,10],
        [12,5600,18,16,26,8],
        [13,5600,16,14,24,8],
        [14,5600,14,12,22,8],
        [15,5600,12,10,20,8],
        [16,5600,10,8,19,6],
        [17,5600,9,7,18,6],
        [18,5600,8,6,17,6],
        [19,5600,7,5,16,6],
        [20,5600,6,4,15,6],
        [21,5600,6,4,14,6],
        [22,5600,6,4,13,6],
        [23,5600,6,4,12,6],
        [24,5600,6,4,11,6],
        [25,5600,6,4,10,6],
    ],
    rankPoints: 0,
    bonusScore: 0
}

function inputUltraSpecial() {

	// special checks
	if (framecount <= 0 && deadFrame === 0) {
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
		framecount--;
	}

    speedLevel = -1;
	while (game.level >= ultraSpecial.speedCurve[speedLevel+1][0]) {
		speedLevel++;
		gravity = ultraSpecial.speedCurve[speedLevel][1];
		softDropGravity = gravity + 256;
		areDelay = ultraSpecial.speedCurve[speedLevel][2];
		lineDelay = ultraSpecial.speedCurve[speedLevel][3];
		lockDelay = ultraSpecial.speedCurve[speedLevel][4];
		das = ultraSpecial.speedCurve[speedLevel][5];
		if (ultraSpecial.speedCurve[speedLevel+1] === undefined) {
			break;
		}
    }
    
    if (game.level > 3){
        drawGhost = false;
    } else {
        drawGhost = true;
    }

 	invisMode = false;

	movement();

	//process eventual piece lock
	haveLockedPiece = false;
	linesCleared = 0;
	lockPiece();

	//process level and score
	switch (linesCleared) {
        case 1:
            game.score += 250+ultraSpecial.bonusScore*1;
            ultraSpecial.bonusScore += 10;
            ultraSpecial.rankPoints += 300;
			break;
		case 2:
            game.score += 750+ultraSpecial.bonusScore*2;
            ultraSpecial.bonusScore += 25;
            ultraSpecial.rankPoints += 1200;
			break;
		case 3:
            game.score += 1500+ultraSpecial.bonusScore*4;
            ultraSpecial.bonusScore += 100;
            ultraSpecial.rankPoints += 2400;
			break;
		case 4:
            game.score += 3000+ultraSpecial.bonusScore*6;
            ultraSpecial.bonusScore += 500;
            ultraSpecial.rankPoints += 4800;
			break;
    }

    if (game.level>20) {
        game.score += game.level*3-30;
        ultraSpecial.rankPoints -= 3;
    } else if (game.level>10) {
        game.score += game.level*2-10;
        ultraSpecial.rankPoints -= 1;
    } else {
        game.score += game.level
    }
    
    for (let y=0; y<4; y++) {
        let found = false;
        for (let x = 0; x < 9; x++) {
            if (matrix[y][x]>0) {
                found = true;
                break;
            }
        }
        if (found) {
            ultraSpecial.rankPoints -= (4-y)*(4-y)
            break;
        }
    }

    if (ultraSpecial.rankPoints < 0) ultraSpecial.rankPoints = 0;

    if (ultraSpecial.rankPoints >= 4800*game.level+4800) game.level++
    if (ultraSpecial.rankPoints < 4800*game.level-2400) game.level--

    if (game.level >25) game.level = 25;
;
    if (game.score>9999999) game.score = 9999999

	if (linesCleared > 0) {
		areFrame += lineDelay;
	}

}
