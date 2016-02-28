// TODO: move these variables in their respective function files

version = "v0.0.2"
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
  statelist : [3,0,0]
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
  //TODO: adjust those colors to not be total shit
  "#ff0000", //red
  "#00ff00", //green
  "#ffff00", //yellow
  "#0000ff", //blue
  "#ff9900", //orange
  "#00ffff", //cyan
  "#ff00ff", //purple
  "#dddddd", //garbage(gray)
]
