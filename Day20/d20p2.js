try {
    var imageTiles = require("./input.js")
} catch (e) {}
const monster = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1],
    [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0]
]
const exampleMatrix = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1],
    [1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,0,1,1],
    [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1],
    [1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,0,1,1],
    [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1],
    [1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,0,1,1],
    [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1],
    [1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,0,1,1],
    [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1],
    [1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,0,1,1],
    [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1],
    [1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,0,1,1],
    [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1],
    [1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,0,1,1],
    [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1],
    [1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,0,1,1],
    [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0,1,1]
]
console.log(exampleMatrix.length + " + " + exampleMatrix[0].length);
function binaryArrayToInt(binaryArr, isTheMaxWeightToTheLeft) {
    power = isTheMaxWeightToTheLeft?0:binaryArr.length - 1;
    add = isTheMaxWeightToTheLeft?1:-1;
    let intNumber = 0;
    for (let i = binaryArr.length - 1; i >= 0; i--) {
        const bit = binaryArr[i];
        intNumber += bit * Math.pow(2,power);
        power += add;
    }
    return intNumber;
}

class Tile {
    constructor(id, image) {
      this.id = id;
      this.image = image;
      this.adjacentNorth = 0;
      this.adjacentWest = 0;
      this.adjacentEast = 0;
      this.adjacentSouth = 0;
      this.totalAdjacents = 0;
      this.fixed = false;
    }
    top(){
        return {actual: binaryArrayToInt(this.image[0], true), 
                flipped: binaryArrayToInt(this.image[0], false)};
    }
    bottom(){
        return {actual: binaryArrayToInt(this.image[this.image.length - 1], false), 
                flipped: binaryArrayToInt(this.image[this.image.length - 1], true)};
    }
    left(){
        let leftArray = this.image.map(row => row[0]);
        return {actual: binaryArrayToInt(leftArray, false), 
            flipped: binaryArrayToInt(leftArray, true)};
    }
    right(){
        let rightArray = this.image.map(row => row[row.length - 1]);
        return {actual: binaryArrayToInt(rightArray, true), 
            flipped: binaryArrayToInt(rightArray, false)};
    }
    flipLR(){
        let flippedMatrix = [];
        for (let i = 0; i < this.image.length; i++) {
            const row = this.image[i];
            let newRow = [];
            row.forEach(element => {
                newRow.unshift(element);
            })
            flippedMatrix.push(newRow);
        }
        this.image = flippedMatrix;
    }
    flipUD(){
        let flippedMatrix = [];
        this.image.forEach(row => {
            flippedMatrix.unshift(row);
        });
        this.image = flippedMatrix;
    }
    rotateClockwise(){
        let rotatedMatrix = [];
        for (let j = 0; j < this.image[0].length; j++) {
            let vector = [];
            for (let i = 0; i < this.image.length; i++) {
                const element = this.image[i][j];
                vector.unshift(element);
            }
            rotatedMatrix.push(vector);
        }
        this.image = rotatedMatrix;
    }
    rotateCounterclockwise(){
        let rotatedMatrix = [];
        for (let j = 0; j < this.image[0].length; j++) {
            let vector = [];
            for (let i = 0; i < this.image.length; i++) {
                const element = this.image[i][j];
                vector.push(element);
            }
            rotatedMatrix.unshift(vector);
        }
        this.image = rotatedMatrix;
    }
  }
tiles = new Map(imageTiles.map(tile => ([tile.id, new Tile(tile.id, tile.image)])));

