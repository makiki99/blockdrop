function generatePiece() {
	var randomNum = 0;

	outer: for (i = 0; i < 6; i++) {
		randomNum = Math.floor(Math.random()*7);
		if (i != 6) {
			for (var ii = 0; ii < 4; ii++) {
				if (game.history[ii] == randomNum) {
					continue outer;
				}
			}
		}
		break;
	}

	game.currentPiece = game.nextPiece;
	game.piecePos[0] = minoData[game.currentPiece].spawnpos[0];
	game.piecePos[1] = minoData[game.currentPiece].spawnpos[1];
	game.nextPiece = randomNum;
	game.currentRotation = 0;
	game.history.splice(0,1);
	game.history.push(randomNum);

}
