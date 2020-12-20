let myTimestamp = 1000001;
let ids = [29, 41, 577, 13, 17, 19, 23, 601, 37];
let nearestTime = [];
ids.forEach((id) => {
    nearestTime.push(Math.ceil(myTimestamp/id)*id);
})
console.log(nearestTime);
nearestTime.sort((a,b)=>{
    return a-b;
})
console.log(nearestTime);

