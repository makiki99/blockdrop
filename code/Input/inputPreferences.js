var prefMenu = {
  currentSelection : 0,
  preflist : [false,false,2],
  namelist : [
    "Flip rotation buttons",
		"Show framerate",
		"Show level bar"
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
			case 1:
				prefMenu.preflist[1] = !prefMenu.preflist[1];
				break;
			case 2:
				prefMenu.preflist[2]++;
				if (prefMenu.preflist[2] > 2) {
					prefMenu.preflist[2] = 0;
				}
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