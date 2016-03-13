var menu = {
  currentSelection : 0,
  statelist : [3,4,1],
  namelist : [
    "Classic | Normal",
    "Classic | Hard",
    "Controls"
  ]
}

function inputMenu() {

  if (keys[13]) {
    //enter
    gamestate = menu.statelist[menu.currentSelection]

    if (gamestate == 2 || gamestate == 3 || gamestate == 4){
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
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
      ],
      deadFrame = 0
      game.history = [0,1,0,1]
      game.level = 1
      game.score = 0
      speedLevel = 0
      dasFrameLeft = 0
      dasFrameRight = 0
      areFrame = 60
      lockframe = 0
      var randomNum = Math.floor(Math.random()*4+3)
      game.currentPiece = game.nextPiece
      game.nextPiece = randomNum
      game.history.splice(0,1)
      game.history.push(randomNum)
      generatePiece()
    }
    keys[13] = false

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
