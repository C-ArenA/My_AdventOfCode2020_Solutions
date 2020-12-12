try{var navigationInstructions = require('./input.js');} catch(error){}
try{var day12_runNavigationInstructions = require('./day12Part1.js');} catch(error){}

class Waypoint {
    constructor(x, y) { 
        this.xPosition = x;
        this.yPosition = y;
    }
    moveEast(value){this.xPosition += value}
    moveWest(value){this.xPosition -= value}
    moveNorth(value){this.yPosition += value}
    moveSouth(value){this.yPosition -= value}

    rotateClockWise(value, shipX, shipY) {
        for (let i = 1; i <= value; i++) {
            const deltaX = this.xPosition - shipX;
            const deltaY = this.yPosition - shipY;
            this.xPosition = this.xPosition - deltaX + deltaY;
            this.yPosition = this.yPosition - deltaY - deltaX;   
        }
    }
    
    rotateCounterClockWise(value, shipX, shipY) {
        for (let i = 1; i <= value; i++) {
            const deltaX = this.xPosition - shipX;
            const deltaY = this.yPosition - shipY;
            this.xPosition = this.xPosition - deltaX - deltaY;
            this.yPosition = this.yPosition - deltaY + deltaX;   
        }
    }
}

class improvedShip {
    constructor(x, y, waypointObject) { 
        this.xPosition = x;
        this.yPosition = y;
        this.startingX = x;
        this.startingY = y;
        this.waypoint = waypointObject;
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

    moveTowardsWaypoint(value) {
        let xVector = value * (this.waypoint.xPosition - this.xPosition);
        let yVector = value * (this.waypoint.yPosition - this.yPosition);
        this.xPosition += xVector;
        this.yPosition += yVector;
        this.waypoint.xPosition += xVector;
        this.waypoint.yPosition += yVector;
    }
    // command is an object
    executeCommand(command) {
        let rotation = command.value / 90;
        switch (command.action) {
            case "F":
                this.moveTowardsWaypoint(command.value)
                break;
            case "E":
                this.waypoint.moveEast(command.value)
                break;
            case "W":
                this.waypoint.moveWest(command.value)
                break;
            case "N":
                this.waypoint.moveNorth(command.value)
                break;
            case "S":
                this.waypoint.moveSouth(command.value)
                break;
            case "L":
                this.waypoint.rotateCounterClockWise(rotation, this.xPosition, this.yPosition)
                break;
            case "R":
                this.waypoint.rotateClockWise(rotation, this.xPosition, this.yPosition)
                break;
            default:
                console.log("The ship has received a weird instruction. You should check it");
                break;
        }  
        //console.log("--------- " + command.action + " : " + command.value + " ----------");
        //console.log("Ship's Position: " + "x: " + this.xPosition + " y: " + this.yPosition);  
        //console.log("Waypoint's Position: " + "x: " + this.waypoint.xPosition + " y: " + this.waypoint.yPosition);    
    }
}

// --------------- MAIN FUNCTION --------------
function day12_RainRisk_Part2(){
    esaCosa = new Waypoint(10, 1);
    miBarquito = new improvedShip(0, 0, esaCosa);
    day12_runNavigationInstructions(navigationInstructions, miBarquito);
    return miBarquito.ManhattanDistance;
}

//console.log(day12_RainRisk_Part2());
