var prefMenu = {
  currentSelection : 0,
  preflist : [false],
  namelist : [
    "Flip rotation buttons"
  ]
};

function inputPreferences() {
  if (keys[38]) {
    //up arrow
    prefMenu.currentSelection--;
    if (prefMenu.currentSelection < 0) {
      prefMenu.currentSelection = prefMenu.preflist.length-1;
    }
    keys[38] = false;
  }

  if (keys[40]) {
    //down arrow
    prefMenu.currentSelection++;
    if (prefMenu.currentSelection > prefMenu.preflist.length-1) {
      prefMenu.currentSelection = 0;
    }
    keys[40] = false;
  }

  if (keys[13]) {
    //enter
    switch (prefMenu.currentSelection) {
      case 0:
        prefMenu.preflist[0] = !prefMenu.preflist[0];
        break;
      default:

    }
    keys[13] = false;
  }

  if (keys[27]) {
    //escape
    gamestate = 0;
  }
}
