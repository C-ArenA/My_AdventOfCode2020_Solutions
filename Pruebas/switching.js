let result = 0;
const element = "*";
const nextElement = "whatever";
switch (element) {
    case "*":
        if (nextElement == "whatever") {
            result = 10;
            break;
        }
        result = 3;
        break;
    default:
        // Es un número suelto
        result = 0;
        break;
}
console.log(result);
