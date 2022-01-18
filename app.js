// creating grid 

const myGrid = document.querySelector('.grid')

const width = 15
const height = 15

const audioShoot = new Audio('audio/shoot.mp3')

let score = 0
const scoreBoard = document.querySelector('#score')

for (let i = 0; i < width * height; i++) {
  const square = document.createElement('div')
  square.setAttribute('squareNumber', i)
  myGrid.appendChild(square)
}


const squares = Array.from(document.querySelectorAll('.grid div'))
console.log(squares)

// adding elements onto page

let interval
let intervalSpeed = 2000
const aliens = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]


function drawAliens() {
  for (let i = 0; i < aliens.length; i++) {
    squares[aliens[i]].classList.add('alien')
  }
}
drawAliens()

const aliensIndex = Array.from(aliens)

function moveAliens(indexChange) {
  const rightWall = (aliensIndex) => (aliensIndex + 1) % 14 === 0
  const leftWall = (aliensIndex) => aliensIndex === 0 || aliensIndex % 14 === 0
  switch (indexChange) {
    case 1:
      if (aliensIndex.some(rightWall)) {
        stopAliens(indexChange)
        return
      }
      break
    case -1:
      if (aliensIndex.some(leftWall)) {
        stopAliens(indexChange)
        return
      }
      break
  }
  for (let i = 0; i < aliensIndex.length; i++) {
    squares[aliensIndex[i]].classList.remove('alien')
    aliensIndex[i] = aliensIndex[i] + indexChange
    squares[aliensIndex[i]].classList.add('alien')
  }
}

function stopAliens(indexChange) {
  clearInterval(interval)
  moveDown()
  indexChange === 1 ? startAlienLeft() : startAlienRight()

}

function moveDown() {
  console.log('moveDown')
  for (let i = 0; i < aliensIndex.length; i++) {
    squares[aliensIndex[i]].classList.remove('alien')
    aliensIndex[i] = aliensIndex[i] + 14 
    squares[aliensIndex[i]].classList.add('alien')
  }
  if (aliensIndex.some((alien) => alien > 182)) {
    gameOver()
  }
}

function startAlienRight() {
  console.log('moveRight')
  interval = setInterval(function () {
    moveAliens(1)
  }, intervalSpeed)
}

function startAlienLeft() {
  console.log('move left')
  interval = setInterval(function () {
    moveAliens(-1)
  }, intervalSpeed)
}

function gameOver() {
  clearInterval(interval)
  window.alert('GAME OVER')
}












let shooterIndex = 188

function drawShooter() {
  squares[shooterIndex].classList.add('shooter')
}
drawShooter()

// moving elements on page

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
      startAlienRight()
      audioShoot.play()
      squares[shooterIndex - (width - 1)].classList.add('bullet')
  }
}

document.onkeypress = function (e) {
  e = e || window.event;
  var charCode = e.keyCode || e.whichf
  if (charCode === 32) {
    e.preventDefault()
    return false
  }
}

const bulletTravel = setInterval(() => {
  squares.forEach((square) => {
    if (square.classList.contains('bullet') && square.classList.contains('alien')) {
      square.classList.remove('bullet')
      square.classList.remove('alien')
      aliensIndex.splice(aliensIndex.indexOf(square), 1)
      score += 10
      scoreBoard.textContent = score
    }
    if (square.classList.contains('bullet')) {
      const bulletIndex = squares.indexOf(square)
      if (bulletIndex > width) {
        squares[bulletIndex].classList.remove('bullet')
        squares[bulletIndex - (width - 1)].classList.add('bullet')
      } else {
        squares[bulletIndex].classList.remove('bullet')
      }
    }
  })
}, 1000)


document.addEventListener('keydown', moveShooter)

