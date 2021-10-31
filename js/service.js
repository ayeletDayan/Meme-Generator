'use strict'
var gElCanvas;
var gCtx;
var gCurrShape = 'triangle';
var gColor = 'white';
var gSize = 20;
var gX = 10;
var gY = 10;
var gTexts = [];
var gUp = 0;
var gDown = 0;
var gLeft = 0;
var gRight = 0;
var gPos;

const EMOJI = '💖';

function setSort(sortBy) {
  gCurrGallery = (sortBy === 'dogs') ? createGallery('dogs') : (sortBy === 'mix') ? createGallery('mix') : createGallery('cats');
  renderGallery(gCurrGallery);
}

function toggleClrInput() {
  var elColor = document.querySelector('.color-btn');
  elColor.style.display = 'none';
  document.querySelector('.clr-input').hidden = !document.querySelector('.clr-input').hidden
}

function setColor(color) {
  var elColor = document.querySelector('.color-btn');
  elColor.style.display = 'none';
  gColor = color;
  onText();
}

function draw(event) {
  const { offsetX, offsetY } = event;
  gX = offsetX;
  gY = offsetY;
  console.log(gX, gY)
}

function addText() {
  resizeCanvas();
  drawImg(gCurrImgidx);
  const elGetText = document.querySelector('input.text');
  if (!elGetText.value) {
    renderText();
    return;
  }
  gTexts.push(makeText(elGetText.value, gX, setY()));
  console.log(gTexts)
  saveToStorage('TEXTS', gTexts);
  renderText()
  // textCenter();
  elGetText.value = '';
  gDx = 0;
  gSize = 20;
}

function setY() {
  return (gTexts.length === 0) ? gY * 0.15 : (gTexts.length === 1) ? gY * 0.85 : gY * 0.5;
}

function renderText() {
  gCtx.beginPath()
  gCtx.lineWidth = 0.5;
  gCtx.fillStyle = gTexts[0].color;
  gCtx.strokeStyle = gTexts[0].strokeColor;
  gCtx.font = `${gTexts[0].size}px cursive`;
  gCtx.fillText(gTexts[0].txt, gTexts[0].pos.x, gTexts[0].pos.y);
  gCtx.strokeText(gTexts[0].txt, gTexts[0].pos.x, gTexts[0].pos.y);
console.log(gTexts[1].color)
  
  gCtx.fillStyle = gTexts[1].color;
  gCtx.strokeStyle = gTexts[1].strokeColor;
  gCtx.font = `${gTexts[1].size}px cursive`;
  gCtx.fillText(gTexts[1].txt, gTexts[1].pos.x, gTexts[1].pos.y);
  gCtx.strokeText(gTexts[1].txt, gTexts[1].pos.x, gTexts[1].pos.y);

  gCtx.fillStyle = gTexts[gTexts.length - 1].color;
  gCtx.strokeStyle = gTexts[gTexts.length - 1].strokeColor;
  gCtx.font = `${gTexts[gTexts.length - 1].size}px cursive`;
  gCtx.fillText(gTexts[gTexts.length - 1].txt, gTexts[gTexts.length - 1].pos.x, gTexts[gTexts.length - 1].pos.y);
  gCtx.strokeText(gTexts[gTexts.length - 1].txt, gTexts[gTexts.length - 1].pos.x, gTexts[gTexts.length - 1].pos.y);
}

function makeText(txt, x, y) {
  var text = {
    txt,
    size: gSize,
    // align: gPos,
    color: 'black',
    strokeColor: gColor,
    pos: { x: x, y: y },
    isDrag: false
  }
  return text;
}

// function changeText() {
//   console.log(gTexts)
//   gTexts = loadFromStorage('TEXTS');
//   let text = gTexts[0];
//   gTexts[0] = gTexts[1];
//   gTexts[1] = text;
//   onText();
//   saveToStorage('TEXTS', gTexts);

// }

// function up() {
//   gTexts = loadFromStorage('TEXTS');
//   gUp += 10;
//   // checkPos();
//   renderText();}

// function down() {
//   gTexts = loadFromStorage('TEXTS');
//   gDown += 10;
//   // checkPos();
//   renderText();}

// function left() {
//   gTexts = loadFromStorage('TEXTS');
//   gLeft += 10;
//   // checkPos();
//   renderText();
// }

// function right() {
//   gTexts = loadFromStorage('TEXTS');
//   gRight += 10;
//   // checkPos();
//   renderText();
// }

// function checkPos() {
//   (gPos === 'center') ? textCenter() : (gPos === 'left') ? textLeft() : textRight();
// }

function textBig() {
  gSize += 5;  
  onText();
}

function textSmall() {
  if (gSize > 5) gSize -= 5; 
  onText();
}

