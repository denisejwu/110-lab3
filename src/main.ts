import Konva from 'konva';

// first we need to create a stage
const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

// then create layer
const layer = new Konva.Layer();
stage.add(layer);

// create our shape
const lemon = new Konva.Line({
  x: stage.width() / 2,
  y: stage.height() / 2,
  offsetX: 50,
  fill: 'yellow',
  stroke: 'black',
  points: [0,0,50,-30,100,0,100,0,50,30,0,0,],
  strokeWidth: 4,
  lineCap: 'round',
  lineJoin: 'round',
  tension: 0.5,
  closed: true,
  draggable: true
});

const animation = new Konva.Animation((frame) => {
  const scale = Math.sin(frame.time * 2 * Math.PI / 2000) * 0.2 + 1.2;
  lemon.scale({ x: scale, y: scale });
});

lemon.on('mouseover', () => {
  document.body.style.cursor = 'pointer';
  stage.container().style.cursor = 'pointer';
  animation.start();
});

lemon.on('mouseout', () => {
  document.body.style.cursor = 'default';
  stage.container().style.cursor = 'default';
  animation.stop();
  lemon.scale({ x: 1, y: 1 });
});

lemon.on("dragstart", () => {
  stage.container().style.cursor = 'grabbing';
});

lemon.on("dragend", () => {
  stage.container().style.cursor = 'grab';
});


// add the shape to the layer
layer.add(lemon);

// add the layer to the stage
stage.add(layer);
