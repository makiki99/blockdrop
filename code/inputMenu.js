function inputMenu() {

  if (keys[13]) {
    //enter
    gamestate = menu.statelist[menu.currentSelection]

    //reset gamestate logic
    if (gamestate == 3){

      // game.history = [0,1,0,1]
      // game.nextPieces = [0,0,0]
      // //first piece can't be S, Z or O
      // //it also doesn't modify history
      // game.currentPiece = Math.floor(Math.random()*5)+2
      // game.currentRotation = 0
      // //generate next 3 pieces
      // //for loop would be a stupid idea here IMO
      // generatePiece()
      // generatePiece()
      // generatePiece()

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
