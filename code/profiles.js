var currentProfile = 0,
  profileList = [];

function loadProfiles() {
  profileList.join(new Profile("???"));
}

function saveProfiles() {

}

function Profile (name) {
  //constructor
  this.name = name;
  this.topScores = [];
  this.controls = [];
  this.rank = 0;
}
