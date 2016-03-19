var hard = {
  speedCurve : [
    [1,32,30,30,30,14], // [level,gravity,ARE,line delay,lock delay,DAS]
    [25,48,30,30,30,14],
    [50,64,30,30,30,14],
    [75,96,30,30,30,14],
    [100,128,30,30,30,14],
    [125,192,30,30,30,14],
    [150,256,30,30,30,14],
    [175,384,30,30,30,14],
    [200,512,30,30,30,14],
    [225,768,30,30,30,14],
    [250,1024,30,30,30,14],
    [275,1280,30,30,30,14],
    [300,5632,30,30,30,12],
    [500,5632,24,20,26,12],
    [700,5632,20,15,23,10],
    [900,5632,16,9,20,8]
  ],
  scoreGain: [
    [1,1.8,1.4,-0.0165],
    [100,1.9,1.45,-0.017],
    [200,2,1.5,-0.0175],
    [300,2.5,1.75,-0.02],
    [500,3,2,-0.0275],
    [700,3.5,2.25,-0.0333],
    [900,4,2.5,-0.04]
  ],
  endlevel: 1000,
  ghostEnd: 0,
};

function inputHard() {

  if (game.level >= hard.endlevel && deadFrame === 0) {
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

  if (game.level >= hard.ghostEnd) {
    drawGhost = false;
  } else {
    drawGhost = true;
  }

  speedLevel = -1;
  while (game.level >= hard.speedCurve[speedLevel+1][0]) {
    speedLevel++;
    gravity = hard.speedCurve[speedLevel][1];
    softDropGravity = gravity + 256;
    areDelay = hard.speedCurve[speedLevel][2];
    lineDelay = hard.speedCurve[speedLevel][3];
    lockDelay = hard.speedCurve[speedLevel][4];
    das = hard.speedCurve[speedLevel][5];
    if (hard.speedCurve[speedLevel+1] === undefined) {
      break;
    }
  }

  scoreSegment = -1;
  while (game.level >= hard.scoreGain[scoreSegment+1][0]) {
    scoreSegment++;
    if (hard.speedCurve[speedLevel+1] === undefined) {
      break;
    }
  }
  game.score += hard.scoreGain[scoreSegment][3];

  inputClassic();

  if (game.score < game.level/4) {
    game.score = game.level/4;
  }

  //process level and score
  if (haveLockedPiece && (game.level + 1) % 100 !== 0) {
    game.level++;
    game.score += hard.scoreGain[scoreSegment][2];
  }
  game.level += linesCleared;
  game.score += linesCleared*hard.scoreGain[scoreSegment][2];
  switch (linesCleared) {
    case 1:
      game.score += hard.scoreGain[scoreSegment][1]*0.1;
      break;
    case 2:
      game.score += hard.scoreGain[scoreSegment][1]*0.8;
      break;
    case 3:
      game.score += hard.scoreGain[scoreSegment][1]*2.4;
      break;
    case 4:
      game.score += hard.scoreGain[scoreSegment][1]*6.4;
      break;
  }
  if (linesCleared > 0) {
    areFrame += lineDelay;
  }

}
