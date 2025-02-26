var redSpeed = document.getElementById("redSpeed");
var blueSpeed = document.getElementById("blueSpeed");


function moveRed(){   
    var redSquare = document.getElementById("redSq");   
    var redPos = 0;
    var stepRedId = setInterval(stepRed, redSpeed.value); // sets time interval to function stepRed

    function stepRed() {
        if (redPos == 350) {
            clearInterval(stepRedId);
        } else {
            redPos++; 
            redSquare.style.top = redPos + 'px'; 
            redSquare.style.left = redPos + 'px';
        }
    }
}


const moveRedBtn = document.getElementById("moveRedBtn");
moveRedBtn.addEventListener("click", moveRed);

function moveBlue(){   
    var blueSquare = document.getElementById("blueSq");   
    var bluePos = 350;
    var stepBlueId = setInterval(stepBlue, blueSpeed.value); // sets time interval to function stepRed

    function stepBlue() {
        console.log("howdy");

        if (bluePos == 0) {
            clearInterval(stepBlueId);
        } else {
            bluePos--; 
            blueSquare.style.top = bluePos + 'px'; 
            blueSquare.style.left = bluePos + 'px';
        }
    }
}

const moveBlueBtn = document.getElementById("moveBlueBtn");
moveBlueBtn.addEventListener("click", moveBlue);
