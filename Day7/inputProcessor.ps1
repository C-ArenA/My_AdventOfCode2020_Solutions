$a = Get-Content .\input.sql
$b = $a -replace " contain ",": {"
$b = $b -replace " bags",""
$b = $b -replace " bag",""
$b = $b -replace "^",""
$b = $b -replace "$","},"
$b = $b -replace "([0-9]+) ([a-z \s]+),", '"$2": $1,'
$b = $b -replace "([0-9]+) ([a-z \s]+).", '"$2": $1'
$b = $b -replace "([a-z \s]+):", '"$1":'
$b = $b -replace "no other.", ''
# ------------------------------------------------------
# Cierro datos y exporto module si estamos en Node.js
$b[0] = $b[0] -replace "^", "var bagsColorRules = {"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", "};"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "`r`ntry{module.exports = bagsColorRules;} catch(e){}"
$b | out-file input.js -encoding utf8 