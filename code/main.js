function main() {

  //update logic
  switch (gamestate) {

    case 0:
      //main menu (duh!)
      inputMenu()
      redrawMenu()
      break
    case 1:
      //controls
      inputControls()
      redrawControls()
      break
    case 2:
      //pause menu
      //TODO
      break
    case 3:
      //CLASSIC|NORMAL mode
      inputClassic()
      redrawClassic()
    break
      default:
      console.error("Unexpected gamestate id")

  }

  requestAnimationFrame(main)

}

window.addEventListener("load",function(){
  //assets
  tiles = [
    document.getElementById("tileRed"),
    document.getElementById("tileGreen"),
    document.getElementById("tileYellow"),
    document.getElementById("tileBlue"),
    document.getElementById("tileOrange"),
    document.getElementById("tileCyan"),
    document.getElementById("tileViolet"),
    document.getElementById("tileGray"),
  ]
  requestAnimationFrame(main)
})

document.body.addEventListener("keydown", function(e){
	keys[e.keyCode] = true
})

document.body.addEventListener("keyup", function(e){
	keys[e.keyCode] = false
})
