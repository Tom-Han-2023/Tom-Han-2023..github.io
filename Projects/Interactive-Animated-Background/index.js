const container = document.getElementById('background-container')
let intervalIds = []
const audio = new Audio('bubble.mp3')
let shape = document.createElement('div')
// Add event listener for mouse movement
container.addEventListener('mousemove', function (e) {
  // Change background color
  const red = (e.clientX / innerWidth) * 255
  const green = (e.clientY / innerHeight) * 255
  const blue = (red + green) / 2
  container.style.background = `rgb(${red}, ${green}, ${blue})`
})

// Add event listener for click event
container.addEventListener('click', function (e) {
  addShapes()
  playMusic()
  intervalIds.push(setInterval(addShapes, 1000))
})

container.addEventListener('contextmenu', function (e) {
  clearShapes()
  audio.pause()
  audio.currentTime = 0
})

function addShapes() {
  for (let i = 0; i < 15; i++) {
    const shape = document.createElement('div')
    shape.classList.add('shape')
    shape.style.left = `${Math.random() * window.innerWidth}px`
    shape.style.top = `${Math.random() * window.innerHeight}px`
    shape.style.backgroundColor = `rgb(${rand()}, ${rand()}, ${rand()})`

    container.appendChild(shape)
  }
}

function rand() {
  return Math.floor(Math.random() * 255)
}
function playMusic() {
  audio.play()
  audio.addEventListener(
    'ended',
    function () {
      this.currentTime = 0
      this.play()
    },
    false
  )
}

function clearShapes() {
  intervalIds.forEach(clearInterval)
  intervalIds = []
  const shapes = document.querySelectorAll('.shape')
  shapes.forEach((shape) => shape.parentNode.removeChild(shape))
}
