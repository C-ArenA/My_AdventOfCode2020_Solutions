let day23_inputRAW = "167248359";
//let day23_inputRAW = "389125467";
function pickUpNextThreeElements(cupsLinkedList, currentCup) {
    let start = cupsLinkedList.get(currentCup);
    let medium = cupsLinkedList.get(start);
    let end = cupsLinkedList.get(medium);
    cupsLinkedList.set(currentCup, cupsLinkedList.get(end));
    return {"start": start, "medium": medium, "end": end};
}

function findDestination(cupsLinkedList, currentCup, pickUp, maxNum) {
    let possibleDestination = currentCup - 1;
    while (!cupsLinkedList.has(possibleDestination) || possibleDestination == pickUp.start || possibleDestination == pickUp.medium || possibleDestination == pickUp.end) {
        possibleDestination = possibleDestination == 0? maxNum: possibleDestination - 1;
    }
    return possibleDestination;
}

function placePickedUp(cupsLinkedList, pickUp, destination) {
    cupsLinkedList.set(pickUp.end, cupsLinkedList.get(destination));
    cupsLinkedList.set(destination, pickUp.start);
}

function move(cupsLinkedList, currentCup) {
    //console.log("cups: " + showCups(cupsLinkedList, currentCup));
    let pickUp = pickUpNextThreeElements(cupsLinkedList, currentCup);
    let destination = findDestination(cupsLinkedList, currentCup, pickUp, 1000000);
    // Pongo de nuevo los tres elementos
    placePickedUp(cupsLinkedList, pickUp, destination);
    //Returns the next "current cup"
    return cupsLinkedList.get(currentCup);
}

function main(inputRAW) {
    let cupsArray = inputRAW.split("");
    let cups = new Map(cupsArray.map((cupLabel, index) => [parseInt(cupLabel), parseInt(cupsArray[index+1])]));
    cups.set(parseInt(cupsArray.pop()), 10);
    for (let next = 10; next < 1000000; next++) {
        cups.set(next, next+1);
    }
    cups.set(1000000,parseInt(cupsArray.shift()));
    //console.log(cups);
    // --------------------------------------
    let nextCup = cups.keys().next().value;
    for (let i = 1; i <= 10000000; i++) {
        if (i%10000 == 0) console.log("-- move " + i + " --") 
        nextCup = move(cups, nextCup);   
    }
    console.log("-- final --");
    console.log(cups.get(1));
    console.log(cups.get(cups.get(1)));
    console.log("Resulting Value: " + cups.get(1) * cups.get(cups.get(1)));
    //console.log("cups: " + showCups(cups, nextCup));
    //console.log("cups: " + showCups(cups, 1, 1).replace(/[ ]/g, ""));
}
main(day23_inputRAW);