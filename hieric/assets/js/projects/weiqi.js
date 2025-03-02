const canvas = document.getElementById("goboard");

canvas.width = 552;
canvas.height = 600;

const ctx = canvas.getContext("2d");
var boardBackground="white";
var boardLineColor = "Black";
// canvas location
var canvasRect = canvas.getBoundingClientRect();
var canvasLeft = canvasRect.left;
var canvasTop = canvasRect.top;
// Board size
var canvasHeight = canvas.height;
var intervalHeight = canvasHeight / 20;
var canvasWidth = canvas.width;
var intervalWidth = canvasWidth / 20;
// Stone color
//var blackStoneOut = "black";
var blackStoneOut = "grey";
var blackStoneFill = "Black";
var whiteStoneOut = "Gainboro";
//const whiteStoneOut = "white";
var whiteStoneFill = "White";
// Current stone flag: 0. Alternate; 1. Black; -1. White.
let stoneColor = 1;
let currentStoneColor;
let stoneColorFlag = 0;
// Intersection status
let initStoneMap = [];
let currentStoneMap = [];
let stoneMoveChain = {};
let currentStep;
let stepHighWaterMarker;
//
let gameMode;
var displayCurrentTurn = document.getElementById("stone_status");

// main
mainGame();

function initGame() {
    stoneColor = 1;
    stoneColorFlag = 0;
    currentStep = 0;
    stepHighWaterMarker = 0;
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
    currentStoneMap = initStoneMap.map(subArray => [...subArray]);
    stoneMoveChain = {};
    stoneMoveChain[0] = initStoneMap.map(subArray => [...subArray]);
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
            } else if (currentStoneMap[i][j] == -1) {
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
    updateCurrentTurn();
}

function updateCurrentTurn() {
    if (stoneColorFlag == 0) {
        if (currentStoneColor == 1) {
            displayCurrentTurn.innerText = "White";
        } else if (currentStoneColor == -1) {
            displayCurrentTurn.innerText = "Black";
        } else {
            displayCurrentTurn.innerText = "Unknow";
        }
    } else if (stoneColorFlag == 1) {
        displayCurrentTurn.innerText = "Black";
    } else if (stoneColorFlag == -1) {
        displayCurrentTurn.innerText = "White";
    }
    
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

    //let currentColor = stoneColor;
    if (stoneColorFlag == 1) {
        stoneColor = 1;
    } else if (stoneColorFlag == -1) {
        stoneColor = -1;
    } 
    currentStoneColor = stoneColor;
    
    if ( checkStoneRange(canvasX, intervalWidth) && checkStoneRange(canvasY, intervalHeight)) {
        if (currentStoneMap[stoneMapX][stoneMapY] == 0) {
            if (currentStoneColor > 0) {
                currentStoneMap[stoneMapX][stoneMapY] = 1;
            } else if (currentStoneColor < 0) { 
                currentStoneMap[stoneMapX][stoneMapY] = -1;
            } 
            if (gameMode = "play") {
                currentStep++;
                if (currentStep > stepHighWaterMarker) {
                    stepHighWaterMarker = currentStep;
                }
                stoneMoveChain[currentStep] = currentStoneMap.map(subArray => [...subArray]);
            }
            
            updateBoard();
            if (stoneColorFlag == 0) {
                stoneColor = 0 - currentStoneColor;
            }
            
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

//------------- Button Functions ------------------------

function setColorFlag(color_flag) {
    if (color_flag == "black") {
        stoneColorFlag = 1;
        gameMode = "setup";
    } else if (color_flag == "white") {
        stoneColorFlag = -1;
        gameMode = "setup";
    } else if (color_flag == "alternate") {
        stoneColorFlag = 0;
        gameMode = "play";
        currentStoneColor = stoneColor;
        stoneColor = 0 - stoneColor;       
    }
    updateCurrentTurn();
    //console.log(stoneColorFlag, stoneColor, currentStoneColor);
}

function goPrevious() {
    if (currentStep > 0) {
        currentStep--;
        currentStoneMap = stoneMoveChain[currentStep].map(subArray => [...subArray]);
        updateBoard();
        //console.log(currentStep);
    };
}

function goNext() {
    if (currentStep < stepHighWaterMarker) {
        currentStep++;
        currentStoneMap = stoneMoveChain[currentStep].map(subArray => [...subArray]);
        updateBoard();
        //console.log(currentStep);
    }
    
}

function setBoardSize(boardSize) {
    // Basic unit 46 x 50
    if (boardSize == "small") {
        canvas.width = 368;
        canvas.height = 400;
    } else if (boardSize == "medium") {
        canvas.width = 552;
        canvas.height = 600;
    } else if (boardSize == "large") {
        canvas.width = 690;
        canvas.height = 750;
    }
    // canvas location
    canvasRect = canvas.getBoundingClientRect();
    canvasLeft = canvasRect.left;
    canvasTop = canvasRect.top;
    // Board size
    canvasHeight = canvas.height;
    intervalHeight = canvasHeight / 20;
    canvasWidth = canvas.width;
    intervalWidth = canvasWidth / 20;
    initGame();
}

function setColorSet(colorSet) {
    if (colorSet == "plain") {
        boardBackground = "White";
        boardLineColor = "Grey";
        blackStoneOut = "grey";
        blackStoneFill = "Grey";
        whiteStoneOut = "Gainboro";
        whiteStoneFill = "White";
    } else if (colorSet == "standard") {
        boardBackground = "Orange";
        boardLineColor = "Black";
        // Stone Color
        blackStoneOut = "grey";
        blackStoneFill = "Black";
        whiteStoneOut = "Gainboro";
        whiteStoneFill = "White";
    } else if (colorSet == "fancy") {
        boardBackground = "Green";
        boardLineColor = "Red";
        //Stone color
        blackStoneOut = "Purple";
        blackStoneFill = "Red";
        whiteStoneOut = "Gainboro";
        whiteStoneFill = "Blue";
    }
    initGame();
}

//--------------------- End of Button Functions----------------------

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

