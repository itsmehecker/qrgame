const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const uwu = { x: 400, y: 300, size: 30, speed: 5, health: 100 };
const letters = [];
let gameOver = false;
let startTime = Date.now();
let highScore = 0;

function getRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function initLetters() {
    for (let i = 0; i < 10; i++) {
        letters.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 30,
            speed: 2,
            char: getRandomLetter()
        });
    }
}

function update() {
    if (uwu.health <= 0) {
        gameOver = true;
        const currentTime = Math.floor((Date.now() - startTime) / 1000);
        if (currentTime > highScore) {
            highScore = currentTime;
        }
        return;
    }

    // Update letters position to chase "uwu"
    letters.forEach(letter => {
        if (letter.x < uwu.x) letter.x += letter.speed;
        if (letter.x > uwu.x) letter.x -= letter.speed;
        if (letter.y < uwu.y) letter.y += letter.speed;
        if (letter.y > uwu.y) letter.y -= letter.speed;

        // Check for collision with "uwu"
        if (Math.abs(letter.x - uwu.x) < uwu.size && Math.abs(letter.y - uwu.y) < uwu.size) {
            uwu.health -= 1;
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameOver) {
        ctx.font = '50px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('Game Over', canvas.width / 2 - 150, canvas.height / 2);
        ctx.font = '30px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`High Score: ${highScore} seconds`, canvas.width / 2 - 150, canvas.height / 2 + 50);
        return;
    }

    // Draw "uwu"
    ctx.font = `${uwu.size}px Arial`;
    ctx.fillText('uwu', uwu.x, uwu.y);

    // Draw letters
    letters.forEach(letter => {
        ctx.font = `${letter.size}px Arial`;
        ctx.fillText(letter.char, letter.x, letter.y);
    });

    // Draw health bar
    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, uwu.health * 2, 20);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(10, 10, 200, 20);

    // Draw current time
    const currentTime = Math.floor((Date.now() - startTime) / 1000);
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Time: ${currentTime} seconds`, 10, 50);

    // Draw border
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    update();
    draw();
    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && uwu.y - uwu.speed >= 0) uwu.y -= 7 * uwu.speed;
    if (event.key === 'ArrowDown' && uwu.y + uwu.speed + uwu.size <= canvas.height) uwu.y += 7 * uwu.speed;
    if (event.key === 'ArrowLeft' && uwu.x - uwu.speed >= 0) uwu.x -= 7 * uwu.speed;
    if (event.key === 'ArrowRight' && uwu.x + uwu.speed + uwu.size <= canvas.width) uwu.x += 7 * uwu.speed;
});

initLetters();
gameLoop();