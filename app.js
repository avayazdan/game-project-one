// creating grid 

const myGrid = document.querySelector('.grid')

const width = 15
const height = 15



for (let i = 0; i < width * height; i++) {
  const square = document.createElement('div')
  square.setAttribute('squareNumber', i)
  myGrid.appendChild(square)
}

const aliens = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
const squares = Array.from(document.querySelectorAll('.grid div'))
console.log(squares)

// adding elements onto page

function drawAliens() {
  for (let i = 0; i < aliens.length; i++) {
    squares[aliens[i]].classList.add('invader')
  }
}

drawAliens()

let shooterIndex = 118

function drawShooter() {
  squares[shooterIndex].classList.add('shooter')
}

drawShooter()

// moving elements on page

function moveShooter(e) {


  // console.log(currentPosition)
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
      if (shooterIndex < 111) {
        squares[shooterIndex].classList.remove('shooter')
        squares[shooterIndex - 1].classList.add('shooter')
        shooterIndex += 1
      }
      break


  }
}
document.addEventListener('keydown', moveShooter)