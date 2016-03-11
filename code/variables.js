//meta variables
version = "v0.1.0"

//debug
var debug = {
  showScore: false
}

//main variables
var keys = [],
  matrix = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ],
  gamestate = 0

//canvas variables
var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  tilesize = 24

canvas.width = tilesize*24
canvas.height = tilesize*24

//menu variables
var menu = {
  currentSelection : 0,
  statelist : [3,1],
  namelist : [
    "Classic | Normal",
    "Controls"
  ]
}

var controls = {
  currentSelection : 0,
  namelist : [
    "Move Left",
    "Move Right",
    "Rotate Left",
    "Rotate Right",
    "Sonic Drop",
    "Soft Drop",
    "Suicide"
  ],
  keyCodes : [
    37,
    39,
    90,
    88,
    38,
    40,
    75
  ]
}

//game variables
var game = {
  currentPiece: 0,
  currentRotation: 0,
  piecePos: [1,4],
  //for randomizer
  nextPiece: 0,
  history: [0,1,1,0],
  level: 1,
  score: 0
}

//color codes
var colorCode = [
  "#ff0000", //red
  "#00ff00", //green
  "#ffff00", //yellow
  "#0000ff", //blue
  "#ff9900", //orange
  "#00ffff", //cyan
  "#ff00ff", //purple
  "#dddddd", //garbage(gray)
]

//asset containers
var tiles
