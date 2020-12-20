/* let initializationProgram = [
    {
    mask:"XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X", 
    data:
        [
        {memoryAddress: 8, value:11},
        {memoryAddress: 7, value:101},
        {memoryAddress: 8, value:0}
        ]
    },
    {
        mask:"XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X", 
        data:
            [
            {memoryAddress: 9, value:11},
            {memoryAddress: 7, value:101},
            {memoryAddress: 8, value:0}
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

function newMaskedDecimal(decimalValue, mask) {
    let thisBit = undefined;
    let newDecimal = 0;
    let thisDecimal = decimalValue;
    for (let binaryPosition = 0; binaryPosition <= 35; binaryPosition++) {
        if (mask[35 - binaryPosition] != "X") {
            thisBit = mask[35 - binaryPosition];
        } else {
            thisBit = thisDecimal % 2;
        }
        newDecimal += thisBit * Math.pow(2,binaryPosition);
        thisDecimal = Math.trunc(thisDecimal / 2);
    }
    return newDecimal;
}

function writeInMemory(memoryAddress, inputValue, mask) {
    memory[memoryAddress] = newMaskedDecimal(inputValue, mask);
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
