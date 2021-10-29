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
var gXmedia = 0;
var gYmedia = 0;

const EMOJI = '💖';

function setSort(sortBy) {
  gCurrGallery = (sortBy === 'dogs') ? createGallery('dogs') : (sortBy === 'mix') ? createGallery('mix') : createGallery('cats');
  renderGallery(gCurrGallery);
}

function toggleClrInput() {
  document.querySelector('.clr-input').hidden = !document.querySelector('.clr-input').hidden
}

function setColor(color) {
  var elColor = document.querySelector('.color-btn');
  elColor.style.display = 'none';
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
  resizeCanvas();
  drawImg(gCurrImgidx);
  const elGetText = document.querySelector('input.text');
  const text = elGetText.value;
  gTexts.push(text);
  saveToStorage('TEXTS', gTexts);
  textCenter();
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

function checkPos() {
  (gPos === 'center') ? textCenter() : (gPos === 'left') ? textLeft() : textRight();
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
  resizeCanvas();
  drawImg(gCurrImgidx);
  var c = document.getElementById("my-canvas");
  var ctx = c.getContext("2d");
  gCtx.font = `20+${gSize}px cursive`;
  gCtx.lineWidth = 4;
  gCtx.strokeStyle = gColor;

  gCtx.strokeText(gTexts[0], 10 - gLeft + gRight + gXmedia, 50 - gUp + gDown);
  gCtx.fillText(gTexts[0], 10 - gLeft + gRight + gXmedia, 50 - gUp + gDown);
  if (gTexts.length > 1) {
    gCtx.strokeText(gTexts[1], 10 - gLeft + gRight + gXmedia, 280 - gUp + gDown + gYmedia);
    gCtx.fillText(gTexts[1], 10 - gLeft + gRight + gXmedia, 280 - gUp + gDown + gYmedia);
  }
  if (gTexts.length > 2) {
    gCtx.strokeText(gTexts[gTexts.length - 1], 10 - gLeft + gRight + gXmedia, 150 - gUp + gDown + gYmedia);
    gCtx.fillText(gTexts[gTexts.length - 1], 10 - gLeft + gRight + gXmedia, 150 - gUp + gDown + gYmedia);
  }
}

function textCenter() {
  gPos = 'center';
  resizeCanvas();
  drawImg(gCurrImgidx);
  var c = document.getElementById("my-canvas");
  var ctx = c.getContext("2d");
  gCtx.font = `20+${gSize}px cursive`;
  gCtx.lineWidth = 4;
  gCtx.strokeStyle = gColor;

  gCtx.strokeText(gTexts[0], 100 - gLeft + gRight + gXmedia * 15, 50 - gUp + gDown);
  gCtx.fillText(gTexts[0], 100 - gLeft + gRight + gXmedia * 15, 50 - gUp + gDown);

  if (gTexts.length > 1) {
    gCtx.strokeText(gTexts[1], 100 - gLeft + gRight + gXmedia * 15, 280 - gUp + gDown + gYmedia);
    gCtx.fillText(gTexts[1], 100 - gLeft + gRight + gXmedia * 15, 280 - gUp + gDown + gYmedia);
  }

  if (gTexts.length > 2) {
    gCtx.strokeText(gTexts[gTexts.length - 1], 100 - gLeft + gRight + gXmedia * 15, 150 - gUp + gDown + gYmedia);
    gCtx.fillText(gTexts[gTexts.length - 1], 100 - gLeft + gRight + gXmedia * 15, 150 - gUp + gDown + gYmedia);
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

  if (x.matches) {
    gCtx.strokeText(gTexts[0], 200 - gLeft + gRight , 50 - gUp + gDown);
    gCtx.fillText(gTexts[0], 200 - gLeft + gRight, 50 - gUp + gDown);
    if (gTexts.length > 1) {
      gCtx.strokeText(gTexts[1], 200 - gLeft + gRight, 280 - gUp + gDown);
      gCtx.fillText(gTexts[1], 200 - gLeft + gRight, 280 - gUp + gDown);
    }
    if (gTexts.length > 2) {
      gCtx.strokeText(gTexts[gTexts.length - 1], 200 - gLeft + gRight, 150 - gUp + gDown);
      gCtx.fillText(gTexts[gTexts.length - 1], 200 - gLeft + gRight, 150 - gUp + gDown);
    }
  }

  else {
    gCtx.strokeText(gTexts[0], 280 - gLeft + gRight, 50 - gUp + gDown);
    gCtx.fillText(gTexts[0], 280 - gLeft + gRight, 50 - gUp + gDown);

    if (gTexts.length > 1) {
      gCtx.strokeText(gTexts[1], 280 - gLeft + gRight, 280 - gUp + gDown + gYmedia);
      gCtx.fillText(gTexts[1], 280 - gLeft + gRight, 280 - gUp + gDown + gYmedia);
    }
    if (gTexts.length > 2) {
      gCtx.strokeText(gTexts[gTexts.length - 1], 280 - gLeft + gRight, 150 - gUp + gDown + gYmedia);
      gCtx.fillText(gTexts[gTexts.length - 1], 280 - gLeft + gRight, 150 - gUp + gDown + gYmedia);
    }
  }
}

function setEmoji() {
  gCtx.fillText(EMOJI, gX, gY);
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  gTexts = [];
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