try{ 
    var expenseReport = require('./input.js');
} catch(error){
    //console.error("Dado que no estamos en un entorno de Node.js, de todas formas obtendrás el input del anterior script mediante el index.html");
}


function day1_ReportRepair_Part1_old() {
    let twoSum = 0;
    let twoSumMultipliedResult = 0;
    for (let i = 0; i < expenseReport.length; i++) {
        const elementoBase = expenseReport[i];
        for (let j = 0; j < expenseReport.length; j++) {
            const elementoSuma = expenseReport[j];
            twoSum = elementoBase + elementoSuma;
            if (twoSum == 2020 && i != j) {
                twoSumMultipliedResult = elementoBase * elementoSuma;
                // Para salir del loop habían varias formas como usar labels, pero usaré la siguiente:
                j = expenseReport.length
                break; 
            }
        }
    }
    return twoSumMultipliedResult;
}

// ------------------ TWO SUM ALGORITHM ------------------
function day1_twoSumAlgorithm(compareSet, targetValue) {
    let needed = {};
    for (let i = 0; i < compareSet.length; i++) {
        const num = compareSet[i];
        if (num in needed) return {didTheySum: true, firstSumElement: needed[num], secondSumElement: num};
        if (targetValue > num) needed[targetValue - num] = num;    
    }
    return {didTheySum: false};
}

// ----------------- MAIN FUNCTION --------------------------
function day1_ReportRepair_Part1() {
    let twoSumResults = day1_twoSumAlgorithm(expenseReport, 2020);
    let firstValue = twoSumResults.firstSumElement;
    let secondValue = twoSumResults.secondSumElement;
    return firstValue * secondValue;
}

//console.log(day1_ReportRepair_Part1_old());
//console.log(day1_ReportRepair_Part1());

try{
    module.exports = day1_twoSumAlgorithm;
} catch(e){}