//how many tiles are left with the black side up?
try {
    var day24_flipTileInstructions = require('./input.js')
} catch (e) {}


function getInstructions() {
    const [E, NE, NW, W, SW, SE] = [0,1,2,3,4,5];
    //const [E, NE, NW, W, SW, SE] = ["E", "NE", "NW", "W", "SW", "SE"];
    return day24_flipTileInstructions.map((line => {
        let instructionLine = [];
        for (let direction = 0; direction < line.length; direction++) {
            let char = line[direction];
            switch (char) {
                case "e":
                    instructionLine.push(E);    
                    break;
                case "w":
                    instructionLine.push(W);    
                    break;
                case "n":
                    instructionLine.push(line[direction + 1] == "e"? NE: NW);
                    direction++;            
                    break;
                case "s":
                    instructionLine.push(line[direction + 1] == "e"? SE: SW);
                    direction++;            
                    break;
                default:
                    console.error("No entiendo bien esta dirección BROU");
                    break;
            }
        }
        return instructionLine;
    }))

}
// Adj E    x+1,y 
// Adj NE   x,y+1
// Adj NW   x-1,y+1
// Adj W    x-1,y
// Adj SW   x,y-1
// Adj SE   x+1,y-1
class Hexagon {
    constructor(hexX, hexY, color){
        this.hexX = hexX;
        this.hexY = hexY;
        if (color == undefined) {
            this.color = Hexagon.WHITE;
        } else {
            this.color = color;    
        }
        this.coordinatesString = hexX.toString() + "," + hexY.toString(); 
    }
    static get WHITE() {return 1;}
    static get BLACK() {return 0;}
    flip(){
        this.color = this.color ^ 1;
    }
    adj(){
        let adjE = [this.hexX+1, this.hexY].join(","); 
        let adjNE = [this.hexX, this.hexY+1].join(","); 
        let adjNW = [this.hexX-1, this.hexY+1].join(","); 
        let adjW = [this.hexX-1, this.hexY].join(","); 
        let adjSW = [this.hexX, this.hexY-1].join(","); 
        let adjSE = [this.hexX+1, this.hexY-1].join(",");
        return [adjE, adjNE, adjNW, adjW, adjSW, adjSE];   
    }
}

function executeInstructionsLine(line, hexagonsSpace) {
    const [E, NE, NW, W, SW, SE] = [0,1,2,3,4,5];
    let [nextX, nextY] = [0, 0];
    line.forEach(direction => {
        switch (direction) {
            case E:
                nextX += 1;
                break;
            case NE:
                nextY += 1;
                break;
            case NW:
                nextX -= 1;
                nextY += 1;
                break;
            case W:
                nextX -= 1;
                break;
            case SW:
                nextY -= 1;
                break;
            case SE:
                nextX += 1;
                nextY -= 1;
                break;
            default:
                console.error("Me diste una mala dirección BROU!");
                return false;
        }
    });
    let newHexagon = new Hexagon(nextX, nextY);
    if (!(newHexagon.coordinatesString in hexagonsSpace)) hexagonsSpace[newHexagon.coordinatesString] = newHexagon;
    hexagonsSpace[newHexagon.coordinatesString].flip();
    return true;
}

function countBlacks(hexagonSpace) {
    let blackLivesCounter = 0;
    for (const hexagon in hexagonSpace) {
        if (hexagonSpace[hexagon].color == Hexagon.BLACK) blackLivesCounter++
    }
    return blackLivesCounter;
}

function executeAllTheInstructions(instructionsList) {
    let hexagonsSpace = {};
    instructionsList.forEach(instructionsLine => {
        executeInstructionsLine(instructionsLine, hexagonsSpace)
    })
    return hexagonsSpace;
}

function d24P1Main() {
    let instructionsList = getInstructions();
    let myHexSpace = executeAllTheInstructions(instructionsList);
    console.log(countBlacks(myHexSpace));
    return myHexSpace;
}

try{module.exports = {main: d24P1Main, "Hexagon":Hexagon, cntBlacks: countBlacks};} catch(e){}