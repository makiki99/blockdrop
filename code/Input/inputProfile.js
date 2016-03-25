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
      if (keys[13]) {
        keys[13] = false;
      }
      if (keys[27]) {
        profileMenu.substate = 0;
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
      break;
    case 2:
      //dfd
      break;
    default:

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

function Profile(name) {
  //constructor
  this.name = name;
  this.topScores = [];
  this.grade = 0;
}
