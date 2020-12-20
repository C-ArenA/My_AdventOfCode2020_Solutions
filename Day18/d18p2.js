let exampleSimpleOperationArray = [1, "+", 2, "*", 3, "+", 4, "*", 5, "+", 6];
let exampleSimpleOperationArray2 = [1, "+", 2, "*", 3, "+", 4, "+", 5, "*", 6];
let exampleComplexOperationArray = [1, "+", "(", 2, "*", 3, ")", "+", "(", 4, "*", "(", 5, "+", 6, ")", ")"];
let exampleComplexOperationArray2 = ["(", 2, "*", 3, ")", "+", 6];
let exampleOperationArray = [2, "*", 3, "+", "(", 4, "*", 5, ")"];
let exampleOperationArray2 = [5, "+", "(", 8, "*", 3, "+", 9, "+", 3, "*", 4, "*", 3, ")"];
let exampleOperationArray3 = [5, '*', 9, '*', '(', 7, '*', 3, '*', 3, '+', 9, '*', 3, '+', '(', 8, '+', 6, '*', 4, ')', ')'];
let exampleOperationArray4 = ['(', '(', 2,  '+', 4, '*', 9, ')', '*', '(', 6, '+', 9, '*', 8, '+', 6, ')', '+', 6, ')', '+', 2, '+', 4, '*', 2];
let exampleOperationArray5 = ['(', '(', 2,  '+', 4, '*', 9, ')', '*', '(', 6, '+', 9, '*', 8, '+', 6, ')', '+', 6, ')'];
let exampleOperationArray6 = ['(', '(', 2,  '+', 3, ')', '*', '(', 4, '+', 5, ')', ')'];
let exampleOperationArray7 = ['(', '(', 2,  '+', 3, ')', '*', '(', 4, '+', 5, ')', '+', 1, ')'];
try{var childHomework = require('./input.js');} catch(error){}

function extractParenthesizedOperationArray(originalOperationArray, parenthesisStartIndex) {
    let parenthesisCounter = 1;
    let newOperationArray = [];
    let indexToAdd = parenthesisStartIndex + 1;
    while (parenthesisCounter > 0) {
        const originalElement = originalOperationArray[indexToAdd];
        if (originalElement == "(") parenthesisCounter += 1;
        if (originalElement == ")") parenthesisCounter -= 1;
        if (parenthesisCounter != 0) newOperationArray.push(originalElement);
        indexToAdd += 1;
    }
    return newOperationArray;
}

function extractSumGroupBetweenMultipliers(originalOperationArray, groupStartIndex) {
    let parenthesisCounter = 0;
    let newOperationArray = [];
    let indexToAdd = groupStartIndex;
    while (parenthesisCounter > 0 || originalOperationArray[indexToAdd] != "*") {
        if (indexToAdd >= originalOperationArray.length) break;
        const originalElement = originalOperationArray[indexToAdd];
        if (originalElement == "(") parenthesisCounter += 1;
        if (originalElement == ")") parenthesisCounter -= 1;
        newOperationArray.push(originalElement);
        indexToAdd += 1;
    }
    return newOperationArray;
}

function operate(operationsArray) {
    let result = 0;
    for (let i = 0; i < operationsArray.length; i++) {
        const element = operationsArray[i];
        const nextElement = operationsArray[i+1];
        const nextOperator = operationsArray[i+2];
        //console.log("En: " + operationsArray.join(" ") + "     RES = " + result + " -> " + operationsArray.slice(i).join(""));
        switch (element) {
            case "*":
                if (nextOperator == "+") {
                    let subOperation = extractSumGroupBetweenMultipliers(operationsArray, i+1);
                    result = result * operate(subOperation);
                    i += subOperation.length;
                    break;
                }
                if (nextElement == "(") {
                    let subOperation = extractParenthesizedOperationArray(operationsArray, i+1)
                    let sumToIndex = subOperation.length + 2;
                    let newNextOperator = operationsArray[i+sumToIndex+1];
                    if (newNextOperator == "+") {
                        let newSubOperation = extractSumGroupBetweenMultipliers(operationsArray, i+1);
                        result = result * operate(newSubOperation);
                        sumToIndex = newSubOperation.length;
                        i += sumToIndex;
                        break;
                    }
                    i += sumToIndex;
                    result = result * operate(subOperation);
                    break;
                }
                result = result * nextElement;
                i += 1;
                break;
            case "+":
                if (nextElement == "(") {
                    let subOperation = extractParenthesizedOperationArray(operationsArray, i+1)
                    result = result + operate(subOperation);
                    i += subOperation.length + 2;
                    break;
                }
                result = result + nextElement;
                i += 1;
                break;
            case "(":
                let subOperation = extractParenthesizedOperationArray(operationsArray, i)
                result = operate(subOperation);
                i += subOperation.length + 2 - 1; // Se resta 1 porque el for ya lo aumenta 
                break;
            case ")":
                console.log("No deberían haber estos paréntesis");
                return null;
            default: // Es un número suelto
                result = element;
                break;
        }
    }
    //console.log("EN: " + operationsArray.join(" ") + "     RES = " + result + " ->|||\n" );
    return result;
}
function main(arrayOfoperationArrays) {
    return arrayOfoperationArrays.reduce((acc, operation) =>acc + operate(operation), 0);
}

//console.log(operate(exampleOperationArray4)); 
console.log(main(childHomework));