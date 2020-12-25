let cardsPublicKey = 335121;
let doorsPublicKey = 363891;

let exCardsPK = 5764801;
let exDoorsPK = 17807724;
let exCardsLoopSize;
let exDoorsLoopSize;

// Finds the loop Size for both
function findLoopSize(cardsPK, doorsPK) {
    let subjectNumber = 7;
    let value = 1;
    let cardsLoopSize;
    let doorsLoopSize;
    for (let i = 1; true; i++) {
        value = value * subjectNumber;
        value = value % 20201227;
        if (value == cardsPK) cardsLoopSize = i;
        if (value == doorsPK) doorsLoopSize = i;
        if (i >= cardsLoopSize && i >= doorsLoopSize) break;
    }    
    //return {cardsLS: cardsLoopSize, doorsLS: doorsLoopSize}
    return [cardsLoopSize, doorsLoopSize]
}


function calculateEncriptionKey(cardsPK, doorsPK) {
    [cardsLoopSize, doorsLoopSize] = findLoopSize(cardsPK, doorsPK);
    let value = 1;
    let subjectNumber = doorsPK
    for (let i = 1; i <= cardsLoopSize; i++) {
        value = value * subjectNumber;
        value = value % 20201227;
    }    
    let encriptionKey1 = value;

    value = 1;
    subjectNumber = cardsPK
    for (let i = 1; i <= doorsLoopSize; i++) {
        value = value * subjectNumber;
        value = value % 20201227;
    }    
    let encriptionKey2 = value;

    if (encriptionKey1 == encriptionKey2) {
        console.log("Ambas claves son iguales: " + encriptionKey1);
        return encriptionKey1;
    }
    console.log("Las claves no son iguales");
    return false;
}

calculateEncriptionKey(exCardsPK, exDoorsPK);
calculateEncriptionKey(cardsPublicKey, doorsPublicKey);
