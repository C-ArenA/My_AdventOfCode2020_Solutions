try{const {performance} = require('perf_hooks');} catch(error){}
try{var bagsColorRules = require('./input.js');} catch(error){}
// Each color rule has the next structure:
// colorRule: {color1:quantity1, c2:q2, c3:q3, ...}

// Hago una copia del input porque en el html ejecuto uno tras otro
// y la parte 2 requiere este mismo input
let dinamicBagsColorRules = {...bagsColorRules};


// -----------------------------------FUNCIONES SIMPLE Y MEJORADA-------------------------
function isThereAnyShinyGoldHereSimple(thisBagName) {    
    const thisBag = dinamicBagsColorRules[thisBagName];
    // Caso Base TRUE:
    if ("shiny gold" in thisBag) return true;
    // Caso General
    for (let insideBag in thisBag) {
        if(isThereAnyShinyGoldHere(insideBag)) return true;
    }
    return false;
}

function isThereAnyShinyGoldHereBetterPerformance(thisBagName) {    
    const thisBag = dinamicBagsColorRules[thisBagName];
    if (thisBag == undefined) return false;
    // Caso Base TRUE:
    if (thisBag.hasShinny != undefined) {
        if (thisBag.hasShinny) return true;
    }

    if ("shiny gold" in thisBag) {
        dinamicBagsColorRules[thisBagName].hasShinny = true;
        return true;
    }
    // Caso General
    for (let insideBag in thisBag) {
        if(isThereAnyShinyGoldHereBetterPerformance(insideBag)){
            dinamicBagsColorRules[thisBagName].hasShinny = true;
            return true;
        }
    }
    // Borro los que no tienen el shiny gold ni al final, para que en la siguiente iteración no se ejecute
    delete dinamicBagsColorRules[thisBagName];
    return false;
}

//------------------------MAIN FUNCTION------------------------
function day7_HandyHaversacks_Part1(){
    let shinyCount = 0;
    for (let bag in dinamicBagsColorRules) {
        if (isThereAnyShinyGoldHereBetterPerformance(bag)) shinyCount += 1;
    }
    return shinyCount;
}

//--------------------EJECUTAR EN CONSOLA (OPCIONAL)--------------
/* var t0 = performance.now()
console.log(day7_HandyHaversacks_Part1());
var t1 = performance.now()
console.log("It took " + (t1 - t0) + " milliseconds.")  */