try { 
    var expenseReport = require('./input.js');
} catch(error){
    console.error("Dado que no estamos en un entorno de Node.js, de todas formas obtendrás el input del anterior script mediante el index.html");
}
function day1Part2Solver() {
    let threeSum = 0;
    let threeSumMultipliedResult = 0;
    for (let i = 0; i < expenseReport.length; i++) {
        const elementoBase = expenseReport[i];
        for (let j = 0; j < expenseReport.length; j++) {
            const elementoSuma = expenseReport[j];
            for (let k = 0; k < expenseReport.length; k++) {
                const elementoSuma2 = expenseReport[k];
                threeSum = elementoBase + elementoSuma + elementoSuma2;
                if (threeSum == 2020 && (i != j != k)) {
                    threeSumMultipliedResult = elementoBase * elementoSuma * elementoSuma2;
                    // Para salir del loop habían varias formas como usar labels, pero usaré la siguiente:
                    i = j = expenseReport.length
                    break; 
                }
            }
        }
    }
    return threeSumMultipliedResult;
}

console.log(day1Part2Solver());