'use strict'
var gIdx = 0
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function Move(idx) {
    gIdx = (idx === 0)? 0 : (idx === 1)? gTexts.length-1 : 1;
    addListeners();
    gStartPos = gTexts[gIdx].pos;
    gTexts[gIdx].isDrag = true;
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    console.log('down')
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) return
    setTextDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    console.log('move')
    const text = gTexts[gIdx].txt;
    if (gTexts[gIdx].isDrag) {
        const pos = getEvPos(ev)
        console.log(gStartPos.x)
        console.log(gStartPos.y)
        console.log(pos)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        gStartPos = pos
        moveText(dx, dy)
        gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
        drawImg(gCurrImgidx);
        renderText() // render!
    }
}

function onUp() {
    console.log('up')
    setTextDrag(false)
    document.body.style.cursor = 'grab';
    
    gTexts[gIdx].pos.x=gStartPos.x;
    gTexts[gIdx].pos.y=gStartPos.y;
    console.log(gTexts)
   
    renderText();
    
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function drawText(x, y) {
    console.log('draw')
    gCtx.beginPath()
    gCtx.lineWidth = 0.5;
    gCtx.fillStyle = gTexts[gIdx].color;
    gCtx.strokeStyle = gTexts[gIdx].strokeColor;
    gCtx.font = `${gTexts[gIdx].size}px cursive`;
    gCtx.fillText(gTexts[gIdx].txt, x, y);
    gCtx.strokeText(gTexts[gIdx].txt, x, y);
}

function isTextClicked(clickedPos) {
    console.log('textclicked')
    const { pos } = gTexts[gIdx]
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gTexts.size
}

function setTextDrag(isDrag) {
    gTexts[gIdx].isDrag = isDrag
}

function moveText(dx, dy) {
    gTexts[gIdx].pos.x += dx
    gTexts[gIdx].pos.y += dy

}



