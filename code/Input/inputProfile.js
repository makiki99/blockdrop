var profileMenu = {
	currentSelection : 0,
	menuNames : ["Play as guest","Load profile","Create new profile"],
	substate : 0,
	inputBuffer: ""
};
var isGuest = true;

function inputProfile() {
	switch (profileMenu.substate) {
		case 0:
			if (keys[13]) {
				// enter
				switch (profileMenu.currentSelection) {
					case 0:
						isGuest = true;
						controls.keyCodes = controls.defKeyCodes.slice();
						gamestate = 0;
						break;
					case 1:
						profileMenu.substate = 1;
						break;
					case 2:
						profileMenu.substate = 2;
						break;
					default:
						console.error("User clicked nonexistent button.");
				}
				keys[13] = false;
			}

			if (keys[38]) {
				//up arrow
				profileMenu.currentSelection--;
				if (profileMenu.currentSelection < 0) {
					profileMenu.currentSelection = profileMenu.menuNames.length-1;
				}
				keys[38] = false;
			}

			if (keys[40]) {
				//down arrow
				profileMenu.currentSelection++;
				if (profileMenu.currentSelection > profileMenu.menuNames.length-1) {
					profileMenu.currentSelection = 0;
				}
				keys[40] = false;
			}
			break;
		case 1:
			if (keys[13] && profileMenu.inputBuffer !== "") {
				keys[13] = false;
				if (checkProfile(profileMenu.inputBuffer)) {
					loadProfile(profileMenu.inputBuffer);
					isGuest = false;
					gamestate = 0;
					profileMenu.substate = 0;
				} else {
					profileMenu.substate = 3;
				}
			}
			if (keys[27]) {
				profileMenu.substate = 0;
				profileMenu.inputBuffer = "";
				keys[27] = false;
			}
			for (i = 48; i <= 90; i++) {
				if (keys[i]) {
					if(profileMenu.inputBuffer.length < 8){
						profileMenu.inputBuffer += String.fromCharCode(i);
					}
					keys[i] = false;
				}
			}
			if (keys[8]){
				profileMenu.inputBuffer = profileMenu.inputBuffer.slice(0,-1);
				keys[8] = false;
			}
			break;
		case 2:
			if (keys[13] && profileMenu.inputBuffer !== "") {
				keys[13] = false;
				if (checkProfile(profileMenu.inputBuffer)) {
					profileMenu.substate = 4;
				} else {
					createProfile(profileMenu.inputBuffer);
					isGuest = false;
					gamestate = 0;
					profileMenu.substate = 0;
				}
			}
			if (keys[27]) {
				profileMenu.substate = 0;
				profileMenu.inputBuffer = "";
				keys[27] = false;
			}
			for (i = 48; i <= 90; i++) {
				if (keys[i]) {
					if(profileMenu.inputBuffer.length < 8){
						profileMenu.inputBuffer += String.fromCharCode(i);
					}
					keys[i] = false;
				}
			}
			if (keys[8]){
				profileMenu.inputBuffer = profileMenu.inputBuffer.slice(0,-1);
				keys[8] = false;
			}
			break;
		case 3:
			if (keys[27]) {
				profileMenu.substate = 1;
				profileMenu.inputBuffer = "";
				keys[27] = false;
			}
			break;
		case 4:
			if (keys[27]) {
				profileMenu.substate = 2;
				profileMenu.inputBuffer = "";
				keys[27] = false;
			}
			break;

	}

}

var currentProfile = {};
	profileList = [];

function checkProfile(name) {
	if (localStorage["BLOCKDROP_"+name] !== undefined) {
		return true;
	} else {
		return false;
	}
}

function loadProfile(name) {
	if (localStorage["BLOCKDROP_"+name] !== undefined) {
		currentProfile = JSON.parse(localStorage["BLOCKDROP_"+name]);
	}
	controls.keyCodes = controls.defKeyCodes.slice();
	if (currentProfile.controls === undefined) {
		currentProfile.controls = controls.defKeyCodes.slice();
	}
	for (i = 0; i < controls.keyCodes.length; i++) {
		if (currentProfile.controls[i] !== undefined) {
			controls.keyCodes[i] = currentProfile.controls[i];
		} else {
			controls.keyCodes[i] = controls.defKeyCodes[i];
		}
	}
	prefMenu.preflist = prefMenu.defPreflist.slice();
	if (currentProfile.preferences === undefined) {
		currentProfile.preferences = prefMenu.defPreflist.slice();
	}
	for (i = 0; i < prefMenu.preflist.length; i++) {
		if (currentProfile.preferences[i] !== undefined) {
			prefMenu.preflist[i] = currentProfile.preferences[i];
		} else {
			prefMenu.preflist[i] = prefMenu.defPreflist[i];
		}
	}
	if (currentProfile.topScores.length >= 10) {
		submitScore(0);
	}
	if (currentProfile.playcount === undefined) {
		currentProfile.playcount = 0;
	}
	saveProfile(name);
	Howler.volume(prefMenu.preflist[5]/100);
}

function saveProfile(name) {
	profileMenu.inputBuffer = "";
	if (!isGuest) {
		localStorage["BLOCKDROP_"+name] = JSON.stringify(currentProfile);
	}
}

function createProfile(name) {
	currentProfile = new Profile(name);
	loadProfile(name);
}

function submitScore(score) {
	function compareNumbers(a, b) {
		return b - a;
	}
	if (!isGuest){
		if (currentProfile.topScores.length < 10) {
			currentProfile.topScores.push(score);
		} else {
			var sum = 0;
			if (score > currentProfile.topScores[9]) {
				currentProfile.topScores.splice(9,1,score);
			}
			for (i = 0; i < currentProfile.topScores.length; i++) {
				switch (i) {
					case 0:
						sum += currentProfile.topScores[i]*18;
						break;
					case 1:
						sum += currentProfile.topScores[i]*14;
						break;
					case 2:
						sum += currentProfile.topScores[i]*12;
						break;
					case 3:
						sum += currentProfile.topScores[i]*11;
						break;
					case 4:
						sum += currentProfile.topScores[i]*10;
						break;
					case 5:
						sum += currentProfile.topScores[i]*9;
						break;
					case 6:
						sum += currentProfile.topScores[i]*8;
						break;
					case 7:
						sum += currentProfile.topScores[i]*7;
						break;
					case 8:
						sum += currentProfile.topScores[i]*6;
						break;
					case 9:
						sum += currentProfile.topScores[i]*5;
						break;
					default:

				}
			}
			sum /= 100;
			updateGrade(sum);
		}
		currentProfile.topScores.sort(compareNumbers);
		saveProfile(currentProfile.name);
	}
}

function updateGrade(rankPoints) {
	var gradeSelector = -1;
	while (rankPoints >= grade[gradeSelector+1][2]) {
		gradeSelector++;
		if (grade[gradeSelector+1] === undefined) {
			break;
		}
	}
	currentProfile.grade = gradeSelector;
}

function Profile(name) {
	//constructor
	this.name = name;
	this.topScores = [];
	this.grade = 0;
	this.playcount = 0;
	this.controls = controls.defKeyCodes.slice();
	this.preferences = prefMenu.preflist.slice();
}
