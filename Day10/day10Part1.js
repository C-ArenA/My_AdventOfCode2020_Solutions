try{var adaptersArray = require('./input.js');} catch(error){}

function day10_countDifferences(counters, thisAdapter, thisSet) {
    if (thisSet.has(thisAdapter+1)) {
        counters.onesCounter += 1;
    } else if (thisSet.has(thisAdapter+2)) {
        counters.twosCounter += 1;
    } else if (thisSet.has(thisAdapter+3)) {
        counters.thressCounter += 1;
    } 
}

// ------------ MAIN FUNCTION ------------
function day10_AdapterArray_Part1(){
    let adaptersSet = new Set(adaptersArray);
    adaptersSet.add(0);
    let counters = {
        onesCounter : 0,
        twosCounter : 0,
        thressCounter : 0
    }
    adaptersSet.forEach(
        (thisAdapter, thisAdapterAlso, thisSet) => {
            day10_countDifferences(counters, thisAdapter, thisSet);
        }
    );
    counters.thressCounter += 1;
    return counters.onesCounter * counters.thressCounter;
}


//console.log(day10_AdapterArray_Part1());