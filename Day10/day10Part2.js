try{var adaptersArray = require('./input.js');} catch(error){}

// Genero un map con los adaptadores y sus propiedades
let adaptersMap = new Map(adaptersArray.map(
    (element) => ([element, {generatedBranches:0, timesReferenced:0}])
    )
);
adaptersMap.set(0, {generatedBranches:0, timesReferenced:1});

// ----------------------- MAIN FUNCTION --------------------------
function day10_AdapterArray_Part2(){
    let totalBranches = 1;
    let adapterJoltage = 0;
    while (true) {
        console.log(adapterJoltage + " => ");
        const adapter = adaptersMap.get(adapterJoltage);
        const timesReferenced = adapter.timesReferenced;
        let thisAdapterGeneratedBranches = -1;
        const hasNext = adaptersMap.has(adapterJoltage + 1);
        const hasNextNext = adaptersMap.has(adapterJoltage + 2);
        const hasNextNextNext = adaptersMap.has(adapterJoltage + 3);
        // Determino cuántas bifurcaciones tiene mi adapter
        if (hasNext) {
            thisAdapterGeneratedBranches += 1;
            adaptersMap.get(adapterJoltage+1).timesReferenced += timesReferenced;
        }
        if (hasNextNext) {
            thisAdapterGeneratedBranches += 1;
            adaptersMap.get(adapterJoltage+2).timesReferenced += timesReferenced;
        }  
        if (hasNextNextNext) {
            thisAdapterGeneratedBranches += 1;
            adaptersMap.get(adapterJoltage+3).timesReferenced += timesReferenced;
        }
        if (thisAdapterGeneratedBranches >= 0) {
            totalBranches += thisAdapterGeneratedBranches * timesReferenced;   
        }
        // Siguiente Adaptador y condición de salida
        adapterJoltage += 1
        if (!hasNext) {
            adapterJoltage += 1;
            if (!hasNextNext) {
                adapterJoltage += 1
                if (!hasNextNextNext) {
                    break;
                }
            }
        }
        
    }
    return totalBranches;
}

//console.log(day10_AdapterArray_Part2());