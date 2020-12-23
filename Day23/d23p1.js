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

function takeNextThreeElements(cupsLinkedList, currentCup) {
    let threeElements = new Map();
    let nextKey = cupsLinkedList.get(currentCup);
    let firstKey = nextKey;
    let nextLink = cupsLinkedList.get(nextKey);
    let lastKey = nextKey;
    let nextElement = [nextKey, nextLink];
    while (threeElements.size < 3) {
        threeElements.set(...nextElement);
        // Actualizo
        cupsLinkedList.delete(nextKey);
        lastKey = nextKey;
        nextKey = threeElements.get(nextKey);
        nextLink = cupsLinkedList.get(nextKey);
        nextElement = [nextKey, nextLink];
    }
    cupsLinkedList.set(currentCup, nextKey);
    //console.log("pick up: " + showCups(threeElements, 0));
    return {littleList: threeElements, start: firstKey, end: lastKey};
}

function findDestination(cupsLinkedList, currentCup, maxNum) {
    let possibleDestination = currentCup - 1;
    while (!cupsLinkedList.has(possibleDestination)) {
        possibleDestination = possibleDestination == 0? maxNum: possibleDestination - 1;
    }
    //console.log("destination: " + possibleDestination + "\n");
    return possibleDestination;
}

function placePickedUp(cupsLinkedList, pickUp, destination) {
    pickUp.littleList.forEach((value,key) => {
        cupsLinkedList.set(key, value);
    })
    cupsLinkedList.set(pickUp.end, cupsLinkedList.get(destination));
    cupsLinkedList.set(destination, pickUp.start);
}

function move(cupsLinkedList, currentCup) {
    //console.log("cups: " + showCups(cupsLinkedList, currentCup));
    let pickUp = takeNextThreeElements(cupsLinkedList, currentCup);
    let destination = findDestination(cupsLinkedList, currentCup, 9);
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