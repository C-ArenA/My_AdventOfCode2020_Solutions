let day23_inputRAW = "167248359";
//let day23_inputRAW = "389125467";

function showCups(cupsLinkedList, currentCup, startPoint) {
    let cupsString = "";
    let thisCup = cupsLinkedList.keys().next().value;
    if (startPoint) {
        console.log("Está");   
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
    return {littleList: threeElements, start: firstKey, end: lastKey};
}

function findDestination(cupsLinkedList, currentCup) {
    let possibleDestination = currentCup - 1;
    while (!cupsLinkedList.has(possibleDestination)) {
        possibleDestination = possibleDestination == 0? 9: possibleDestination - 1;
    }
    return possibleDestination;
}

function placePickedUp(cupsLinkedList, pickUp, destination) {
    pickUp.littleList.forEach((value,key) => {
        cupsLinkedList.set(key, value);
    })
    cupsLinkedList.set(pickUp.end, cupsLinkedList.get(destination));
    cupsLinkedList.set(destination, pickUp.start);
}

function move(cupsLinkedList, currentCup, moveNumber) {
    console.log("-- move " + moveNumber + " --");
    console.log("cups: " + showCups(cupsLinkedList, currentCup));
    let pickUp = takeNextThreeElements(cupsLinkedList, currentCup);
    console.log("pick up: " + showCups(pickUp.littleList, 0));
    let destination = findDestination(cupsLinkedList, currentCup);
    console.log("destination: " + destination + "\n");
    // Pongo de nuevo los tres elementos
    placePickedUp(cupsLinkedList, pickUp, destination);
    //console.log("cupsNow: " + showCups(cupsLinkedList, currentCup));
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
        nextCup = move(cups, nextCup, i);    
    }
    console.log("-- final --");
    console.log("cups: " + showCups(cups, nextCup));
    console.log("cups: " + showCups(cups, 1, 1).replace(/[ ]/g, ""));
}
main(day23_inputRAW);