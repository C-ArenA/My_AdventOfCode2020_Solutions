$a = Get-Content .\input.txt
$b = $a -replace "\* ", "'*',"
$b = $b -replace "\+ ", "'+',"
$b = $b -replace "\(", "'(',"
$b = $b -replace "\)", "')',"
$b = $b -replace "([0-9])+", '$1,'
$b = $b -replace "^", '['
$b = $b -replace ",$", '],'
# ------------------------------------------------------
# Cierro datos y exporto module si estamos en Node.js
$b[0] = $b[0] -replace "^", "var childHomework = [`r`n"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", "`r`n];"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "`r`ntry{module.exports = childHomework;} catch(e){}"
$b | out-file input.js -encoding utf8