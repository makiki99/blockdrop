var lastLoop = performance.now(),
  thisLoop = performance.now(),
  fpsHistory = new Array(60),
  instantFps = 60,
  fps = 60;

function checkFramerate() {
  var thisLoop = performance.now();
  fpsHistory.shift();
  instantFps = 1000 / (thisLoop - lastLoop);
  fpsHistory.push(instantFps);
  fps = fpsHistory.reduce(function(a, b) {
    return a + b;
  });
  fps /= fpsHistory.length;
  fps = Math.round(100*fps)/100;
  lastLoop = thisLoop;
}
