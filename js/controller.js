'use strict'
var gCurrGallery;
var gCurrImgidx;
var gGallerySize = 15;
var gDx = 0;

function init() {
    gCurrGallery = createGallery('cats');
    renderGallery(gCurrGallery);
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
}

function onSetSorted(sortBy) {
    setSort(sortBy);
}

function createGallery(currGallery) {
    var gallery = [];
    for (let i = 1; i <= gGallerySize; i++) {
        gallery.push('img/' + currGallery + '/' + i + '.jpg');
    }
    return gallery;
}

function renderGallery(currGallery) {
    var str = '';
    for (let i = 0; i < gGallerySize; i++) {
        var elImg = document.querySelector('.gallery');
        str += `<img src="${currGallery[i]}" alt="" onclick="setImg(${i})" ></img>`;
    }
    elImg.innerHTML = str;
}

function setImg(imgIdx) {
    var elGallery = document.querySelector('.sort');
    elGallery.style.display = 'none';
    var elGallery = document.querySelector('.gallery');
    elGallery.style.display = 'none';
    var elCanvas = document.querySelector('.canvas-btns-container');
    elCanvas.style.display = 'block';
    drawImg(imgIdx);
}

function drawImg(idx) {
    gCurrImgidx = idx;
    var myImg = document.querySelector('.my-canvas');
    myImg.innerHTML += `<img src="${gCurrGallery[idx]}" alt="" class="my-img"></img>`;
    var elImg = document.querySelector('.my-img');
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function onText() {
    resizeCanvas();   
    gX = gElCanvas.width / 2 - gDx * 10;
    gY = gElCanvas.height;
    drawImg(gCurrImgidx);
    var c = document.getElementById("my-canvas");
    var ctx = c.getContext("2d");
    gCtx.font = `${gSize}px cursive`;
    gCtx.lineWidth = 4;
    gCtx.strokeStyle = gColor;
    const elGetText = document.querySelector('input.text');
    const text = elGetText.value;
    if (gTexts.length === 0) {
        gCtx.strokeText(text, gX, gY * 0.15);
        gCtx.fillText(text, gX, gY * 0.15);
        gDx++;
    }
    else if (gTexts.length === 1) {
        gCtx.strokeText(text, gX, gY * 0.85);
        gCtx.fillText(text, gX, gY * 0.85);
        gDx++;
    }
    else if (gTexts.length > 1) {
        gCtx.strokeText(text, gX, gY * 0.5);
        gCtx.fillText(text, gX, gY * 0.5);
        gDx++;
    }
}