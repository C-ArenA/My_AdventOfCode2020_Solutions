try {
    var imageTiles = require("./input.js")
} catch (e) {}

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
    //Busco Para mi Top
    let myTop = allTiles.get(targetTileId).top().actual;
    let myBottom = allTiles.get(targetTileId).bottom().actual;
    let myLeft = allTiles.get(targetTileId).left().actual;
    let myRight = allTiles.get(targetTileId).right().actual;
    let countEquals = 0;
    for (const [key, tile] of allTiles) {
        if (key == targetTileId) {
            continue;
        }
        //Comparo con los otros tops
        countEquals += ((tile.top().actual == myTop) || (tile.top().flipped == myTop))? 1: 0;
        countEquals += ((tile.top().actual == myBottom) || (tile.top().flipped == myBottom))? 1: 0;
        countEquals += ((tile.top().actual == myRight) || (tile.top().flipped == myRight))? 1: 0;
        countEquals += ((tile.top().actual == myLeft) || (tile.top().flipped == myLeft))? 1: 0;
        //Comparo con los otros bottoms
        countEquals += ((tile.bottom().actual == myTop) || (tile.bottom().flipped == myTop))? 1: 0;
        countEquals += ((tile.bottom().actual == myBottom) || (tile.bottom().flipped == myBottom))? 1: 0;
        countEquals += ((tile.bottom().actual == myLeft) || (tile.bottom().flipped == myLeft))? 1: 0;
        countEquals += ((tile.bottom().actual == myRight) || (tile.bottom().flipped == myRight))? 1: 0;
        //Comparo con los otros tops
        countEquals += ((tile.left().actual == myTop) || (tile.left().flipped == myTop))? 1: 0;
        countEquals += ((tile.left().actual == myBottom) || (tile.left().flipped == myBottom))? 1: 0;
        countEquals += ((tile.left().actual == myLeft) || (tile.left().flipped == myLeft))? 1: 0;
        countEquals += ((tile.left().actual == myRight) || (tile.left().flipped == myRight))? 1: 0;
        //Comparo con los otros tops
        countEquals += ((tile.right().actual == myTop) || (tile.right().flipped == myTop))? 1: 0;
        countEquals += ((tile.right().actual == myBottom) || (tile.right().flipped == myBottom))? 1: 0;
        countEquals += ((tile.right().actual == myLeft) || (tile.right().flipped == myLeft))? 1: 0;
        countEquals += ((tile.right().actual == myRight) || (tile.right().flipped == myRight))? 1: 0;
    }
    return countEquals;
}

function searchPairForEveryone(allTiles) {
    for (const [key, tile] of allTiles) {
        tile.totalAdjacents = searchForPair(allTiles, key);
        console.log(key + " : " + tile.totalAdjacents);
    }
}
function multiplyCorners(allTiles) {
    let multAccum = 1;
    for (const [key, tile] of allTiles) {
        tile.totalAdjacents = searchForPair(allTiles, key);
        if (tile.totalAdjacents == 2) {
            console.log(key + " : " + tile.totalAdjacents);
            multAccum *= tile.id;
        }
    }
    return multAccum;
}
//console.log(searchForPair(tiles,15));
//searchPairForEveryone(tiles)
console.log(multiplyCorners(tiles));

