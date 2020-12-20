try {
  var day16Data = require("./input.js");
  var ticketFieldsRules = day16Data.tfr;
  var myTicket = day16Data.mt;
  var nearbyTickets = day16Data.nt;
} catch (error) {}

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

function sumAllTheNumbersThatDoesntFollowTheRules(fieldsRules, listOfTickets) {
  let validNumbers = getBigSetOfPossibleNumbersInRange(fieldsRules);
  let scanningErrorRate = 0;
  for (let i = 0; i < listOfTickets.length; i++) {
    const ticket = listOfTickets[i];
    scanningErrorRate = ticket.reduce(
      (accum, number) => (validNumbers.has(number) ? accum : accum + number),
      scanningErrorRate
    );
  }
  return scanningErrorRate;
}

function day16_TicketTranslation_Part1() {
  return sumAllTheNumbersThatDoesntFollowTheRules(
    ticketFieldsRules,
    nearbyTickets
  );
}
//console.log(day16_TicketTranslation_Part1());
