$a = Get-Content .\input.sql 
$b = $a -replace "([B F]+)", 'rowId:"$1"'
$b = $b -replace '"([L R]+)', '", colId:"$1"'
$b = $b -replace "^", '{'
$b = $b -replace "$", '},'
$b[0] = $b[0] -replace "^", 'let boardingPasses = ['
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", '];'
$b > inputProcessed.js