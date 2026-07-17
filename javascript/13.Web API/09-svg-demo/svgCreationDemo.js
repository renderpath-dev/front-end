// Goal:
// Create SVG Elements with the SVG namespace

const svgNamespace = 'http://www.w3.org/2000/svg';
const chartRootElement = document.querySelector('#chart-root');

const svgElement = document.createElementNS(svgNamespace, 'svg');
svgElement.setAttribute('width','200');
svgElement.setAttribute('height','120');
svgElement.setAttribute('viewBox','0 0 220 120');

const barElement = document.createElementNS(svgNamespace, 'rect');
barElement.setAttribute('x','20');
barElement.setAttribute('y','40');
barElement.setAttribute('width','160');
barElement.setAttribute('height','40');
barElement.setAttribute('fill','steelblue');

svgElement.append(barElement);
chartRootElement.append(svgElement);