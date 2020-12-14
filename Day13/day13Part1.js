//try{var inputYourVariableNameHere = require('./input.js');} catch(error){}
let rawBusesList = [37,"x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x",41,"x","x","x","x","x","x","x","x","x",587,"x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x",13,19,"x","x","x",23,"x","x","x","x","x",29,"x",733,"x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x",17];
// -------------------------------------------------------------
// FUNCTION: I JUST NEED THE BUSES WITH IDs, NOT "x"s 
function day13_getBusIDs(busesList) {
    let busIDs = [];
    busesList.forEach(thisBus => {
    if (thisBus != "x") busIDs.push(thisBus);
    });    
    return busIDs
}

// FUNCTION: CALCULATES THE NEXT TIMESTAMP IN WHICH THE BUS WILL ARRIVE TO THE PORT 
// (According to any other timestamp)
// Bus 3 arrives at 0,3,6,9,12,...
// if my $anyTimestamp input is 5, this function should return 6
// Bus 3 : 2 * 3 = 6 -> anyLapNumber * busID = anyTimestamp
// myTimestamp = 5 -> myTimestamp / busID ~= LapNumber
function day13_nextBusTimestamp(anyTimestamp, busID) {
    let nextBusLap = Math.ceil(anyTimestamp / busID);
    return nextBusLap * busID;
}

// FUNCTION: ------- MAIN ----------
// Calculates the nearest timestamp at which ANY of the buses will arrive the port
// Then calculates the time between that timestamp and the estimated one (how much I  will wait the bus)
// Returns that time multiplied by the ID of the bus that will arrive sooner
function day13_ShuttleSearch_Part1(){
    let busIDs = day13_getBusIDs(rawBusesList), myEstimatedTimestamp = 1005526;
    let nearestBusID = busIDs[0];
    let nearestBusTimestamp = day13_nextBusTimestamp(myEstimatedTimestamp, nearestBusID);
    
    busIDs.forEach(thisBusID => {
        const thisBusTimestamp = nextBusTimestamp(myEstimatedTimestamp, thisBusID);
        if (nearestBusTimestamp >= thisBusTimestamp) {
            nearestBusTimestamp = thisBusTimestamp;
            nearestBusID = thisBusID
        }
    });
    let timeIHaveToWait = nearestBusTimestamp-myEstimatedTimestamp;
    return timeIHaveToWait * nearestBusID;
}
console.log(day13_ShuttleSearch_Part1());