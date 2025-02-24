const canvas = document.getElementById("goboard");
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
let stoneArray = [
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

// main
mainGame();

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
    ctx.arc(x, y, intervalWidth / 2 - 1, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();    
}

function drawAllStone() {
    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 19; j++) {
            if (stoneArray[i][j] == 1) {
                drawSingleStone("black", (j + 1) * intervalWidth, (i + 1) * intervalHeight);
            } else if (stoneArray[i][j] == 2) {
                drawSingleStone("white", (j + 1) * intervalWidth, (i + 1) * intervalHeight);
            }
        }
    }
}

function resetBoard() {
    drawBoard();
    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 19; j++) {
            stoneArray[i][j] = 0;
        }
    }
    stoneColor = 1;   
    drawAllStone();
}

function updateBoard() {
    drawBoard();
    drawAllStone();
}

function checkStoneRange (x, interval) {
    return x >= interval && x <= interval * 19;
}

function drawStone (event) {
    //Get stone position
    var canvasX = Math.round( (event.pageX - canvasLeft - 8) / intervalWidth) * intervalWidth;
    var stoneArrayY = Math.round( (event.pageX - canvasLeft -8 ) / intervalWidth) - 1;
    var canvasY = Math.round( (event.pageY - canvasTop - 8) / intervalHeight) * intervalHeight;
    var stoneArrayX = Math.round( (event.pageY - canvasTop - 8) / intervalHeight ) - 1;

    let currentColor = stoneColor;

    if ( checkStoneRange(canvasX, intervalWidth) && checkStoneRange(canvasY, intervalHeight)) {
        if (stoneArray[stoneArrayX][stoneArrayY] == 0) {
            if (currentColor > 0) {
            stoneArray[stoneArrayX][stoneArrayY] = 1;
            } else {
            stoneArray[stoneArrayX][stoneArrayY] = 2;
            }

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

function mainGame() {
    // Draw game board
    drawBoard();
    if (canvas.getContext) {
        // Draw stone by click
        canvas.addEventListener("click", event => drawStone(event));
        // Remove stone by right click
        canvas.addEventListener("dblclick", event => removeStone(event));
    }
}
