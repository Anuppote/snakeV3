let isGoingRight = true;
let isGoingLeft = false;
let isGoingDown = false;
let isGoingUp = false;
let speed;
let lost = false;
let currentScore = 0;
speed = prompt("Welcome To Snake Game!! Set snake speed between 1 to 10");
if (speed >= 1 && speed <= 10) {
  speed = 550 - speed * 50;
} else {
  alert("select number between 1 to 10 or default speed is 7");
  speed = 200;
}
let impact = new Audio("impact1.mp3");
let eat = new Audio("eat.mp3");
let highScore = 0;

let touched = false;

let rightPressed = true;
let downPressed = false;
let leftPressed = false;
let upPressed = false;
let snakeBody = [{ x: 1, y: 1 }];

let foodIsEaten = true;

let randomX, randomY;
let r = 1,
  b = 1;
document.querySelector(".btnPlay").addEventListener("click", playGame);
document.querySelector(".btn1").addEventListener("click", function () {
  rightPressed = false;
  downPressed = false;
  leftPressed = false;
  upPressed = true;
  window.navigator.vibrate(10);
});
document.querySelector(".btn2").addEventListener("click", function () {
  rightPressed = false;
  downPressed = false;
  leftPressed = true;
  upPressed = false;
  window.navigator.vibrate(10);
});
document.querySelector(".btn3").addEventListener("click", function () {
  rightPressed = true;
  downPressed = false;
  leftPressed = false;
  upPressed = false;
  window.navigator.vibrate(10);
});
document.querySelector(".btn4").addEventListener("click", function () {
  rightPressed = false;
  downPressed = true;
  leftPressed = false;
  upPressed = false;
  window.navigator.vibrate(10);
});
let canvas = document.querySelector("#myCanvas");
let context = canvas.getContext("2d");
context.fillStyle = "#111d5e";
context.fillRect(0, 0, 362, 362);
document.addEventListener("keydown", keypressed);

