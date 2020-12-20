//let busesIds = [29,"x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x",41,"x","x","x","x","x","x","x","x","x",577,"x","x","x","x","x","x","x","x","x","x","x","x",13,17,"x","x","x","x",19,"x","x","x",23,"x","x","x","x","x","x","x",601,"x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x",37];
let busesIds = [67,"x",7,59,61];
let ids = [];
let deltas = [];
busesIds.forEach((element, index) =>{
    if (element != "x") {
        ids.push(element);
        deltas.push(index);
    }
})
console.log(ids);
console.log(deltas);
function mcmDePrimos(arr) {
    let mcm=1;
    arr.forEach(element => {
        mcm *= element;
    });
    return mcm
}
myMCM = mcmDePrimos(ids);

let theMaxIndex = function findIndexOfMax(array) {
    let max = array[0];
    let maxIndex = 0;
    array.forEach((element, index) => {
        if (element>=max) {
            max = element;
            maxIndex = index;
        }
    });
    return maxIndex;
}(ids);

console.log(theMaxIndex);

//tCercano = 100000000000000;
tCercano = 0;
//let aMax = Math.ceil((tCercano+deltas[theMaxIndex])/ids[theMaxIndex]);
let aMax = 0;
let t = 0;
let a = 0;
while (true) {
    //console.log("This simul");
    let makesIt = 0;
    console.log(aMax);
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        a = (aMax * ids[theMaxIndex] - deltas[theMaxIndex] + deltas[i]) / id;
        if (!Number.isInteger(a)) {
            i = ids.length;
        } else {makesIt += 1;}
    }
    if (makesIt == ids.length) {
        break;
    }
    aMax += 1;
}
t = aMax * ids[theMaxIndex] - deltas[theMaxIndex];
console.log(t);
//console.log(aMax);