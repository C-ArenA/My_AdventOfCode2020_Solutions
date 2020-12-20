// anyNum = value => lasTimeSpoken 
let spokenNumbers = [0,6,1,7,2,19,20];
//let spokenNumbers = [0,3,6];
let lastTimeSpokenNumbers = new Map(spokenNumbers.map((number, index) => ([number, index])));
spokenNumbers.push(0);

//let turn = 30000000;
let turn = 30;
for (let i = spokenNumbers.length - 1; i < turn; i++) {
    const number = spokenNumbers[i];
    const lastTimeSpoken = lastTimeSpokenNumbers.get(number);
    if (lastTimeSpoken == undefined) {
        spokenNumbers.push(0);
    } else {
        spokenNumbers.push(i - lastTimeSpoken);
    }
    lastTimeSpokenNumbers.set(number, i);
}
console.log(spokenNumbers[turn - 1]);