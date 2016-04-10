var prefMenu = {
  currentSelection : 0,
  defPreflist : [false,false,2,true],
	preflist : [false,false,2,true],
  namelist : [
    "Flip rotation buttons",
		"Show framerate",
		"Show level bar",
		"Force 60 FPS"
  ]
};

function inputPreferences() {
  if (keys[controls.keyCodes[8]]) {
    //up arrow
    prefMenu.currentSelection--;
    if (prefMenu.currentSelection < 0) {
      prefMenu.currentSelection = prefMenu.preflist.length-1;
    }
    keys[controls.keyCodes[8]] = false;
  }

  if (keys[controls.keyCodes[9]]) {
    //down arrow
    prefMenu.currentSelection++;
    if (prefMenu.currentSelection > prefMenu.preflist.length-1) {
      prefMenu.currentSelection = 0;
    }
    keys[controls.keyCodes[9]] = false;
  }

  if (keys[controls.keyCodes[10]]) {
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
			case 3:
				prefMenu.preflist[3] = !prefMenu.preflist[3];
				break;
      default:

    }
		currentProfile.preferences = prefMenu.preflist.slice();
		saveProfile(currentProfile.name);
    keys[controls.keyCodes[10]] = false;
  }

  if (keys[controls.keyCodes[11]]) {
    //escape
    gamestate = 0;
  }
}
