var version = "v0.5.3",
  debug = {
    //debug toogles
    showScore: false
  },
  keys = [],
  matrix = [],
  gamestate = -1,
  framecount = 0,
  game = {
    currentPiece: 0,
    currentRotation: 0,
    piecePos: [1,4],
    nextPiece: 0,
    history: [0,1,1,0],
    level: 1,
    score: 0
  };

//canvas variables
var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  tilesize = 24;

canvas.width = tilesize*24;
canvas.height = tilesize*24;

//asset containers
var tiles;

function main() {
  checkFramerate();
  //update logic
  switch (gamestate) {

    case -2:
      inputPreferences();
      redrawPreferences();
      break;
    case -1:
      inputProfile();
      redrawProfile();
      break;
    case 0:
      //main menu (duh!)
      inputMenu();
      redrawMenu();
      break;
    case 1:
      //controls
      inputControls();
      redrawControls();
      break;
    case 2:
      inputClassic(easy);
      redrawClassic();
      break;
    case 3:
      inputClassic(normal);
      redrawClassic();
      break;
    case 4:
      inputClassic(hard);
      redrawClassic();
      break;
    case 5:
      inputClassic(hyper);
      redrawClassic();
      break;
    default:
      console.error("Unexpected gamestate id");

  }

  redrawOverlay();
  requestAnimationFrame(main);

}

window.addEventListener("load",function(){
  // assets
  tiles = [
    document.getElementById("tileRed"),
    document.getElementById("tileGreen"),
    document.getElementById("tileYellow"),
    document.getElementById("tileBlue"),
    document.getElementById("tileOrange"),
    document.getElementById("tileCyan"),
    document.getElementById("tileViolet"),
    document.getElementById("tileGray"),
  ];
  requestAnimationFrame(main);
});

document.body.addEventListener("keydown", function(e){
	keys[e.keyCode] = true;
  if (e.keyCode === 8) {
    e.preventDefault();
  }
});

document.body.addEventListener("keyup", function(e){
	keys[e.keyCode] = false;
});
