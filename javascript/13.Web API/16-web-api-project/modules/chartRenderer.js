// Goal:
// Render a simple bar chart on canvas.

export function renderScoreChart(canvasElement, scoreValue) {
  const drawingContext = canvasElement.getContext('2d');

  if (drawingContext === null) {
    throw new Error('Canvas context is not available');
  }

  drawingContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
  drawingContext.fillStyle = 'lightgray';
  drawingContext.fillRect(0, 0, canvasElement.width, canvasElement.height);
  drawingContext.fillStyle = 'steelblue';
  drawingContext.fillRect(20, 60, scoreValue, 40);
}
