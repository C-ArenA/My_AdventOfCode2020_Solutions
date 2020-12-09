try{var cipheredCode = require('./input.js');} catch(error){}
try{var day9_twoSumVerifier = require('../Day1/day1Part1.js');} catch(error){}
try{var day9_twoSumVerifier = day1_twoSumAlgorithm;} catch(error){}

function day9_findWeakness(){
    let preambleStartIndex = 0;
    let valueToVerifyIndex = preambleStartIndex + 25;
    let myPreamble = cipheredCode.slice(preambleStartIndex, valueToVerifyIndex);
    let valueToVerify = cipheredCode[valueToVerifyIndex];
    while (day9_twoSumVerifier(myPreamble, valueToVerify).didTheySum) {
        preambleStartIndex += 1;
        valueToVerifyIndex += 1
        myPreamble = cipheredCode.slice(preambleStartIndex, valueToVerifyIndex);
        valueToVerify = cipheredCode[valueToVerifyIndex];
    }
    return {valueToVerifyIndex, valueToVerify};
}
function day9_EncodingError_Part1() {
    return day9_findWeakness().valueToVerify;
}
// console.log(day9_EncodingError_Part1());

try{
    module.exports = day9_findWeakness;
} catch(e){}