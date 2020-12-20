function getColumnOfMatrix(matrix, columnPosition) {
    console.log("--> FUN: getColumnOfMatrix(matrix, column)");
    return matrix.map((row)=>row[columnPosition]);
}

function transposeMatrix(matrix) {
    console.log("--> FUN: transposeMatrix(matrix)");
    let newMatrix = []
    for (let j = 0; j < matrix[0].length; j++) {
        newMatrix.push(getColumnOfMatrix(matrix, j));
    }
    return newMatrix;
}
