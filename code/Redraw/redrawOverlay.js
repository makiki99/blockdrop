function redrawOverlay() {

  var offX, offY;

  //version number
  (function() {
    ctx.font = tilesize/2 + "px sans-serif";
    ctx.fillText(version,0,tilesize/2);
  }());

  //FPS counter
  (function() {
    if (prefMenu.preflist[1]){
				offX = 20.5;
	    offY = 23.5;
	    ctx.font = tilesize/2 + "px 'Orbitron',monospace";
	    ctx.fillText("FPS: "+fps,offX*tilesize,offY*tilesize);
		}
  }());

  //name
  (function() {
    offX = 13;
    offY = 23;
    ctx.font = tilesize/2 + "px sans-serif";
    if (!isGuest && gamestate !== -1) {
      ctx.fillText("PLAYER:",tilesize*offX,tilesize*offY);
      ctx.fillText(currentProfile.name,tilesize*(offX+3),tilesize*offY);
      ctx.fillText("GRADE:",tilesize*offX,tilesize*(offY+0.5));
      ctx.fillStyle = grade[currentProfile.grade][0];
      ctx.fillText(grade[currentProfile.grade][1],tilesize*(offX+3),tilesize*(offY+0.5));
    }
  }());

}
