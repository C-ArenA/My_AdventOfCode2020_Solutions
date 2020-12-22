try {
    var allPlayersInitialStack = require('./input.js');
    var player1 = allPlayersInitialStack.p1;
    var player2 = allPlayersInitialStack.p2;
} catch (e) {}

function round(p1Stack, p2Stack) {
    // Draw:
    console.log("Player 1's deck: " + p1Stack.join(","));
    console.log("Player 2's deck: " + p2Stack.join(","));
    var p1Top = p1Stack.shift();
    var p2Top = p2Stack.shift();
    console.log("Player 1 plays: " + p1Top);
    console.log("Player 2 plays: " + p2Top);
    if (p1Top > p2Top) {
        console.log("Player 1 wins the round!");
        p1Stack.push(p1Top, p2Top);
    } else {
        console.log("Player 2 wins the round!");
        p2Stack.push(p2Top, p1Top);
    }
}
function gameLoop(p1InitialStack, p2InitialStack) {
    let p1 = p1InitialStack;
    let p2 = p2InitialStack;
    let roundsCounter = 1;
    while (p1.length > 0 && p2.length > 0) {
        console.log("-- Round " + roundsCounter + " --");
        round(p1,p2);   
        roundsCounter += 1;
    }
    
    console.log("\n== Post-game results ==");
    console.log("Player 1's deck: " + p1.join(","));
    console.log("Player 2's deck: " + p2.join(","));
    let winner = p1.length > 0 ? p1 : p2;
    return winner;
}
function main() {
    let winner = gameLoop(player1, player2);
    let cardWeight = winner.length;
    return winner.reduce((score,cardValue, index) => score + (cardWeight-index) * cardValue, 0);
}
console.log(main());
