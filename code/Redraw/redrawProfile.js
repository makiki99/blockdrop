function redrawProfile() {

	var offX, offY;

	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	if (profileMenu.substate === 0) {
		ctx.font = tilesize*2 + "px 'Orbitron',monospace";
		ctx.fillStyle = "#ffffff";
		for (i = 0; i < profileMenu.menuNames.length; i++) {
			ctx.fillText(profileMenu.menuNames[i],tilesize*3,tilesize*(3+2*i));
		}

		ctx.fillText(">",tilesize*1,tilesize*(3+profileMenu.currentSelection*2));

		ctx.font = tilesize/2 + "px sans-serif";
	}

	if (profileMenu.substate === 1 || profileMenu.substate === 2) {
		ctx.font = tilesize*2 + "px 'Orbitron',monospace";
		ctx.fillStyle = "#ffffff";
		ctx.fillText("Enter profile name:",tilesize*3,tilesize*5);
		ctx.fillText(profileMenu.inputBuffer,tilesize*3,tilesize*8);
	}

	if (profileMenu.substate === 3) {
		ctx.font = tilesize*2 + "px 'Orbitron',monospace";
		ctx.fillStyle = "#ffffff";
		ctx.fillText("Profile not found.",tilesize*3,tilesize*8);
	}

	if (profileMenu.substate === 4) {
		ctx.font = tilesize*2 + "px 'Orbitron',monospace";
		ctx.fillStyle = "#ffffff";
		ctx.fillText("There is already",tilesize*3,tilesize*7);
		ctx.fillText("a profile with",tilesize*5,tilesize*9.5);
		ctx.fillText("this name.",tilesize*6.5,tilesize*12);
	}

}
