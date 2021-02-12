const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const audioCoin = document.getElementById('audioCoin');
const audioWing = document.getElementById('audioWing');

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

const gravity = 2;
const gap = 85;

const birdX = 0;
let birdY = canvas.height / 2;

context.font = 'bold 32px serif';
context.textAlign = 'center';;
context.fillStyle = 'Black'
context.fillText('Press Enter to start', canvas.width / 2, scoreBg.height / 2 + 5);

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    game();
  }
  birdY = birdY <= 26 ? 0 : birdY - 80;
  audioWing.play();
});

let cycle = 0;

const pipes = [{
  x: canvas.width,
  y: 0
}];

function game() {
  let bgX = 0;

  bgr = setInterval(() => {
    cycle = (cycle + 1) % 3;

    context.drawImage(background, bgX, 0);
    bgX--;
    context.drawImage(background, bgX + background.width, 0);
    context.drawImage(bird, cycle * bird.width / 3, 0, bird.width / 3, bird.height, birdX, birdY, bird.width / 3, bird.height);

    if (Math.abs(bgX) === background.width) {
      bgX = 0;
    }
  }, 36);

  enviroment = setInterval(() => {

    let score = 0;

    pipes.forEach(pipe => {
      context.drawImage(pipeUp, pipe.x, pipe.y);
      context.drawImage(pipeBottom, pipe.x, pipe.y + gap + pipeBottom.height);

      pipe.x--;

      if (pipe.x === 125) {
        pipes.push({
          x: canvas.width,
          y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
        });
      }
      if (
        birdX + (bird.width / 3) >= pipe.x &&
        birdX <= pipe.x + pipeUp.width &&
        (birdY <= pipe.y + pipeUp.height ||
          birdY + bird.height >= pipe.y + gap + pipeBottom.height)
      ) {
        gameOver()
      }

      if (birdX > pipe.x) {
        audioCoin.play();
        score++;
      }
      if (birdY + 26 == canvas.height) {
        gameOver();
      }
    });

    context.drawImage(scoreBg, canvas.width / 2 - 55, -5);

    context.font = 'bold 32px serif';
    context.textAlign = 'center';
    context.fillStyle = 'white';
    context.fillText(score, canvas.width / 2, scoreBg.height / 2 + 5);

    // birdY = birdY >= canvas.height - 26 ? canvas.height / 2 : birdY + gravity;
    birdY = birdY + gravity;

  }, 12);
}

function gameOver() {
  clearInterval(bgr);
  clearInterval(enviroment);
  setTimeout(() => location.reload(), 5000);

  context.font = 'bold 32px serif';
  context.textAlign = 'center';
  context.fillStyle = 'white';
  context.fillText('You loose.', canvas.width / 2, canvas.height / 2);
  context.fillText('Restart in 5 seconds.', canvas.width / 2, canvas.height / 2 + 32);
}