function keypressed(e) {
  if (!lost) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
      downPressed = false;
      leftPressed = false;
      upPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      rightPressed = false;
      downPressed = false;
      leftPressed = true;
      upPressed = false;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
      rightPressed = false;
      downPressed = true;
      leftPressed = false;
      upPressed = false;
    } else if (e.key == "Up" || e.key == "ArrowUp") {
      rightPressed = false;
      downPressed = false;
      leftPressed = false;
      upPressed = true;
    }
  }
}
function clearCanvas() {
  context.clearRect(0, 0, 362, 362);
  context.fillStyle = "#111d5e";
  context.fillRect(0, 0, 362, 362);
}
function lose() {
  if (currentScore > highScore) {
    highScore = currentScore;
    document.querySelector(".highScore").innerHTML = highScore;
  }

  document.querySelector(".btn1").disabled = true;
  document.querySelector(".btn2").disabled = true;
  document.querySelector(".btn3").disabled = true;
  document.querySelector(".btn4").disabled = true;
  context.font = "30px Comic Sans MS";
  context.fillStyle = "#fecd1a";
  context.textAlign = "center";
  context.fillText("You Lose", canvas.width / 2, canvas.height / 2);
  document.querySelector(".btnPlay").disabled = false;
  document.querySelector(".btnPlay").innerHTML = "Play Again";
  impact.play();
  while (snakeBody.length > 0) {
    snakeBody.pop();
  }
  snakeBody = [{ x: 1, y: 1 }];
  isGoingRight = true;
  isGoingLeft = false;
  isGoingDown = false;
  isGoingUp = false;
  touched = false;
  r = 1;
  b = 1;
  rightPressed = true;
  downPressed = false;
  leftPressed = false;
  upPressed = false;
  lost = true;
  foodIsEaten = true;
}
function playGame() {
  currentScore = 0;
  document.querySelector(".score").innerHTML = currentScore;
  lost = false;
  document.querySelector(".btn1").disabled = false;
  document.querySelector(".btn2").disabled = false;
  document.querySelector(".btn3").disabled = false;
  document.querySelector(".btn4").disabled = false;
  let id1 = setInterval(randomCoordinates, 1);
  function randomCoordinates() {
    if (foodIsEaten) {
      randomX = Math.floor(Math.random() * 341);
      randomY = Math.floor(Math.random() * 341);
      if (randomX % 20 == 0 && randomY % 20 == 0) {
        foodIsEaten = false;
      }
    }
  }

  document.querySelector(".btnPlay").disabled = "true";
  let id = setInterval(move, speed);
  function move() {
    for (let i = 0; i < snakeBody.length; i++) {
      if (i > 0) {
        if (
          snakeBody[0].x == snakeBody[i].x &&
          snakeBody[0].y == snakeBody[i].y
        ) {
          touched = true;
        }
      }
      if (snakeBody[i].x == randomX + 1 && snakeBody[i].y == randomY + 1) {
        foodIsEaten = true;
      }
    }
    // TODO:
    if (rightPressed && !isGoingLeft && !touched) {
      if (r != 341) {
        clearCanvas();
        context.fillStyle = "lime";
        context.strokeStyle = "#2c061f";
        context.lineWidth = 2;

        if (snakeBody.length == 1) {
          snakeBody[0].x += 20;
        } else {
          for (let i = snakeBody.length - 2; i >= 0; i--) {
            snakeBody[i + 1].x = snakeBody[i].x;
            snakeBody[i + 1].y = snakeBody[i].y;
          }
          snakeBody[0].x += 20;
        }
        for (let i = 0; i < snakeBody.length; i++) {
          context.fillRect(snakeBody[i].x, snakeBody[i].y, 20, 20);
          context.strokeRect(snakeBody[i].x, snakeBody[i].y, 20, 20);
        }
        if (!foodIsEaten) {
          context.fillStyle = "red";
          context.fillRect(randomX + 1, randomY + 1, 20, 20);
          context.strokeStyle = "#16c79a";
          context.lineWidth = 2;
          context.strokeRect(randomX + 1, randomY + 1, 20, 20);
        }
        context.fillStyle = "lime";
        context.strokeStyle = "#2c061f";
        context.lineWidth = 2;
        if (
          snakeBody[0].x == randomX + 1 &&
          snakeBody[0].y == randomY + 1 &&
          !foodIsEaten
        ) {
          snakeBody.push({
            x: snakeBody[snakeBody.length - 1].x - 20,
            y: snakeBody[snakeBody.length - 1].y,
          });
          foodIsEaten = true;
          context.fillRect(randomX + 1, randomY + 1, 20, 20);
          eat.play();
          currentScore += 1;
          document.querySelector(".score").innerHTML = currentScore;
        }
        r += 20;
        isGoingRight = true;
        isGoingLeft = false;
        isGoingDown = false;
        isGoingUp = false;
      } else {
        lose();
        clearInterval(id);
        clearInterval(id1);
      }
      // TODO:
    } else if (leftPressed && !isGoingRight && !touched) {
      if (r != 1) {
        clearCanvas();
        context.fillStyle = "lime";
        context.strokeStyle = "#2c061f";
        context.lineWidth = 2;

        if (snakeBody.length == 1) {
          snakeBody[0].x -= 20;
        } else {
          for (let i = snakeBody.length - 2; i >= 0; i--) {
            snakeBody[i + 1].x = snakeBody[i].x;
            snakeBody[i + 1].y = snakeBody[i].y;
          }
          snakeBody[0].x -= 20;
        }
        for (let i = 0; i < snakeBody.length; i++) {
          context.fillRect(snakeBody[i].x, snakeBody[i].y, 20, 20);
          context.strokeRect(snakeBody[i].x, snakeBody[i].y, 20, 20);
        }
        if (!foodIsEaten) {
          context.fillStyle = "red";
          context.fillRect(randomX + 1, randomY + 1, 20, 20);
          context.strokeStyle = "#16c79a";
          context.lineWidth = 2;
          context.strokeRect(randomX + 1, randomY + 1, 20, 20);
        }
        context.fillStyle = "lime";
        context.strokeStyle = "#2c061f";
        context.lineWidth = 2;
        if (
          snakeBody[0].x == randomX + 1 &&
          snakeBody[0].y == randomY + 1 &&
          !foodIsEaten
        ) {
          snakeBody.push({
            x: snakeBody[snakeBody.length - 1].x + 20,
            y: snakeBody[snakeBody.length - 1].y,
          });
          foodIsEaten = true;
          context.fillRect(randomX + 1, randomY + 1, 20, 20);
          eat.play();
          currentScore += 1;
          document.querySelector(".score").innerHTML = currentScore;
        }
        r -= 20;
        isGoingRight = false;
        isGoingLeft = true;
        isGoingDown = false;
        isGoingUp = false;
      } else {
        lose();
        clearInterval(id);
        clearInterval(id1);
      }
      // TODO:
    } else if (downPressed && !isGoingUp && !touched) {
      if (b != 341) {
        clearCanvas();
        context.fillStyle = "lime";
        context.strokeStyle = "#2c061f";
        context.lineWidth = 2;

        if (snakeBody.length == 1) {
          snakeBody[0].y += 20;
        } else {
          for (let i = snakeBody.length - 2; i >= 0; i--) {
            snakeBody[i + 1].x = snakeBody[i].x;
            snakeBody[i + 1].y = snakeBody[i].y;
          }
          snakeBody[0].y += 20;
        }
        for (let i = 0; i < snakeBody.length; i++) {
          context.fillRect(snakeBody[i].x, snakeBody[i].y, 20, 20);
          context.strokeRect(snakeBody[i].x, snakeBody[i].y, 20, 20);
        }
        if (!foodIsEaten) {
          context.fillStyle = "red";
          context.fillRect(randomX + 1, randomY + 1, 20, 20);
          context.strokeStyle = "#16c79a";
          context.lineWidth = 2;
          context.strokeRect(randomX + 1, randomY + 1, 20, 20);
        }
        context.fillStyle = "lime";
        context.strokeStyle = "#2c061f";
        context.lineWidth = 2;
        if (
          snakeBody[0].x == randomX + 1 &&
          snakeBody[0].y == randomY + 1 &&
          !foodIsEaten
        ) {
          snakeBody.push({
            x: snakeBody[snakeBody.length - 1].x,
            y: snakeBody[snakeBody.length - 1].y - 20,
          });
          foodIsEaten = true;
          context.fillRect(randomX + 1, randomY + 1, 20, 20);
          eat.play();
          currentScore += 1;
          document.querySelector(".score").innerHTML = currentScore;
        }
        b += 20;
        isGoingRight = false;
        isGoingLeft = false;
        isGoingDown = true;
        isGoingUp = false;
      } else {
        lose();
        clearInterval(id);
        clearInterval(id1);
      }
      // TODO:
    } else if (upPressed && !isGoingDown && !touched) {
      if (b != 1) {
        clearCanvas();
        context.fillStyle = "lime";
        context.strokeStyle = "#2c061f";
        context.lineWidth = 2;

        if (snakeBody.length == 1) {
          snakeBody[0].y -= 20;
        } else {
          for (let i = snakeBody.length - 2; i >= 0; i--) {
            snakeBody[i + 1].x = snakeBody[i].x;
            snakeBody[i + 1].y = snakeBody[i].y;
          }
          snakeBody[0].y -= 20;
        }
        for (let i = 0; i < snakeBody.length; i++) {
          context.fillRect(snakeBody[i].x, snakeBody[i].y, 20, 20);
          context.strokeRect(snakeBody[i].x, snakeBody[i].y, 20, 20);
        }
        if (!foodIsEaten) {
          context.fillStyle = "red";
          context.fillRect(randomX + 1, randomY + 1, 20, 20);
          context.strokeStyle = "#16c79a";
          context.lineWidth = 2;
          context.strokeRect(randomX + 1, randomY + 1, 20, 20);
        }
        context.fillStyle = "lime";
        context.strokeStyle = "#2c061f";
        context.lineWidth = 2;
        if (
          snakeBody[0].x == randomX + 1 &&
          snakeBody[0].y == randomY + 1 &&
          !foodIsEaten
        ) {
          snakeBody.push({
            x: snakeBody[snakeBody.length - 1].x,
            y: snakeBody[snakeBody.length - 1].y + 20,
          });
          foodIsEaten = true;
          context.fillRect(randomX + 1, randomY + 1, 20, 20);
          eat.play();
          currentScore += 1;
          document.querySelector(".score").innerHTML = currentScore;
        }
        b -= 20;
        isGoingRight = false;
        isGoingLeft = false;
        isGoingDown = false;
        isGoingUp = true;
      } else {
        lose();
        clearInterval(id);
        clearInterval(id1);
      }
    } else {
      lose();
      clearInterval(id);
      clearInterval(id1);
    }
  }
}
