var menu = {
  currentSelection : 0,
  statelist : [-3,/*2,3,4,5,6,*/1,-2,-1],
  namelist : [
		"Start Game",
    // "Easy",
    // "Normal",
    // "Hard",
    // "Hyper",
		// "Shadow",
    "Controls",
    "Preferences",
    "Switch profile"
  ]
}, countdown = 0;

function inputMenu() {

  if (keys[controls.keyCodes[10]]) {
    //enter
    gamestate = menu.statelist[menu.currentSelection];
    keys[controls.keyCodes[10]] = false;
  }

  if (keys[controls.keyCodes[8]]) {
    //up arrow
    menu.currentSelection--;
    if (menu.currentSelection < 0) {
      menu.currentSelection = menu.statelist.length-1;
    }
    keys[controls.keyCodes[8]] = false;
  }

  if (keys[controls.keyCodes[9]]) {
    //down arrow
    menu.currentSelection++;
    if (menu.currentSelection > menu.statelist.length-1) {
      menu.currentSelection = 0;
    }
    keys[controls.keyCodes[9]] = false;
  }

}
