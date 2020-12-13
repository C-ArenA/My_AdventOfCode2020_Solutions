try{var navigationInstructions = require('./input.js');} catch(error){}

const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

class Ship {
    constructor(x, y, facingSide) { 
        this.xPosition = x;
        this.yPosition = y;
        this.startingX = x;
        this.startingY = y;
        this.facing = facingSide;
    }
    get ManhattanDistance() {
        let xProjection = Math.abs(this.xPosition - this.startingX);
        let yProjection = Math.abs(this.yPosition - this.startingY);
        return xProjection + yProjection;
    }

    moveEast(value){this.xPosition += value}
    moveWest(value){this.xPosition -= value}
    moveNorth(value){this.yPosition += value}
    moveSouth(value){this.yPosition -= value}

    moveForward(value){
        switch (this.facing) {
            case EAST:
                this.moveEast(value)
                break;
            case WEST:
                this.moveWest(value)
                break;
            case NORTH:
                this.moveNorth(value)
                break;
            case SOUTH:
                this.moveSouth(value)
                break;
            default:
                console.log("The ship is not facing in any direction. You should check it");
                break;
        }
    }

    // face East = 0
    // face West = 2
    // face North = 1
    // face South = 3
    rotateLeft(value){
        let rotation = value / 90;
        this.facing = (this.facing + rotation) % 4
    }

    rotateRight(value){
        let rotation = value / 90;
        if (this.facing - rotation < 0) {
            this.facing = 4 + ((this.facing -rotation) % 4)
        } else {
            this.facing = (this.facing - rotation) % 4
        }
    }
    // command is an object
    executeCommand(command) {
        switch (command.action) {
            case "F":
                this.moveForward(command.value)
                break;
            case "E":
                this.moveEast(command.value)
                break;
            case "W":
                this.moveWest(command.value)
                break;
            case "N":
                this.moveNorth(command.value)
                break;
            case "S":
                this.moveSouth(command.value)
                break;
            case "L":
                this.rotateLeft(command.value)
                break;
            case "R":
                this.rotateRight(command.value)
                break;
            default:
                console.log("The ship has received a weird instruction. You should check it");
                break;
        }    
    }
}

function day12_runNavigationInstructions(navigationList, anyShip){
    navigationList.forEach(command => {
        anyShip.executeCommand(command)
    });
}

// ------------------ MAIN FUNCTION -----------------
function day12_RainRisk_Part1(){
    var miBarquitoLindo = new Ship(0,0,EAST);
    day12_runNavigationInstructions(navigationInstructions, miBarquitoLindo);
    return miBarquitoLindo.ManhattanDistance;
}

//console.log(day12_RainRisk_Part1());


try{
    module.exports = day12_runNavigationInstructions;
} catch(e){}