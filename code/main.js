function main() {

  //update logic
  switch (gamestate) {

    case 0:
      //main menu (duh!)
      inputMenu()
      redrawMenu()
      break
    case 1:
      //settings
      //TODO
      break
    case 2:
      //pause menu
      //TODO
      break
    case 3:
      //classic mode
      inputClassic()
      redrawClassic()
      break
    default:
      console.error("Unexpected gamestate id")

  }

  //TODO: framerate lock
  requestAnimationFrame(main)

}


window.addEventListener("load",function(){
  requestAnimationFrame(main)
})

document.body.addEventListener("keydown", function(e){
	keys[e.keyCode] = true
})

document.body.addEventListener("keyup", function(e){
	keys[e.keyCode] = false
})
