const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
let score = 0;
let moleInterval;
let speed = 1000; // 初始地鼠速度
let moleCount = 1; // 初始出现的地鼠数量

// 动态生成 5x5 的格子
for (let i = 0; i < 25; i++) {
  const hole = document.createElement('div');
  hole.classList.add('hole');
  const mole = document.createElement('div');
  mole.classList.add('mole');
  hole.appendChild(mole);
  grid.appendChild(hole);
}

// 随机选择 N 个洞生成地鼠
function randomHoles(num) {
  const holes = document.querySelectorAll('.hole');
  const selected = [];
  while (selected.length < num) {
    const randomIndex = Math.floor(Math.random() * holes.length);
    if (!selected.includes(holes[randomIndex])) {
      selected.push(holes[randomIndex]);
    }
  }
  return selected;
}

// 显示地鼠
function showMoles() {
  const holes = randomHoles(moleCount);
  holes.forEach(hole => {
    hole.classList.add('active');
    const mole = hole.querySelector('.mole');
    mole.style.display = 'block';
    mole.addEventListener('click', hitMole);
  });

  // 地鼠定时消失
  setTimeout(() => {
    holes.forEach(hole => {
      hole.classList.remove('active');
      const mole = hole.querySelector('.mole');
      mole.style.display = 'none';
      mole.removeEventListener('click', hitMole);
    });
  }, speed);
}

// 击中地鼠
function hitMole() {
  score++;
  scoreDisplay.textContent = score;

  // 难度增加：每 5 分提升一次
  if (score % 5 === 0) {
    speed = Math.max(200, speed - 100); // 地鼠出现速度加快
    moleCount = Math.min(5, moleCount + 1); // 地鼠数量增加，最多 5 个
    clearInterval(moleInterval);
    moleInterval = setInterval(showMoles, speed);
  }
}

// 开始游戏
function startGame() {
  score = 0;
  speed = 1000;
  moleCount = 1;
  scoreDisplay.textContent = score;
  clearInterval(moleInterval);
  moleInterval = setInterval(showMoles, speed);
}

// 初始化
startGame();


// 获取音效元素
const hitSound = document.getElementById("hit-sound");

// 假设你有地鼠的点击事件（例如，点击地鼠时）
document.querySelectorAll('.mole').forEach((mole) => {
    mole.addEventListener('click', () => {
        hitSound.play();  // 播放音效
        // 这里可以添加其他击中地鼠后的逻辑，比如更新分数或让地鼠消失
    });
});
