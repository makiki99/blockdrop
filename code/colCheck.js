function colCheck(newPosY, newPosX, newRotation) {
	for (i=0; i < 4; i++) {
		var x = minoData[game.currentPiece]["rotation"+newRotation][i][0]+newPosX;
		var y = minoData[game.currentPiece]["rotation"+newRotation][i][1]+newPosY;
		if (x < 0 || x > 9 || y >= matrix.length) {
			return true; //bounduary collision detected
		} else {
			if (matrix[y] !== undefined) {
				if (matrix[y][x] > 0){
					return true; //block-to-block collision detected
				}
			}
		}
	}
	 return false; //no collision detected
}