function searchForPair(allTiles, targetTileId) {
    let myTile = allTiles.get(targetTileId);

    let myTop = myTile.top().actual;
    let myBottom = myTile.bottom().actual;
    let myLeft = myTile.left().actual;
    let myRight = myTile.right().actual;
    //console.log("This tile: " + targetTileId + " has " + "TOP:" + myTop + " R:" + myRight + " BOT:" + myBottom + " L:" + myLeft);
    let countEquals = 0;
    for (let [key, tile] of allTiles) {
        if (key == targetTileId) continue;
        if (tile.fixed == true) continue;
        let foundPair = false;
        const top = tile.top().actual, ftop = tile.top().flipped;
        const bottom = tile.bottom().actual, fbottom = tile.bottom().flipped;
        const left = tile.left().actual, fleft = tile.left().flipped;
        const right = tile.right().actual, fright = tile.right().flipped;
        
        switch (myBottom) {
            case top:
                tile.flipLR();
            case ftop:
                foundPair = true;
                break;
            case right:
                tile.flipUD();
            case fright:
                tile.rotateCounterclockwise();
                foundPair = true;
                break;
            case fbottom:
                tile.flipLR();
            case bottom:
                tile.flipUD();
                foundPair = true;
                break;
            case left:
                tile.flipUD();
            case fleft:
                tile.rotateClockwise();
                foundPair = true;
                break;
            default:
                foundPair = false;
                break;
        }
        if (foundPair) {
            //console.log("Find at bottom:" + key);
            myTile.adjacentSouth = key;
            tile.adjacentNorth = targetTileId;
            countEquals += 1;
            continue;
        }
        // NOTE: HICE PARA EL BOTTOM. AHORA DEBO HACER PARA LOS OTROS LADOS DE MI TILE
        // SERÍA BUENO HACERLO CON LÁPIZ COMO EN EL CASO DEL BOTTOM
        switch (myLeft) {
            case top:
                tile.flipLR();
            case ftop:
                tile.rotateClockwise();
                foundPair = true;
                break;
            case right:
                tile.flipUD();
            case fright:
                foundPair = true;
                break;
            case bottom:
                tile.flipLR();
            case fbottom:
                tile.rotateCounterclockwise();
                foundPair = true;
                break;
            case fleft:
                tile.flipUD();
            case left:
                tile.flipLR();
                foundPair = true;
                break;
            default:
                foundPair = false;
                break;
        }
        if (foundPair) {
            //console.log("Find at Left:" + key);
            myTile.adjacentWest = key;
            tile.adjacentEast = targetTileId;
            countEquals += 1;
            continue;
        }
        // NOTE: Ya avancé, debo seguir aunque crea que debe haber una mejor forma
        switch (myTop) {
            case ftop:
                tile.flipLR();
            case top:
                tile.flipUD();
                foundPair = true;
                break;
            case right:
                tile.flipUD();
            case fright:
                tile.rotateClockwise();
                foundPair = true;
                break;
            case bottom:
                tile.flipLR();
            case fbottom:
                foundPair = true;
                break;
            case left:
                tile.flipUD();
            case fleft:
                tile.rotateCounterclockwise();
                foundPair = true;
                break;
            default:
                foundPair = false;
                break;
        }
        if (foundPair) {
            //console.log("Find at Top:" + key);
            myTile.adjacentNorth = key;
            tile.adjacentSouth = targetTileId;
            countEquals += 1;
            continue;
        }
        // NOTE: Ya avancé, debo seguir aunque crea que debe haber una mejor forma
        switch (myRight) {
            case top:
                tile.flipLR();
            case ftop:
                tile.rotateCounterclockwise();
                foundPair = true;
                break;
            case fright:
                tile.flipUD();
            case right:
                tile.flipLR();
                foundPair = true;
                break;
            case bottom:
                tile.flipLR();
            case fbottom:
                tile.rotateClockwise();
                foundPair = true;
                break;
            case left:
                tile.flipUD();
            case fleft:
                foundPair = true;
                break;
            default:
                foundPair = false;
                break;
        }
        if (foundPair) {
            //console.log("Find at Right:" + key);
            myTile.adjacentEast = key;
            tile.adjacentWest = targetTileId;
            countEquals += 1;
            continue;
        }
    
    }
    myTile.fixed = true;
    return countEquals;
}

function searchPairForEveryone(allTiles) {
    let allTilesAreFixed = false;
    //let nextConnectedKey = allTiles.keys().next().value;
    // Debe comenzar en una esquina o se muere
    let nextConnectedKey = 1567;
    //let nextConnectedKey = 1951;
    while(!allTilesAreFixed) {
        const tileBeing = allTiles.get(nextConnectedKey);
        tileBeing.totalAdjacents = searchForPair(allTiles, nextConnectedKey);
        //console.log(nextConnectedKey + " : " + tileBeing.totalAdjacents);
        console.log("Adjacents-> N: %s, E: %s, S: %s, W: %s", tileBeing.adjacentNorth, tileBeing.adjacentEast, tileBeing.adjacentSouth, tileBeing.adjacentWest);
        // Determino siguiente tile alrededor del cual ordenar
        if (tileBeing.adjacentNorth != 0 
            && 
            allTiles.get(tileBeing.adjacentNorth).fixed == false) {
            nextConnectedKey = tileBeing.adjacentNorth;
        } else if (tileBeing.adjacentEast != 0 
            && 
            allTiles.get(tileBeing.adjacentEast).fixed == false) {
            nextConnectedKey = tileBeing.adjacentEast;
        } else if (tileBeing.adjacentSouth != 0 
            && 
            allTiles.get(tileBeing.adjacentSouth).fixed == false) {
            nextConnectedKey = tileBeing.adjacentSouth;
        } else if (tileBeing.adjacentWest != 0 
            && 
            allTiles.get(tileBeing.adjacentWest).fixed == false) {
            nextConnectedKey = tileBeing.adjacentWest;
        } else {
            console.log("No se encuentra siguiente tile conectado");
            console.log("Nos quedamos en el tile: " + nextConnectedKey);
            //break;
        }
        //Salida
        allTilesAreFixed = true;
        for (const [key, theTile] of allTiles){
            allTilesAreFixed = allTilesAreFixed && theTile.fixed ;
        }
        if (allTilesAreFixed) {
            console.log("All Tiles are paired and are fixed");
        }
    }
}

searchPairForEveryone(tiles);

