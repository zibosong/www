const canvas = document.getElementById("goboard");
const ctx = canvas.getContext("2d");
const boardBackground="orange";
const boardLineColor = "Black";
// Board size
const canvasHeight = canvas.height;
const intervalHeight = canvasHeight / 20;
const canvasWidth = canvas.width;
const intervalWidth = canvasWidth / 20;
// Stone color
//const blackStoneOut = "Gainsboro";
const blackStoneOut = "grey";
const blackStoneFill = "Black";
const whiteStoneOut = "Gainboro";
const whiteStoneFill = "White";

ctx.strokeStyle = boardLineColor;

function checkStoneRange (x, interval) {
    return x >= interval && x <= interval * 19;
}

function drawBoard() {
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

function init() {
    // Draw game board
    drawBoard();
    if (canvas.getContext) {
        // starting stone color: 1 = black, 0 = white
        let myColor = 1;

        // Draw stone by click
        canvas.addEventListener("click", function (event) {
            //Get stone position
            var canvasX = Math.round( (event.pageX - 8) / intervalWidth) * intervalWidth;
            var canvasY = Math.round( (event.pageY - 8) / intervalHeight) * intervalHeight;
            let currentColor = myColor;
            if ( checkStoneRange(canvasX, intervalWidth) && checkStoneRange(canvasY, intervalHeight)) {
                if (currentColor > 0) {
                    ctx.fillStyle = blackStoneFill;
                    ctx.strokeStyle = blackStoneOut;
                } else {
                    ctx.fillStyle = whiteStoneFill;
                    ctx.strokeStyle = whiteStoneOut;
                }
                //ctx.moveTo(canvasX, canvasY);
                //console.log(ctx.fillStyle);
                ctx.beginPath();
                ctx.arc(canvasX, canvasY, intervalWidth / 2 - 1, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
                myColor = 0 - currentColor;
                //console.log(currentColor);		
            }
        });

        canvas.addEventListener("dblclick", function (event) {
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
        });
    }
}