// function textLeft() {
//   gPos = 'left';
//   resizeCanvas();
//   drawImg(gCurrImgidx);
//   var c = document.getElementById("my-canvas");
//   var ctx = c.getContext("2d");
//   gCtx.font = `20+${gSize}px cursive`;
//   gCtx.lineWidth = 4;
//   gCtx.strokeStyle = gColor;


//   gCtx.strokeText(gTexts[0], 10 - gLeft + gRight + gXmedia, 50 - gUp + gDown);
//   gCtx.fillText(gTexts[0], 10 - gLeft + gRight + gXmedia, 50 - gUp + gDown);
//   if (gTexts.length > 1) {
//     gCtx.strokeText(gTexts[1], 10 - gLeft + gRight + gXmedia, 280 - gUp + gDown + gYmedia);
//     gCtx.fillText(gTexts[1], 10 - gLeft + gRight + gXmedia, 280 - gUp + gDown + gYmedia);
//   }
//   if (gTexts.length > 2) {
//     gCtx.strokeText(gTexts[gTexts.length - 1], 10 - gLeft + gRight + gXmedia, 150 - gUp + gDown + gYmedia);
//     gCtx.fillText(gTexts[gTexts.length - 1], 10 - gLeft + gRight + gXmedia, 150 - gUp + gDown + gYmedia);
//   }
// }

// function textCenter() {
//   gPos = 'center';
//   resizeCanvas();
//   drawImg(gCurrImgidx);
//   var c = document.getElementById("my-canvas");
//   var ctx = c.getContext("2d");
//   gCtx.font = `20+${gSize}px cursive`;
//   gCtx.lineWidth = 4;
//   gCtx.strokeStyle = gColor;
//   gCtx.strokeText(gTexts[0].txt, gX, gY * 0.15);
//   gCtx.fillText(gTexts[0].txt, gX, gY * 0.15);
//   if (gTexts.length > 1) {
//     gCtx.strokeText(gTexts[1].txt, gX, gY * 0.85);
//     gCtx.fillText(gTexts[1].txt, gX, gY * 0.85);
//     gDx++;
//   }
//   if (gTexts.length > 2) {
//     gCtx.strokeText(gTexts[gTexts.length - 1].txt, gX, gY * 0.5);
//     gCtx.fillText(gTexts[gTexts.length - 1].txt, gX, gY * 0.5);
//     gDx++;
//   }
// }

// function textRight() {
//   gPos = 'right';
//   resizeCanvas();
//   drawImg(gCurrImgidx);
//   var c = document.getElementById("my-canvas");
//   var ctx = c.getContext("2d");
//   gCtx.font = `20+${gSize}px cursive`;
//   gCtx.lineWidth = 4;
//   gCtx.strokeStyle = gColor;

//   if (x.matches) {
//     gCtx.strokeText(gTexts[0], 200 - gLeft + gRight, 50 - gUp + gDown);
//     gCtx.fillText(gTexts[0], 200 - gLeft + gRight, 50 - gUp + gDown);
//     if (gTexts.length > 1) {
//       gCtx.strokeText(gTexts[1], 200 - gLeft + gRight, 280 - gUp + gDown);
//       gCtx.fillText(gTexts[1], 200 - gLeft + gRight, 280 - gUp + gDown);
//     }
//     if (gTexts.length > 2) {
//       gCtx.strokeText(gTexts[gTexts.length - 1], 200 - gLeft + gRight, 150 - gUp + gDown);
//       gCtx.fillText(gTexts[gTexts.length - 1], 200 - gLeft + gRight, 150 - gUp + gDown);
//     }
//   }

//   else {
//     gCtx.strokeText(gTexts[0], 590 - gLeft + gRight, 50 - gUp + gDown);
//     gCtx.fillText(gTexts[0], 590 - gLeft + gRight, 50 - gUp + gDown);

//     if (gTexts.length > 1) {
//       gCtx.strokeText(gTexts[1], 590 - gLeft + gRight, 280 - gUp + gDown + gYmedia);
//       gCtx.fillText(gTexts[1], 590 - gLeft + gRight, 280 - gUp + gDown + gYmedia);
//     }
//     if (gTexts.length > 2) {
//       gCtx.strokeText(gTexts[gTexts.length - 1], 590 - gLeft + gRight, 150 - gUp + gDown + gYmedia);
//       gCtx.fillText(gTexts[gTexts.length - 1], 590 - gLeft + gRight, 150 - gUp + gDown + gYmedia);
//     }
//   }
// }

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

// function resizeCanvas() {
//   const elContainer = document.querySelector('.canvas-container')
//   gElCanvas.width = elContainer.offsetWidth
//   gElCanvas.height = elContainer.offsetHeight
// }