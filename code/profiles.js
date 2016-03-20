var currentProfile = 0,
  profileList = [];

function loadProfiles() {
  if (localStorage.blockdropProfiles !== undefined) {
    profileList = JSON.parse(localStorage.blockdropProfiles);
  } else {
    profileList.push(new Profile("???"));
  }
}

function saveProfiles() {
  localStorage.blockdropProfiles = JSON.stringify(profileList);
}

function Profile (name) {
  //constructor
  this.name = name;
  this.topScores = [];
  this.controls = [];
  this.rank = 0;
}
