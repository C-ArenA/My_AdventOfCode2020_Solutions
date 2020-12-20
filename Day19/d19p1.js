const { messages } = require('./input.js');

try {
    rules = require('./input.js').rules;
    messages = require('./input.js').messages;
} catch (e) {}
// Para que mi wordset final no tenga valores repetidos, en cada operación elimino repetidos
function eliminateSimilarStringsInArray(arrayOfStrings) {
    let allElements = new Set(arrayOfStrings);
    return [...allElements];
}
// Un WordSet es un array de todos los strings que se generan por una regla
// Cuando tenemos varias reglas podemos juntar todos sus wordsets en un array y así concatenarlos
// La operación de OR sólo une dos arrays y devuelve un wordset. Esto lo hice dentro de la función recursiva

function concatMultipleWordSets(wordSetsArray) {
    accArray = [""];
    wordSetsArray.forEach(wordSet => {
        const accArrayAux = [];
        accArray.forEach(accElement => {
            wordSet.forEach(newWord =>{
                accArrayAux.push(accElement + newWord);
            })
        })
        accArray = [...accArrayAux];
    });

    return eliminateSimilarStringsInArray(accArray); // Retorna un wordset
}

function rulesArrayToWordSet(rulesObject, ruleNumber) {
    const rulesArray = rulesObject[ruleNumber];
    if (rulesArray.length == 1 && (rulesArray[0] == "a" || rulesArray[0] == "b")) {
        return rulesArray;
    }
    // OR Arrays -> Union
    if (rulesArray[2] == '|') {
        let wordSetsArray1 = [];
        for (let i = 0; i < 2; i++) {
            const thisRule = rulesArray[i];
            const wordset = rulesArrayToWordSet(rulesObject, thisRule);
            wordSetsArray1.push(wordset);
        }
        let wordSetsArray2 = [];
        for (let i = 3; i < 5; i++) {
            const thisRule = rulesArray[i];
            const wordset = rulesArrayToWordSet(rulesObject, thisRule);
            wordSetsArray2.push(wordset);
        }
        let firstOperand = concatMultipleWordSets(wordSetsArray1);
        let secondOperand = concatMultipleWordSets(wordSetsArray2);
        return eliminateSimilarStringsInArray([...firstOperand, ...secondOperand]);
    }
    if (rulesArray[1] == '|') {
        let wordSetsArray1 = [];
        for (let i = 0; i < 1; i++) {
            const thisRule = rulesArray[i];
            const wordset = rulesArrayToWordSet(rulesObject, thisRule);
            wordSetsArray1.push(wordset);
        }
        let wordSetsArray2 = [];
        for (let i = 2; i < 3; i++) {
            const thisRule = rulesArray[i];
            const wordset = rulesArrayToWordSet(rulesObject, thisRule);
            wordSetsArray2.push(wordset);
        }
        let firstOperand = concatMultipleWordSets(wordSetsArray1);
        let secondOperand = concatMultipleWordSets(wordSetsArray2);
        return eliminateSimilarStringsInArray([...firstOperand, ...secondOperand]);
    }
    //Create WordSets Array
    let wordSetsArray = [];
    for (let i = 0; i < rulesArray.length; i++) {
        const thisRule = rulesArray[i];
        const wordset = rulesArrayToWordSet(rulesObject, thisRule);
        wordSetsArray.push(wordset);
    }
    return concatMultipleWordSets(wordSetsArray);
}

//console.log(ruleArrayToStringsArray(rules, 0));
//console.log(concatMultipleWordSets([["a", "a"],["a", "b"],["c", "d"]]));
//console.log(rulesArrayToWordSet(rules, 0));

function main(rulesObject, receivedMessages) {
    let validMessages = rulesArrayToWordSet(rulesObject, 0);
    let messageSize = validMessages[0].length;
    let validsSet = new Set(validMessages);
    //Eliminar messages que no cumplen tamaño
    let possiblyValids = receivedMessages.filter(word => word.length == messageSize);
    return possiblyValids.reduce((valids, word) => validsSet.has(word)? valids + 1: valids, 0)
    //return possiblyValids.length;
}
console.log(main(rules, messages));
