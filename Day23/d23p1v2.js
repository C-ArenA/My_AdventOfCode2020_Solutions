const { PerformanceObserver, performance } = require('perf_hooks');

//let day23_inputRAW = "167248359";
let day23_inputRAW = "389125467";

function showCups(cupsLinkedList, currentCup, startPoint) {
    let cupsString = "";
    let thisCup = cupsLinkedList.keys().next().value;
    if (startPoint) {
        thisCup = cupsLinkedList.get(startPoint);
        cupsLinkedList.delete(startPoint);
    }
    let listSize = cupsLinkedList.size;
    let counter = 0;
    while (counter < listSize) {
        cupsString += thisCup == currentCup? "("+thisCup+") " : thisCup + " ";
        thisCup = cupsLinkedList.get(thisCup);
        counter++;
    }
    return cupsString;
}

function pickUpNextThreeElements(cupsLinkedList, currentCup) {
    let start = cupsLinkedList.get(currentCup);
    let medium = cupsLinkedList.get(start);
    let end = cupsLinkedList.get(medium);
    cupsLinkedList.set(currentCup, cupsLinkedList.get(end));
    //console.log("pick up: " + start + " " + medium + " " + end);
    return {"start": start, "medium": medium, "end": end};
}

function findDestination(cupsLinkedList, currentCup, pickUp, maxNum) {
    let possibleDestination = currentCup - 1;
    while (!cupsLinkedList.has(possibleDestination) || possibleDestination == pickUp.start || possibleDestination == pickUp.medium || possibleDestination == pickUp.end) {
        possibleDestination = possibleDestination == 0? maxNum: possibleDestination - 1;
    }
    //console.log("destination: " + possibleDestination + "\n");
    return possibleDestination;
}

function placePickedUp(cupsLinkedList, pickUp, destination) {
    cupsLinkedList.set(pickUp.end, cupsLinkedList.get(destination));
    cupsLinkedList.set(destination, pickUp.start);
}

function move(cupsLinkedList, currentCup) {
    //console.log("cups: " + showCups(cupsLinkedList, currentCup));
    let pickUp = pickUpNextThreeElements(cupsLinkedList, currentCup);
    let destination = findDestination(cupsLinkedList, currentCup, pickUp, 9);
    // Pongo de nuevo los tres elementos
    placePickedUp(cupsLinkedList, pickUp, destination);
    //Returns the next "current cup"
    return cupsLinkedList.get(currentCup);
}
//move(day23_inputRAW, 1);

function main(inputRAW) {
    let cupsArray = inputRAW.split("");
    let cups = new Map(cupsArray.map((cupLabel, index) => [parseInt(cupLabel), parseInt(cupsArray[index+1])]));
    cups.set(parseInt(cupsArray.pop()), parseInt(cupsArray.shift()));
    // --------------------------------------
    let nextCup = cups.keys().next().value;
    for (let i = 1; i <= 100; i++) {
        //if(i%10==0) 
        //console.log("-- move " + i + " --");
        nextCup = move(cups, nextCup);    
    }
    console.log("-- final --");
    console.log("cups: " + showCups(cups, nextCup));
    console.log("cups: " + showCups(cups, 1, 1).replace(/[ ]/g, ""));
}

var t0 = performance.now();
main(day23_inputRAW);
var t1 = performance.now();
console.log("It took " + (t1 - t0) + " milliseconds."); 