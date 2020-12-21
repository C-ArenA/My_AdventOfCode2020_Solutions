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
        for (let i = 3; i < rulesArray.length; i++) {
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
        for (let i = 2; i < rulesArray.length; i++) {
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

function messageToRule(message, rule42Strings) {
    let totalRule = [];
    for (let i = 0; i < 11; i++) {
        const startChar = i*8;
        const endChar = (i+1)*8;
        const pedacitoDeString = message.slice(startChar, endChar);
        if (pedacitoDeString.length == 0) break;
        totalRule.push(isIt42or31(pedacitoDeString, rule42Strings))
    }
    return totalRule.reduce((string, value, index, array) =>(index < array.length - 1) ? string + value + ",": string + value, "");
}
function isIt42or31(pedacitoDe8Chars, wordset42){
    for (let i = 0; i < wordset42.length; i++) if (pedacitoDe8Chars == wordset42[i]) return 42;
    return 31;
}

function allMessagesToRules(rulesObject, receivedMessages) {
    let wordset42 = rulesArrayToWordSet(rulesObject, 42);    
    return receivedMessages.map(word => messageToRule(word, wordset42));
}

function allPossibleRulesForZeroSet(start, end) {
    let firstRuleArr = [42];
    let rulesSet = new Set();
    while (firstRuleArr.length <= 11) {
        let completeArr = [];
        let secondRuleArr = [42, 31];
        while (completeArr[10] != 42) {
            completeArr = [...firstRuleArr, ...secondRuleArr];
            const partIWantToCheck = completeArr.slice(start,end).join(",");
            if (partIWantToCheck.length > 0) rulesSet.add(partIWantToCheck);
            secondRuleArr = [42, ...secondRuleArr, 31];
        }
        firstRuleArr.push(42);
    }   
    return rulesSet;
}

//Esto se logró tras ver que en el enunciado dice que no lo hagamos general
// Lo que hice fue encontrar el patrón de la regla 0 y ver que al final no es más que
// un mix de las reglas 42 y 31. Las reglas 8 y 11 definen qué mixes entran
// Perdón por usar la palabra "mixes". En fin, 42 y 31, ambos, resultan en wordsets de string
// de 8 caracteres. Con 8 caracteres, usando a y b, se pueden generar 256 words. Bien, resulta que
// cada wordset (el que viene de 42 y el que viene de 31) tiene 128 words y ninguno se repite
// en ambos wordsets. En total tenemos los 256 words.
//Con esto, lo único que hice fue tomar los mensajes y ver, cada 8 carácteres, a qué grupo (de 42 o 31)
// podrían pertenecer. Además hice un set con todas las combinaciones válidas de 42 y 31 y vi
// si las combinaciones de cada mensaje formaban parte de las combinaciones válidas. Conté las que sí
//En realidad hice un array con los válidos y conté su tamaño
function seeIfThoseRulesExist(rulesObject, receivedMessages) {
    let rulesFollowed = allMessagesToRules(rulesObject, receivedMessages);
    let validsSet = allPossibleRulesForZeroSet(0,12);
    return rulesFollowed.filter(ruleFol => validsSet.has(ruleFol));
}
console.log(seeIfThoseRulesExist(rules, messages).length);
