var version = "v1.5.3",
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
var imageCount; //always increase it by 8 when adding a new tileset
var imagesLoaded = 0;

var fpsLock = {
	now : 0,
	then : performance.now(),
	interval : 1000/60,
	delta : 0,
};

function main() {

	requestAnimationFrame(main);
	if (imagesLoaded < imageCount) {
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = "white";
		ctx.fillText("Loading ("+imagesLoaded+"/"+imageCount+")",24,24);
		return;
	}

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
			case 10:
				inputMarathon();
				redrawClassic();
				break;
			case 11:
				inputSurvival();
				redrawClassic();
				break;
			case 12:
				inputSpecial();
				redrawClassic();
				break;
			case 13:
				inputSpecial();
				redrawClassic();
				break;
			case 14:
				inputSpecial();
				redrawClassic();
				break;
			case 15:
				inputSpecial();
				redrawClassic();
				break;
			default:
				console.error("Unexpected gamestate id");

		}
		redrawOverlay();
		checkFramerate();
	}

}

function loadImage(src) {
	var img = new Image();
	img.src = src;
	img.onload = function() {
		imagesLoaded++;
	};
	img.onerror = function() {
		console.error("loading failed from source "+src);
	};
	return img;
}

imageCount = 32;
window.addEventListener("load",function(){
	// assets
	tiles = [[
		loadImage("assets/tileset0/tileRed.png"),
		loadImage("assets/tileset0/tileGreen.png"),
		loadImage("assets/tileset0/tileYellow.png"),
		loadImage("assets/tileset0/tileBlue.png"),
		loadImage("assets/tileset0/tileOrange.png"),
		loadImage("assets/tileset0/tileCyan.png"),
		loadImage("assets/tileset0/tileViolet.png"),
		loadImage("assets/tileset0/tileGray.png"),
	],[
		loadImage("assets/tileset1/tileRed.png"),
		loadImage("assets/tileset1/tileGreen.png"),
		loadImage("assets/tileset1/tileYellow.png"),
		loadImage("assets/tileset1/tileBlue.png"),
		loadImage("assets/tileset1/tileOrange.png"),
		loadImage("assets/tileset1/tileCyan.png"),
		loadImage("assets/tileset1/tileViolet.png"),
		loadImage("assets/tileset1/tileGray.png"),
	],[
		loadImage("assets/tileset2/tileRed.png"),
		loadImage("assets/tileset2/tileGreen.png"),
		loadImage("assets/tileset2/tileYellow.png"),
		loadImage("assets/tileset2/tileBlue.png"),
		loadImage("assets/tileset2/tileOrange.png"),
		loadImage("assets/tileset2/tileCyan.png"),
		loadImage("assets/tileset2/tileViolet.png"),
		loadImage("assets/tileset2/tileGray.png"),
	],[
		loadImage("assets/tileset3/red.png"),
		loadImage("assets/tileset3/green.png"),
		loadImage("assets/tileset3/yellow.png"),
		loadImage("assets/tileset3/blue.png"),
		loadImage("assets/tileset3/orange.png"),
		loadImage("assets/tileset3/cyan.png"),
		loadImage("assets/tileset3/violet.png"),
		loadImage("assets/tileset3/gray.png"),
	]
	];

	requestAnimationFrame(main);
});

document.body.addEventListener("keydown", function(e){
	keys[e.keyCode] = true;
	if (e.keyCode === 8) {
		e.preventDefault();
	}
	if (e.keyCode === 13) {
		e.preventDefault();
	}
});

document.body.addEventListener("keyup", function(e){
	keys[e.keyCode] = false;
});
