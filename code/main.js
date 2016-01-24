function main() {

  update()
  redraw()
  requestAnimationFrame(main)

}

window.addEventListener("load", requestAnimationFrame(main));
