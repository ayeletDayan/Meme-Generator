'use strict'
var gElCanvas;
var gCtx;
var gCurrShape = 'triangle';
var gColor = 'pink';
var gIsDraw = false;
var gPreDis = 0;
var gMove = false;
var gPreX = 0;
var gPreY = 0;
var gSize = 1;
var gText;

function init() {
  // createGallery(18);
  gElCanvas = document.getElementById('my-canvas');
  gCtx = gElCanvas.getContext('2d');
  resizeCanvas();
}

function toggleClrInput() {
  document.querySelector('.clr-input').hidden = !document.querySelector('.clr-input').hidden
}

function setColor(color) {
  gColor = color;
}

function drawLine(x, y, xEnd = 250, yEnd = 250) {
  gCtx.beginPath();
  gCtx.moveTo(x, y);
  gCtx.lineTo(xEnd + gSize, yEnd + gSize);
  gCtx.lineWidth = 1;
  gCtx.strokeStyle = gColor;
  gCtx.stroke();
}

function drawTriangle(x, y) {
  gCtx.beginPath();
  gCtx.lineWidth = 1;
  gCtx.moveTo(x, y);
  gCtx.lineTo(x - 10 + gSize, y - 10 + gSize);
  gCtx.lineTo(x, y - 10 + gSize);
  gCtx.lineTo(x, y);
  gCtx.closePath();
  // gCtx.fillStyle = gColor;
  // gCtx.fill();
  gCtx.strokeStyle = gColor;
  gCtx.stroke();
}

function drawRect(x, y) {
  gCtx.beginPath();
  gCtx.rect(x, y, 10 + gSize, 10 + gSize);
  gCtx.strokeStyle = gColor;
  gCtx.stroke();
}

function drawArc(x, y) {
  gCtx.beginPath();
  gCtx.lineWidth = 2;
  gCtx.arc(x, y, gSize, 0, 2 * Math.PI);
  gCtx.strokeStyle = gColor;
  gCtx.stroke();
  //   gCtx.fillStyle = gColor;
  //   gCtx.fill();
}

function drawText(text, x, y) {
  gCtx.strokeStyle = gColor;
  gCtx.font = `20+${gSize}px cursive`;
  // gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}


function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL();
  console.log('data', data);
  elLink.href = data;
}

function resizeCanvas() {
  var elContainer = document.querySelector('.canvas-container');
  // Note: changing the canvas dimension this way clears the canvas
  gElCanvas.width = elContainer.offsetWidth - 40;
  // Unless needed, better keep height fixed.
  //   gCanvas.height = elContainer.offsetHeight
}

function setShape(shape) {
  gCurrShape = shape;
  if (gCurrShape === 'text')
    gText = prompt('Insert text');
}

function draw(ev) {
  var X = 0;
  var Y = 0;
  if (!gIsDraw) return
  const { offsetX, offsetY } = ev
  if (!offsetX && !offsetY) {
    
    var rect = ev.target.getBoundingClientRect();
    const X = ev.targetTouches[0].pageX - rect.left;
    const Y = ev.targetTouches[0].pageY - rect.top;
    var sum = offsetX+X;    
console.log(offsetX
  +X)  }

  if (gPreDis === 0 && (!gMove)) {
    gMove = true;
    gPreX = offsetX;
    gPreY = offsetY;
    // console.log(gPreDis, gPreX, gPreY)
  }
  else {
    var currPreDis = Math.abs(gPreX - offsetX) + Math.abs(gPreY - offsetY)
  }
  // console.log(gPreDis, currPreDis, gSize)

  if (gSize > 0) {
    gSize = (currPreDis > gPreDis) ? gSize + 1 : gSize - 1;
  }
  else gSize++;

  gPreDis = currPreDis;

  switch (gCurrShape) {
    case 'circle':
      drawArc(offsetX, offsetY);
      break;
    case 'triangle':
      drawTriangle(offsetX, offsetY);
      break;
    case 'rect':
      drawRect(offsetX, offsetY);
      break;
    case 'text':
      drawText(gText, offsetX, offsetY);
      break;
    case 'line':
      drawLine(offsetX, offsetY);
      break;
    case 'img':
      drawImg();
      break;
  }
}

function mouseUp(ev) {
  gIsDraw = false;
  gMove = false;
  gSize = 1;
}

function mouseDown(ev) {
  gIsDraw = true
}

function log() {
  console.log('ontouchstart');
}