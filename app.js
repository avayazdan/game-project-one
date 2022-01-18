// creating grid 

const myGrid = document.querySelector('.grid')

const width = 15
const height = 15

let score = 0
const scoreBoard = document.querySelector('#score')

for (let i = 0; i < width * height; i++) {
  const square = document.createElement('div')
  square.setAttribute('squareNumber', i)
  myGrid.appendChild(square)
}

const aliens = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26]
const squares = Array.from(document.querySelectorAll('.grid div'))
console.log(squares)

// adding elements onto page

function drawAliens() {
  for (let i = 0; i < aliens.length; i++) {
    squares[aliens[i]].classList.add('alien')
  }
}

drawAliens()

let shooterIndex = 132

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
      if (shooterIndex > 112) {
        squares[shooterIndex].classList.remove('shooter')
        squares[shooterIndex - 1].classList.add('shooter')
        shooterIndex -= 1
      }
      break
    case 'ArrowRight':
      console.log('I pressed the right arrow :P')
      if (shooterIndex < 125) {
        squares[shooterIndex].classList.remove('shooter')
        squares[shooterIndex + 1].classList.add('shooter')
        shooterIndex += 1
      }
      break
    case ' ':
      console.log('I pressed the space bar :P')
      squares[shooterIndex - (width - 1)].classList.add('bullet')
  }
}

const bulletTravel = setInterval(() => {

  squares.forEach((square) => {
    if (square.classList.contains('bullet') && square.classList.contains('alien')) {
      square.classList.remove('bullet')
      square.classList.remove('alien')
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

// const moveAliens = setInterval(() => {
//   aliensMove = document.getElementsByClassName('aliens')[0]
//   aliensMove.style.top = parseInt(aliensMove.style.top) + 1 + 'px'
// }
// }, 600)