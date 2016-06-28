function redrawControls() {

	var offX, offY;

	//screen clear
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	//selections
	ctx.font = tilesize + "px 'Orbitron',monospace";
	for (i = 0; i < controls.namelist.length; i++) {
		if (isChangingKeyCode && i==controls.currentSelection) {
			ctx.fillStyle = "#88ff88";
		} else {
			ctx.fillStyle = "#ffffff";
		}
		ctx.fillText(controls.namelist[i],tilesize*2,tilesize*(2+i));
	}

	ctx.fillStyle = "#ffffff";
	for (i = 0; i < controls.namelist.length; i++) {
		ctx.fillText(controls.keyCodes[i],tilesize*15,tilesize*(2+i));
	}

	//selector
	ctx.fillText(">",tilesize*1,tilesize*(2+controls.currentSelection));

	//hints
	if (isChangingKeyCode) {
		ctx.fillText("Changing keybind...",tilesize*1,tilesize*20);
		ctx.fillText("Escape - cancel",tilesize*1,tilesize*21);
	} else {
		ctx.fillText("Up/Down arrows - move selection",tilesize*1,tilesize*20);
		ctx.fillText("Enter - select keybind",tilesize*1,tilesize*21);
		ctx.fillText("Escape - go back to main menu",tilesize*1,tilesize*22);
	}

}

function getKeyname(x) {
	//aaa
}
