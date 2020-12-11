try{var originalSeatsMatrix = require('./input.js');} catch(error){}
try{
    var Part1 = require('./day11Part1.js');
    var day11_initializeMatrix = Part1.day11_initializeMatrix;
    var day11_cloneMatrix = Part1.day11_cloneMatrix;
} catch(error){}

function day11_occupiedVissibleCounter(fila, columna, anyMatrix) {
    let occupiedCounter = 0;
    const m = anyMatrix.length;
    const n = anyMatrix[0].length;
    
    //Busco en horizontal hacia la izquierda
    for (let horizontalLeft = columna - 1; horizontalLeft >= 0; horizontalLeft--) {
        const positionState = anyMatrix[fila][horizontalLeft];
        if (positionState == 'L') {
            break;
        }
        if (positionState === '#') {
            
            occupiedCounter += 1;
            break;
        }
        
    }
    //Busco en horizontal hacia la derecha
    for (let horizontalRight = columna + 1; horizontalRight < n; horizontalRight++) {
        const positionState = anyMatrix[fila][horizontalRight];
        if (positionState == 'L') {
            break;
        }
        if (positionState === '#') {
            
            occupiedCounter += 1;
            break;
        }
    }

    //Busco en Vertical hacia arriba
    for (let verticalUp = fila - 1; verticalUp >= 0; verticalUp--) {
        const positionState = anyMatrix[verticalUp][columna];
        if (positionState == 'L') {
            break;
        }
        if (positionState === '#') {
            
            occupiedCounter += 1;
            break;
        }
    }
    //Busco en Vertical hacia abajo
    for (let verticalDown = fila + 1; verticalDown < m; verticalDown++) {
        const positionState = anyMatrix[verticalDown][columna];
        if (positionState == 'L') {
            break;
        }
        if (positionState === '#') {
            
            occupiedCounter += 1;
            break;
        }
    }

    //Busco Diagonal Nor Oeste
    let diagonalNO = [fila-1, columna-1];
    while (diagonalNO[0] >= 0 && diagonalNO[1] >= 0) {
        const positionState = anyMatrix[diagonalNO[0]][diagonalNO[1]];
        if (positionState == 'L') {
            break;
        }
        if (positionState === '#') {
            
            occupiedCounter += 1;
            break;
        }
        diagonalNO[0] -= 1;
        diagonalNO[1] -= 1;
    }
    //Busco Diagonal Nor Este
    let diagonalNE = [fila-1, columna+1];
    while (diagonalNE[0] >= 0 && diagonalNE[1] < n) {
        const positionState = anyMatrix[diagonalNE[0]][diagonalNE[1]];
        if (positionState == 'L') {
            break;
        }
        if (positionState === '#') {
            
            occupiedCounter += 1;
            break;
        }
        diagonalNE[0] -= 1;
        diagonalNE[1] += 1;
    }
    //Busco Diagonal Sud Oeste
    let diagonalSO = [fila+1, columna-1];
    while (diagonalSO[0] < m && diagonalSO[1] >= 0) {
        const positionState = anyMatrix[diagonalSO[0]][diagonalSO[1]];
        if (positionState == 'L') {
            break;
        }
        if (positionState === '#') {
            
            occupiedCounter += 1;
            break;
        }
        diagonalSO[0] += 1;
        diagonalSO[1] -= 1;
    }
    //Busco Diagonal Sud Este
    let diagonalSE = [fila+1, columna+1];
    while (diagonalSE[0] < m && diagonalSE[1] < n) {
        const positionState = anyMatrix[diagonalSE[0]][diagonalSE[1]];
        if (positionState == 'L') {
            break;
        }
        if (positionState === '#') {
            
            occupiedCounter += 1;
            break;
        }
        diagonalSE[0] += 1;
        diagonalSE[1] += 1;
    }

    return occupiedCounter;
}

function day11_refreshPosition_Part2(fila, columna, lastSeatsMap) {
    const positionState = lastSeatsMap[fila][columna];
    if (positionState === '.') {
        return '.';
    }
    let occupiedVissible = day11_occupiedVissibleCounter(fila, columna, lastSeatsMap);
    
    if (positionState === 'L') {
        if (occupiedVissible == 0) {
            return '#';
        } 
        return 'L';  
    }
    if (positionState === '#') {
        if (occupiedVissible >= 5) {
            return 'L';
        } 
        return '#';   
    }
}

function day11_printMatrix(anyMatrix) {
    for (let index = 0; index < anyMatrix.length; index++) {
        console.log(anyMatrix[index].join(""));
    }
}

// --------------------- MAIN FUNCTION ----------------------
// Problema fue = [...Array[Array]] -> Los arrays de adentro aún referencian
function day11_SeatingSystem_Part2(){
    const m = originalSeatsMatrix.length;
    const n = originalSeatsMatrix[0].length;
    let lastMatrix = day11_initializeMatrix(m, n, 0);
    day11_cloneMatrix(lastMatrix, originalSeatsMatrix);
    let nextMatrix = day11_initializeMatrix(m, n, 0);
    let totalOccuppiedSeats = 0;
    let equalityCounter = 0;
    //simulación
    while (equalityCounter < m * n) {
        //console.log(lastMatrix);    
        //console.log("\nPaso de Simulación\n");
        //day11_printMatrix(lastMatrix);
        totalOccuppiedSeats = 0;
        equalityCounter = 0;
        // Paso
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                const char = day11_refreshPosition_Part2(i, j, lastMatrix);
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

console.log(day11_SeatingSystem_Part2());