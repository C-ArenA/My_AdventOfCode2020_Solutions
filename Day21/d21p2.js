try {
    var foods = require('./input.js')
} catch (e) {console.log("No importa");}
let allergens = {
    // dairy : set([possible1, possible2, ...]),
}
let confirmedIngredients = new Map() // ingredientCrypticString => name
let qOfAllergensSetsThatHaveManyOptions = 1; // No sé cuántos, pero sé que todos. Pongo 1 porque es > 0

function deleteDifferencesBetweenSets(affectedSet, comparingSet) {
    affectedSet.forEach(element => {
        if (comparingSet.has(element)) {
            //Nothing
        } else {
            affectedSet.delete(element);
        }
    })
}

function findAllergens() {
    while (qOfAllergensSetsThatHaveManyOptions > 0) { // Rompe cuando ya no hayan opciones en los sets de allergens
        foods.forEach((food) => {
            food.contains.forEach((thisAllergenName) => {
                if (thisAllergenName in allergens) {
                    deleteDifferencesBetweenSets(allergens[thisAllergenName], food.ingredients);                
                } else {
                    // Es la primera vez, sólo copia los ingredients, todos son candidatos
                    allergens[thisAllergenName] = new Set([...food.ingredients]);
                }
                if (allergens[thisAllergenName].size == 1) {
                    let ingredientCode = allergens[thisAllergenName].values().next().value;
                    console.log(ingredientCode + " -> " + thisAllergenName);
                    confirmedIngredients.set(ingredientCode, thisAllergenName);
                    // Borro el ingrdiente de todos los foods
                    foods.forEach(foodToModify => foodToModify.ingredients.delete(ingredientCode));
                }
            })
        })    
        // Actualiza condición
        qOfAllergensSetsThatHaveManyOptions = 0;
        for (const ingredientName in allergens) {
            if (allergens[ingredientName].size >= 1) {
                qOfAllergensSetsThatHaveManyOptions += 1;
            }
        }
    }
    //console.table(foods);
    return true;    
}

function sortMapAlphabeticallyAccordingToItsRightSideValue(anyMap) {
    let arrayToSort = [];
    anyMap.forEach((value, key) =>{
        arrayToSort.push([value, key]);
    })
    arrayToSort.sort();
    return arrayToSort;
}

function getDangerousList() {
    findAllergens();
    let dangerousArray = sortMapAlphabeticallyAccordingToItsRightSideValue(confirmedIngredients);
    return dangerousArray.reduce((dangerousList, thisAllergen) => dangerousList + thisAllergen[1] + ",", "")
}

console.log(getDangerousList());