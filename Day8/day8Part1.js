try{var bootCode = require('./input.js');} catch(error){}

function day8_executeInstruction(bootCodeExecution) {
    thisInstruction = bootCodeExecution.myBootCode[bootCodeExecution.myCurrentInstructionNumber];
    bootCodeExecution.myResults.myExecutedInstructions[bootCodeExecution.myCurrentInstructionNumber] = thisInstruction;
    bootCodeExecution.myResults.myExecutionStory.push(bootCodeExecution.myCurrentInstructionNumber);
    switch (thisInstruction.nemonic) {
        case 'jmp':
            bootCodeExecution.myCurrentInstructionNumber += thisInstruction.val;
            break;
        case 'acc':
            bootCodeExecution.myResults.myAccumulator += thisInstruction.val;
        case 'nop':
        default:
            bootCodeExecution.myCurrentInstructionNumber += 1;
            break;
    }
}
function day8_executeBootCode(anyBootCode){
    let myBootCodeExecution = {
        myBootCode: [...anyBootCode], 
        myCurrentInstructionNumber: 0, 
        myResults: {
            doIFinish: false,
            myAccumulator: 0, 
            myExecutedInstructions: {},
            myExecutionStory:[]
        }
    }   
    
    do {
        day8_executeInstruction(myBootCodeExecution);
        // Error aquí 
        if (myBootCodeExecution.myCurrenInstructionNumber >= myBootCodeExecution.myBootCode.length) {
            myBootCodeExecution.myResults.doIFinish = true;
            return myBootCodeExecution.myResults;
        }
    } while (!(myBootCodeExecution.myCurrentInstructionNumber in myBootCodeExecution.myResults.myExecutedInstructions));

    return myBootCodeExecution.myResults;
}
// ------------------------ MAIN FUNCTION --------------------
function day8_HandheldHalting_Part1(){
    return day8_executeBootCode(bootCode).myAccumulator;
}
// ---------------- Ejecuto la función ------------------
// console.log(day8_HandheldHalting_Part1());

try{
    module.exports = {day8_executeInstruction, day8_executeBootCode};
} catch(e){}