try {
    var d24P1 = require('./d24p1');
    var d24P1Main = d24P1.main;
    var countBlacks = d24P1.cntBlacks;
    var Hexagon = d24P1.Hexagon;
} catch (e) {}

function countAdjacentBlacks(hexSpace, hexString) {
    let adjacentsArray = hexSpace[hexString].adj();
    return adjacentsArray.reduce((blackLivesCounter, hex) =>{
        if (hex in hexSpace) {
            blackLivesCounter += hexSpace[hex].color == Hexagon.BLACK? 1: 0;
        } 
        return blackLivesCounter;
    }, 0);
}

function oneDay(hexSpace) {
    let nextSpace = {}; 
    for (const hexCoord in hexSpace) {
        let blackLivesCounter = countAdjacentBlacks(hexSpace, hexCoord);
        //console.log(hexCoord + " : " + blackLivesCounter);
        const hexagon = hexSpace[hexCoord];
        if (blackLivesCounter >= 3 || blackLivesCounter == 0) {
            nextSpace[hexCoord] = new Hexagon(hexagon.hexX, hexagon.hexY, Hexagon.WHITE);
            continue;
        } 
        if (blackLivesCounter == 2) {
            nextSpace[hexCoord] = new Hexagon(hexagon.hexX, hexagon.hexY, Hexagon.BLACK);
            continue;
        }
        nextSpace[hexCoord] = new Hexagon(hexagon.hexX, hexagon.hexY, hexagon.color);
    }
    growSpace(nextSpace);
    return nextSpace;
}
function findDomain(hexSpaceObject) {
    // Encuentro el dominio
    let [minX, maxX, minY, maxY] = [0,0,0,0];
    for (const hexagon in hexSpaceObject) {
        const x = hexSpaceObject[hexagon].hexX;
        const y = hexSpaceObject[hexagon].hexY;
        if (minX > x) minX = x;
        if (maxX < x) maxX = x;
        if (minY > y) minY = y;
        if (maxY < y) maxY = y;
    }
    let maxValue = Math.abs(minX);
    if (Math.abs(maxX) > maxValue) maxValue = Math.abs(maxX);
    if (Math.abs(minY) > maxValue) maxValue = Math.abs(minY);
    if (Math.abs(maxY) > maxValue) maxValue = Math.abs(maxY);
    //console.log(maxValue);
    return maxValue;
}
function growSpace(hexSpaceObject) {
    domain = findDomain(hexSpaceObject);
    for (let i = -domain-1; i <= domain+1; i++) {
        for (let j = -domain-1; j <= domain+1; j++) {
            coord = [i,j].join(",");
            if (Math.abs(i+j) > domain+1) continue;
            if (!(coord in hexSpaceObject)) hexSpaceObject[coord] = new Hexagon(i,j);
        }
    }
}
function printSpace(hexSpaceObject, target) {
    domain = findDomain(hexSpaceObject);
    for (let i = domain+1; i >= -domain-1; i--) {
        let row = "";
        for (let j = -domain-1; j <= domain+1; j++) {
            coord = [j,i].join(",");
            //if (Math.abs(i+j) > domain+1) row += "X";
            if (coord == target) {
                row += "X";
                continue;
            }
            if (coord in hexSpaceObject) {
                row += hexSpaceObject[coord].color == 0? "░": "█";
            } else {
                row += "~";
            }
        }
        console.log(row);
    }
}
function printHexSpace(hexSpaceObject, target) {
    domain = findDomain(hexSpaceObject);
    for (let i = domain+1; i >= -domain-1; i--) {
        let addingT = i+domain+1;
        let row = "";
        while (addingT > 0) {
            if (Math.abs(addingT%2) == 0) {
                row += "~";    
            }
            
            addingT -= 1;
        }
        
        for (let j = -domain-1; j <= domain+1; j++) {
            coord = [j,i].join(",");
            //if (Math.abs(i+j) > domain+1) row += "X";
            if (coord == target) {
                row += "X";
                continue;
            }
            if (coord in hexSpaceObject) {
                row += hexSpaceObject[coord].color == 0? "░": "█";
            } else {
                row += "~";
            }
        }
        console.log(row);
    }
}
function main(){
    let myHexSpace = d24P1Main();
    growSpace(myHexSpace);
    nextSpace = myHexSpace;
    printHexSpace(nextSpace);
    for (let i = 1; i <= 10; i++) {
        nextSpace = oneDay(nextSpace);    
        //printHexSpace(nextSpace);
        console.log("Day " + i + ": " + countBlacks(nextSpace))
    }
    
    
    //console.log(myHexSpace);
}
main();
//printSpace()
