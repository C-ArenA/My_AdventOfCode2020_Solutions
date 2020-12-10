$a = Get-Content .\input.sql
$b = $a -replace "$", ","
# ------------------------------------------------------
# Cierro datos y exporto module si estamos en Node.js
$b[0] = $b[0] -replace "^", "var adaptersArray = [`r`n"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", "`r`n];"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "`r`ntry{module.exports = adaptersArray;} catch(e){}"
$b | out-file input.js -encoding utf8