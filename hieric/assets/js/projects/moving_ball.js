let xSpeed = 1;
let xPosition = 100;

const canvas = document.getElementById("drawingBoard");
const ctx = canvas.getContext("2d");

moveBall();

function createRect (startX, startY, width, height, fillColor, borderColor) {
	ctx.beginPath();
	ctx.rect(startX, startY, width, height);	
	ctx.closePath();
	if (fillColor) {
		ctx.fillStyle = fillColor;
		ctx.fill();
	} 
	if (borderColor) {
		ctx.strokeStyle = borderColor;
		ctx.stroke();
	}
}

function createTriangle (x1, y1, x2, y2, x3, y3, fillColor, borderColor) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x3, y3);
	ctx.lineTo(x1, y1);
	ctx.closePath();

	if (fillColor) {
		ctx.fillStyle = fillColor;
		ctx.fill();
	} 
	if (borderColor) {
		ctx.strokeStyle = borderColor;
		ctx.stroke();
	}
}

function createArc (centerX, centerY, radius, fillColor, borderColor) {
	ctx.fillStyle = borderColor;
	ctx.moveTo(centerX + radius, centerY);
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	ctx.closePath();
	if (fillColor) {
		ctx.fillStyle = fillColor;
		ctx.fill();
	} 
	if (borderColor) {
		ctx.strokeStyle = borderColor;
		ctx.stroke();
	}
}
/*
createRect(30, 30, 50, 50, null, "blue");
createTriangle(100, 50, 50, 100, 150, 100, "green", "red");
createTriangle(100, 300, 50, 400, 150, 400, null, "orange");
createRect(250, 100, 100, 100, "yellow", "red");
*/
function moveBall () {
	ctx.clearRect (0, 0, 500, 500);
	createArc(xPosition, 200, 10, "green", "green");
	xPosition += xSpeed;

	if (xPosition > 400){
		xSpeed = -xSpeed;
	} else if (xPosition < 100) {
		xSpeed = -xSpeed;
	}

	setTimeout(moveBall, 30);
}