try{ 
    var customDeclarationFormAnswersByGroup = require('./input.js');
} catch(error){}

function day6_CustomCustoms_Part1() {
    questions = new Object();
    questions.a=0;
    questions.b=0;
    questions.c=0;
    questions.d=0;
    questions.e=0;
    questions.f=0;
    questions.g=0;
    questions.h=0;
    questions.i=0;
    questions.j=0;
    questions.k=0;
    questions.l=0;
    questions.m=0;
    questions.n=0;
    questions.o=0;
    questions.p=0;
    questions.q=0;
    questions.r=0;
    questions.s=0;
    questions.t=0;
    questions.u=0;
    questions.v=0;
    questions.w=0;
    questions.x=0;
    questions.y=0;
    questions.z=0;

    function groupYesCounter(groupAnswers) {
        let yesAnsweredQuestions = {};
        for (let index = 0; index < groupAnswers.length; index++) {
            const answer = groupAnswers[index];
            if (yesAnsweredQuestions[answer] == undefined) {
                questions[answer] += 1; 
            }
            yesAnsweredQuestions[answer] = true;
        }
        return Object.keys(yesAnsweredQuestions).length;
    }

    let totalYes = 0
    for (let index = 0; index < customDeclarationFormAnswersByGroup.length; index++) {
        const groupAnswers = customDeclarationFormAnswersByGroup[index];
        totalYes += groupYesCounter(groupAnswers);        
    }
    console.log(questions);
    return totalYes;
}


console.log(day6_CustomCustoms_Part1());