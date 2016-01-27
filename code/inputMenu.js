function inputMenu() {

  if (keys[13]) {
    //enter
    gamestate = menu.statelist[menu.currentSelection]
  }

  if (keys[38]) {
    //up arrow
    menu.currentSelection--
    if (menu.currentSelection < 0) {
      menu.currentSelection = menu.statelist.length-1
    }
    keys[38] = false
  }

  if (keys[40]) {
    //down arrow
    menu.currentSelection++
    if (menu.currentSelection > menu.statelist.length-1) {
      menu.currentSelection = 0
    }
    keys[40] = false
  }

}
