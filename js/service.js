'use strict'
var gElCanvas;
var gCtx;
var gCurrShape = 'triangle';
var gColor = '#FAEBD7';
// var gIsDraw = false;
var gSize = 20;
var gText;
var gX=50;
var gY=50;

function toggleClrInput() {
  document.querySelector('.clr-input').hidden = !document.querySelector('.clr-input').hidden
}

function setColor(color) {
  gColor = color;
}

function draw(event) {
  const { offsetX, offsetY } = event;
  gX = offsetX;
  gY = offsetY;
  console.log(gX, gY)
}

function setText() {
  const elGetText = document.querySelector('input.text');
  const text = elGetText.value;
  var c = document.getElementById("my-canvas");
  var ctx = c.getContext("2d");
  gCtx.font = "50px cursive";
  gCtx.fillStyle = gColor;
  gCtx.fillText(text, gX, gY);
  gCtx.strokeText(text, gX, gY);
  elGetText.value = '';
}

function up() { //todo

}

function down() { //todo

}

function addText() { //todo

}

function textBig() { //todo

}

function textSmall() { //todo

}

function textLeft() { //todo

}

function textCenter() { //todo

}

function textRight() { //todo

}

function setImoji() { //todo

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
  gElCanvas.width = elContainer.offsetWidth - 40;
}