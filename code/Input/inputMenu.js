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

  if (keys[13]) {
    //enter
    gamestate = menu.statelist[menu.currentSelection];
    keys[13] = false;
  }

  if (keys[38]) {
    //up arrow
    menu.currentSelection--;
    if (menu.currentSelection < 0) {
      menu.currentSelection = menu.statelist.length-1;
    }
    keys[38] = false;
  }

  if (keys[40]) {
    //down arrow
    menu.currentSelection++;
    if (menu.currentSelection > menu.statelist.length-1) {
      menu.currentSelection = 0;
    }
    keys[40] = false;
  }

}
