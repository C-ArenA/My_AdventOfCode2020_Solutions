try{var originalSeatsMatrix = require('./input.js');} catch(error){}

function day11_ocuppiedAdjacentsCounter(fila, columna, anyMatrix) {
    let adjCounter = 0;
    for (let i = fila - 1; i <= fila + 1; i++) {
        if (i == -1 || i == anyMatrix.length) {
            continue;       
        }
        for (let j = columna - 1; j <= columna + 1; j++) {
            if (j == -1 || i == anyMatrix[i].length) {
                continue;       
            }
            if (i == fila && j == columna) {
                continue;
            }

            const positionState = anyMatrix[i][j];
            if (positionState === '#') {
                adjCounter += 1;
            }
        }
    }
    return adjCounter;
}

function day11_refreshPosition(fila, columna, lastSeatsMap) {
    const positionState = lastSeatsMap[fila][columna];
    if (positionState === '.') {
        return '.';
    }
    let ocupiedAdjacents = day11_ocuppiedAdjacentsCounter(fila, columna, lastSeatsMap);

    if (positionState === 'L') {
        if (ocupiedAdjacents == 0) {
            return '#';
        } 
        return 'L';  
    }
    if (positionState === '#') {
        if (ocupiedAdjacents >= 4) {
            return 'L';
        } 
        return '#';   
    }
}

function day11_initializeMatrix(m,n, value) {
    let newMatrix = [];
    for (let i = 0; i < m; i++) {
        newMatrix[i] = []
        for (let j = 0; j < n; j++) {
            newMatrix[i][j] = value;
        }
    }
    return newMatrix;
}

function day11_cloneMatrix(targetMatrix, originalMatrix) {
    for (let index = 0; index < originalMatrix.length; index++) {
        targetMatrix[index] = [...originalMatrix[index]];
    } 
}

// --------------------- MAIN FUNCTION ----------------------
// Problema fue = [...Array[Array]] -> Los arrays de adentro aún referencian
function day11_SeatingSystem_Part1(){
    const m = originalSeatsMatrix.length;
    const n = originalSeatsMatrix[0].length;
    let nextMatrix = day11_initializeMatrix(m, n, 0);
    let lastMatrix = day11_initializeMatrix(m, n, 0);
    day11_cloneMatrix(lastMatrix, originalSeatsMatrix);
    let totalOccuppiedSeats = 0;
    let equalityCounter = 0;
    //simulación
    while (equalityCounter < m * n) {
        totalOccuppiedSeats = 0;
        equalityCounter = 0;
        // Paso
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                const char = day11_refreshPosition(i, j, lastMatrix);
                nextMatrix[i][j] = char;
                if (nextMatrix[i][j] == lastMatrix [i][j]) {
                    equalityCounter += 1;
                    if (nextMatrix[i][j] === '#') {    
                        totalOccuppiedSeats += 1;
                    }
                }
            }
        }
        day11_cloneMatrix(lastMatrix, nextMatrix);

    }
    return totalOccuppiedSeats;
}

console.log(day11_SeatingSystem_Part1());

try{
    module.exports = {day11_initializeMatrix: day11_initializeMatrix, day11_cloneMatrix: day11_cloneMatrix};
} catch(e){}