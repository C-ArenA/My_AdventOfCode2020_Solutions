try{ 
    var mapOfTrees = require('./input.js');
} catch(error){
    //console.error("Dado que no estamos en un entorno de Node.js, de todas formas obtendrás el input del anterior script mediante el index.html");
}

function day3_TobogganTrajectory_Part1(slopeRight, slopeDown) {
    if (slopeRight == undefined || slopeDown == undefined) {
        slopeRight = 3;
        slopeDown = 1;
    }
    let obstaclesArray = [];
    let positionInRow = 0
    for (let i = 0; i < mapOfTrees.length; i+=slopeDown) {
        const obstacle = mapOfTrees[i];
        const whatIsIt = obstacle[positionInRow];
        obstaclesArray.push(whatIsIt);
        // Seteo Posición
        positionInRow += slopeRight;
        if (positionInRow >= obstacle.length) {
            positionInRow = positionInRow - obstacle.length;   
        }
    }
    
    let treesCounter = 0;
    for (let k = 0; k < obstaclesArray.length; k++) {
        const element = obstaclesArray[k];
        if (element == "#") {
            treesCounter+=1;
        }
    }   

    return treesCounter;
}

console.log(day3_TobogganTrajectory_Part1());

try{
    module.exports = { day3_TobogganTrajectory_Part1 };
} catch(e){}