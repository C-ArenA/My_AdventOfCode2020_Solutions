let numbers = [13,9,10,11,12];
let validNumbers = new Set([7,8,9,10]);
let valids = 5;
valids = numbers.reduce((acc, num) => validNumbers.has(num)? acc + num: acc, valids);
console.log(valids); // Prints 24 = 5 + 9 + 10