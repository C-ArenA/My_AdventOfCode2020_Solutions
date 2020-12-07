try{var bagsColorRules = require('./input.js');} catch(error){}

function howMany(bagName) {
    const bag = bagsColorRules[bagName];
    if (Object.keys(bag).length == 0) {
        console.log("\t-------->Soy " + bagName);
        console.log("\tSólo estoy yo :P +1 ||");
        return 1;
    }
    
    console.log("-------->Soy " + bagName);
    let total = 0;
    for (let insideBag in bag) {
        const insideBagQuantity = bag[insideBag];
        console.log("\nhay +" + insideBagQuantity + " " + insideBag + "Dentro mío");
        total += insideBagQuantity * howMany(insideBag);
    }
    console.log("Y también estoy yo :P +1");
    console.log("En total, conmigo, somos" + (total + 1));
    return total + 1;
}

function day7_HandyHaversacks_Part2(){
    return howMany("shiny gold") - 1;
}

console.log(day7_HandyHaversacks_Part2());