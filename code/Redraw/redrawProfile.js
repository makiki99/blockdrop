function redrawProfile() {

    var offX, offY;

    //screen clear
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //profile selections
    ctx.font = tilesize*2 + "px 'Orbitron',monospace";
    ctx.fillStyle = "#ffffff";
    for (i = 0; i < profileList.length; i++) {
      ctx.fillText(profileList[i].name,tilesize*3,tilesize*(3+2*i));
    }

    //menu selector
    ctx.fillText(">",tilesize*1,tilesize*(3+menu.currentSelection*2));

    //version number
    ctx.font = tilesize/2 + "px sans-serif";
    ctx.fillText(version,0,tilesize/2);

}
