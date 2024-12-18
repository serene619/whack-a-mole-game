const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const resultDisplay = document.querySelector('#result');

let score = 0;
let time = 30; // 倒计时 30 秒
let moleInterval;
let timerInterval;
let maxMoles = 3; // 每次最多显示 3 个地鼠
let speed = 1000;

// 根据屏幕大小生成格子
function createGrid() {
  const screenWidth = window.innerWidth; // 获取屏幕宽度
  let gridSize;

  if (screenWidth >= 768) {
    gridSize = 49; // 大屏幕：3x3
  } else if (screenWidth >= 480) {
    gridSize = 25; // 中屏幕：2x3
  } else {
    gridSize = 25; // 小屏幕：1x4
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


// 随机选择多个洞
function showMole() {
  const holes = document.querySelectorAll('.hole');
  const activeHoles = [];

  // 随机选择多个洞
  while (activeHoles.length < maxMoles) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    // 确保没有重复选择相同的洞
    if (!activeHoles.includes(hole)) {
      activeHoles.push(hole);
      hole.classList.add('active');
      const mole = hole.querySelector('.mole');
      mole.style.display = 'block'; // 显示地鼠

      // 在 1 秒后隐藏地鼠
      setTimeout(() => {
        hole.classList.remove('active');
        mole.style.display = 'none';
      }, 1000); // 1000ms = 1秒
    }
  }
}
// 击中地鼠
function hitMole() {
  const audio = new Audio('hit_sound.mp3');
  audio.play();

  score++;
  scoreDisplay.textContent = score;


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
    resultDisplay.textContent = 'Walau！Try again';
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

