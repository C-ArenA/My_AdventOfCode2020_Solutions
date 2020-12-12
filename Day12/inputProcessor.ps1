$a = Get-Content .\input.sql 
$b = $a -replace "([FLRNEWS])",'{action: "$1", '
$b = $b -replace "([0-9]+)",'value: $1},'
# ------------------------------------------------------
# Cierro datos y exporto module si estamos en Node.js
$b[0] = $b[0] -replace "^", "var navigationInstructions = [`r`n"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", "`r`n];"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "`r`ntry{module.exports = navigationInstructions;} catch(e){}"
$b | out-file input.js -encoding utf8