function genMatrix(allTiles) {
    matrixLength = Math.sqrt(allTiles.size);
    let superMatrix = new Array(matrixLength*2);
    for (let i = 0; i < superMatrix.length; i++) {
        const row = new Array(matrixLength*2).fill(0);
        superMatrix[i] = row;
    }
    superMatrix[matrixLength][matrixLength]= allTiles.keys().next().value;
    //superMatrix[matrixLength-1][matrixLength-1]= 1427;
    console.log(superMatrix);
    let cuentaParaFin = 0;
    while (cuentaParaFin < 17) {
        for (let i = 0; i < superMatrix.length; i++) {
            for (let j = 0; j < superMatrix.length; j++) {
                const element = superMatrix[i][j];
                if (element == 0) continue;
                myTileKey = element;
                myTile = allTiles.get(myTileKey);
                superMatrix[i-1][j] = myTile.adjacentNorth;
                superMatrix[i][j+1] = myTile.adjacentEast;
                superMatrix[i+1][j] = myTile.adjacentSouth;
                superMatrix[i][j-1] = myTile.adjacentWest;
                
            }
           
        }
        //console.table(superMatrix);
        cuentaParaFin += 1;
    }
    return eliminateZerosOfMatrix(superMatrix);
}
function eliminateZerosOfMatrix(matrix) {
    let validMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        let validRow = [];
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j] != 0) {
                validRow.push(matrix[i][j])    
            }
        }
        if (validRow.length > 0) {
            validMatrix.push(validRow);
        }
    }
    return validMatrix;
}
//console.table(genMatrix(tiles));
function eliminateBorders(allTiles) {
    for (let [key, tile] of allTiles) {
        let newImage = [];
        for (let i = 1; i < tile.image.length-1; i++) {
            let newRow = []
            for (let j = 1; j < tile.image.length-1; j++) {
                newRow.push(tile.image[i][j]);
            }
            newImage.push(newRow);
        }
        tile.image = newImage;
    }
}

function main(allTiles) {
    let orderedMatrixOfIDs = genMatrix(allTiles);
    console.log(orderedMatrixOfIDs);
    eliminateBorders(allTiles);
    let newMatrix = [];
    //console.log(allTiles);
    for (let i = 0; i < orderedMatrixOfIDs.length; i++) {
        let newMiniMatrix = new Array(8);
        console.log(newMiniMatrix);
        for (let j = 0; j < orderedMatrixOfIDs.length; j++) {
            const thisId = orderedMatrixOfIDs[i][j];
            console.log(thisId);
            myImage = allTiles.get(thisId).image.map(row => row.join(""));
            console.log(myImage);
            for (let line = 0; line < 8; line++) {
                if (j == 0) {
                    newMiniMatrix[line] = myImage[line];
                } else {
                    newMiniMatrix[line] += myImage[line];
                }
            }
        }
        newMatrix.push(...newMiniMatrix);
    }
    console.log(newMatrix);
    let newImage = newMatrix.map(row => row.split(""))
    for (let iaux = 0; iaux < newImage.length; iaux++) {
        for (let jaux = 0; jaux < newImage.length; jaux++) {
            newImage[iaux][jaux] = parseInt(newImage[iaux][jaux]);
        }
    }

    let validStartPoints = [];
    let timesInit = 0;
    let bigTile = new Tile(1, newImage);
    validStartPoints.push(...searchMonster(bigTile.image));
    if (validStartPoints.length > 0) {
        timesInit = 10;
    }
    for (let times = 0; times < 7; times++) {
        if (times == 3) {
            bigTile.flipLR();
        } else {
            bigTile.rotateCounterclockwise();
        }
        validStartPoints.push(...searchMonster(bigTile.image));
        if (validStartPoints.length > 0) {
            break;
        }
    }
    //console.table(bigTile.image);
    let totalOnes = countOnes(bigTile.image);
    let monsterOnes = countOnes(monster) * validStartPoints.length;
    return totalOnes - monsterOnes;

}
function searchMonster(matrix){
    // En i podemos ir de 0 a length-3
    // En j podemos ir de 0 a length-20
    let startPoints = [];
    for (let i = 0; i <= matrix.length-3; i++) {
        for (let j = 0; j <= matrix.length-20; j++) {
            // Ya tenemos el punto de partida
            let verificador = 1;
            for (let i2 = 0; i2 < monster.length; i2++) {
                for (let j2 = 0; j2 < monster[0].length; j2++) {
                    if (monster[i2][j2] == 0) verificador = verificador & 1;
                    if (monster[i2][j2] == 1) verificador = verificador & (1 & matrix[i+i2][j+j2]);
                }
            }
            if (verificador == 1) {
                startPoints.push([i,j]);
            }
        }
    }
    return startPoints;
}
function countOnes(matrix) {
    let ones = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            const element = matrix[i][j];
            if(element) ones += 1;
        }
    }
    return ones;
}
console.log("--------------------------");
console.log(main(tiles));
//console.log(countOnes(monster));


