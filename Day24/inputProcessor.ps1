$a = Get-Content .\inputEx.txt
$b = $a -replace "^", "'"
$b = $b -replace "$", "',"
# ------------------------------------------------------
# Cierro datos y exporto module si estamos en Node.js
$b[0] = $b[0] -replace "^", "var day24_flipTileInstructions = [`r`n"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", "];"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "`r`ntry{module.exports = day24_flipTileInstructions;} catch(e){}"
$b | out-file inputEx.js -encoding utf8