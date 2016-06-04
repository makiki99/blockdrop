var modeSelect = {
	substate : 0,
  currentSelection : 0,
	menuList: [
		{name:"Ranked", substate: 1},
		{name:"Unranked", substate: 2}
	],
	submenuList: [
		{
			statelist:[2,3,4,5,7,6,8],
			nameList:[
				"Easy",
		    "Normal",
		    "Hard",
		    "Hyper",
				"Another",
				"Shadow",
				"Phantom",
			]
		},
		{
			statelist:[9,10],
			nameList:[
				"Time Attack",
				"200 lines"
			]
		},
	],

};

function inputModeSelect() {

	if (keys[controls.keyCodes[10]]) {

		//enter
		if (modeSelect.substate === 0) {

			modeSelect.substate = modeSelect.menuList[modeSelect.currentSelection].substate;

		} else {

			gamestate = modeSelect.submenuList[modeSelect.substate-1].statelist[modeSelect.currentSelection];

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
			if (gamestate === 10) {
				game.level = 0;
			} else {
				game.level = 1;
			}
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
			timeAttack.speedLevel = 1;
			marathon.lineClears.single = 0;
			marathon.lineClears.double = 0;
			marathon.lineClears.triple = 0;
			marathon.lineClears.quad = 0;
			marathon.b2bBonus = 0;
			marathon.b2b = true;
			modeSelect.substate = 0;

		}

		keys[controls.keyCodes[10]] = false;
		modeSelect.currentSelection = 0;

	}

	  if (keys[controls.keyCodes[8]]) {
			//up arrow
			modeSelect.currentSelection--;
			if (modeSelect.substate === 0) {
				if (modeSelect.currentSelection < 0) {
					modeSelect.currentSelection = modeSelect.menuList.length-1;
				}
			} else {
				if (modeSelect.currentSelection < 0) {
					modeSelect.currentSelection = modeSelect.submenuList[modeSelect.substate-1].statelist.length-1;
				}
			}
	    keys[controls.keyCodes[8]] = false;
	  }

	  if (keys[controls.keyCodes[9]]) {
			//down arrow
			modeSelect.currentSelection++;
			if (modeSelect.substate === 0) {
				if (modeSelect.currentSelection > modeSelect.menuList.length-1) {
					modeSelect.currentSelection = 0;
				}
			} else {
				if (modeSelect.currentSelection > modeSelect.submenuList[modeSelect.substate-1].statelist.length-1) {
					modeSelect.currentSelection = 0;
				}
			}
			keys[controls.keyCodes[9]] = false;
	  }

		if (keys[controls.keyCodes[11]]) {
	    //escape
			if (modeSelect.substate === 0) {
				gamestate = 0;
			} else {
				modeSelect.substate = 0;
			}

			modeSelect.currentSelection = 0;
			keys[controls.keyCodes[11]] = false;
	  }

}
