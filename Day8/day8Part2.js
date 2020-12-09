try{var bootCode = require('./input.js');} catch(error){}
try{ 
    var day8Part1 = require("./day8Part1");
    var day8_executeInstruction = day8Part1.day8_executeInstruction;
    var day8_executeBootCode = day8Part1.day8_executeBootCode;
} catch(error){}

function day8_findJmpNopInstructionNumbers(anyExecutionStory, anyBootCode) {
    let jmpNopArray = [];
    anyExecutionStory.forEach(instructionNumber => {
        if (anyBootCode[instructionNumber].nemonic != 'acc') {
            jmpNopArray.unshift(instructionNumber);
        }
    });
    return jmpNopArray;
}

// ------------------ MAIN FUNCTION ----------------
function day8_HandheldHalting_Part2(){
    // Variable que almacena los resultados de cada ejecución
    let lastExecutionResults = day8_executeBootCode(bootCode);
    // Obtengo Historia de ejecución ORIGINAL
    const originalStory = lastExecutionResults.myExecutionStory;
    // Obtengo lista de JMPs y NOPs donde el index 0 es el último en haberse ejecutado 
    // en la historia de ejecución
    const originalJmpNopArray = day8_findJmpNopInstructionNumbers(originalStory, bootCode);
    
    // Tengo un contador que irá seleccionando el siguiente JMP o NOP
    let jmpNopInstructionSelector = 0;
    // El selector me dirá el índice de la siguiente instrucción posiblemente corrupta 
    let possiblyCorruptedInstruction = originalJmpNopArray[jmpNopInstructionSelector];
    // Tendré un objeto boot code aparte para no modificar el original
    let myBootCode = [...bootCode];
    // Comienzo el loop para probar nuevos caminos hasta encontrar el correcto
    do {
        // Modifico my Boot Code
        if (myBootCode[possiblyCorruptedInstruction].nemonic == 'jmp') myBootCode[possiblyCorruptedInstruction].nemonic = 'nop';   
        else myBootCode[possiblyCorruptedInstruction].nemonic = 'jmp';   //means it was nop
        // Ejecuto mi boot Code y obtengo sus resultados para ver el nuevo corrompido
        lastExecutionResults = day8_executeBootCode(myBootCode);
        // Restauro mi Boot Code
        if (myBootCode[possiblyCorruptedInstruction].nemonic == 'jmp') myBootCode[possiblyCorruptedInstruction].nemonic = 'nop';   
        else myBootCode[possiblyCorruptedInstruction].nemonic = 'jmp';   //means it was nop
        // Asumo una siguiente inst corrompida en caso de no haber terminado
        jmpNopInstructionSelector += 1;
        possiblyCorruptedInstruction = originalJmpNopArray[jmpNopInstructionSelector];
        // Mientras no acabe la ejecución seguimos iterando
    } while (!lastExecutionResults.doIFinish);

    // Una vez hayamos salido del loop imprimo el valor en el que quedó el acumulador
    return lastExecutionResults.myAccumulator;
}

console.log(day8_HandheldHalting_Part2());