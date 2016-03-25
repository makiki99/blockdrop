var profileMenu = {
  currentSelection : 0,
  menuNames : ["Play as guest","Load profile","Create new profile"],
  substate : 0,
  inputBuffer: ""
};

function inputProfile() {
  switch (profileMenu.substate) {
    case 0:
      if (keys[13]) {
        // enter
        switch (profileMenu.currentSelection) {
          case 0:
            isGuest = true;
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

var currentProfile = {},
  isGuest = true,
  profileList = [];

function checkProfile(name) {
  if (localStorage[name] !== undefined) {
    return true;
  } else {
    return false;
  }
}

function loadProfile(name) {
  currentProfile = JSON.parse(localStorage[name]);
}

function saveProfile(name) {
  localStorage[name] = JSON.stringify(currentProfile);
}

function createProfile(name) {
  currentProfile = new Profile(name);
  saveProfile(name);
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
        for (i = 0; i < currentProfile.topScores.length; i++) {
          sum += currentProfile.topScores[i];
        }
        sum /= 10;
      }
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
}
