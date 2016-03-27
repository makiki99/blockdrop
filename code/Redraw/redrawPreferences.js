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

  ctx.fillStyle = "#ffffff";
  for (i = 0; i < prefMenu.preflist.length; i++) {
    ctx.fillText(prefMenu.preflist[i],tilesize*15,tilesize*(2+i));
  }

  //selector
  ctx.fillText(">",tilesize*1,tilesize*(2+prefMenu.currentSelection));

  //name
  ctx.font = tilesize/2 + "px sans-serif";
  if (!isGuest) {
    ctx.fillText("PLAYER:",tilesize*13,tilesize/2);
    ctx.fillText(currentProfile.name,tilesize*16,tilesize/2);
    ctx.fillText("GRADE:",tilesize*13,tilesize);
    ctx.fillStyle = grade[currentProfile.grade][0];
    ctx.fillText(grade[currentProfile.grade][1],tilesize*16,tilesize);
  }

}
