$a = Get-Content .\input.sql 
$b = $a -replace "$", ","
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$","]"
$b = "let expenseReport = [" + $b + ";`r`n" + "try{module.exports = expenseReport;} catch(e){}"
$b > input.js
