$a = Get-Content .\input.sql 
$b = $a -replace "^", '['
$b = $b -replace "$", '],'
$b = $b -replace "#", "'#', "
$b = $b -replace "\.", "'.', "
$b = $b -replace ", ],$", "],"
# $b = "let mapOfTrees = [" + $b
$b[0] = $b[0] -replace "^", "let mapOfTrees = ["
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", "];"
$b > inputProcessed.js

