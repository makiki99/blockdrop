var version = "v1.1.2",
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

var fpsLock = {
	now : 0,
	then : performance.now(),
	interval : 1000/60,
	delta : 0,
};

function main() {

	requestAnimationFrame(main);

	fpsLock.now = performance.now();
	fpsLock.delta = fpsLock.now - fpsLock.then;

	//update logic
	if (!prefMenu.preflist[3] || fpsLock.delta > fpsLock.interval){
		fpsLock.then = fpsLock.now - (fpsLock.delta % fpsLock.interval);
	  switch (gamestate) {

			case -3:
				inputModeSelect();
				redrawModeSelect();
				break;
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
	    case 6:
	      inputClassic(shadow);
	      redrawClassic();
	      break;
	    case 7:
	      inputClassic(another);
	      redrawClassic();
	      break;
	    case 8:
	      inputClassic(phantom);
	      redrawClassic();
	      break;
	    case 9:
	      inputTimeAttack();
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
