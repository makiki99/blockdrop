var lineClearAnim = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	drawGhost = true,
	modeClear = false,
	invisMode = false,
	nextBuffer = 0;

function redrawClassic() {

	var offX, offY;

	//screen clear
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	//mode name
	offX = 16;
	offY = 13;

	ctx.fillStyle = "#ffffff";
	ctx.font = tilesize + "px 'Orbitron',monospace";
	ctx.textAlign = "center";
	(function() {
		switch (gamestate) {
			case 2:
				ctx.fillText("Easy",offX*tilesize,offY*tilesize);
				break;
			case 3:
				ctx.fillText("Normal",offX*tilesize,offY*tilesize);
				break;
			case 4:
				ctx.fillText("Hard",offX*tilesize,offY*tilesize);
				break;
			case 5:
				ctx.fillText("Hyper",offX*tilesize,offY*tilesize);
				break;
			case 6:
				ctx.fillText("Shadow",offX*tilesize,offY*tilesize);
				break;
			case 7:
				ctx.fillText("Another",offX*tilesize,offY*tilesize);
				break;
			case 8:
				ctx.fillText("Phantom",offX*tilesize,offY*tilesize);
				break;
			case 9:
				ctx.fillText("Time Attack",offX*tilesize,offY*tilesize);
				break;
			case 10:
				ctx.fillText("200 lines",offX*tilesize,offY*tilesize);
				break;
			case 11:
				ctx.fillText("Survival",offX*tilesize,offY*tilesize);
				break;
			case 12:
				ctx.fillText("Blockflip",offX*tilesize,offY*tilesize);
				break;
			case 13:
				ctx.fillText("Time Rush",offX*tilesize,offY*tilesize);
				break;
			case 14:
				ctx.fillText("Claustrophobia",offX*tilesize,offY*tilesize);
				break;
			case 15:
				ctx.fillText("Neg. Shadow",offX*tilesize,offY*tilesize);
				break;
			default:
				ctx.fillText("ERROR",offX*tilesize,offY*tilesize);
		}
	}());

	//level
	offX = 16;
	offY = 15;

	if (gamestate === 10) {
		ctx.fillText("LINE",offX*tilesize,offY*tilesize);
	} else if (gamestate === 11) {
		// draw nuttin'
	} else {
		ctx.fillText("LVL",offX*tilesize,offY*tilesize);
	}
	if (gamestate !== 11) {
		ctx.fillText(game.level,offX*tilesize,(offY+1.5)*tilesize);
	}

	ctx.textAlign = "left";

	//matrix and minos
	offX = 2;
	offY = 1;

	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth = 3;
	if (gamestate === 14) {
		ctx.strokeRect(offX*tilesize,(offY-2)*tilesize,tilesize*10,tilesize*12);
	} else {
		ctx.strokeRect(offX*tilesize,(offY-2)*tilesize,tilesize*10,tilesize*22);
	}
	ctx.strokeStyle = "#ff0000";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(offX*tilesize,offY*tilesize);
	ctx.lineTo((offX+10)*tilesize,offY*tilesize);
	ctx.stroke();

	if (countdown <= 0) {

		//placed pieces
		(function() {
			if (!invisMode || deadFrame > 0) {
				for (x = 0; x < 10; x++) {
					for (y = 0; y < matrix.length; y++) {
						if (matrix[y][x] > 0) {
							if (deadFrame === 0){
								ctx.drawImage(tiles[prefMenu.preflist[4]][matrix[y][x]-1],(x+offX)*tilesize,(y+offY)*tilesize);
							} else {
								ctx.drawImage(tiles[prefMenu.preflist[4]][7],(x+offX)*tilesize,(y+offY)*tilesize);
							}
						}
					}
				}
			}
		}());

		(function() {
			//ghost piece
			if (gamestate === 15) {
				return;
			}
			if (areFrame <= 0 && drawGhost) {
				var ghostPos = [0,0];
				ghostPos[0] = game.piecePos[0];
				ghostPos[1] = game.piecePos[1];
				while (!colCheck(ghostPos[0]+1, ghostPos[1], game.currentRotation)) {
					ghostPos[0] += 1;
				}
				if (ghostPos != game.piecePos) {
					ctx.strokeStyle = "#aaaaaa";
					ctx.lineWidth = 2;
					for (i = 0; i < 4; i++) {
						var x = minoData[game.currentPiece]["rotation"+game.currentRotation][i][0]+ghostPos[1];
						var y = minoData[game.currentPiece]["rotation"+game.currentRotation][i][1]+ghostPos[0];
						if (deadFrame === 0){
							ctx.strokeRect(tilesize*(offX+x)+2,tilesize*(offY+y)+2,tilesize-4,tilesize-4);
						}
					}
				}
			}
		}());

		(function() {
			//current piece
			if (gamestate === 15) {
				return;
			}
			if (areFrame <= 0) {
				for (i = 0; i < 4; i++) {

					var x = minoData[game.currentPiece]["rotation"+game.currentRotation][i][0]+game.piecePos[1];
					var y = minoData[game.currentPiece]["rotation"+game.currentRotation][i][1]+game.piecePos[0];

					if (deadFrame === 0){
						ctx.drawImage(tiles[prefMenu.preflist[4]][minoData[game.currentPiece].color-1],(x+offX)*tilesize,(y+offY)*tilesize);
					} else {
						ctx.drawImage(tiles[prefMenu.preflist[4]][7],(x+offX)*tilesize,(y+offY)*tilesize);
					}

				}
			}
		}());

		//line clear animation
		for (i = 0; i < lineClearAnim.length; i++) {
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(tilesize*offX,tilesize*(offY+i+(0.1*(5-lineClearAnim[i]))),tilesize*10,tilesize*(0.2*lineClearAnim[i]));
			if (lineClearAnim[i] > 0) {
				lineClearAnim[i]--;
			}
		}


		//lock delay bar
		if (deadFrame === 0) {
			offX = 2;
			if (gamestate === 14) {
				offY = 11;
			} else {
				offY = 21;
			}
			ctx.fillStyle = "#00ff00";
			ctx.fillRect(offX*tilesize,offY*tilesize+6,(tilesize*10)*(lockdelay-lockframe)/lockdelay,4);
		}

		(function() {
			//timer
			var minutes = (Math.floor(framecount / 3600)).toString();
			var seconds = (Math.floor((framecount % 3600) / 60)).toString();
			var centiseconds = (Math.floor((framecount % 60)*10/6)).toString();
			if (minutes.length === 1) {
				minutes = "0" + minutes;
			}
			if (seconds.length === 1) {
				seconds = "0" + seconds;
			}
			if (centiseconds.length === 1) {
				centiseconds = "0" + centiseconds;
			}
			offX = 4.5;
			if (gamestate === 14) {
				offY = 12.5;
			} else {
				offY = 22.5;
			}
			ctx.font = tilesize + "px 'Orbitron',monospace";
			ctx.fillStyle = "#ffffff";
			ctx.fillText(minutes+":"+seconds+"."+centiseconds,tilesize*offX,tilesize*offY);
		}());
	}

	//next piece
	offX = 15;
	offY = 2.5;
	for (i = 0; i < 4; i++) {
		x = minoData[nextBuffer].rotation0[i][0];
		y = minoData[nextBuffer].rotation0[i][1];
		if (areFrame > 0 || countdown > 0) {
			nextBuffer = game.currentPiece;
		} else {
			nextBuffer = game.nextPiece;
		}
		ctx.drawImage(tiles[prefMenu.preflist[4]][minoData[nextBuffer].color-1],(x+offX)*tilesize,(y+offY)*tilesize);
	}

	//countdown
	offX = 5.5;
	offY = 10;
	ctx.font = tilesize*3 + "px 'Orbitron',monospace";
	ctx.fillStyle = "#ffffff";
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 8;
	if (countdown > 0 && countdown < 60) {
		ctx.strokeText("1",tilesize*offX,tilesize*offY);
		ctx.fillText("1",tilesize*offX,tilesize*offY);
	}
	if (countdown > 60 && countdown < 120) {
		ctx.strokeText("2",tilesize*offX,tilesize*offY);
		ctx.fillText("2",tilesize*offX,tilesize*offY);
	}
	if (countdown > 120) {
		ctx.strokeText("3",tilesize*offX,tilesize*offY);
		ctx.fillText("3",tilesize*offX,tilesize*offY);
	}

	//GAME OVER/CLEAR sign
	if (deadFrame > 30) {
		ctx.font = tilesize + "px 'Orbitron',monospace";
		ctx.fillStyle = "#ffffff";
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 6;
		if (modeClear) {
			ctx.strokeText("MODE CLEAR",tilesize*3,tilesize*9);
			ctx.fillText("MODE CLEAR",tilesize*3,tilesize*9);
		} else {
			ctx.strokeText("GAME OVER",tilesize*3.5,tilesize*9);
			ctx.fillText("GAME OVER",tilesize*3.5,tilesize*9);
		}
	}

	//level bar
	ctx.fillStyle = "#00ffff";
	if (prefMenu.preflist[2] === 0){
		offX = 1.5;
	} else if (prefMenu.preflist[2] === 1) {
		offX = 12.25;
	}
	offY = 1;
	if (countdown < 0 && prefMenu.preflist[2] < 2){
		if (gamestate === 9) {
			ctx.fillRect(offX*tilesize,(offY+(20-0.2*(game.level/3)))*tilesize,4,0.2*(game.level/3)*tilesize);
		} else if (gamestate === 10) {
			ctx.fillRect(offX*tilesize,(offY+(20-0.2*(game.level/2)))*tilesize,4,0.2*(game.level/3)*tilesize);
		} else if (gamestate === 11) {
			// draw nuttin'
		} else if (gamestate === 14) {
			ctx.fillRect(offX*tilesize,(offY+(10-0.1*(game.level % 100)))*tilesize,4,0.1*(game.level % 100)*tilesize);
		} else {
			ctx.fillRect(offX*tilesize,(offY+(20-0.2*(game.level % 100)))*tilesize,4,0.2*(game.level % 100)*tilesize);
		}
	}

	//score
	if (deadFrame > 60 && (gamestate <= 8 || gamestate === 10)) {
		ctx.font = tilesize + "px 'Orbitron',monospace";
		ctx.fillStyle = "#ffffff";
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 6;
		ctx.strokeText("SCORE: " +Math.floor(game.score),tilesize*3.5,tilesize*11);
		ctx.fillText("SCORE: " + Math.floor(game.score),tilesize*3.5,tilesize*11);
	}

	//debug.showScore
	if (debug.showScore) {
		ctx.font = tilesize + "px 'Orbitron',monospace";
		ctx.fillStyle = "#ffffff";
		ctx.fillText("SCORE: " + game.score,tilesize*14,tilesize*18);
	}

}
