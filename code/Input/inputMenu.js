var menu = {
  currentSelection : 0,
  statelist : [2,3,4,5,6,1,-2,-1],
  namelist : [
    "Easy",
    "Normal",
    "Hard",
    "Hyper",
		"Shadow",
    "Controls",
    "Preferences",
    "Switch profile"
  ]
}, countdown = 0;

function inputMenu() {

  if (keys[13]) {
    //enter
    gamestate = menu.statelist[menu.currentSelection];

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
    ];
    deadFrame = 0;
    game.history = [0,1,0,1];
    game.level = 1;
    game.score = 0;
    speedLevel = 0;
    dasFrameLeft = 0;
    dasFrameRight = 0;
    areFrame = 0;
    lockframe = 0;
    framecount = 0;
    countdown = 180;
    var randomNum = Math.floor(Math.random()*4+3);
    game.currentPiece = game.nextPiece;
    game.nextPiece = randomNum;
    game.history.splice(0,1);
    game.history.push(randomNum);
    modeClear = false;
    generatePiece();
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
