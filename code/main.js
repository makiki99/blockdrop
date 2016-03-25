var version = "v0.4.0",
  debug = {
    //debug toogles
    showScore: false
  },
  keys = [],
  matrix = [],
  gamestate = 0,
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

  //update logic
  switch (gamestate) {

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
      //CLASSIC|EASY mode
      inputClassic(easy);
      redrawClassic();
      break;
    case 3:
      //CLASSIC|NORMAL mode
      inputClassic(normal);
      redrawClassic();
      break;
    case 4:
      //CLASSIC|HARD mode
      inputClassic(hard);
      redrawClassic();
      break;
    case 5:
      //CLASSIC|EXPERT mode
      inputClassic(hyper);
      redrawClassic();
      break;
    case 6:
      //CLASSIC|ANOTHER mode
      break;
    default:
      console.error("Unexpected gamestate id");

  }

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
});

document.body.addEventListener("keyup", function(e){
	keys[e.keyCode] = false;
});
