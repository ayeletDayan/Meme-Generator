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
var gUp = false;
var gDowm = false;

const EMOJI = '💖';  //'&#128151'

function setSort(sortBy) {
  gCurrGallery = (sortBy === 'dogs')? createGallery('dogs') : (sortBy === 'mix')? createGallery('mix') : createGallery('cats');    
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

  (!gUp && !gDowm) ? gTexts.push(text) : (gUp) ? gTexts[0] = text : gTexts[1] = text;

  saveToStorage('TEXTS', gTexts);
  textCenter();
  // gCtx.strokeText(text, gX, gY); //Manually select location for text.
  elGetText.value = '';
  gUp = false;
  gDowm = false;
}

function up() {
  gTexts = loadFromStorage('TEXTS');
  gUp = true;
}

function down() {
  gTexts = loadFromStorage('TEXTS');
  gDowm = true;
}

function textBig() {
  gSize += 5;
  textCenter();
}

function textSmall() {
  if (gSize > 5) gSize -= 5;
  textCenter();
}

function textLeft() {
  document.getElementById("body").dir = "ltr";
  resizeCanvas();
  drawImg(gCurrImgidx);
  var c = document.getElementById("my-canvas");
  var ctx = c.getContext("2d");
  gCtx.font = `20+${gSize}px cursive`;
  gCtx.lineWidth = 4;
  gCtx.strokeStyle = gColor;  

  gCtx.strokeText(gTexts[0], 50, 50);
  gCtx.fillText(gTexts[0], 50, 50);
  if (gTexts.length > 1) {
    gCtx.strokeText(gTexts[1], 50, 350);
    gCtx.fillText(gTexts[1], 50, 350);
  }
  if (gTexts.length > 2) {
    gCtx.strokeText(gTexts[gTexts.length - 1], 50, 200);
    gCtx.fillText(gTexts[gTexts.length - 1], 50, 200);
  }
}

function textCenter() {
  document.getElementById("body").dir = "ltr";
  resizeCanvas();
  drawImg(gCurrImgidx);
  var c = document.getElementById("my-canvas");
  var ctx = c.getContext("2d");
  gCtx.font = `20+${gSize}px cursive`;
  gCtx.lineWidth = 4;  
  gCtx.strokeStyle = gColor; 

  const text1size = gTexts[0].length;
  var pos1 = checkTextSize(text1size);
  gCtx.strokeText(gTexts[0], pos1, 50);
  gCtx.fillText(gTexts[0], pos1, 50);

  if (gTexts.length > 1) {
    const text2size = gTexts[1].length;
    var pos2 = checkTextSize(text2size);
    gCtx.strokeText(gTexts[1], pos2, 350);
    gCtx.fillText(gTexts[1], pos2, 350);
  }

  if (gTexts.length > 2) {
    const text3size = gTexts[gTexts.length - 1].length;
    var pos3 = checkTextSize(text3size);
    gCtx.strokeText(gTexts[gTexts.length - 1], pos3, 200);
    gCtx.fillText(gTexts[gTexts.length - 1], pos3, 200);
  }
}

function textRight() {
  document.getElementById("body").dir = "rtl";
  resizeCanvas();
  drawImg(gCurrImgidx);
  var c = document.getElementById("my-canvas");
  var ctx = c.getContext("2d");
  gCtx.font = `20+${gSize}px cursive`;
  gCtx.lineWidth = 4;
  gCtx.strokeStyle = gColor;  

  gCtx.strokeText(gTexts[0], 300, 50);
  gCtx.fillText(gTexts[0], 300, 50);
  if (gTexts.length > 1) {
    gCtx.strokeText(gTexts[1], 300, 350);
    gCtx.fillText(gTexts[1], 300, 350);
  }
  if (gTexts.length > 2) {
    gCtx.strokeText(gTexts[gTexts.length - 1], 300, 200);
    gCtx.fillText(gTexts[gTexts.length - 1], 300, 200);
  } 
}

function setEmoji() { //todo
  gCtx.fillText(EMOJI, gX, gY);
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

function checkTextSize(textsize) {
  if (x.matches) {
    var pos;
    if (textsize > 20) alert('Too long!')
    else if (textsize > 18 && textsize <= 20)
      pos = 70;
    else if (textsize > 15 && textsize <= 18)
      pos = 80;
    else if (textsize > 12 && textsize <= 15)
      pos = 90;
    else if (textsize > 9 && textsize <= 12)
      pos = 100;
    else if (textsize > 6 && textsize <= 9)
      pos = 120;
    else if (textsize > 3 && textsize <= 6)
      pos = 140;
    else
      pos = 160;
    return pos;
  }
  else {
    var pos;
    if (textsize > 20) alert('Too long!')
    else if (textsize > 18 && textsize <= 20)
      pos = 270;
    else if (textsize > 15 && textsize <= 18)
      pos = 280;
    else if (textsize > 12 && textsize <= 15)
      pos = 290;
    else if (textsize > 9 && textsize <= 12)
      pos = 300;
    else if (textsize > 6 && textsize <= 9)
      pos = 320;
    else if (textsize > 3 && textsize <= 6)
      pos = 340;
    else
      pos = 360;
    return pos;

  }
}
