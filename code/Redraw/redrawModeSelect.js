function redrawModeSelect() {

		var offX, offY;

		//screen clear
		ctx.fillStyle = "#000000";
		ctx.fillRect(0,0,canvas.width,canvas.height);

		//menu selections
		ctx.font = tilesize*2 + "px 'Orbitron',monospace";
		ctx.fillStyle = "#ffffff";
		if (modeSelect.substate === 0) {
			for (i = 0; i < modeSelect.menuList.length; i++) {
				ctx.fillText(modeSelect.menuList[i].name,tilesize*3,tilesize*(3+2*i));
			}
		} else {
			for (i = 0; i < modeSelect.submenuList[modeSelect.substate-1].nameList.length; i++) {
				ctx.fillText(modeSelect.submenuList[modeSelect.substate-1].nameList[i],tilesize*3,tilesize*(3+2*i));
			}
		}

		//menu selector
		ctx.fillText(">",tilesize*1,tilesize*(3+modeSelect.currentSelection*2));

}
