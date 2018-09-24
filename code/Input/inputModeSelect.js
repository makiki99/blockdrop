var modeSelect = {
	substate : 0,
	currentSelection : 0,
	menuList: [
		{name:"Ranked", substate: 1},
		{name:"Unranked", substate: 2},
		{name:"Special", substate: 3},
		{name:"Endurance", substate: 4}
	],
	submenuList: [
		{
			statelist:[2,3,4,5,7],
			nameList:[
				"Easy",
				"Normal",
				"Hard",
				"Hyper",
				"Another",
			]
		},
		{
			statelist:[9,10,11,20,21,6,8],
			nameList:[
				"Time Attack",
				"200 lines",
				"Survival",
				"The Almost Death",
				"HELL",
				"Shadow",
				"Phantom",
			]
		},
		{
			statelist:[12,13,14,15],
			nameList:[
				"Blockflip",
				"Time Rush",
				"Claustrophobia",
				"Negative Shadow"
			]
		},
		{
			statelist:[16,17,18,19],
			nameList:[
				"Quadruple Clear",
				"Over 9000",
				"Half Marathon",
				"Marathon"
			]
		}
	]
};

function inputModeSelect() {

	if (keys[controls.keyCodes[10]]) {

		//enter
		if (modeSelect.substate === 0) {

			modeSelect.substate = modeSelect.menuList[modeSelect.currentSelection].substate;

		} else {

			showUpdateInfo = false;

			gamestate = modeSelect.submenuList[modeSelect.substate-1].statelist[modeSelect.currentSelection];

			//reset gamestate
			if (gamestate === 14) {
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
					[0,0,0,0,0,0,0,0,0,0]
				];
			} else {
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
			}
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
			if (gamestate === 13) {
				framecount = 5400;
			} else {
				framecount = 0;
			}
			countdown = 180;
			var randomNum = Math.floor(Math.random()*4+3);
			game.currentPiece = game.nextPiece;
			game.nextPiece = randomNum;
			game.history.splice(0,1);
			game.history.push(randomNum);
			modeClear = false;
			generatePiece("silent");
			timeAttack.speedLevel = 1;
			marathon.lineClears.single = 0;
			marathon.lineClears.double = 0;
			marathon.lineClears.triple = 0;
			marathon.lineClears.quad = 0;
			marathon.b2bBonus = 0;
			marathon.b2b = true;
			modeSelect.substate = 0;
			if (gamestate === 12) {
				canvas.style.transform = "scaleY(-1)";
			}
			currentProfile.playcount++;
			hell.garbage = 0;
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
