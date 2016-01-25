function update() {
  switch (gamestate) {
    case 0:
      redrawMenu()
      break
    case 1:
      redrawClassic()
      break
    default:
      console.error("Unexpected gamestate id")

  }
}
