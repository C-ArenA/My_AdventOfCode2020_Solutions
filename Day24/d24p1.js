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

class Hexagon {
    constructor(hexX, hexY){
        this.hexX = hexX;
        this.hexY = hexY;
        this.color = Hexagon.WHITE;
        this.coordinatesString = hexX.toString() + "," + hexY.toString();
    }
    static get WHITE() {return 1;}
    static get BLACK() {return 0;}
    flip(){
        this.color = this.color ^ 1;
    }

}

function executeInstructionsLine(line, hexagonsSpace) {
    const [E, NE, NW, W, SW, SE] = [0,1,2,3,4,5];
    let [nextX, nextY] = [hexagonsSpace.rootX, hexagonsSpace.rootY];
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
    //hexagonsSpace.rootX = nextX; 
    //hexagonsSpace.rootY = nextY;
    return true;
}

function main() {
    const [E, NE, NW, W, SW, SE] = [0,1,2,3,4,5];
    const [WHITE, BLACK] = [Hexagon.WHITE, Hexagon.BLACK];
    let instructionsList = getInstructions();
    let hexagonSpace = {rootX:0, rootY:0};
    instructionsList.forEach(instructionsLine => {
        executeInstructionsLine(instructionsLine, hexagonSpace)
    })
    let blackLivesCounter = 0;
    for (const hexagon in hexagonSpace) {
        if (hexagonSpace[hexagon].color == BLACK) {
            blackLivesCounter++;
        }
    }
    //console.log(hexagonSpace);
    console.log(blackLivesCounter);
}
main();