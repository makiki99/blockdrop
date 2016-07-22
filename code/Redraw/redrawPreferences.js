function redrawPreferences() {

	var offX, offY;

	//screen clear
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	//selections
	ctx.font = tilesize + "px 'Orbitron',monospace";
	ctx.fillStyle = "#ffffff";
	for (var i = 0; i < prefMenu.preflist.length; i++) {
		ctx.fillText(prefMenu.namelist[i],tilesize*2,tilesize*(2+i));
	}

	//options
	ctx.fillStyle = "#ffffff";
	for (i = 0; i < prefMenu.preflist.length; i++) {
		var prefString = "";
		if (i === 0 || i === 1 || i === 3) {
			if (prefMenu.preflist[i]) {
				prefString = "Yes";
			} else {
				prefString = "No";
			}
		}
		if (i === 2) {
			if (prefMenu.preflist[i] === 0) {
				prefString = "Left";
			} else if (prefMenu.preflist[i] === 1) {
				prefString = "Right";
			} else {
				prefString = "None";
			}
		}
		if (i === 4) {
			prefString = prefMenu.preflist[4];
			for (ii = 0; ii < tiles[prefMenu.preflist[4]].length; ii++) {
				ctx.drawImage(tiles[prefMenu.preflist[4]][ii],tilesize*(16+ii),tilesize*(2+i-1)+3);
			}
		}
		if (i === 5) {
			prefString = prefMenu.preflist[5];
		}
		ctx.fillText(prefString,tilesize*15,tilesize*(2+i));
	}

	//selector
	ctx.fillText(">",tilesize*1,tilesize*(2+prefMenu.currentSelection));

}
