try{var bagsColorRules = require('./input.js');} catch(error){}

function howMany(bagName) {
    const bag = bagsColorRules[bagName];
    if (Object.keys(bag).length == 0) return 1;

    let total = 0;
    for (let insideBag in bag) {
        const insideBagQuantity = bag[insideBag];
        total += insideBagQuantity * howMany(insideBag);
    }
    return total + 1;
}
//-----------------Main Function ---------------------
function day7_HandyHaversacks_Part2(){
    return howMany("shiny gold") - 1;
}

//console.log(day7_HandyHaversacks_Part2());