// 获取音效元素
const hitSound = document.getElementById("hit-sound");

// 假设你有地鼠的点击事件（例如，点击地鼠时）
document.querySelectorAll('.mole').forEach((mole) => {
    mole.addEventListener('click', () => {
        hitSound.play();  // 播放音效
        // 这里可以添加其他击中地鼠后的逻辑，比如更新分数或让地鼠消失
    });
});
