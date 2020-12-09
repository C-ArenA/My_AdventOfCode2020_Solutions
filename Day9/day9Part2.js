try{var cipheredCode = require('./input.js');} catch(error){}
try{var day9_findWeakness = require('./day9Part1.js');} catch(error){}

function day9_ObtainSumSet(firstStartIndex, target) {
    // Comienzo a iterar en el índice de inicio
    for (let startIndex = firstStartIndex; startIndex >= 0; startIndex--) {
        // A partir de este índice hago la suma 
        let suma = 0;
        // Itero sobre el array, pero con otro índice particular de esta suma
        for (let valueToSumIndex = startIndex; valueToSumIndex >= 0; valueToSumIndex--) {
            const num = cipheredCode[valueToSumIndex];
            suma += num;
            // Compruebo
            if (suma > target) {
                break;
            }
            if (suma == target) {
                return cipheredCode.slice(valueToSumIndex, startIndex + 1);
            }    
        }
    }
    return [];
}

// ------------ MAIN FUNCTION -------------
function day9_EncodingError_Part2(){
    // Obtengo Index y valor para iniciar
    let weakness = day9_findWeakness();
    let firstStartIndex = weakness.valueToVerifyIndex - 1;
    let valueToSumUp = weakness.valueToVerify;
    // Obtengo Conjunto de números que suman el valor buscado
    let summingSet = day9_ObtainSumSet(firstStartIndex, valueToSumUp);
    // Ordeno el array
    summingSet = summingSet.sort(function (a, b) {  return a - b;  });
    // Devuelvo la suma min + max
    return summingSet[0] + summingSet[summingSet.length - 1];
}

// console.log(day9_EncodingError_Part2());