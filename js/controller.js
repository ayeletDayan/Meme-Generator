'use strict'
var gCurrGallery;
var gCurrImgidx;
var gGallerySize = 15;

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
    console.log(currGallery)
    var gallery = [];
    for (let i = 1; i <= gGallerySize; i++) {
        gallery.push('img/'+currGallery+'/' + i + '.jpg');
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

    console.log(gTexts);

    if (gTexts.length === 0) {
        gCtx.strokeText(text, 150 - gLeft + gRight, 50 - gUp + gDown);
        gCtx.fillText(text, 150 - gLeft + gRight, 50 - gUp + gDown);
    }

    else if (gTexts.length === 1) {
        gCtx.strokeText(gTexts[1], 150 - gLeft + gRight, 350 - gUp + gDown);
        gCtx.fillText(gTexts[1], 150 - gLeft + gRight, 350 - gUp + gDown);
    }

    else if (gTexts.length > 1) {
        gCtx.strokeText(gTexts[gTexts.length - 1], 150 - gLeft + gRight, 200 - gUp + gDown);
        gCtx.fillText(gTexts[gTexts.length - 1], 150 - gLeft + gRight, 200 - gUp + gDown);
    }
}
