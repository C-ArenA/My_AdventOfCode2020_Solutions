function generic(fun, arg) {
    return fun(arg);
}
function mult(a) {
    return a*5;
}
console.log(generic(mult, 8));