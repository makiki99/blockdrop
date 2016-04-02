var version = "v0.6.0",
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

var fps = 60;
var now;
var then = performance.now();
var interval = 1000/fps;
var delta;

function main() {

	requestAnimationFrame(main);

	now = performance.now();
	delta = now - then;

	//update logic
	if (prefMenu.preflist[3] && delta > interval){
		then = now - (delta % interval);
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
		checkFramerate();
	}

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
	//setInterval(function() {
	requestAnimationFrame(main);
//	}, 1000/60);
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
