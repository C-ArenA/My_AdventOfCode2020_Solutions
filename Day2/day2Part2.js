try{ 
    var listOfPasswords = require('./input.js');
} catch(error){
    //console.error("Dado que no estamos en un entorno de Node.js, de todas formas obtendrás el input del anterior script mediante el index.html");
}

function day2_PasswordPhilosophy_Part2() {
    let validCounter = 0;
    for (let i = 0; i < listOfPasswords.length; i++) {
        const passwordObject = listOfPasswords[i];
        const charToMatch = passwordObject.character;
        const passwordString = passwordObject.password;
        const firstIndex = passwordObject.minQ - 1;
        const secondIndex = passwordObject.maxQ - 1;
        
        let firstChar = passwordString[firstIndex];
        let secondChar = passwordString[secondIndex];

        if (firstChar == charToMatch) {
            if (secondChar != charToMatch) {
                validCounter += 1;
            }
        }
        if (secondChar == charToMatch) {
            if (firstChar != charToMatch) {
                validCounter += 1;
            }
        }    
    }
    return validCounter;
}
console.log(day2_PasswordPhilosophy_Part2());