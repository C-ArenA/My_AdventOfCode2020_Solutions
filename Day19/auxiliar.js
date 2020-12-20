let firstRuleChar = "C"
let completeString = "";
let combinationsSet = new Set();
while (firstRuleChar != "CCCCCCCCCCC") {
    let secondRuleChar = "CT";
    console.log("--- Para: " + firstRuleChar);
    while (completeString.slice(0,11) != "CCCCCCCCCCC") {
        completeString = firstRuleChar + secondRuleChar;
        //console.log(completeString.slice(0,11));
        combinationsSet.add(completeString.slice(0,11));
        secondRuleChar = "C" + secondRuleChar + "T";
    }
    firstRuleChar =firstRuleChar + "C";
    completeString = "";
}
console.log(combinationsSet);

function allPossibleRulesForZero() {
    let firstRuleArr = [42];
    let rulesSet = new Set();
    while (firstRuleArr.length <= 11) {
        let completeArr = [];
        let secondRuleArr = [42, 31];
        console.log("--- Para: " + firstRuleArr.join(","));
        while (completeArr[10] != 42) {
            completeArr = [...firstRuleArr, ...secondRuleArr];
            //console.log(completeArr.slice(0,11));
            rulesSet.add(completeArr.slice(0,11).join(","));
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

console.log(allPossibleRulesForZero());