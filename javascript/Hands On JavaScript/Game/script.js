"use strict";

const board = document.getElementById("board");
const context = board.getContext("2d");
const scoreValue = document.getElementById("scoreValue");
const bestValue = document.getElementById("bestValue");
const speedValue = document.getElementById("speedValue");
const statusPill = document.getElementById("statusPill");
const pauseButton = document.getElementById("pauseButton");
const startButton = document.getElementById("startButton");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");
const controlButtons = document.querySelectorAll(".control-button");

const GRID_SIZE = 20;
const CELL_SIZE = board.width / GRID_SIZE;
const STORAGE_KEY = "classic-snake-best-score";
const COLORS = {
  board: "#173a2d",
  grid: "rgba(245, 240, 221, 0.08)",
  snake: "#b7f96d",
  snakeTrim: "#67af46",
  head: "#f5f0dd",
  eye: "#173a2d",
  food: "#ff6b35",
  foodGlow: "rgba(255, 107, 53, 0.28)",
  leaf: "#2db67c",
};

const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITE = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

let snake = [];
let direction = "right";
let queuedDirection = "right";
let food = null;
let score = 0;
let bestScore = loadBestScore();
let gameMode = "idle";
let stepDelay = 180;
let accumulator = 0;
let lastFrameTime = 0;

function loadBestScore() {
  try {
    const storedValue = Number(window.localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(storedValue) ? storedValue : 0;
  } catch {
    return 0;
  }
}

function saveBestScore() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(bestScore));
  } catch {
    // Storage access can fail in locked-down contexts; gameplay still works.
  }
}

function createInitialSnake() {
  return [
    { x: 8, y: 10 },
    { x: 7, y: 10 },
    { x: 6, y: 10 },
  ];
}

function getStepDelay(currentScore) {
  return Math.max(78, 180 - currentScore * 6);
}

function setOverlay(title, message, visible) {
  overlayTitle.textContent = title;
  overlayText.textContent = message;
  overlay.dataset.visible = visible ? "true" : "false";
}

function updateHud() {
  scoreValue.textContent = String(score);
  bestValue.textContent = String(bestScore);
  speedValue.textContent = `${Math.max(1, Math.round((180 - stepDelay) / 22) + 1)}x`;
}

function setStatus(label) {
  statusPill.textContent = label;
}

