const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const resultDisplay = document.querySelector('#result');

let score = 0;
let time = 30; // 倒计时 30 秒
let moleInterval;
let timerInterval;
let speed = 1000;

// 动态生成 3x3 的格子
for (let i = 0; i < 9; i++) {
  const hole = document.createElement('div');
  hole.classList.add('hole');
  const mole = document.createElement('div');
  mole.classList.add('mole');
  hole.appendChild(mole);
  grid.appendChild(hole);
}

// 随机选择一个洞生成地鼠
function randomHole() {
  const holes = document.querySelectorAll('.hole');
  const index = Math.floor(Math.random() * holes.length);
  return holes[index];
}

// 显示地鼠
function showMole() {
  const hole = randomHole();
  hole.classList.add('active');
  const mole = hole.querySelector('.mole');

  mole.addEventListener('click', hitMole);

  setTimeout(() => {
    hole.classList.remove('active');
    mole.removeEventListener('click', hitMole);
  }, speed);
}

// 击中地鼠
function hitMole() {
  const audio = new Audio('mole-hit.mp3'); // 确保音频文件路径正确
  audio.play();
  
  score++;
  scoreDisplay.textContent = score;

  // 难度增加
  if (score % 5 === 0 && speed > 500) {
    speed -= 100; // 地鼠出现速度加快
    clearInterval(moleInterval);
    moleInterval = setInterval(showMole, speed);
  }
}

// 倒计时逻辑
function startTimer() {
  timerInterval = setInterval(() => {
    time--;
    timeDisplay.textContent = time;

    if (time <= 0) {
      clearInterval(timerInterval);
      clearInterval(moleInterval);
      endGame();
    }
  }, 1000);
}

// 游戏结束逻辑
function endGame() {
  if (score >= 50) {
    resultDisplay.textContent = '恭喜你，胜利了！';
    resultDisplay.style.color = 'green';
  } else {
    resultDisplay.textContent = '游戏失败，再接再厉！';
    resultDisplay.style.color = 'red';
  }
  resultDisplay.style.display = 'block';
}

// 开始游戏
function startGame() {
  score = 0;
  time = 30;
  speed = 1000;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = time;
  resultDisplay.style.display = 'none';

  clearInterval(timerInterval);
  clearInterval(moleInterval);

  moleInterval = setInterval(showMole, speed);
  startTimer();
}

// 初始化游戏
startGame();


