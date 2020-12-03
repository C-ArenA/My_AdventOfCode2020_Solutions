$a = Get-Content .\input.sql 
$b = $a -replace "^", '['
$b = $b -replace "$", '],'
$b = $b -replace "#", "'#', "
$b = $b -replace "\.", "'.', "
$b = $b -replace ", ],$", "],"
# $b = "let mapOfTrees = [" + $b
$b > inputProc1.txt
$c = Get-Content .\inputProc1.txt -RAW
$d = $c -replace ",\r\n$", "];"
$d = $d -replace "^", "let mapOfTrees = ["
$d
$d > inputYeah.js
#$d = $d -replace ",$", "];"