function spawnFood() {
  const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`));
  const openCells = [];

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      const key = `${x},${y}`;
      if (!occupied.has(key)) {
        openCells.push({ x, y });
      }
    }
  }

  if (openCells.length === 0) {
    return null;
  }

  return openCells[Math.floor(Math.random() * openCells.length)];
}

function initializeRound(mode = "idle") {
  snake = createInitialSnake();
  direction = "right";
  queuedDirection = "right";
  score = 0;
  stepDelay = getStepDelay(score);
  accumulator = 0;
  food = spawnFood();
  gameMode = mode;
  pauseButton.disabled = mode !== "running";
  pauseButton.textContent = "Pause";

  if (mode === "running") {
    startButton.textContent = "Restart";
    setStatus("Running");
    setOverlay("", "", false);
  } else {
    startButton.textContent = "Start Game";
    setStatus("Ready");
    setOverlay(
      "Classic Snake",
      "Use the arrow keys, WASD, or the touch pad to start moving.",
      true
    );
  }

  updateHud();
  draw();
}

function beginRun() {
  initializeRound("running");
}

function restartRun() {
  beginRun();
}

function pauseRun() {
  if (gameMode !== "running") {
    return;
  }

  gameMode = "paused";
  pauseButton.textContent = "Resume";
  startButton.textContent = "Resume";
  setStatus("Paused");
  setOverlay("Paused", "Take a breath. Press space or resume when you are ready.", true);
}

function resumeRun() {
  if (gameMode !== "paused") {
    return;
  }

  gameMode = "running";
  pauseButton.textContent = "Pause";
  startButton.textContent = "Restart";
  setStatus("Running");
  setOverlay("", "", false);
  accumulator = 0;
}

function togglePause() {
  if (gameMode === "running") {
    pauseRun();
  } else if (gameMode === "paused") {
    resumeRun();
  }
}

function finishRun(title, message) {
  gameMode = "over";
  pauseButton.disabled = true;
  pauseButton.textContent = "Pause";
  startButton.textContent = "Play Again";
  setStatus("Game Over");
  setOverlay(title, message, true);
}

function updateBestScore() {
  if (score > bestScore) {
    bestScore = score;
    saveBestScore();
  }
}

function requestTurn(nextDirection) {
  if (gameMode === "paused") {
    return;
  }

  if (gameMode === "idle" || gameMode === "over") {
    beginRun();
  }

  if (OPPOSITE[direction] === nextDirection) {
    return;
  }

  queuedDirection = nextDirection;
}

function handleKeydown(event) {
  const key = event.key.toLowerCase();

  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " ", "spacebar"].includes(key)) {
    event.preventDefault();
  }

  if (key === "arrowup" || key === "w") {
    requestTurn("up");
  } else if (key === "arrowdown" || key === "s") {
    requestTurn("down");
  } else if (key === "arrowleft" || key === "a") {
    requestTurn("left");
  } else if (key === "arrowright" || key === "d") {
    requestTurn("right");
  } else if (key === " " || key === "spacebar") {
    if (gameMode === "idle" || gameMode === "over") {
      beginRun();
    } else {
      togglePause();
    }
  } else if (key === "r") {
    restartRun();
  } else if (key === "p") {
    togglePause();
  }
}

function stepGame() {
  direction = queuedDirection;

  const currentHead = snake[0];
  const nextHead = {
    x: currentHead.x + DIRECTIONS[direction].x,
    y: currentHead.y + DIRECTIONS[direction].y,
  };

  const hitsWall =
    nextHead.x < 0 ||
    nextHead.x >= GRID_SIZE ||
    nextHead.y < 0 ||
    nextHead.y >= GRID_SIZE;

  if (hitsWall) {
    finishRun("Wall Hit", `You scored ${score}. Press play again to start a new run.`);
    draw();
    return;
  }

  const ateFood = food && nextHead.x === food.x && nextHead.y === food.y;
  const bodyToCheck = ateFood ? snake : snake.slice(0, -1);
  const hitsBody = bodyToCheck.some(
    (segment) => segment.x === nextHead.x && segment.y === nextHead.y
  );

  if (hitsBody) {
    finishRun("Tail Crash", `You scored ${score}. Try leaving a longer escape lane.`);
    draw();
    return;
  }

  snake.unshift(nextHead);

  if (ateFood) {
    score += 1;
    stepDelay = getStepDelay(score);
    updateBestScore();
    food = spawnFood();

    if (!food) {
      finishRun("Perfect Board", "You filled the grid. That is a flawless snake run.");
      updateHud();
      draw();
      return;
    }
  } else {
    snake.pop();
  }

  updateHud();
  draw();
}

function drawBoard() {
  context.fillStyle = COLORS.board;
  context.fillRect(0, 0, board.width, board.height);

  context.strokeStyle = COLORS.grid;
  context.lineWidth = 1;

  for (let line = 1; line < GRID_SIZE; line += 1) {
    const offset = line * CELL_SIZE + 0.5;

    context.beginPath();
    context.moveTo(offset, 0);
    context.lineTo(offset, board.height);
    context.stroke();

    context.beginPath();
    context.moveTo(0, offset);
    context.lineTo(board.width, offset);
    context.stroke();
  }
}

function drawFood() {
  if (!food) {
    return;
  }

  const centerX = food.x * CELL_SIZE + CELL_SIZE / 2;
  const centerY = food.y * CELL_SIZE + CELL_SIZE / 2;
  const radius = CELL_SIZE * 0.28;

  context.beginPath();
  context.fillStyle = COLORS.foodGlow;
  context.arc(centerX, centerY, CELL_SIZE * 0.38, 0, Math.PI * 2);
  context.fill();

  context.beginPath();
  context.fillStyle = COLORS.food;
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.fill();

  context.beginPath();
  context.fillStyle = COLORS.leaf;
  context.ellipse(centerX + 5, centerY - 8, 6, 3, -0.45, 0, Math.PI * 2);
  context.fill();
}

function drawSnake() {
  snake.forEach((segment, index) => {
    const x = segment.x * CELL_SIZE;
    const y = segment.y * CELL_SIZE;
    const inset = index === 0 ? 3 : 4.5;

    context.fillStyle = index === 0 ? COLORS.head : COLORS.snake;
    context.fillRect(x + inset, y + inset, CELL_SIZE - inset * 2, CELL_SIZE - inset * 2);

    if (index !== 0) {
      context.strokeStyle = COLORS.snakeTrim;
      context.lineWidth = 1.5;
      context.strokeRect(
        x + inset + 0.75,
        y + inset + 0.75,
        CELL_SIZE - inset * 2 - 1.5,
        CELL_SIZE - inset * 2 - 1.5
      );
    }
  });

  drawEyes();
}

function drawEyes() {
  const head = snake[0];
  if (!head) {
    return;
  }

  const x = head.x * CELL_SIZE;
  const y = head.y * CELL_SIZE;
  const eyeRadius = 2.3;

  let eyePositions;

  if (direction === "up") {
    eyePositions = [
      { x: x + CELL_SIZE * 0.32, y: y + CELL_SIZE * 0.3 },
      { x: x + CELL_SIZE * 0.68, y: y + CELL_SIZE * 0.3 },
    ];
  } else if (direction === "down") {
    eyePositions = [
      { x: x + CELL_SIZE * 0.32, y: y + CELL_SIZE * 0.7 },
      { x: x + CELL_SIZE * 0.68, y: y + CELL_SIZE * 0.7 },
    ];
  } else if (direction === "left") {
    eyePositions = [
      { x: x + CELL_SIZE * 0.3, y: y + CELL_SIZE * 0.32 },
      { x: x + CELL_SIZE * 0.3, y: y + CELL_SIZE * 0.68 },
    ];
  } else {
    eyePositions = [
      { x: x + CELL_SIZE * 0.7, y: y + CELL_SIZE * 0.32 },
      { x: x + CELL_SIZE * 0.7, y: y + CELL_SIZE * 0.68 },
    ];
  }

  context.fillStyle = COLORS.eye;
  eyePositions.forEach((eye) => {
    context.beginPath();
    context.arc(eye.x, eye.y, eyeRadius, 0, Math.PI * 2);
    context.fill();
  });
}

function draw() {
  drawBoard();
  drawFood();
  drawSnake();
}

function frame(timestamp) {
  if (!lastFrameTime) {
    lastFrameTime = timestamp;
  }

  const delta = timestamp - lastFrameTime;
  lastFrameTime = timestamp;

  if (gameMode === "running") {
    accumulator += delta;

    while (accumulator >= stepDelay && gameMode === "running") {
      accumulator -= stepDelay;
      stepGame();
    }
  } else {
    accumulator = 0;
  }

  window.requestAnimationFrame(frame);
}

startButton.addEventListener("click", () => {
  if (gameMode === "running") {
    restartRun();
    return;
  }

  if (gameMode === "paused") {
    resumeRun();
    return;
  }

  beginRun();
});

pauseButton.addEventListener("click", togglePause);
document.addEventListener("keydown", handleKeydown);

controlButtons.forEach((button) => {
  button.addEventListener("pointerdown", () => {
    requestTurn(button.dataset.direction);
  });
});

initializeRound("idle");
window.requestAnimationFrame(frame);
