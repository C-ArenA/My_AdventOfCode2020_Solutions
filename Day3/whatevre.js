
    // For Debugging Purposes***********************
    if (whatIsIt == '.') {
        mapOfTrees[i][positionInRow] = 'O';
        //console.log(mapOfTrees[i][positionInRow]);
    } else {
        mapOfTrees[i][positionInRow] = 'X';
    }
    mapOfTrees2.push(mapOfTrees[i].join(""));
    ////////////////////////////////////////////////