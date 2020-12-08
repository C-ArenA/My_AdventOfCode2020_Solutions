try{ 
    var mapOfTrees = require('./input.js');
    console.clear();
} catch(error){
    //console.error("Dado que no estamos en un entorno de Node.js, de todas formas obtendrás el input del anterior script mediante el index.html");
}

//Podemo usar la función que creamos para la parte 1 (El TryCatch sólo está para 
//que sea compatible con navegadores)

try{ 
    var part1 = require("./day3Part1");
    var day3_TobogganTrajectory_Part1 = part1.day3_TobogganTrajectory_Part1;
} catch(error){
    //console.error("Dado que no estamos en un entorno de Node.js, de todas formas obtendrás el input del anterior script mediante el index.html");
}

function day3_TobogganTrajectory_Part2() {
    return  day3_TobogganTrajectory_Part1(1,1) * 
            day3_TobogganTrajectory_Part1(3,1) * 
            day3_TobogganTrajectory_Part1(5,1) * 
            day3_TobogganTrajectory_Part1(7,1) * 
            day3_TobogganTrajectory_Part1(1,2);
}
console.clear();
//console.log(day3_TobogganTrajectory_Part2());

