/** @type {HTMLCanvasElement} */
const canvasWidth = 600;
const canvasHeight = 500; 
const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const xSlider = document.getElementById('xRange');
const ySlider = document.getElementById('yRange');
const rndSlider = document.getElementById('rndRange');
const rSlider = document.getElementById('rRange');
const gSlider = document.getElementById('gRange');
const bSlider = document.getElementById('bRange');

var xVal = 40;
var yVal = 40;
var rndVal = 0.4;
var rColor = 100;
var gColor = 100;
var bColor = 100;

function componentToHex(c){ 
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};

function rgbToHex(r, g, b){
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

function myMathCount(rnd, x, y, xValue, yValue, rCol, gCol, bCol){
    let xx = x + rnd*100
    let yy = y + rnd*100

    let numn = (Math.sin(xx/xValue)*Math.cos(yy/yValue)*0.5+0.5)*255;

    let r = Math.round((numn*6*rnd) % rCol);
    let g = Math.round((r*6.1*rnd) % gCol);
    let b = Math.round((g*5.9*rnd) % bCol);

    return rgbToHex(r, g, b);
};

function takeVal(inputID){
    if(inputID == 'xVal'){
        xVal = Number(xRange.value);
    }else if(inputID == 'yVal'){
        yVal = Number(yRange.value);
    }else if(inputID == 'rndVal'){
        rndVal = (Number(rndRange.value)/100);
    }else if(inputID == 'rColor'){
        rColor = Number(rRange.value);
    }else if(inputID == 'gColor'){
        gColor = Number(gRange.value);
    }else if(inputID == 'bColor'){
        bColor = Number(bRange.value);
    }

    ctx.clearRect(0, 0, 600, 600);
    drawField();
}

function drawField(){
    for(let x = 0; x < canvasWidth; x++){
        for(let y = 0; y < canvasHeight; y++){
            ctx.fillStyle = myMathCount(rndVal, x, y, xVal, yVal, rColor, gColor, bColor);
            ctx.stroke();
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function saveImage(){
    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
    link.remove();
}

function randomValues(){
    xVal = Math.floor(Math.random()*300);
    yVal = Math.floor(Math.random()*300);
    rndVal = Math.random();
    rColor = Math.floor(Math.random()*255);
    gColor = Math.floor(Math.random()*255);
    bColor = Math.floor(Math.random()*255);

    xSlider.value = xVal;
    ySlider.value = yVal;
    rndSlider.value = rndVal*100;
    rSlider.value = rColor;
    gSlider.value = gColor;
    bSlider.value = bColor;

    ctx.clearRect(0, 0, 600, 600);
    drawField();
}

function checkWindow(){
    if(window.screen.width < 992){
        const link = document.createElement('a');
        link.href = './index_mobile.html';
        link.click();
        link.remove();
        drawField();
    }else{
        drawField();
    }
}

window.onload = checkWindow();
