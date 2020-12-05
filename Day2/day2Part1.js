try{ 
    var listOfPasswords = require('./input.js');
} catch(error){
    //console.error("Dado que no estamos en un entorno de Node.js, de todas formas obtendrás el input del anterior script mediante el index.html");
}

function day2_PasswordPhilosophy_Part1() {
    let validCounter = 0;
    for (let i = 0; i < listOfPasswords.length; i++) {
        const passwordObject = listOfPasswords[i];
        const charToMatch = passwordObject.character;
        const passwordString = passwordObject.password;
        const minQuantity = passwordObject.minQ;
        const maxQuantity = passwordObject.maxQ;

        //Con REGEXP:
        let myRegEx = new RegExp(charToMatch, "g");
        let res = passwordString.match(myRegEx);
        if (res != null) {   
            if (res.length >= minQuantity && res.length <= maxQuantity) {
                validCounter += 1;
            }   
        }    
    }
    return validCounter;    
}
console.log(day2_PasswordPhilosophy_Part1());