const canvas = document.getElementById("goboard");
canvas.width = 690;
canvas.height = 750;
const ctx = canvas.getContext("2d");
const boardBackground="orange";
const boardLineColor = "Black";
// canvas location
const canvasRect = canvas.getBoundingClientRect();
const canvasLeft = canvasRect.left;
const canvasTop = canvasRect.top;
// Board size
const canvasHeight = canvas.height;
const intervalHeight = canvasHeight / 20;
const canvasWidth = canvas.width;
const intervalWidth = canvasWidth / 20;
// Stone color
const blackStoneOut = "black";
//const blackStoneOut = "grey";
const blackStoneFill = "Black";
//const whiteStoneOut = "Gainboro";
const whiteStoneOut = "white";
const whiteStoneFill = "White";
// Current stone flag: 0. Alternate; 1. Black; 2. White.
let stoneColor = 1;
let stoneColorFlag = 0;
// Intersection status
let initStoneMap = [];
let currentStoneMap = [];
let stoneMoveChain = {};
let currentStep = 0;
let stepHighWaterMarker = 0;

// main
mainGame();

function initGame() {
    stoneColor = 1;
    stoneColorFlag = 0;
    initStoneMap = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    currentStoneMap = [...initStoneMap];
    //stoneMoveChain = {0: [...currentStoneMap], 1: [[]], 2: [[]], 3: [[]], 4:[[]], 5:[[]], 6: [[]] };
    stoneMoveChain[0] = [...initStoneMap];
    currentStep = 0;

    drawBoard();
}

function drawBoard() {
    ctx.strokeStyle = boardLineColor;
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.strokeStyle = boardLineColor;
    ctx.beginPath();
    // Draw board
    for (let i = intervalHeight; i < canvas.height; i = i + intervalHeight) {
        ctx.moveTo(intervalWidth, i);
        ctx.lineTo(canvasWidth - intervalWidth, i);
    }
    for (let j = intervalWidth; j < canvas.width; j = j + intervalWidth) {
        ctx.moveTo(j, intervalHeight);
        ctx.lineTo(j, canvasHeight - intervalHeight);
    }
    // Draw stars
    for (let i = 4; i < 19; i = i + 6) {
        for (let j = 4; j < 19; j = j + 6) {
            starX = intervalWidth * i;
            starY = intervalHeight * j;
            ctx.moveTo(starX, starY);
            ctx.arc(starX, starY, 2, 0, 2 * Math.PI);
        }
    }
    ctx.fillStyle = boardLineColor;
    ctx.fill();
    ctx.stroke();
}

function drawSingleStone(stoneColor, x, y) {
    if (stoneColor == "black") {
        ctx.fillStyle = blackStoneFill;
        ctx.strokeStyle = blackStoneOut;
    } else if (stoneColor == "white") {
        ctx.fillStyle = whiteStoneFill;
        ctx.strokeStyle = whiteStoneOut;
    }

    // Draw stone
    ctx.beginPath();
    ctx.arc(x, y, intervalWidth / 2 - 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();    
}

// Draw stone map.
function drawAllStone() {
    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 19; j++) {
            if (currentStoneMap[i][j] == 1) {
                drawSingleStone("black", (j + 1) * intervalWidth, (i + 1) * intervalHeight);
            } else if (currentStoneMap[i][j] == 2) {
                drawSingleStone("white", (j + 1) * intervalWidth, (i + 1) * intervalHeight);
            }
        }
    }
}

function resetBoard() {
    initGame(); 
    drawAllStone();
}

function updateBoard() {
    drawBoard();
    drawAllStone();
}

function checkStoneRange (x, interval) {
    return x >= interval && x <= interval * 19;
}

function updateStoneMap (event) {
    //Get stone position
    var canvasX = Math.round( (event.pageX - canvasLeft - 8) / intervalWidth) * intervalWidth;
    var stoneMapY = Math.round( (event.pageX - canvasLeft -8 ) / intervalWidth) - 1;
    var canvasY = Math.round( (event.pageY - canvasTop - 8) / intervalHeight) * intervalHeight;
    var stoneMapX = Math.round( (event.pageY - canvasTop - 8) / intervalHeight ) - 1;

    let currentColor = stoneColor;
    
    if ( checkStoneRange(canvasX, intervalWidth) && checkStoneRange(canvasY, intervalHeight)) {
        if (currentStoneMap[stoneMapX][stoneMapY] == 0) {
            if (currentColor > 0) {
                currentStoneMap[stoneMapX][stoneMapY] = 1;
            } else {
                currentStoneMap[stoneMapX][stoneMapY] = 2;
            }
            
            currentStep++;
            if (currentStep > stepHighWaterMarker) {
                stepHighWaterMarker = currentStep;
            }
            console.log("Add stone step = " + currentStep);
            stoneMoveChain[currentStep] = currentStoneMap.map(subArray => [...subArray]);
            updateBoard();
            stoneColor = 0 - currentColor;
        }		
    }
}

function removeStone(event) {
    var canvasX = Math.round( (event.pageX - 8) / intervalWidth) * intervalWidth;
    var canvasY = Math.round( (event.pageY - 8) / intervalHeight) * intervalHeight;	
    if ( checkStoneRange(canvasX, intervalWidth) && checkStoneRange(canvasY, intervalHeight))	{
        ctx.fillStyle = "orange";
        ctx.strokeStyle = "orange";
        //ctx.moveTo(canvasX, canvasY);
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, intervalWidth / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        //ctx.strokeStyle = "Gainsboro";
        ctx.strokeStyle = boardLineColor;
        ctx.moveTo(canvasX - intervalWidth / 2 - 1, canvasY);
        ctx.lineTo(canvasX + intervalWidth / 2 + 1, canvasY);
        ctx.moveTo(canvasX, canvasY - intervalHeight / 2);
        ctx.lineTo(canvasX, canvasY + intervalHeight / 2);
        //ctx.fill();
        ctx.stroke();
    }				
}

function goPrevious() {
    if (currentStep > 0) {
        currentStep--;
        currentStoneMap = [...stoneMoveChain[currentStep]];
        updateBoard();
        console.log(currentStep);
    };
}

function goNext() {
    if (currentStep < stepHighWaterMarker) {
        currentStep++;
        currentStoneMap = [...stoneMoveChain[currentStep]];
        updateBoard();
        console.log(currentStep);
    }
    
}

function mainGame() {
    // Draw game board
    initGame();
    if (canvas.getContext) {
        // Draw stone by click
        canvas.addEventListener("click", event => updateStoneMap(event));
        // Remove stone by double click
        canvas.addEventListener("dblclick", event => removeStone(event));
    }
}

