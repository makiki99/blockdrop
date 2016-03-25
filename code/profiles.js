var currentProfile = {},
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
