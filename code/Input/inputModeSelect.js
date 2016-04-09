var modeSelect = {
  currentSelection : 0,
  statelist : [2,3,4,5,7,6,8],
  namelist : [
    "Easy",
    "Normal",
    "Hard",
    "Hyper",
		"Another",
		"Shadow",
		"Phantom"
  ]
};

function inputModeSelect() {

	  if (keys[13]) {
	    //enter
	    gamestate = modeSelect.statelist[modeSelect.currentSelection];

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
	    modeSelect.currentSelection--;
	    if (modeSelect.currentSelection < 0) {
	      modeSelect.currentSelection = modeSelect.statelist.length-1;
	    }
	    keys[38] = false;
	  }

	  if (keys[40]) {
	    //down arrow
	    modeSelect.currentSelection++;
	    if (modeSelect.currentSelection > modeSelect.statelist.length-1) {
	      modeSelect.currentSelection = 0;
	    }
	    keys[40] = false;
	  }

		if (keys[27]) {
	    //escape
	    gamestate = 0;
	  }

}
