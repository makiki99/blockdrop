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
