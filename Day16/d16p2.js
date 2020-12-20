try {
    var day16Data = require("./input.js");
    var ticketFieldsRules = day16Data.tfr;
    var myTicket = day16Data.mt;
    var nearbyTickets = day16Data.nt;
} catch (error) {}
//******************-------------------------------------------------------------
let exampleRules2 = {
    class: [0, 1, 4, 19],
    row: [0, 5, 8, 19],
    seat: [0, 13, 16, 19],
};
let myExampleTicket2 = [11, 12, 13];
let exampleValidTickets2 = [
    [3, 9, 18],
    [15, 1, 5],
    [5, 14, 9],
];
//******************-------------------------------------------------------------
//******************-------------------------------------------------------------
//******************-------------------------------------------------------------

// Cada regla tiene sus rangos así: [r1min, r1max, r2min, r2max]
function rangeArrayToFullArray(rangeArray) {
    const [r1min, r1max, r2min, r2max] = rangeArray;
    let arrayWithAllThePossibleNumbers = [];
    for (r1 = r1min; r1 <= r1max; r1++) arrayWithAllThePossibleNumbers.push(r1);
    for (r2 = r2min; r2 <= r2max; r2++) arrayWithAllThePossibleNumbers.push(r2);
    return arrayWithAllThePossibleNumbers;
  }

function getBigSetOfPossibleNumbersInRange(fieldsRulesWithRanges) {
    let bigArrayWithAllNumbers = [];
    for (const rule in fieldsRulesWithRanges) {
        const range = fieldsRulesWithRanges[rule];
        bigArrayWithAllNumbers.push(...rangeArrayToFullArray(range));
    }
    return new Set(bigArrayWithAllNumbers);
}

function getJustTheTicketsThatFollowTheRules(fieldsRules, listOfTickets) {
    let validNumbers = getBigSetOfPossibleNumbersInRange(fieldsRules);
    let validTickets = [];
    for (let i = 0; i < listOfTickets.length; i++) {
        const ticket = listOfTickets[i];
        const isItValid = ticket.reduce((accum, number) => (validNumbers.has(number) ? accum : false), true);
        if (isItValid) validTickets.push(ticket);
    }
    return validTickets;
}

function generateFieldsVector(rulesObject) {
    let allFields = Object.keys(rulesObject);
    let fieldsVector = [];
    for( let i = 0; i < allFields.length; i++){
        const initialSet = new Set(allFields);
        fieldsVector.push(initialSet);
    }
    return fieldsVector;
}

function allPossibleFieldsNamesForJustThisValue(number, rules, initialSet) {
    let possibleNames = new Set();
    for (const rule of initialSet) {
        const [r1min, r1max, r2min, r2max] = rules[rule];
        const isItInRange = (number >= r1min && number <= r1max) || (number >= r2min && number <= r2max);
        if (isItInRange) possibleNames.add(rule);
    }
    return possibleNames;
}

function findingPossibleFieldNamesForThisColumn(tickets, column, rules, setOfValidRules) {
    const j = column;
    //console.log("Column: " + j);
    for (let i = 0; i < tickets.length; i++) {
        if (setOfValidRules.size == 1) {
            console.log(" col: " + j + " fila: " + i + " Set: " + setOfValidRules.values().next().value);
            break;
        }
        const num = tickets[i][j];
        setOfValidRules = allPossibleFieldsNamesForJustThisValue(num, rules, setOfValidRules);
    }
    return setOfValidRules;
}

function findingANameForEveryField(tickets, rules) {
    let validTickets = getJustTheTicketsThatFollowTheRules(rules, tickets);
    let fieldsNames = [];
    let fieldsNameSets = generateFieldsVector(rules);
    let salida = 0;
    for (let field = 0; field < validTickets[0].length; field++) {
        if (salida == validTickets[0].length) break;
        if (fieldsNameSets[field].size == 0 && field == validTickets[0].length - 1 ) {field = -1; continue;}
        if (fieldsNameSets[field].size == 0) continue;
        fieldsNameSets[field] = findingPossibleFieldNamesForThisColumn(validTickets, field, rules, fieldsNameSets[field]);
        if (fieldsNameSets[field].size == 1) {
            let thisName = fieldsNameSets[field].values().next().value;
            fieldsNames[field] = thisName;
            for (let index = 0; index < fieldsNameSets.length; index++) {
                if (fieldsNameSets[index].size == 0) continue;
                fieldsNameSets[index].delete(thisName);
            }
            salida += 1;
        }
        if (field == validTickets[0].length - 1) {
            field = -1;
        }
    }
    return fieldsNames;
}

function findingANameForEveryFieldLegible(tickets, rules) {
    let validTickets = getJustTheTicketsThatFollowTheRules(rules, tickets);
    let fieldsNames = [];
    let fieldsNameSets = generateFieldsVector(rules);
    for (let field = 0; field < validTickets[0].length; field++) {
        console.log(field);
        fieldsNameSets[field] = findingPossibleFieldNamesForThisColumn(validTickets, field, rules, fieldsNameSets[field]);
        if (fieldsNameSets[field].size == 1) {
            let thisName = fieldsNameSets[field].values().next().value;
            console.log(thisName);
            fieldsNames[field] = thisName;
            for (let index = 0; index < fieldsNameSets.length; index++) {
                if (fieldsNameSets[index].size == 0) continue;
                fieldsNameSets[index].delete(thisName);
            }
            field = -1
        }
    }
    return fieldsNames;
}


function day16_TicketTranslation_Part2() {
    let namesOfFields = findingANameForEveryField(nearbyTickets, ticketFieldsRules);
    myTicketResult = new Map(myTicket.map((number, index) => [namesOfFields[index], number]));
    return myTicket.reduce((acc, num, fieldPos) => (namesOfFields[fieldPos].replace(/ .*/,'')) == "departure" ? acc * num : acc, 1);
}

console.log(day16_TicketTranslation_Part2());

