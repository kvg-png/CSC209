var speed = document.getElementById("speed");
var numSquare = document.getElementById("num-of-squares");
var container = document.getElementById("myContainer");

// --------------------------------------------------------//

const n = parseInt(numSquare.value); // Number of squares
const squareSize = 50; 
const spacing = 10; 

const squares = [];
const STEPS = 100;

for (let i = 0; i < n; i++) {
    const blueSquare = document.createElement("div");
    blueSquare.id = "blueSq-" + i;
    blueSquare.style.position = "absolute"; // Ensure squares can be positioned
    blueSquare.style.width = squareSize + "px";
    blueSquare.style.height = squareSize + "px";
    blueSquare.style.backgroundColor = "blue";
    blueSquare.style.borderRadius = "50%";

    // Rows and columns for positions
    const row = Math.floor(i / 5); 
    const col = i % 5; 

    // Set top and left positions with spacing
    startTop = row * (squareSize + spacing);
    startLeft = col * (squareSize + spacing);

    blueSquare.style.top = startTop + "px";
    blueSquare.style.left = startLeft + "px";

    container.appendChild(blueSquare);

    squares.push({
        element: blueSquare,
        position: {top: startTop, left: startLeft},
        intervalId: null
    })
}

function moveSquares() {
    for(let i=0; i<squares.length; i++){
        stepSquare(squares[i])
    }
}

function moveSteps(){
    setInterval(moveSquares, speed.value)
}


function stepSquare(square) {
    if (square.position.top >= 350 || square.position.left >= 350) {
        clearInterval(square.intervalId); 
    } else {
        square.position.top++; 
        square.position.left++; 
        square.element.style.top = square.position.top + "px";
        square.element.style.left = square.position.left + "px";
    }
}

const moveBtn = document.getElementById("moveBtn");
moveBtn.addEventListener("click", moveSteps);

console.log("Number of squares:", container.childElementCount);
