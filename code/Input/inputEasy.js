var easy = {
  speedCurve : [
    [1,1,30,30,30,14],
    [30,2,30,30,30,14],
    [60,3,30,30,30,14],
    [100,4,30,30,30,14], // [level,gravity,ARE,line delay,lock delay,DAS]
    [130,6,30,30,30,14],
    [160,8,30,30,30,14],
    [200,12,30,30,30,14],
    [230,16,30,30,30,14],
    [260,24,30,30,30,14],
    [300,32,30,30,30,14],
    [330,48,30,30,30,14],
    [360,64,30,30,30,14],
    [400,96,30,30,30,14],
    [430,128,30,30,30,14],
    [460,192,30,30,30,14],
    [500,256,30,30,30,14],
    [550,384,30,30,30,14],
    [600,512,30,30,30,14],
    [650,768,30,30,30,14],
    [700,1024,30,30,30,14],
    [800,1280,30,30,30,14],
    [900,5632,30,30,30,12],
  ],
  scoreGain: [
    [1,0.7,0.35,-0.0032],
    [100,0.8,0.37,-0.0034],
    [200,0.9,0.39,-0.0036],
    [300,1,0.41,-0.0038],
    [400,1.1,0.43,-0.004],
    [500,1.25,0.45,-0.0042],
    [600,1.4,0.47,-0.0044],
    [700,1.55,0.49,-0.0046],
    [800,1.7,0.51,-0.0048],
    [900,2,0.53,-0.005]
  ],
  endlevel: 1000,
  ghostEnd: 500,
};

function inputEasy() {

  if (game.level >= easy.endlevel && deadFrame === 0) {
    deadFrame++;
    modeClear = true;
  }

  if (deadFrame > 0) {
    if (keys[13] || keys[27]) {
      gamestate = 0;
      keys[13] = false;
      keys[27] = false;
    }
    deadFrame++;
    return;
  }

  if (game.level >= easy.ghostEnd) {
    drawGhost = false;
  } else {
    drawGhost = true;
  }

  speedLevel = -1;
  while (game.level >= easy.speedCurve[speedLevel+1][0]) {
    speedLevel++;
    gravity = easy.speedCurve[speedLevel][1];
    softDropGravity = gravity + 256;
    areDelay = easy.speedCurve[speedLevel][2];
    lineDelay = easy.speedCurve[speedLevel][3];
    lockDelay = easy.speedCurve[speedLevel][4];
    das = easy.speedCurve[speedLevel][5];
    if (easy.speedCurve[speedLevel+1] === undefined) {
      break;
    }
  }

  scoreSegment = -1;
  while (game.level >= easy.scoreGain[scoreSegment+1][0]) {
    scoreSegment++;
    if (easy.speedCurve[speedLevel+1] === undefined) {
      break;
    }
  }
  game.score += easy.scoreGain[scoreSegment][3];

  inputClassic();

  if (game.score < game.level/10) {
    game.score = game.level/10;
  }

  //process level and score
  if (haveLockedPiece && (game.level + 1) % 100 !== 0) {
    game.level++;
    game.score += easy.scoreGain[scoreSegment][2];
  }
  game.level += linesCleared;
  game.score += linesCleared*easy.scoreGain[scoreSegment][2];
  switch (linesCleared) {
    case 1:
      game.score += easy.scoreGain[scoreSegment][1]*0.1;
      break;
    case 2:
      game.score += easy.scoreGain[scoreSegment][1]*0.8;
      break;
    case 3:
      game.score += easy.scoreGain[scoreSegment][1]*2.4;
      break;
    case 4:
      game.score += easy.scoreGain[scoreSegment][1]*6.4;
      break;
  }
  if (linesCleared > 0) {
    areFrame += lineDelay;
  }

}
