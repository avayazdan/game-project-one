// variables

const myGrid = document.querySelector('.grid')
const width = 14
const height = 15
let direction = 1
let moveRight = true
const audioShoot = new Audio('audio/shoot.mp3')
const gameOverSound = new Audio('audio/gameover.mp3')
const gameIntro = new Audio('audio/intro.mp3')
const mainSound = new Audio('audio/loop.mp3')
const bruhSound = new Audio('audio/bruh.mp3')
let score = 0
let interval
let shooterIndex = 188
let intervalSpeed = 500
const scoreBoard = document.querySelector('#score')

// volume settings

audioShoot.volume = 0.1
mainSound.volume = 0.4
bruhSound.volume = 1

// game start screen function

document.body.addEventListener('mousemove', function () {
  mainSound.play()
  // mainSound.loop = true
})

function startGame(ev) {
  if (ev.keyCode === 38) {
    console.log('I pressed the up arrow')
    let gameStarted = false
    init()
    const x = document.getElementById('gamestart-screen')
    x.style.display = 'none'
    gameStarted = true
    if (gameStarted) {
      window.removeEventListener('keyup', startGame)
    }
  }
}
window.addEventListener('keyup', startGame)

// window.alert('GAME OVER')
// game initialise 

function init() {
  // creating grid 
  for (let i = 0; i < width * height; i++) {
    const square = document.createElement('div')
    square.setAttribute('squareNumber', i)
    myGrid.appendChild(square)
  }
  const grid = document.querySelectorAll('.grid div')
  console.log(grid)
  const squares = Array.from(document.querySelectorAll('.grid div'))

  console.log(squares)

  // adding elements onto page

  const aliens = [0, 2, 4, 6, 8, 10, 12]

  function drawAliens() {
    aliens.forEach((alien) => squares[alien].classList.add('alien'))

  }
  drawAliens()

  const aliensIndex = Array.from(aliens)

  function drawShooter() {
    squares[shooterIndex].classList.add('shooter')
  }
  drawShooter()

  // moving elements on page

  function removeAliens() {
    squares.forEach((square) => square.classList.remove('alien'))
  }

  // removeAliens()

  function moveAliens() {
    const leftEdge = aliens[0] % width === 0
    const rightEdge = (aliens[aliens.length - 1] % width) === (width - 1)
    removeAliens()
    if (moveRight && rightEdge) {
      for (let i = 0; i < aliens.length; i++) {
        aliens[i] += width
        direction = -1
        moveRight = false
      }
    } else if (!moveRight && leftEdge) {
      for (let i = 0; i < aliens.length; i++) {
        aliens[i] += width
        direction = 1
        moveRight = true
      }
    } else {
      for (let i = 0; i < aliens.length; i++) {
        aliens[i] += direction
      }
    }
    drawAliens()
    if (aliens.some((alien) => alien > 182)) {
      gameOverSound.play()
      bruhSound.play()
      // gameOver()
      gameOverSound.addEventListener('ended', function () {
        gameOver()
      })
    }
  }

  function startAlienLeft() {
    console.log('move left')
    interval = setInterval(function () {
      moveAliens(-1)
    }, intervalSpeed)
  }
  startAlienLeft()

  // moving elements on page

  // bullet

  const bulletTravel = setInterval(() => {
    squares.forEach((square) => {
      if (square.classList.contains('bullet') && square.classList.contains('alien')) {
        square.classList.remove('bullet')
        square.classList.remove('alien')
        const squareNumber = parseInt(square.getAttribute('squareNumber'))
        aliens.splice(aliens.indexOf(squareNumber), 1)
        console.log(aliens)
        console.log(squareNumber)
        score += 10
        scoreBoard.textContent = score
      }
      if (square.classList.contains('bullet')) {
        const bulletIndex = squares.indexOf(square)
        if (bulletIndex > width) {
          squares[bulletIndex].classList.remove('bullet')
          squares[bulletIndex - (width)].classList.add('bullet')
        } else {
          squares[bulletIndex].classList.remove('bullet')
        }
      }
    })
  }, 1000)

  // shooter

  function moveShooter(e) {
    console.log(e)
    switch (e.key) {
      case 'ArrowLeft':
        console.log('I pressed the left arrow :P')
        if (shooterIndex > 182) {
          squares[shooterIndex].classList.remove('shooter')
          squares[shooterIndex - 1].classList.add('shooter')
          shooterIndex -= 1
        }
        break
      case 'ArrowRight':
        console.log('I pressed the right arrow :P')
        if (shooterIndex < 195) {
          squares[shooterIndex].classList.remove('shooter')
          squares[shooterIndex + 1].classList.add('shooter')
          shooterIndex += 1
        }
        break
      case ' ':
        console.log('I pressed the space bar :P')
        audioShoot.play()
        squares[shooterIndex - (width)].classList.add('bullet')
    }
  }

  // stopping spacebar from moving down window screen

  document.onkeypress = function (e) {
    e = e || window.event;
    var charCode = e.keyCode || e.whichf
    if (charCode === 32) {
      e.preventDefault()
      return false
    }
  }


  document.addEventListener('keydown', moveShooter)
}

// game end function

function gameOver() {
  clearInterval(interval)
  const y = document.getElementById('gameover-screen')
  if (y.style.display === 'none') {
    y.style.display = 'block'
  } else {
    y.style.display = 'none'
  }
  setTimeout(() => {
    y.style.display = 'none'
    const aliens = [0, 2, 4, 6, 8, 10, 12]

    function drawAliens() {
      const squares = Array.from(document.querySelectorAll('.grid div'))
      aliens.forEach((alien) => squares[alien].classList.add('alien'))

    }
    drawAliens()

  }, 9000)
}





  // document.getElementsByID('gameover-screen').addEventListener('mouseover', function () {
  //   this.mainSound.pause()
  // })

  // set time out function to wait a few seconds and then reinit game , write condition to stop upkey appear ,pause and start game
  // function audioStop() {
  //   this.mainSound.pause()
  //   mainSound.currentTime = 0
  //