function inputMenu() {

  if (keys[13]) {
    //enter
    gamestate = menu.statelist[menu.currentSelection]

    if (gamestate == 3){
      //reset gamestate
      matrix = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,7,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,2,3,4,5,6,7]
      ],
      game.history = [0,1,0,1]
      var randomNum = Math.floor(Math.random()*4+3)
      game.currentPiece = game.nextPiece
      game.nextPiece = randomNum
      game.history.splice(0,1)
      game.history.push(randomNum)
      generatePiece()

    }

  }

  //TODO: maybe I should disable auto-repeat in main menu...
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
