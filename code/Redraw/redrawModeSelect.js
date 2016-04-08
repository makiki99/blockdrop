function redrawModeSelect() {

	  var offX, offY;

	  //screen clear
	  ctx.fillStyle = "#000000";
	  ctx.fillRect(0,0,canvas.width,canvas.height);

	  //menu selections
	  ctx.font = tilesize*2 + "px 'Orbitron',monospace";
	  ctx.fillStyle = "#ffffff";
	  for (i = 0; i < modeSelect.namelist.length; i++) {
	    ctx.fillText(modeSelect.namelist[i],tilesize*3,tilesize*(3+2*i));
	  }

	  //menu selector
	  ctx.fillText(">",tilesize*1,tilesize*(3+modeSelect.currentSelection*2));

}
