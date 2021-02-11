const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const audioCoin = document.getElementById('audioCoin');
const audioWing = document.getElementById('audioWing')

const background = new Image();
const bird = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();
const scoreBg = new Image();

background.src = './img/flappy_bird_bg.png';
bird.src = './img/flappy_bird_bird.png';
pipeUp.src = './img/flappy_bird_pipeUp.png';
pipeBottom.src = './img/flappy_bird_pipeBottom.png';
scoreBg.src = './img/score-cropped.png';

const gravity = 1.5;
const gap = 85;

const birdX = 0;
let birdY = canvas.height / 2;

const birdWidth = 36;
const birdHeight = 26;

context.font = 'bold 32px serif';
context.textAlign = 'center'
context.fillStyle = 'Black'
context.fillText('Press Enter to start', canvas.width / 2, scoreBg.height / 2 + 5);

document.addEventListener('keydown', (event) => {
  birdY = birdY <= 26 ? 0 : birdY - 50;
  audioWing.play();
  if (event.keyCode === 13) {
    start()
  }
});

let cycle = 0;

const pipes = [{
  x: canvas.width,
  y: 0
}];

function start() {
  let bgX = 0;
  setInterval(() => {
    context.drawImage(background, bgX, 0);
    bgX--
    context.drawImage(background, bgX + background.width, 0);

    if (Math.abs(bgX) === background.width) {
      bgX = 0
      console.log(bgX)
    }
  }, 48)

  setInterval(() => {
    cycle = (cycle + 1) % 3;
    let score = 0;

    context.drawImage(bird, cycle * birdWidth, 0, birdWidth, birdHeight, birdX, birdY, birdWidth, birdHeight);

    pipes.forEach(pipe => {
      context.drawImage(pipeUp, pipe.x, pipe.y);
      context.drawImage(pipeBottom, pipe.x, pipe.y + gap + pipeBottom.height);

      pipe.x--;

      if (pipe.x === 125) {
        pipes.push({
          x: canvas.width,
          y: Math.floor(1 * pipeUp.height) - pipeUp.height,
        });
      }
      if (
        birdX + bird.width >= pipe.x &&
        birdX <= pipe.x + pipeUp.width &&
        (birdY <= pipe.y + pipeUp.height ||
          birdY + bird.height >= pipe.y + gap + pipeBottom.height)
      ) {
        location.reload();
      }

      if (birdX > pipe.x) {
        audioCoin.play();
        score++;
      }
    });
    context.drawImage(scoreBg, canvas.width / 2 - 55, -5);

    context.font = 'bold 32px serif';
    context.textAlign = 'center'
    context.fillStyle = 'white'
    context.fillText(score, canvas.width / 2, scoreBg.height / 2 + 5);

    birdY = birdY >= canvas.height - 26 ? canvas.height / 2 : birdY + gravity;
  }, 12);
}


//! ДЗ сделать счетчик очков(пройденная труба - 1 очко)
// и анимировать фон
// звуки на полет и заработанное очко.