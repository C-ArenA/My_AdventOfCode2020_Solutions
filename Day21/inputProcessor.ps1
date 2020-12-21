$a = Get-Content .\inputEx.txt
$b = $a -replace "\)", "]},"
$b = $b -replace "^", "{ingredients: new_Set(["
$b = $b -replace " \(", "]), "
$b = $b -replace "contains ", "contains: ["
$b = $b -replace "([a-z]+) ", '"$1" '
$b = $b -replace "([a-z]+),", '"$1",'
$b = $b -replace "([a-z]+)\]", '"$1"]'
$b = $b -replace '" ', '", '
$b = $b -replace "_", ' '
$b[0] = $b[0] -replace "^", "var foods = [`r`n"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", "`r`n];"
$b
# ------------------------------------------------------
# exporto module si estamos en Node.js
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "`r`ntry{module.exports = foods;} catch(e){}"
$b | out-file inputEx.js -encoding utf8 #>