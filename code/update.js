function update() {

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

}
