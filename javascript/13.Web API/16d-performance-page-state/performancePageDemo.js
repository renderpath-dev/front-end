// Goal:
// Measure work and schedule visual updates with browser timing APIs.

const workButton = document.querySelector('#work-button');
const animationButton = document.querySelector('#animation-button');
const visibilityOutput = document.querySelector('#visibility-output');
const measureOutput = document.querySelector('#measure-output');
const box = document.querySelector('#box');

let frameId = 0;
let isAnimating = false;
let x = 0;

const performanceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    measureOutput.textContent = `${entry.name}: ${entry.duration.toFixed(2)}ms`;
  }
});

performanceObserver.observe({
  entryTypes: ['measure'],
});

function runExpensiveWork() {
  let total = 0;

  for (let index = 0; index < 5_000_000; index += 1) {
    total += Math.sqrt(index);
  }

  return total;
}

workButton.addEventListener('click', () => {
  performance.mark('work-start');
  runExpensiveWork();
  performance.mark('work-end');
  performance.measure('expensive-work', 'work-start', 'work-end');
});

function updateAnimation() {
  if (!isAnimating || document.hidden) {
    return;
  }

  x = (x + 2) % 240;
  box.style.transform = `translateX(${x}px)`;

  frameId = requestAnimationFrame(updateAnimation);
}

animationButton.addEventListener('click', () => {
  isAnimating = !isAnimating;

  if (isAnimating) {
    frameId = requestAnimationFrame(updateAnimation);
  } else {
    cancelAnimationFrame(frameId);
  }
});

document.addEventListener('visibilitychange', () => {
  visibilityOutput.textContent = `Visibility: ${document.visibilityState}`;

  if (!document.hidden && isAnimating) {
    frameId = requestAnimationFrame(updateAnimation);
  }
});
