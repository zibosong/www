const canvas = document.getElementById("goboard");

canvas.width = 552;
canvas.height = 600;

const ctx = canvas.getContext("2d");
let boardBackground="white";
let boardLineColor = "Black";
// canvas location
let canvasRect = canvas.getBoundingClientRect();
let canvasLeft = canvasRect.left;
let canvasTop = canvasRect.top;
// Board size
let canvasHeight = canvas.height;
let intervalHeight = canvasHeight / 20;
let canvasWidth = canvas.width;
let intervalWidth = canvasWidth / 20;
// Stone color
//var blackStoneOut = "black";
let blackStoneOut = "grey";
let blackStoneFill = "Black";
let whiteStoneOut = "Gainboro";
//const whiteStoneOut = "white";
let whiteStoneFill = "White";
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
let displayCurrentTurn = document.getElementById("stone_status");

// For stoneGroup, the number represent the total health point of the group
// First two groups are precreated: group 0: die; group 1: live.
let stoneGroup;
let groupWaterMarker;
let groupMap = [];
let stoneGroupChain = {};
let groupMapChain = {};

//----------------------- Main ---------------------
mainGame();
//---------------------- End of Main Program --------

//--------------------- Initialize functions --------
function initGame() {
    stoneColor = 1;
    stoneColorFlag = 0;
    currentStep = 0;
    stepHighWaterMarker = 0;
    // For initStoneMap: the number represent what stone it is: -1: white; 0: no stone; 1: black.
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
    // For groupMap, each number is mapping to the stone map
    // And the number represent the group number. 
    groupWaterMarker = 1;
    groupMap = [
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
    groupMapChain = {};

    stoneGroup = [0, 1];
    stoneGroupChain = {};


    drawBoard();
}
    
// Drawing functinos

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
//----------------- End of drawing functions --------------------------

//------------------ Core functions - update game status --------------

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

// This is main funciton when mouse clicked down on an intersection.
function updateStoneMap (event) {
    //Get stone position
    // canvasX, canvasY: 1 - 19
    // stoneMapX, stoneMapY: 0 - 18
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
    
    // If the clicked location is within the board, it is a legal move.
    if ( checkStoneRange(canvasX, intervalWidth) && checkStoneRange(canvasY, intervalHeight)) {
        // Check stone map, if there is currently no stone in the position, go ahead draw a new stone.
        if (currentStoneMap[stoneMapX][stoneMapY] == 0) {
            if (currentStoneColor > 0) {
                currentStoneMap[stoneMapX][stoneMapY] = 1;
            } else if (currentStoneColor < 0) { 
                currentStoneMap[stoneMapX][stoneMapY] = -1;
            } 
            //console.log ("Current location is (" + stoneMapX + ", "  + stoneMapY + ") = " + getFriendship(stoneMapX, stoneMapY));
            //console.log("Hostility of (" + stoneMapX + ", "  + stoneMapY + ") = " + getHostility(stoneMapX, stoneMapY));
            if (gameMode = "play") {
                currentStep++;
                if (currentStep > stepHighWaterMarker) {
                    stepHighWaterMarker = currentStep;
                }
                //stoneMoveChain[currentStep] = currentStoneMap.map(subArray => [...subArray]); 
                //groupMapChain[currentStep] = groupMap.map(subArray => [...subArray]);
                //stoneGroupChain[currentStep] = [...stoneGroup];

            }
            
            // Add new stone to group
            updateStoneGroup(stoneMapX, stoneMapY);
            // Check if there is any dead stones
            updateStoneHealth();

            // Save current step to roll backward or forward
            stoneMoveChain[currentStep] = currentStoneMap.map(subArray => [...subArray]); 
            groupMapChain[currentStep] = groupMap.map(subArray => [...subArray]);
            stoneGroupChain[currentStep] = [...stoneGroup];

            updateBoard();
            if (stoneColorFlag == 0) {
                stoneColor = 0 - currentStoneColor;
            }
            
        }		
    }
}

function getStoneBreath(x, y) {
    // Return how many breath the stone has.
    var myBreath = 0;
    if (x > 0 && currentStoneMap[x - 1][y] == 0) {
        myBreath++;
    }
    if (x < 18 && currentStoneMap[x + 1][y] == 0) {
        myBreath++;
    }
    if (y > 0 && currentStoneMap[x][y - 1] == 0) {
        myBreath++;
    }
    if (y < 18 && currentStoneMap[x][y + 1] == 0) {
        myBreath++;
    }
    return myBreath;
}

function getGroupBreath(x, y) {
    var groupNumber;
    var groupBreath = 0;
    groupNumber = groupMap[x][y];
    if (groupNumber == 1) {
        groupBreath = getStoneBreath(x, y);
    } else if (groupNumber > 1) {
        for (var i = 0; i < 19; i++) {
            for (var j = 0; j < 19; j++) {
                if (groupMap[i][j] == groupNumber) {
                    //This overcount shared breath, but I only care about 0 or 1
                    groupBreath = groupBreath + getStoneBreath(i, j);
                }
            }
        }
    }
    return groupBreath;
};

function getStonePositionType(x, y) {
    let stonePosition; // 0: corner; 1: edge; 2: center

    // For new stone, check surronding
    // 1. Determin if it is one of the following: corner, edge, center
    if (x == 0 || x == 18) {
        if (y == 0 || y == 18) {
            // This is a corner stone
            stonePosition = "corner";
        } else {
            // This is a edge stone.
            stonePosition = "edge";
        }
    } else if (y == 0 || y == 18) {
        if (x == 0 || x == 18) {
            // This is a corner stone
            stonePosition = "corner";
        } else {
            // This is a edge stone
            stonePosition = "edge";
        }
    } else {
        // this is a center stone
        stonePosition = "center";
    }

    return stonePosition;
}

function getFriendship(x, y) {
    let myFriendship = 0;
    if (x > 0 && currentStoneMap[x - 1][y] == currentStoneMap[x][y]) {
        myFriendship++;
        //console.log("Top friendship = " + 1);
    }
    if (x < 18 && currentStoneMap[x + 1][y] == currentStoneMap[x][y]) {
        myFriendship++;
        //console.log("Bottom friendship = " + 1);
    } 
    if (y > 0 && currentStoneMap[x][y - 1] == currentStoneMap[x][y]) {
        myFriendship++;
        //console.log("Left friendship = " + 1);
    }
    if (y < 18 && currentStoneMap[x][y + 1] == currentStoneMap[x][y]) {
        myFriendship++;
        //console.log("Right friendship = " + 1);
    } 
    //console.log("Total friendship = " + myFriendship);
    return myFriendship; 
}

function getHostility(x, y) {
    let myHostility = 0;
    if (x > 0 && currentStoneMap[x - 1][y] == 0 - currentStoneMap[x][y]) {
        myHostility++;
    }
    if (x < 18 && currentStoneMap[x + 1][y] == 0 - currentStoneMap[x][y]) {
        myHostility++;
    } 
    if (y > 0 && currentStoneMap[x][y - 1] == 0 - currentStoneMap[x][y]) {
        myHostility++;
    }
    if (y < 18 && currentStoneMap[x][y + 1] == 0 - currentStoneMap[x][y]) {
        myHostility++;
    } 
    return myHostility;
}

function joinSurrondingGroup(x, y) {
    // Will look around and create new group or add to the existing group
    function changeGroup(fromGroupNum, toGroupNum) {
        // Change group from groupNumber
        for (var i = 0; i < 19; i++) {
            for (var j = 0; j < 19; j++) {
                if (groupMap[i][j] == fromGroupNum) {
                    groupMap[i][j] = toGroupNum;
                }
            }
        }
    }
    function joinGroup(x1, y1, x2, y2) {
        if (currentStoneMap[x1][y1] == currentStoneMap[x2][y2]) {
            if (groupMap[x2][y2] == 1) {
                // Adjacent stone is standalone.
                if (groupMap[x1][y1] > 1) {
                    // If current stone just joined new group, add adjacent stone as well
                    groupMap[x2][y2] = groupMap[x1][y1];
                    //console.log(x2 + ", " + y2 + " joined " + x1 + ", " + y1);
                } else {
                    // if (x2,y2) is standalone, create a new group and add both.
                    groupWaterMarker++;
                    stoneGroup[groupWaterMarker] = 1;
                    //console.log("Group water marker increased: " + groupWaterMarker);
                    groupMap[x1][y1] = groupWaterMarker;
                    //console.log(groupMap[x1][y1] + ", " + currentStoneMap[x1][y1]);
                    groupMap[x2][y2] = groupWaterMarker;
                    //console.log(groupMap[x2][y2]);
                }
                
            } else if (groupMap[x2][y2] > 1) {
                // need to think if current already joined a group
                if (groupMap[x1][y1] > 1) {
                    // Change group
                    changeGroup(groupMap[x2][y2], groupMap[x1][y1]);
                    //console.log("Group " + groupMap[x2][y2] + " changed to " + groupMap[x1][y1]);
                } else {
                    groupMap[x1][y1] = groupMap[x2][y2];
                    //console.log(x1 + ", " + y1 + " joined group " + groupMap[x2][y2]);
                }
                
            }
        }
    }

    if (x > 0) {
        joinGroup(x, y, x - 1, y);
    } 
    if (x < 18) {
        joinGroup(x, y, x + 1, y);
    }
    if (y > 0) {
        joinGroup(x, y, x, y - 1);
    }
    if (y < 18) {
        joinGroup(x, y, x, y + 1);
    }
        
}

function checkBackKill(x, y) {
    let canBackKill = false;
    if (x > 0) {
        if (getGroupBreath(x - 1, y) == 0) {
            canBackKill = true;
        };
    }
    if (x < 18) {
        if (getGroupBreath(x + 1, y) == 0) {
            canBackKill = true;
        };
    } 
    if (y > 0) {
        if (getGroupBreath(x, y - 1) == 0) {
            canBackKill = true
        };
    }
    if (y < 18) {
        if (getGroupBreath(x, y + 1) == 0) {
            canBackKill = true;
        };
    }
    return canBackKill;  
}


function killGroup(groupNumber) {
    if (groupNumber > 1) {
        for (var i = 0; i < 19; i++) {
            for (var j = 0; j < 19; j++) {
                if (groupMap[i][j] == groupNumber) {
                    groupMap[i][j] = 0;
                    currentStoneMap[i][j] = 0;
                };
            }
        }
    }
    
}

function killSurroundingGroup(x, y) {
    if (x > 0) {
        if (currentStoneMap[x][y] == - currentStoneMap[x - 1][y]) {
            if (groupMap[x - 1][y] == 1 && getStoneBreath(x - 1, y) == 0) {
                groupMap[x - 1][y] = 0;
                currentStoneMap[x - 1][y] = 0;
                //console.log("Top single stone was killed.");
            } else if (getGroupBreath(x - 1, y) == 0) {
                killGroup(groupMap[x - 1][y]);
                //console.log("Top group was killed.");
            }
            
        }
    }
    if (x < 18) {
        if (currentStoneMap[x][y] == - currentStoneMap[x + 1][y]) {
            if (groupMap[x + 1][y] == 1 && getStoneBreath(x + 1, y) == 0) {
                groupMap[x + 1][y] = 0;
                currentStoneMap[x + 1][y] = 0;
                //console.log("Bottom single stone was killed.");
            } else if (getGroupBreath(x + 1, y) == 0) {
                killGroup(groupMap[x + 1][y]);
                //console.log("Bottom group was killed.");
            }
            
        }
    }
    if (y > 0) {
        if (currentStoneMap[x][y] == - currentStoneMap[x][y - 1]) {
            if (groupMap[x][y - 1] == 1 && getStoneBreath(x, y - 1) == 0) {
                groupMap[x][y - 1] = 0;
                currentStoneMap[x][y - 1] = 0;
                //console.log("Left single stone was killed.");
            } else if (getGroupBreath(x, y - 1) == 0) {
                killGroup(groupMap[x][y - 1]);
                //console.log("Left group was killed.");
            }
            
        }
    }
    if (y < 18) {
        if (currentStoneMap[x][y] == - currentStoneMap[x][y + 1]) {
            if (groupMap[x][y + 1] == 1 && getStoneBreath(x, y + 1) == 0) {
                groupMap[x][y + 1] = 0;
                currentStoneMap[x][y + 1] = 0;
                //console.log("Right single stone was killed.");
            } else if (getGroupBreath(x, y + 1) == 0) {
                killGroup(groupMap[x][y + 1]);
                //console.log("Right group was killed.");
            }
            
        }
    }
}


function updateStoneGroup(x, y) {
    let myGroup = 1;
    let myBreath = getStoneBreath(x, y);
    // 1.1 If it is a corner stone
        // 1.1.1 If it has 2 breaths
            // Live, assign to group 1
        // 1.1.2 If it has 1 breath
            // 1.1.2.1 If it has 2 opposite color
                // Live, assign to group 1
            // 1.1.2.2 If it has 1 same color
                // Add to group(1)
        // 1.1.3 If it has 0 breath
            // 1.1.3.1 If it has 2 opposite color
                // Die, assign to group 0
            // 1.1.3.2 If it has 2 same colore
                // Add to group (2)
    if (getStonePositionType(x, y) == "corner") {
        // If this is corner stone
        if (myBreath == 2) {
            groupMap[x][y] = 1;
        } else if (myBreath == 1) {
            if (getHostility(x, y) == 1) {
                groupMap[x][y] = 1;
            } else if (getFriendship(x, y) == 1) {
                // Add to group(1)
                joinSurrondingGroup(x, y);
            }
        } else if (myBreath == 0) {
            if (getHostility(x, y) == 2) {
                if (checkBackKill(x, y)) {
                    //console.log("Fire back kill...");
                    killSurroundingGroup(x, y);
                    groupMap[x][y] = 1;
                    //console.log("Group (" + x + ", " + y + "): " + groupMap[x][y]);
                } else {
                    groupMap[x][y] = 0;
                }
            } else if (getHostility(x, y) == 1) {
                if (checkBackKill(x, y)) {
                    killSurroundingGroup(x, y);
                    //joinSurrondingGroup(x, y);
                } 
                // If not able to back kill, join self group and may commit suicide.
                joinSurrondingGroup(x, y);
            } else if (getFriendship(x, y) == 2) {
                // ++++++++++++++++++++++++++++++++++++++
                // Possible forbidden move, need to solve.
                //++++++++++++++++++++++++++++++++++++++++
                joinSurrondingGroup(x, y);
            }
        }
    } else if (getStonePositionType(x, y) == "edge") {
    // 1.2 If it is a edge stone
        // 1.2.1 If it has 3 breath
            // Live, assign to group 1
        // 1.2.2 If it has 2 breath
            // 1.2.2.1 If it has 1 opposite color
                // Live, assign to group 1
            // 1.2.2.2 If it has 1 same color
                // Join the group
        // 1.2.3 If it has 1 breath
            // If it has 2 opposite color
                // Live, add to group 1
            // If it has 1 opposite and 1 same color
                // Add to group(1)
            // If it has 2 same color
                // Add to group(2)
        // 1.2.4 If it has 0 breath
            // If it has 3 opposite color
                // Die, assign to group (0)
            // If it has 3 same color
                // Add to group(3)
        if (myBreath == 3) {
            groupMap[x][y] = 1;
        } else if (myBreath == 2) {
            if (getHostility(x, y) == 2) {
                groupMap[x][y] = 1;
            } else if (getHostility(x, y) == 1) {
                groupMap[x][y] = 1;
            } else {
                joinSurrondingGroup(x, y);
            }
        } else if (myBreath == 1) {
            if (getHostility(x, y) == 2) {
                groupMap[x][y] = 1;
            } else {
                joinSurrondingGroup(x, y);
            }
        } else if (myBreath == 0) {
            if (getHostility(x, y) == 3) {
                if (checkBackKill(x, y)) {
                    //console.log("Edge: fire back kill ...");
                    killSurroundingGroup(x, y);
                    groupMap[x][y] = 1;
                } else {
                    groupMap[x][y] = 0;
                }
            } else {
                if (checkBackKill(x, y)) {
                    killSurroundingGroup(x, y);
                }
                // +++++++++++++++++++++++++
                // Possible forbidden move, need to solve
                joinSurrondingGroup(x, y);
            }
        }
    } else if (getStonePositionType(x, y) == "center") {
        // If this is a center stone
        if (myBreath == 4) {
            groupMap[x][y] = 1;
        } else if (myBreath == 3) {
            if (getHostility(x, y) == 1) {
                groupMap[x][y] = 1;
            } else if (getFriendship(x, y) == 1) {
                joinSurrondingGroup(x, y);
            }           
        } else if (myBreath == 2) {
            if (getHostility(x, y) == 2) {
                groupMap[x][y] = 1;
            } else {
                joinSurrondingGroup(x, y);
            }
        } else if (myBreath == 1) {
            if (getHostility(x, y) == 3) {
                groupMap[x][y] = 1;
            } else {
                joinSurrondingGroup(x, y);
            }         
        } else if (myBreath == 0) {
            if (getHostility(x, y) == 4) {
                if (checkBackKill(x, y)) {
                    killSurroundingGroup(x, y);
                    groupMap[x][y] = 1;
                } else {
                    groupMap[x][y] = 0;
                }
            } else {
                if (checkBackKill(x, y)) {
                    killSurroundingGroup(x, y);
                }
                joinSurrondingGroup(x, y);
            }
            
        }
    }

    // 1.3 If it is a center stone
        // If it has 4 breaths
            // Live, assign to group 1
        // If it has 3 breaths
            // If it has 1 opposite
                // Live, assign to group 1
            // If it has 1 same color
                // Add to group(1)
        // If it has 2 breaths
            // If it has 2 opposite color
                // Live, assing to group 1
            // If it has 1 opposite and 1 same color
                // Add to group(1)
            // If it has 2 same color
                // Add to group(2)
        // If it has 1 breath
            // If it has 3 opposite
                // Add to group 0
            // If it has 2 opposite and 1 same color
                // Add to group(1)
            // If it has 1 opposite and 2 same color
                // Add to group(2)
            // If it has 3 same color
                // Add to group(3)
        // If it has 0 breath
            // If it has 4 opposite
                // Die, assign to group 0
            // If it has 3 opposite and 1 same color
                // Add to group(1)
            // If it has 2 opposite and 2 same color
                // Add to group(2)
            // If it has 1 opposite and 3 same color
                // Add to group(3)
            // If it has 4 same color
                // Add to group(4)
    
}

function updateStoneHealth() {
    // First find out total health point of the group
    let groupBreath;
    let groupNumber;
    // Calculate group health and update stoneGroup with total breath.
    if (groupWaterMarker > 1) {
        for (var g = 2; g < stoneGroup.length; g++) {
            groupBreath = 0;
            if (stoneGroup[g] > 0) {
                for (var i = 0; i < 19; i++) {
                    for (var j = 0; j < 19; j++) {
                        if (groupMap[i][j] == g) {
                            // This overcount shared breath, but not a problem to decide if group should die
                            groupBreath = groupBreath + getStoneBreath(i, j);
                         //console.log("Stone breath -" + i + "," + j + ": " + getStoneBreath(i, j) + "-" + groupHealth);
                        }
                    }
                }
            //console.log("Total group count: " + stoneGroup.length);
            stoneGroup[g] = groupBreath;
            //console.log("Group health " + g + ": " + groupBreath);
            }
            
        }
    }
    //console.log("(18, 18) group: " + groupMap[18][18] + "; Stone health: " + currentStoneMap[18][18]);
    // Second, update each stone group
    for (var x = 0; x < 19; x++) {
        for (var y = 0; y < 19; y++) {
            if (currentStoneMap[x][y] != 0) {
                groupNumber = groupMap[x][y];
                //console.log("Stone (" + x + ", " + y + "): GFH" + groupNumber + getFriendship(x, y) + getHostility(x, y));

                // For single stone, only update its group when it is dead
                if (groupNumber == 1) {
                    //console.log("Group (18, 17): " + groupMap[18][17] + " - " + currentStoneMap[18][17]);
                    if (getStonePositionType(x, y) == "corner" && getHostility(x, y) == 2) {
                        groupMap[x][y] = 0;
                        //console.log("---  Update to die.");
                        //console.log("Stone (" + x + ", " + y + "): GFH" + groupMap[x][y] + getFriendship(x, y) + getHostility(x, y)); 
                    }
                    if (getStonePositionType(x, y) == "edge" && getHostility(x, y) == 3) {
                        groupMap[x][y] = 0;
                    }
                    if (getStonePositionType(x, y) == "center" && getHostility(x, y) == 4) {
                        groupMap[x][y] = 0;
                    }  
            
                } else if (stoneGroup[groupNumber] == 0) {
                // If the group has no health, update currentStoneMap to death.
                    currentStoneMap[x][y] = 0;
                }
            }
            
        }
    }
    //console.log("(18, 18) group: " + groupMap[18][18] + "; Stone health: " + currentStoneMap[18][18]);
    // Finnally, update stone health by its group
    for (var m = 0; m < 19; m++) {
        for (var n = 0; n < 19; n++) {
            if (currentStoneMap[m][n] !=0) {
                groupNumber = groupMap[m][n];
                if (stoneGroup[groupNumber] < 1) {
                    currentStoneMap[m][n] = 0;
                }
            }
        }
    }
    //console.log("(18, 18) group: " + groupMap[18][18] + "; Stone health: " + currentStoneMap[18][18]);
}
//-----------------  End of core functions -------------------

function removeStone(event) {
    //			
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
        groupMap = groupMapChain[currentStep].map(subArray => [...subArray]);
        stoneGroup = [...stoneGroupChain[currentStep]];
        updateBoard();
        //console.log(currentStep);
    };
}

function goNext() {
    if (currentStep < stepHighWaterMarker) {
        currentStep++;
        currentStoneMap = stoneMoveChain[currentStep].map(subArray => [...subArray]);
        groupMap = groupMapChain[currentStep].map(subArray => [...subArray]);
        stoneGroup = [...stoneGroupChain[currentStep]];
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

function resetBoard() {
    initGame(); 
    drawAllStone();
}
function resetBoard() {
    initGame(); 
    drawAllStone();
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