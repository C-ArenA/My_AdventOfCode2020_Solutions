$a = Get-Content .\input.sql 
$b = $a -replace "^", '['
$b = $b -replace "$", '],'
$b = $b -replace "#", "'#', "
$b = $b -replace "\.", "'.', "
$b = $b -replace ", ],$", "],"
# $b = "let mapOfTrees = [" + $b
$b[0] = $b[0] -replace "^", "var mapOfTrees = ["
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", "];`r`ntry{module.exports = mapOfTrees;} catch(e){}"
$b > input.js

