let ballX = 200;
let ballY = 220;

let speedX = 2.5;
let speedY = -2.5;

let boardX = 150;
let boardY = 360;

let boardWidth = 90;
let boardHeight = 14;

let cols = 8;
let rows = 3;

let brickWidth = 45;
let brickHeight = 18;
let brickPadding = 5;

let offsetLeft = 15;
let offsetTop = 50;

let bricks = [];

let gameOver = false;

function setup() {

    createCanvas(420, 400);

    for (let r = 0; r < rows; r++) {

        for (let c = 0; c < cols; c++) {

            let bx = c * (brickWidth + brickPadding) + offsetLeft;
            let by = r * (brickHeight + brickPadding) + offsetTop;

            bricks.push({
                x: bx,
                y: by,
                alive: true,
                row: r
            });
        }
    }
}

function draw() {

    background(255, 245, 247);

    noStroke();

    fill(255, 255, 255, 180);

    ellipse(40, 40, 3, 3);
    ellipse(120, 30, 2, 2);
    ellipse(200, 25, 3, 3);
    ellipse(30, 140, 2, 2);
    ellipse(90, 180, 3, 3);
    ellipse(380, 160, 2, 2);
    ellipse(250, 300, 3, 3);
    ellipse(50, 280, 2, 2);
    ellipse(160, 330, 2, 2);

    fill(255, 235, 150);
    ellipse(360, 40, 35, 35);

    fill(255, 245, 247);
    ellipse(370, 37, 32, 32);

    fill(255, 255, 255, 140);

    ellipse(70, 30, 40, 25);
    ellipse(55, 33, 25, 20);
    ellipse(85, 33, 25, 20);

    ellipse(340, 130, 50, 30);
    ellipse(320, 135, 35, 25);
    ellipse(360, 135, 35, 25);

    let allDestroyed = true;

    for (let i = 0; i < bricks.length; i++) {

        let b = bricks[i];

        if (b.alive == true) {

            allDestroyed = false;

            if (b.row === 0) {

                fill(218, 192, 233);

            } else if (b.row === 1) {

                fill(255, 182, 193);

            } else {

                fill(244, 143, 177);
            }

            rect(b.x, b.y, brickWidth, brickHeight, 4);

            if (
                ballX > b.x &&
                ballX < b.x + brickWidth &&
                ballY > b.y &&
                ballY < b.y + brickHeight
            ) {

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

    if (ballX < 7 || ballX > 413) {

        speedX = -speedX;
    }

    if (ballY < 7) {

        speedY = -speedY;
    }

    if (
        ballY > boardY - 7 &&
        ballX > boardX &&
        ballX < boardX + boardWidth
    ) {

        speedY = -speedY;
    }

    // GAME OVER
    if (ballY > 400) {

        gameOver = true;

        background(255, 235, 238);

        textAlign(CENTER);

        textSize(26);
        fill(233, 30, 99);

        text("Oops! Game Over 🎀", 210, 170);

        fill(244, 143, 177);
        rect(145, 220, 130, 45, 10);

        fill(255);
        textSize(20);

        text("TRY AGAIN", 210, 250);

        noLoop();
    }

    // WIN
    if (allDestroyed == true) {

        background(232, 245, 233);

        textAlign(CENTER);

        textSize(26);
        fill(76, 175, 80);

        text("You Win! ✨", 210, 200);

        noLoop();
    }

    if (keyIsDown(LEFT_ARROW)) {

        boardX = boardX - 6;
    }

    if (keyIsDown(RIGHT_ARROW)) {

        boardX = boardX + 6;
    }

    if (boardX < 0) {

        boardX = 0;
    }

    if (boardX > 420 - boardWidth) {

        boardX = 420 - boardWidth;
    }
}

function mousePressed() {

    if (gameOver) {

        if (
            mouseX > 145 &&
            mouseX < 275 &&
            mouseY > 220 &&
            mouseY < 265
        ) {

            location.reload();
        }
    }
}
