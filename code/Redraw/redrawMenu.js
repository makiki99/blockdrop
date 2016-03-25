function redrawMenu() {

  var offX, offY;

  //screen clear
  ctx.fillStyle = "#000000";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  //menu selections
  ctx.font = tilesize*2 + "px 'Orbitron',monospace";
  ctx.fillStyle = "#ffffff";
  for (i = 0; i < menu.namelist.length; i++) {
    ctx.fillText(menu.namelist[i],tilesize*3,tilesize*(3+2*i));
  }

  //menu selector
  ctx.fillText(">",tilesize*1,tilesize*(3+menu.currentSelection*2));

  //version number
  ctx.font = tilesize/2 + "px sans-serif";
  ctx.fillText(version,0,tilesize/2);

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
