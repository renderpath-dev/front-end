// Goal:
// Draw simple shapes on a 2D canvas.

const chartCanvasElement = document.querySelector('#chart-canvas');
const drawingContext = chartCanvasElement.getContext('2d');

if (drawingContext === null) {
  throw new Error('2D canvas context is not available');
}

drawingContext.fillStyle = 'lightgray';
drawingContext.fillRect(0, 0, 300, 160);

drawingContext.fillStyle = 'steelblue';
drawingContext.fillRect(40, 80, 60, 50);
drawingContext.fillRect(120, 50, 60, 80);

drawingContext.beginPath();
drawingContext.arc(230, 80, 30, 0, Math.PI * 2);
drawingContext.fillStyle = 'tomato';
drawingContext.fill();
