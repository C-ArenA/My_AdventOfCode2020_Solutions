try {
    var allPlayersInitialStack = require('./input.js');
    var player1 = allPlayersInitialStack.p1;
    var player2 = allPlayersInitialStack.p2;
} catch (e) {}

function round(p1Stack, p2Stack, gameNumber) {
    // Draw:
    console.log("Player 1's deck: " + p1Stack.join(","));
    console.log("Player 2's deck: " + p2Stack.join(","));
    var p1Top = p1Stack.shift();
    var p2Top = p2Stack.shift();
    console.log("Player 1 plays: " + p1Top);
    console.log("Player 2 plays: " + p2Top);
    let roundWinner;
    if (p1Stack.length >= p1Top && p2Stack.length >= p2Top){
        console.log("Playing a sub-game to determine the winner...");
        roundWinner = gameLoop(p1Stack.slice(0, p1Top), p2Stack.slice(0, p2Top), gameNumber + 1);
    } else {
        roundWinner = p1Top > p2Top ? 1: 2;
    }
    
    if (roundWinner == 1) {
        console.log("Player 1 wins the round!");
        p1Stack.push(p1Top, p2Top);
    } else {
        console.log("Player 2 wins the round!");
        p2Stack.push(p2Top, p1Top);
    }
    return roundWinner;
}
function gameLoop(p1InitialStack, p2InitialStack, gameNumber) {
    console.log("=== Game " + gameNumber +" ===");
    let p1 = p1InitialStack;
    let p2 = p2InitialStack;
    let p1History = new Set();
    let p2History = new Set();
    let roundsCounter = 1;
    while (p1.length > 0 && p2.length > 0) {
        if (p1History.has(p1.join(",")) && p2History.has(p2.join(","))) return 1;
        p1History.add(p1.join(","));
        p2History.add(p2.join(","));
        console.log("-- Round " + roundsCounter + " (Game " + gameNumber + ") --");
        round(p1,p2, gameNumber);   
        roundsCounter += 1;
    }
    
    console.log("\n== Post-game results ==");
    console.log("Player 1's deck: " + p1.join(","));
    console.log("Player 2's deck: " + p2.join(","));
    let winner = p1.length > 0 ? 1 : 2;
    return winner;
}
function main() {
    let winnerNum = gameLoop(player1, player2, 1);
    let winner = winnerNum == 1? player1: player2;
    let cardWeight = winner.length;
    return winner.reduce((score,cardValue, index) => score + (cardWeight-index) * cardValue, 0);
}
console.log(main());
