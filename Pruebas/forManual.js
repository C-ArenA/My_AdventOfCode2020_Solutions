let array = [1,2,3,4,5];
for (let i = 0; i < array.length; i++) {
    const element = array[i];
    console.log(element);
    if (element % 2) {
        i += 1;
    }
}