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

	  if (keys[controls.keyCodes[10]]) {
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
	    keys[controls.keyCodes[10]] = false;
	  }

	  if (keys[controls.keyCodes[8]]) {
	    //up arrow
	    modeSelect.currentSelection--;
	    if (modeSelect.currentSelection < 0) {
	      modeSelect.currentSelection = modeSelect.statelist.length-1;
	    }
	    keys[controls.keyCodes[8]] = false;
	  }

	  if (keys[controls.keyCodes[9]]) {
	    //down arrow
	    modeSelect.currentSelection++;
	    if (modeSelect.currentSelection > modeSelect.statelist.length-1) {
	      modeSelect.currentSelection = 0;
	    }
	    keys[controls.keyCodes[9]] = false;
	  }

		if (keys[controls.keyCodes[11]]) {
	    //escape
	    gamestate = 0;
	  }

}
