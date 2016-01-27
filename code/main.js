function main() {

  update()
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
