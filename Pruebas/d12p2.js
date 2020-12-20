let rawBusesList = [37,"x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x",41,"x","x","x","x","x","x","x","x","x",587,"x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x",13,19,"x","x","x",23,"x","x","x","x","x",29,"x",733,"x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x",17];
//let busRaw = [3,5,7,13]
// FUNCTION: I JUST NEED THE BUSES WITH IDs and Deltas, NOT "x"s 
function day13_getBusesIDsAndDeltas(busesList) {
    let buses = [];
    busesList.forEach((thisBus, index) => {
    if (thisBus != "x") buses.push({id: thisBus, delta: index});
    });    
    buses.sort((a,b) =>{
        return b.id - a.id;
    })
    return buses;
}
let buses = day13_getBusesIDsAndDeltas(rawBusesList);

// FUNCTION: HERE WE HAVE ALL THE MATH. IT DOESN'T EXPLAIN ISELF
function t(a0) {
    return a0 * buses[0].id - buses[0].delta;
}
function b(busIndex, a0) {
    return t(a0) + buses[busIndex].delta;
}
function a(busIndex, a0) {
    return b(busIndex, a0) / buses[busIndex].id;
}
function mod_a(busIndex, a0) {
    return b(busIndex, a0) % buses[busIndex].id;
}
function aInicial(tCercano) {
    return Math.floor((tCercano + buses[0].delta) / buses[0].id);
}

let tCercano = 100000000000000;
let suma = 1;
let finalT = undefined;
for (let a0 = aInicial(tCercano); true; a0+=suma) {
    let tabla = a0 + "\t" + t(a0) + "\t"
    suma = 1;
    let busIndex = 1;
    let zeros = true;
    while (busIndex < buses.length) {
        tabla += b(busIndex,a0) + "\t" + Math.floor(a(busIndex,a0)) + "\t" + b(busIndex, a0) % buses[busIndex].id + "\t"
        if((b(busIndex, a0) % buses[busIndex].id) == 0){
            suma *= buses[busIndex].id;
        } else {
            zeros = false;
            break;
        }
        busIndex += 1;
    }
    console.log(tabla);
    if (zeros == true) {
        finalT = t(a0);
        break;
    }
}

console.log(finalT);