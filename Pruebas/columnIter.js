let arr = [ [1,2,3],
            [4,5,6],
            [7,8,9],
            ["*",0,"#"]]
// Itero por columnas en lugar de filas:
for (let j = 0; j < arr[0].length; j++) {
    for(let i = 0; (i < arr.length) && (arr[i][j]%2 == 1); i++){
        console.log(arr[i][j]);  
    }
}