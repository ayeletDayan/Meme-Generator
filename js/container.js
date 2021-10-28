'use strict'
var gGallery;
var gCurrImgidx;

function init() {
    gGallery = createGallery(18);
    renderGallery(18);
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();    
  }

function createGallery(size) {
    var gallery = [];
    for (let i = 1; i <= size; i++) {
        gallery.push('img/' + i + '.jpg');
    }
    return gallery;
}

function renderGallery(size) {
    var str = '';
    for (let i = 0; i < size; i++) {
        var elImg = document.querySelector('.gallery');
        str += `<img src="${gGallery[i]}" alt="" onclick="setImg(${i})" ></img>`;
    }
    elImg.innerHTML = str;
}

function setImg(imgIdx) {
    var elGallery = document.querySelector('.gallery');
    elGallery.style.display = 'none';
    var elCanvas = document.querySelector('.canvas-btns-container');
    elCanvas.style.display = 'block';
    drawImg(imgIdx);
}

function drawImg(idx) {
    gCurrImgidx = idx;
    var myImg = document.querySelector('.my-canvas');
    myImg.innerHTML += `<img src="${gGallery[idx]}" alt="" class="my-img"></img>`;
    var elImg = document.querySelector('.my-img');
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}