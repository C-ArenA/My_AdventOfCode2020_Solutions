try{var bootCode = require('./input.js');} catch(error){}

// ------------------------ MAIN FUNCTION --------------------
function day8_HandheldHalting_Part1(){
    let myBootCode =  [...bootCode];

    let instructionNumber = 0;
    let accumulator = 0;

    while ( myBootCode[instructionNumber].nemonic != 'done' ) {
        const thisInstruction = myBootCode[instructionNumber];
        // Ejecuto instrucción y Determino siguiente instrucción
        switch (thisInstruction.nemonic) {
            case 'jmp':
                myBootCode[instructionNumber].nemonic = 'done';
                instructionNumber += thisInstruction.val;
                break;
            case 'acc':
                accumulator += thisInstruction.val;
            case 'nop':
            default:
                myBootCode[instructionNumber].nemonic = 'done';
                instructionNumber += 1;
                break;
        }
    }

    return accumulator;
}
// ---------------- Ejecuto la función ------------------
console.log(day8_HandheldHalting_Part1());