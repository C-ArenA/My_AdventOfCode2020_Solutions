$a = Get-Content .\input2.sql
$b = $a -replace "([L.#])", '"$1", '
$b = $b -replace "^", '['
$b = $b -replace ", $", '],'
# ------------------------------------------------------
# Cierro datos y exporto module si estamos en Node.js
$b[0] = $b[0] -replace "^", "var originalSeatsMatrix = [`r`n"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", "`r`n];"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "`r`ntry{module.exports = originalSeatsMatrix;} catch(e){}"
$b | out-file input2.js -encoding utf8