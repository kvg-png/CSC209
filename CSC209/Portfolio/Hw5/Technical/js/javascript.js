const randomPositions = document.getElementById("random-positions");
const canvas = document.getElementById("myCanvas");
const moveCircles = document.getElementById("move-circles");
const resetBtn = document.getElementById("reset");
const ctx = canvas.getContext("2d");
const NRPTS = document.getElementById("num-of-circles").value;
const checkbox = document.getElementById("trace");
const temp = document.getElementById("temp");
const NRSTEPS = 200;

let points = []; 

//draws a single circle
function drawCircle(x, y, xVel, yVel, color) {
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = color;
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + xVel, y + yVel);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
}

// Function to get a random integer between two values, inclusive
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

//initializing points
function initializePoints() {
    points = [];
    for (let i = 0; i < NRPTS; i++) {
        let x = getRandomIntInclusive(0, 400);
        let y = getRandomIntInclusive(0, 400);
        let initX = x;
        let initY = y;
        let xVel = getRandomIntInclusive(-40, 40);
        let yVel = getRandomIntInclusive(-40, 40);
        let color = ["red", "blue", "orange", "green", "purple", "pink", "yellow"][getRandomIntInclusive(0, 6)];
        let pastPositions = [];
        points.push({ x, y, initX, initY, xVel, yVel, color, pastPositions});
    }
}

//moves points within bounds + adds points to list
function movePoints() {
    for (let point of points) {
        point.x += point.xVel;
        point.y += point.yVel;

        if (point.x < 0 || point.x > 400) point.xVel *= -1;
        if (point.y < 0 || point.y > 400) point.yVel *= -1;

        point.pastPositions.push({ x: point.x, y: point.y });
    }
}

// draw all points/circles
function drawPoints() {

    if (trace.checked == true){
        for (let point of points) {
            for (let position of point.pastPositions) {
                ctx.beginPath();
                ctx.arc(position.x, position.y, 20, 0, 2 * Math.PI);
                ctx.lineWidth = "2";
                ctx.strokeStyle = point.color;
                ctx.stroke();
                ctx.closePath();
            }
        } 
    } else{
        ctx.clearRect(0, 0, 400, 400);
    }

    for (let point of points) {
        drawCircle(point.x, point.y, point.xVel, point.yVel, point.color);
    }
}

//reset position of circles
function resetPositions(){
    ctx.clearRect(0, 0, 400, 400);

    for (let point of points){
        point.x = point.initX;
        point.y = point.initY;
        point.pastPositions = [];
    }
    
    drawPoints();
}

//buttons --------------------------------
randomPositions.onclick = () => {
    initializePoints();
    drawPoints();
};

moveCircles.onclick = () => {

    setIntervalCount = 0 
    
    setIntervalId = setInterval(function(){
        setIntervalCount += 1;
        movePoints();
        drawPoints();

        if (setIntervalCount == NRSTEPS){
            clearInterval(setIntervalId);
        }

    }, 50);
    
}

resetBtn.onclick = () => {
    resetPositions();
}

// unfortunately the temperature feature does not work very well
// it may have to do with the fact that the onchange function does not work u_u
// sorry I didn't have enough time to finish this homework properly

temp.onchange = function() {
    console.log(temp.value);
    if (temp.value == "hot"){
        for (let point of points) {
            point.x += point.xVel + 200;
            point.y += point.yVel + 200;
        }    
    }

    if (temp.value == "warm"){
        for (let point of points) {
            point.x += point.xVel + 50;
            point.y += point.yVel + 50;
        }    
    }

    if (temp.value == "cold"){
        for (let point of points) {
            point.x += point.xVel - 30;
            point.y += point.yVel - 30;
        }    
    }
}

