function lockPiece() {
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
					submitScore(game.score);
					++deadFrame;
					return;
				}
				matrix[y][x] = minoData[game.currentPiece].color;
			}
			lockframe = 0;
			miniTilesDown = 0;
			//clear lines
			(function() {
				for(y = 0; y < matrix.length; y++){
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
			sfx.pieceLock.play();
			switch (linesCleared) {
				case 0:
					break;
				case 1:
					sfx.singleClear.play();
					break;
				case 2:
					sfx.doubleClear.play();
					break;
				case 3:
					sfx.tripleClear.play();
					break;
				default:
					sfx.quadClear.play();
			}
		}
	}
}
