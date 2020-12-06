try{ 
    var customDeclarationFormAnswersByGroup = require('./input.js');
} catch(error){}

function day6_CustomCustoms_Part2() {
    function groupCommonYesCounter(groupAnswers) {
        let yesAnsweredQuestions = {};
        let commonSum = 0;
        for (let index = 0; index < groupAnswers.length; index++) {
            const answersByPerson = groupAnswers[index];
            for (let jindex = 0; jindex < answersByPerson.length; jindex++) {
                const answer = answersByPerson[jindex];
                if (yesAnsweredQuestions[answer] == undefined) {
                    yesAnsweredQuestions[answer] = 0;
                }
                yesAnsweredQuestions[answer] += 1;   
                if (yesAnsweredQuestions[answer] == groupAnswers.length) {
                    commonSum += 1;
                }
            }
        }
        console.log(yesAnsweredQuestions);
        return commonSum;
    }

    let totalCommonYes = 0;
    for (let index = 0; index < customDeclarationFormAnswersByGroup.length; index++) {
        const groupAnswers = customDeclarationFormAnswersByGroup[index];
        totalCommonYes += groupCommonYesCounter(groupAnswers);        
    }
    return totalCommonYes;
}

console.log(day6_CustomCustoms_Part2());