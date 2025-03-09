canvas = document.getElementById("myCanvas");
next = document.getElementById('next');
reset = document.getElementById('reset');
inputSize = document.getElementById('size');
var ctx = canvas.getContext("2d");

let size = inputSize.value
let cellSize = Math.floor(canvas.height / size);;
let row = size;
let col = size;

// Update size of grid 
inputSize.onchange = function(){
    cellSize = Math.floor(canvas.height / size);
    row = size;
    col = size;

    resizedGrid = createGrid(row, col);
    drawGrid(resizedGrid);
}; 


// Getting a random integer between two values, inclusive
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}
  

// Function to initialize the grid with random ones and zeros
function createGrid(row, col) {
    const grid = [];
    for (let i = 0; i < row; i++) {
        grid[i] = [];
        for (let j = 0; j < col; j++) {
            grid[i][j] = 0;
            // grid[i][j] = getRandomIntInclusive(0, 1); // randomize the grid
        }
    }

    // Oscillator - Toad works on 
    if (size > 6) {
        grid[2][3] = 1
        grid[2][4] = 1
        grid[2][5] = 1
        grid[3][2] = 1
        grid[3][3] = 1
        grid[3][4] = 1
    }

    // Still life - works on a 4x4 board
    if (size > 10){
        grid[7][2] = 1
        grid[7][3] = 1
        grid[8][2] = 1
        grid[8][3] = 1
    }

    // Still life - works on a 4x4 board

    if (size > 14) {
        grid[11][2] = 1
        grid[13][2] = 1
        grid[12][1] = 1
        grid[12][3] = 1
    }

    // Oscillator - blinker

    if (size > 11){
        grid[3][8] = 1
        grid[3][9] = 1
        grid[3][10] = 1
    }


    // Oscillator - Beacon

    if (size > 11){
        grid[7][7] = 1
        grid[7][8] = 1
        grid[8][7] = 1
        grid[8][8] = 1
        grid[9][9] = 1
        grid[9][10] = 1
        grid[10][9] = 1
        grid[10][10] = 1

    }

    return grid;
}

// Function to draw grid
function drawGrid(grid) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j] == 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
        }
    }
}

// update grid

function updateGrid(grid){
    const newGrid = [];
    for (let i=0; i < row; i++){
        newGrid[i] = []
        for (let j=0; j< col; j++){
            const neighbors = countNeighbors(i, j, grid);
            
            if (grid[i][j] == 1 && neighbors > 3 || neighbors < 2){
                newGrid[i][j] = 0;
            } else if (grid[i][j] == 0 && (neighbors == 3)) {
                newGrid[i][j] = 1;
            } else{
                newGrid[i][j] = grid[i][j];
            }
        }
    }    
    return newGrid;
}

function frequency(arr, item){
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            count++;
        }
    }
    return count;
};

function countNeighbors(i, j, grid){
    n = grid.length - 1
    if (i != 0 && j !=0 && i != n && j != n){ // in between
        neighbors = [
        grid[i - 1][j - 1], 
        grid[i - 1][j], 
        grid[i - 1][j + 1], 
        grid[i][j - 1],
        grid[i][j + 1], 
        grid[i + 1][j - 1],
        grid[i + 1][j], 
        grid[i + 1][j + 1]
        ]

        return frequency(neighbors, 1)
        

    } else if (i==0 && (j !=0 && j != n)){ /// top row
        neighbors = [
            grid[i][j-1],
            grid[i+1][j-1],
            grid[i+1][j],
            grid[i+1][j+1],
            grid[i][j+1]
        ]
        return frequency(neighbors, 1)

    } else if (i==n && (j != 0 && j != n)){ // bottom row
        neighbors = [
            grid[i][j-1],
            grid[i-1][j-1],
            grid[i-1][j],
            grid[i-1],[j+1],
            grid[i][j+1]
        ]
        return frequency(neighbors, 1)

    } else if (j==0 &&(i != 0 && i != n)){ // left side
        neighbors = [
            grid[i-1][j],
            grid[i-1][j+1],
            grid[i][j+1],
            grid[i-1][j+1],
            grid[i-1][j]
        ]
        return frequency(neighbors, 1)

    } else if (j==n &&(i != 0 && i != n)){ // right side
        neighbors = [
            grid[i-1][j],
            grid[i-1][j+1],
            grid[i][j-1],
            grid[i+1][j-1],
            grid[i+1][j]
        ]
        return frequency(neighbors, 1)

    } else if (i==0 && j==n){ // right top corner
        neighbors = [
            grid[i][j-1],
            grid[i+1][j-1],
            grid[i+1][j]
        ]
        return frequency(neighbors, 1)
    } else if (i==0 && j==0){ // left top corner
        neighbors = [
            grid[i][j+1],
            grid[i+1][j+1],
            grid[i+1][j]
        ]
        return frequency(neighbors, 1)

    }  else if (i==n && j==0){ // left bottom corner
        neighbors = [
            grid[i-1][j],
            grid[i-1][j+1],
            grid[i][j+1]
        ]
        return frequency(neighbors, 1)

    }  else if (i==n && j==n){ // right bottom corner
        neighbors = [
            grid[i-1][j],
            grid[i-1][j-1],
            grid[i][j-1]
        ]
        return frequency(neighbors, 1)
    }
}

function main(){
    grid = createGrid(row, col);
    drawGrid(grid);
}

next.addEventListener('click', function () {
    grid = updateGrid(grid);
    drawGrid(grid);
});


reset.addEventListener('click', function () {
    main();
});

main();