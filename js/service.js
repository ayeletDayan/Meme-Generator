'use strict'
var gElCanvas;
var gCtx;
var gCurrShape = 'triangle';
var gColor = 'white';
var gSize = 20;
var gText;
var gX = 50;
var gY = 50;
var gTexts = [];
var gUp = 0;
var gDown = 0;
var gLeft = 0;
var gRight = 0;
var gPos;

const EMOJI = '💖';  //'&#128151'

function setSort(sortBy) {
  gCurrGallery = (sortBy === 'dogs') ? createGallery('dogs') : (sortBy === 'mix') ? createGallery('mix') : createGallery('cats');
  renderGallery(gCurrGallery);
}

function toggleClrInput() {
  document.querySelector('.clr-input').hidden = !document.querySelector('.clr-input').hidden
}

function setColor(color) {
  gColor = color;
  textCenter();
}

function draw(event) {
  const { offsetX, offsetY } = event;
  gX = offsetX;
  gY = offsetY;
  console.log(gX, gY)
}

function setText() {
  document.getElementById("body").dir = "ltr";
  resizeCanvas();
  drawImg(gCurrImgidx);
  var c = document.getElementById("my-canvas");
  var ctx = c.getContext("2d");
  gCtx.font = `20+${gSize}px cursive`;
  gCtx.lineWidth = 4;
  gCtx.strokeStyle = gColor;
  const elGetText = document.querySelector('input.text');
  const text = elGetText.value;
  gTexts.push(text);
  saveToStorage('TEXTS', gTexts);
  textCenter();
  // gCtx.strokeText(text, gX, gY); //Manually select location for text.
  elGetText.value = '';
}

function changeText() {
  console.log(gTexts)
  gTexts = loadFromStorage('TEXTS');
  let text = gTexts[0];
  gTexts[0] = gTexts[1];
  gTexts[1] = text;
  textCenter();
  saveToStorage('TEXTS', gTexts);

}

function up() {
  gTexts = loadFromStorage('TEXTS');
  gUp += 10;
  checkPos();
}

function down() {
  gTexts = loadFromStorage('TEXTS');
  gDown += 10;
  checkPos();
}

function left() {
  gTexts = loadFromStorage('TEXTS');
  gLeft += 10;
  checkPos();
}

function right() {
  gTexts = loadFromStorage('TEXTS');
  gRight += 10;
  checkPos();
}

function checkPos(){
  (gPos==='center')? textCenter() : (gPos==='left')? textLeft() : textRight();
}

function textBig() {
  gSize += 5;
  checkPos();
}

function textSmall() {
  if (gSize > 5) gSize -= 5;
  textCenter();
}

function textLeft() {
  gPos = 'left';
  document.getElementById("body").dir = "ltr";
  resizeCanvas();
  drawImg(gCurrImgidx);
  var c = document.getElementById("my-canvas");
  var ctx = c.getContext("2d");
  gCtx.font = `20+${gSize}px cursive`;
  gCtx.lineWidth = 4;
  gCtx.strokeStyle = gColor;

  gCtx.strokeText(gTexts[0], 50 - gLeft + gRight, 50 - gUp + gDown);
  gCtx.fillText(gTexts[0], 50 - gLeft + gRight, 50 - gUp + gDown);
  if (gTexts.length > 1) {
    gCtx.strokeText(gTexts[1], 50 - gLeft + gRight, 350 - gUp + gDown);
    gCtx.fillText(gTexts[1], 50 - gLeft + gRight, 350 - gUp + gDown);
  }
  if (gTexts.length > 2) {
    gCtx.strokeText(gTexts[gTexts.length - 1], 50 - gLeft + gRight, 200 - gUp + gDown);
    gCtx.fillText(gTexts[gTexts.length - 1], 50 - gLeft + gRight, 200 - gUp + gDown);
  }
}

function textCenter() {
  gPos = 'center';
  document.getElementById("body").dir = "ltr";
  resizeCanvas();
  drawImg(gCurrImgidx);
  var c = document.getElementById("my-canvas");
  var ctx = c.getContext("2d");
  gCtx.font = `20+${gSize}px cursive`;
  gCtx.lineWidth = 4;
  gCtx.strokeStyle = gColor;

  gCtx.strokeText(gTexts[0], 400 - gLeft + gRight, 50 - gUp + gDown);
  gCtx.fillText(gTexts[0], 400 - gLeft + gRight, 50 - gUp + gDown);

  if (gTexts.length > 1) {
    gCtx.strokeText(gTexts[1], 400 - gLeft + gRight, 350 - gUp + gDown);
    gCtx.fillText(gTexts[1], 400 - gLeft + gRight, 350 - gUp + gDown);
  }

  if (gTexts.length > 2) {
    gCtx.strokeText(gTexts[gTexts.length - 1], 400 - gLeft + gRight, 200 - gUp + gDown);
    gCtx.fillText(gTexts[gTexts.length - 1], 400 - gLeft + gRight, 200 - gUp + gDown);
  }
}

function textRight() {
  gPos = 'right';
  resizeCanvas();
  drawImg(gCurrImgidx);
  var c = document.getElementById("my-canvas");
  var ctx = c.getContext("2d");
  gCtx.font = `20+${gSize}px cursive`;
  gCtx.lineWidth = 4;
  gCtx.strokeStyle = gColor;

  gCtx.strokeText(gTexts[0], 700 - gLeft + gRight, 50 - gUp + gDown);
  gCtx.fillText(gTexts[0], 700 - gLeft + gRight, 50 - gUp + gDown);
  if (gTexts.length > 1) {
    gCtx.strokeText(gTexts[1], 700 - gLeft + gRight, 350 - gUp + gDown);
    gCtx.fillText(gTexts[1], 700 - gLeft + gRight, 350 - gUp + gDown);
  }
  if (gTexts.length > 2) {
    gCtx.strokeText(gTexts[gTexts.length - 1], 700 - gLeft + gRight, 200 - gUp + gDown);
    gCtx.fillText(gTexts[gTexts.length - 1], 700 - gLeft + gRight, 200 - gUp + gDown);
  }
}

function setEmoji() {
  gCtx.fillText(EMOJI, gX, gY);
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  drawImg(gCurrImgidx);
}

function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL();
  console.log('data', data);
  elLink.href = data;
  var gUp = 0;
  var gDown = 0;
  var gLeft = 0;
  var gRight = 0
}

function resizeCanvas() {
  var elContainer = document.querySelector('.canvas-container');
  gElCanvas.width = elContainer.offsetWidth - 40;
}