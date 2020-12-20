/* let initializationProgram = [
    {
    mask:"000000000000000000000000000000X1001X", 
    data:
        [
        {memoryAddress: 42, value:100}
        ]
    },
    {
    mask:"00000000000000000000000000000000X0XX", 
    data:
        [
        {memoryAddress: 26, value:1}
        ]
    }
]; */
try{var initializationProgram = require('./input.js');} catch(error){}
let memory = {
    // address : value
}
// ************************************************************************

function toBinarySimple(decimalValue) {
    let binaryNumber = [];
    let thisDecimal = decimalValue;
    for (let binaryPosition = 0; binaryPosition < 35; binaryPosition++) {
        binaryNumber.unshift(thisDecimal % 2);
        thisDecimal = Math.trunc(thisDecimal / 2);
    }
    return binaryNumber.join("");
}

function toBinarySimpleAndMasked(decimalValue, mask) {
    let binaryNumber = [];
    let thisDecimal = decimalValue;
    for (let binaryPosition = 0; binaryPosition <= 35; binaryPosition++) {
        if (mask[35 - binaryPosition] != "X") {
            binaryNumber.unshift(mask[35 - binaryPosition]);
        } else {
            binaryNumber.unshift(thisDecimal % 2);
        }
        thisDecimal = Math.trunc(thisDecimal / 2);
    }
    return binaryNumber.join("");
}

function phibooleansGenDecimals(decimalBase, phiboolIndex, phibooleans, decimals) {
    
    if (phiboolIndex >= phibooleans.length) {
        return true;
    }
    decimals.push(decimalBase + phibooleans[phiboolIndex]);
    phibooleansGenDecimals(decimalBase, phiboolIndex + 1, phibooleans, decimals);
    phibooleansGenDecimals(decimalBase + phibooleans[phiboolIndex], phiboolIndex + 1, phibooleans, decimals);
}

function newMaskedDecimals(decimalValue, mask, howManybits) {
    if (howManybits == undefined) {
        howManybits = 36;
    }
    let thisBit = undefined;
    let phibooleansValues = [];
    let newDecimal = 0;
    let thisDecimal = decimalValue;
    for (let binaryPosition = 0; binaryPosition < howManybits; binaryPosition++) {
        //Si es distinto a X:
        //  Si es 0: 1 ->1 0->0
        //  Si es 1: 1 ->1 0->1
        //  Claramente es una operación binaria de OR
        //Si es X: Esa posición puede ser 0 o 1

        thisBit = thisDecimal % 2;
        if (mask[howManybits - 1 - binaryPosition] != "X") {
            thisBit = mask[howManybits - 1 - binaryPosition] | thisBit;
        } else {
            thisBit = 0;
            phibooleansValues.push(Math.pow(2,binaryPosition));
        }
        newDecimal += thisBit * Math.pow(2,binaryPosition);
        thisDecimal = Math.trunc(thisDecimal / 2);
    }
    let decimalsArray = [newDecimal];
    phibooleansGenDecimals(newDecimal, 0, phibooleansValues, decimalsArray);
    //console.log(decimalsArray);
    return decimalsArray;
}
//console.log(newMaskedDecimals(11,"XX01", 4));

function writeInMemory(memoryAddress, inputValue, mask) {
    newMemoryAddresses = newMaskedDecimals(memoryAddress, mask, mask.length); // will return an array with all the new addresses
    newMemoryAddresses.forEach(address => {
        memory[address] = inputValue;
    })
    return memory;
}

function writeInstructionInMemory(writingInstruction) {
    const mask = writingInstruction.mask
    const data = writingInstruction.data
    data.forEach(writingInstruction => {
        writeInMemory(writingInstruction.memoryAddress, writingInstruction.value, mask)
    });

}
function runAllTheInstructions(instructionsArray) {
    instructionsArray.forEach(instructionsSet =>
        {
            writeInstructionInMemory(instructionsSet)
        })
    console.log(memory);
}
function sumMemoryValues(anyMemory) {
    let suma = 0
    for (const address in anyMemory) {
        suma += anyMemory[address];
    }
    return suma;
}
function main() {
    runAllTheInstructions(initializationProgram);
    return sumMemoryValues(memory);
}
console.log(main());
//console.log(memory);
