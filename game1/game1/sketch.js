let ballX = 200;
let ballY = 220;
let speedX = 2.5;
let speedY = -2.5;
let boardX = 150;
let boardY = 360;
let boardWidth = 90;
let boardHeight = 14;
let cols = 8;
let brickWidth = 45;
let brickHeight = 18;
let brickPadding = 5;
let offsetLeft = 15;
let offsetTop = 50;
let bricks = [];

function setup() {
    createCanvas(420, 400);
    for (let i = 0; i < cols; i++) {
        let bx = i * (brickWidth + brickPadding) + offsetLeft;
        bricks[i] = { x: bx, y: offsetTop, alive: true };
    }
}

function draw() {
    background(255, 245, 247);
    noStroke();
    let allDestroyed = true;

    for (let i = 0; i < cols; i++) {
        let b = bricks[i];
        if (b.alive == true) {
            allDestroyed = false;
            if (i < 4) { fill(218, 192, 233); } else { fill(255, 182, 193); }
            rect(b.x, b.y, brickWidth, brickHeight, 4);
            if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
                speedY = -speedY;
                b.alive = false;
            }
        }
    }

    fill(244, 143, 177);
    rect(boardX, boardY, boardWidth, boardHeight, 8);
    fill(255, 224, 130);
    ellipse(ballX, ballY, 14, 14);

    ballX = ballX + speedX;
    ballY = ballY + speedY;

    if (ballX < 7 || ballX > 413) { speedX = -speedX; }
    if (ballY < 7) { speedY = -speedY; }
    if (ballY > boardY - 7 && ballX > boardX && ballX < boardX + boardWidth) { speedY = -speedY; }

    if (ballY > 400) {
        background(255, 235, 238);
        textSize(26);
        fill(233, 30, 99);
        textAlign(CENTER);
        text("Oops! Game Over 🎀", 210, 200);
        noLoop();
    }

    if (allDestroyed == true) {
        background(232, 245, 233);
        textSize(26);
        fill(76, 175, 80);
        textAlign(CENTER);
        text("You Win! ✨", 210, 200);
        noLoop();
    }

    if (keyIsDown(LEFT_ARROW)) { boardX = boardX - 6; }
    if (keyIsDown(RIGHT_ARROW)) { boardX = boardX + 6; }
    if (boardX < 0) { boardX = 0; }
    if (boardX > 420 - boardWidth) { boardX = 420 - boardWidth; }
}
