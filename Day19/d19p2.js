const { messages } = require('./inputP2.js');

try {
    rules = require('./inputP2.js').rules;
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

const biggestWordSize = 88
const size48word = 8;
const size31word = 8;
let stack8Counter = 0;
const max8ruleStack = biggestWordSize / size48word + 1;
let stack11Counter = 0;
const max11ruleStack = Math.trunc(biggestWordSize / (size48word + size31word)) + 1;

function rulesArrayToWordSet(rulesObject, ruleNumber) {
    if (ruleNumber == 8) {
        stack8Counter += 1;
        if (stack8Counter >= 1) {
            console.log("Ya no más");
            return [""];
        }
    }
    if (ruleNumber == 11) {
        stack11Counter += 1;
        if (stack11Counter >= 4) {
            return [""];
        }
    }
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
//console.dir(rulesArrayToWordSet(rules, 31), {'maxArrayLength': null});
//console.log(rulesArrayToWordSet(rules, 8).pop());
function main(rulesObject, receivedMessages) {
    let validMessages = rulesArrayToWordSet(rulesObject, 0);
    let messageSize = validMessages[0].length;
    //Pongo todo en un set para que la búsqueda sea más rápida (Perdón, estoy cansado)
    let validsSet = new Set(validMessages);
    //Eliminar messages que no cumplen tamaño
    let possiblyValids = receivedMessages.filter(word => word.length == messageSize);
    // Contar válidos
    return possiblyValids.reduce((valids, word) => validsSet.has(word)? valids + 1: valids, 0)
}
//console.log(main(rules, messages));

function allPossibleRulesForZero(start, end) {
    let firstRuleArr = [42];
    let rulesSet = new Set();
    console.log("----------------");
    while (firstRuleArr.length <= 11) {
        let completeArr = [];
        let secondRuleArr = [42, 31];
        //console.log("--- Para: " + firstRuleArr.join(","));
        while (completeArr[10] != 42) {
            completeArr = [...firstRuleArr, ...secondRuleArr];
            if (completeArr.slice(start,end).join(",").length > 0) {
                rulesSet.add(completeArr.slice(start,end).join(","));    
            }
            secondRuleArr = [42, ...secondRuleArr, 31];
        }
        firstRuleArr.push(42);
    }   
    rulesSetArray = [...rulesSet]
    return rulesSetArray.map(stringedRule => {
        let splitedRule = stringedRule.split(",");
        let thisArray = splitedRule.map(intString => parseInt(intString))
        return thisArray;
    })
}

function testing42And31(rulesObject, receivedMessages) {
    wordset42 = rulesArrayToWordSet(rulesObject, 42);
    wordset31 = rulesArrayToWordSet(rulesObject, 31);
    console.log("Inicialmente ambos wordsets (42,31) tienen los siguientes tamaños");
    console.log("wordset de 42: " + wordset42.length);
    console.log("wordset de 31: " + wordset31.length);
    commonSets = new Set(wordset42);
    wordset31.forEach(word => commonSets.add(word));
    console.log("Si lo juntamos en un set, este set tendrá esta cantidad de items:");
    console.log(commonSets.size);
    console.log("Es decir todos sus valores son totalmente diferentes");
    console.log([...commonSets]);
    console.log("Para reducir el wordset 42 veamos cuántos de ellos encajan en los mensajes a verificar");
    let minWordset42 = wordset42.filter(word => {
        for (let i = 0; i < receivedMessages.length; i++) {
            const wordToCompare = receivedMessages[i].slice(0,8);
            if (word == wordToCompare) {
                return true;
            }
        }
        return false;
    })
    console.log(wordset42.length);
    console.log(minWordset42.length);

    // El mínimo tamaño que debe verificar el mensaje es CCT. Entonces concatenemos CCT y sobre todos esos posibles mensajes veamos los que hay que cumplan esas reglas
    rulesObject[0] = allPossibleRulesForZero()[1];
    let minValids = rulesArrayToWordSet(rulesObject, 0);
    console.log(minValids);
    let possiblyValids = receivedMessages.filter(word => {
        console.log("Checking for: " + word);
        for (let i = 0; i < minValids.length; i++) {
            const wordToCompare = minValids[i];
            if (word.slice(0,24) == wordToCompare) {
                return true;
            }
        }
        return false;
    })
    console.log("Before: " + receivedMessages.length);
    console.log("Now: " + possiblyValids.length);
}

function allPossiblyValidMessages(rulesObject, start, end) {
    let bigWordSet = new Set();
    let rootRules = allPossibleRulesForZero(start,end);
    for (let i = 0; i < rootRules.length; i++) {
        const newRuleForZero = rootRules[i];
        rulesObject[0] = newRuleForZero;
        console.log(rulesObject[0]);
        // Find wordset for this zero rule
        let wordset = rulesArrayToWordSet(rulesObject, 0);
        console.log(wordset.length);
        for(let j = 0; j < wordset.length ; j++){
            bigWordSet.add(wordset[j]);
        }
    }
    return bigWordSet;
}

//testing42And31(rules, messages)


function selectingValids(rulesObject, receivedMessages) {
    let validMessages = receivedMessages;
    for (let start = 0; start < 10; start+=3) { //Debe ir a 10
        console.log("Válidos = " + validMessages.length);
        const end = start + 3;
        const firstChar = start * 8;
        const endChar = end * 8;
        let minValidsSet = allPossiblyValidMessages(rulesObject, start, end);
        validMessages = validMessages.filter(word => {
            let pedacitoDePalabra = word.slice(firstChar, endChar);
            if (pedacitoDePalabra.length == 0) {
                return true;
            }
            return minValidsSet.has(pedacitoDePalabra);
        }
        )
                
    }
    return validMessages;
}

function selectingValids2(rulesObject, receivedMessages) {
    let validMessages = receivedMessages;
    let suma = 3;
    for (let start = 0; start <= 12; start+=suma) { //Debe ir a 10
        if (start>0) suma = 1;
        console.log("Válidos = " + validMessages.length);
        const end = start + suma;
        const firstChar = start * 8;
        const endChar = end * 8;
        let minValidsSet = allPossiblyValidMessages(rulesObject, start, end);
        validMessages = validMessages.filter(word => {
            let pedacitoDePalabra = word.slice(firstChar, endChar);
            if (pedacitoDePalabra.length == 0) {
                return true;
            }
            return minValidsSet.has(pedacitoDePalabra);
        }
        )
                
    }
    return validMessages;
}
//console.log("TOTAL Válidos = " + selectingValids2(rules, messages).length);
/* console.dir(messages.sort((a,b) =>{
    return a.length - b.length;
}), {'maxArrayLength': null}); */
function messageToRule(message, rule42Strings) {
    let totalRule = [];
    for (let i = 0; i < 11; i++) {
        const startChar = i*8;
        const endChar = (i+1)*8;
        const pedacitoDeString = message.slice(startChar, endChar);
        if (pedacitoDeString.length == 0) {
            break;
        }
        totalRule.push(isIt42or31(pedacitoDeString, rule42Strings))
    }
    return intsArrayToStrings(totalRule);
}
function isIt42or31(pedacitoDe8Chars, wordset42){
    for (let i = 0; i < wordset42.length; i++) {
        const word = wordset42[i];
        if (pedacitoDe8Chars == word) {
            return 42;
        }
    }
    return 31;
}

function intsArrayToStrings(arrayOfInts){
    return arrayOfInts.reduce((string, value, index, array) =>{
        if (index == array.length - 1) {
            return string + value;    
        }
        return string + value + ",";
    }, "")
}

function allMessagesToRules(rulesObject, receivedMessages) {
    wordset42 = rulesArrayToWordSet(rulesObject, 42);    
    rulesThatAreFollowed = receivedMessages.map(word => {
        return messageToRule(word, wordset42)
    })
    return rulesThatAreFollowed
}


function allPossibleRulesForZeroSet(start, end) {
    let firstRuleArr = [42];
    let rulesSet = new Set();
    console.log("----------------");
    while (firstRuleArr.length <= 11) {
        let completeArr = [];
        let secondRuleArr = [42, 31];
        //console.log("--- Para: " + firstRuleArr.join(","));
        while (completeArr[10] != 42) {
            completeArr = [...firstRuleArr, ...secondRuleArr];
            if (completeArr.slice(start,end).join(",").length > 0) {
                rulesSet.add(completeArr.slice(start,end).join(","));    
            }
            secondRuleArr = [42, ...secondRuleArr, 31];
        }
        firstRuleArr.push(42);
    }   
    let rulesSetArray = [...rulesSet]
    return rulesSet;
    /* return rulesSetArray.map(stringedRule => {
        let splitedRule = stringedRule.split(",");
        let thisArray = splitedRule.map(intString => parseInt(intString))
        return thisArray;
    }) */
}

function seeIfThoseRulesExist(rulesObject, receivedMessages) {
    let rulesFollowed = allMessagesToRules(rulesObject, receivedMessages);
    let validsSet = allPossibleRulesForZeroSet(0,12);
    return rulesFollowed.filter(ruleFol => validsSet.has(ruleFol));
}
//console.log(allMessagesToRules(rules, messages).length);
console.log(seeIfThoseRulesExist(rules, messages).length);
