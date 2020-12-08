try{
    const {
    performance,
    PerformanceObserver
  } = require('perf_hooks');
} catch(error){}

try{var bagsColorRules = require('./input.js');} catch(error){}
// Each color rule has the next structure:
// colorRule: {color1:quantity1, c2:q2, c3:q3, ...}
let dinamicBagsColorRules = {...bagsColorRules};


// ------------------------------------------------------------
function isThereAnyShinyGoldHere(thisBagName) {    
    const thisBag = dinamicBagsColorRules[thisBagName];
    // Caso Base TRUE:
    if ("shiny gold" in thisBag) {
        return true;
    }
    // Caso General
    for (let insideBag in thisBag) {
        if(isThereAnyShinyGoldHere(insideBag)){
            return true;
        }
    }
    // Omití el caso base False y funcionó, pero luego lo añadiré para que sea más correcto
    return false;
}
function isThereAnyShinyGoldHere2(thisBagName) {    
    const thisBag = dinamicBagsColorRules[thisBagName];
    if (thisBag == undefined) {
        return false;
    }
    // Caso Base TRUE:
    if ("shiny gold" in thisBag) {
        return true;
    }
    // Caso General
    for (let insideBag in thisBag) {
        if(isThereAnyShinyGoldHere2(insideBag)){
            return true;
        }
    }
    // Omití el caso base False y funcionó, pero luego lo añadiré para que sea más correcto
    // Borro los que no tienen el shiny gold ni al final, para que en la siguiente iteración no se ejecute
    delete dinamicBagsColorRules[thisBagName];
    return false;
}

function isThereAnyShinyGoldHere3(thisBagName) {    
    const thisBag = dinamicBagsColorRules[thisBagName];
    // Caso Base TRUE:
    if (thisBag.hasShinny != undefined) {
        if (thisBag.hasShinny) {
            return true;
        } else {
            return false;
        }
    }

    if ("shiny gold" in thisBag) {
        dinamicBagsColorRules[thisBagName].hasShinny = true;
        return true;
    }
    // Caso General
    for (let insideBag in thisBag) {
        if(isThereAnyShinyGoldHere3(insideBag)){
            dinamicBagsColorRules[thisBagName].hasShinny = true;
            return true;
        }
    }
    // Omití el caso base False y funcionó, pero luego lo añadiré para que sea más correcto
    // Borro los que no tienen el shiny gold ni al final, para que en la siguiente iteración no se ejecute
    dinamicBagsColorRules[thisBagName].hasShinny = false;
    return false;
}

function isThereAnyShinyGoldHere4(thisBagName) {    
    const thisBag = dinamicBagsColorRules[thisBagName];
    if (thisBag == undefined) {
        return false;
    }
    // Caso Base TRUE:
    if (thisBag.hasShinny != undefined) {
        if (thisBag.hasShinny) {
            return true;
        } 
    }

    if ("shiny gold" in thisBag) {
        dinamicBagsColorRules[thisBagName].hasShinny = true;
        return true;
    }
    // Caso General
    for (let insideBag in thisBag) {
        if(isThereAnyShinyGoldHere4(insideBag)){
            dinamicBagsColorRules[thisBagName].hasShinny = true;
            return true;
        }
    }
    // Omití el caso base False y funcionó, pero luego lo añadiré para que sea más correcto
    // Borro los que no tienen el shiny gold ni al final, para que en la siguiente iteración no se ejecute
    delete dinamicBagsColorRules[thisBagName];
    return false;
}

//------------------------------------------------
function day7_HandyHaversacks_Part1(){
    let shinyCount = 0;
    for (let bag in dinamicBagsColorRules) {
        if (isThereAnyShinyGoldHere4(bag)) {
            shinyCount += 1;
        }
    }
    return shinyCount;
}
/* var t0 = performance.now()
console.log(day7_HandyHaversacks_Part1());
var t1 = performance.now()
console.log("It took " + (t1 - t0) + " milliseconds.") */