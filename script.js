let score = 0;
let time = 30;
let moleInterval;
let timerInterval;
let maxMoles = 3;
let gameStarted = false;

// 获取页面元素
const startButton = document.getElementById('startButton');
const gameArea = document.getElementById('gameArea');
const homepage = document.getElementById('homepage');
const scoreDisplay = document.getElementById('scoreDisplay');
const timeDisplay = document.getElementById('timeDisplay');
const resultDisplay = document.getElementById('resultDisplay');
const grid = document.getElementById('grid');
const endButton = document.getElementById('endButton');

// 创建游戏格子
function createGrid() {
  grid.innerHTML = '';
  for (let i = 0; i < 16; i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    const mole = document.createElement('div');
    mole.classList.add('mole');
    hole.appendChild(mole);
    grid.appendChild(hole);
  }
}

// 显示地鼠
function showMole() {
  const holes = document.querySelectorAll('.hole');
  const activeHoles = [];

  while (activeHoles.length < maxMoles) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    if (!activeHoles.includes(hole)) {
      activeHoles.push(hole);
      hole.classList.add('active');
      const mole = hole.querySelector('.mole');
      mole.style.display = 'block';

      setTimeout(() => {
        hole.classList.remove('active');
        mole.style.display = 'none';
      }, 1000);
    }
  }
}

// 击中地鼠
function hitMole() {
  score++;
  scoreDisplay.textContent = `得分: ${score}`;
}

// 倒计时
function startTimer() {
  timerInterval = setInterval(() => {
    time--;
    timeDisplay.textContent = `时间: ${time}`;
    if (time <= 0) {
      clearInterval(timerInterval);
      clearInterval(moleInterval);
      endGame();
    }
  }, 1000);
}

// 结束游戏
function endGame() {
  resultDisplay.textContent = score >= 50 ? '恭喜你，胜利！' : '时间到，游戏结束！';
  endButton.style.display = 'block';
}

// 开始游戏
function startGame() {
  gameStarted = true;
  homepage.style.display = 'none';
  gameArea.style.display = 'block';
  score = 0;
  time = 30;
  scoreDisplay.textContent = `得分: ${score}`;
  timeDisplay.textContent = `时间: ${time}`;
  createGrid();
  moleInterval = setInterval(showMole, 500);
  startTimer();
}

// 结束游戏按钮
endButton.addEventListener('click', () => {
  homepage.style.display = 'block';
  gameArea.style.display = 'none';
  resultDisplay.textContent = '';
  endButton.style.display = 'none';
});

// 绑定开始游戏按钮
startButton.addEventListener('click', startGame);

// 击中地鼠事件
grid.addEventListener('click', (e) => {
  if (e.target.classList.contains('mole') && e.target.style.display === 'block') {
    hitMole();
  }
});

