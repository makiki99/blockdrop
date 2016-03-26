var lastLoop = new Date(),
  thisLoop = new Date(),
  fpsHistory = new Array(60),
  fps = 60;

function checkFramerate() {
  var thisLoop = new Date();
  fpsHistory.shift();
  fpsHistory.push(1000 / (thisLoop - lastLoop));
  fps = fpsHistory.reduce(function(a, b) {
    return a + b;
  });
  fps /= fpsHistory.length;
  fps = Math.round(fps);
  lastLoop = thisLoop;
}
