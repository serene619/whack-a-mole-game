const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const resultDisplay = document.querySelector('#result');

let score = 0;
let time = 30; // 倒计时 30 秒
let moleInterval;
let timerInterval;
let speed = 1000;

// 根据屏幕大小生成格子
function createGrid() {
  const screenWidth = window.innerWidth; // 获取屏幕宽度
  let gridSize;

  if (screenWidth >= 768) {
    gridSize = 9; // 大屏幕：3x3
  } else if (screenWidth >= 480) {
    gridSize = 6; // 中屏幕：2x3
  } else {
    gridSize = 4; // 小屏幕：1x4
  }

  // 清空旧的格子
  grid.innerHTML = '';

  for (let i = 0; i < gridSize; i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    const mole = document.createElement('div');
    mole.classList.add('mole');
    hole.appendChild(mole);
    grid.appendChild(hole);
  }
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
  const audio = new Audio('mole-hit.mp3');
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
    resultDisplay.textContent = 'Winner！';
    resultDisplay.style.color = 'green';
  } else {
    resultDisplay.textContent = 'Loser！';
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

  createGrid();
  moleInterval = setInterval(showMole, speed);
  startTimer();
}

// 初始化游戏
window.addEventListener('resize', createGrid); // 监听窗口大小变化
startGame();

