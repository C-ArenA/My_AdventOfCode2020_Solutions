let exampleSimpleOperationArray = [1, "+", 2, "*", 3, "+", 4, "*", 5, "+", 6];
let exampleComplexOperationArray = [1, "+", "(", 2, "*", 3, ")", "+", "(", 4, "*", "(", 5, "+", 6, ")", ")"];
let exampleComplexOperationArray2 = ["(", 2, "*", 3, ")", "+", 6];
try{var childHomework = require('./input.js');} catch(error){}
function noParenthesisResult(operationsArray) {
    return operationsArray.reduce((acc, value, index) =>{
        switch (value) {
            case "*":
                return acc * operationsArray[index+1];
            case "+":
                return acc + operationsArray[index+1];
            case "(":
                console.log("No ingrese paréntesis");
                return null;
            case ")":
                console.log("No ingrese paréntesis");
                return null;
            default:
                return acc;
        }
    })
}
function extractParenthesizedOperationArray(originalOperationArray, parenthesisStartIndex) {
    let parenthesisCounter = 1;
    let newOperationArray = [];
    let indexToAdd = parenthesisStartIndex + 1;
    while (parenthesisCounter > 0) {
        const originalElement = originalOperationArray[indexToAdd];
        if (originalElement == "(") parenthesisCounter += 1;
        if (originalElement == ")") parenthesisCounter -= 1;
        if (parenthesisCounter != 0) {
            newOperationArray.push(originalElement)
        }
        indexToAdd += 1;
    }
    return newOperationArray;
}

function operate(operationsArray) {
    let result = 0;
    for (let i = 0; i < operationsArray.length; i++) {
        const element = operationsArray[i];
        const nextElement = operationsArray[i+1];
        switch (element) {
            case "*":
                if (nextElement == "(") {
                    let subOperation = extractParenthesizedOperationArray(operationsArray, i+1)
                    result = result * operate(subOperation);
                    i += subOperation.length + 2;
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
    return result;
}
function main(arrayOfoperationArrays) {
    return arrayOfoperationArrays.reduce((acc, operation) =>acc + operate(operation), 0);
}
console.log(noParenthesisResult(exampleSimpleOperationArray));
console.log(extractParenthesizedOperationArray(exampleComplexOperationArray, 2));
console.log(operate(exampleComplexOperationArray2));
console.log(main(childHomework));