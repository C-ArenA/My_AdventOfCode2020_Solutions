$a = Get-Content .\input.sql
$b = $a -replace "\+", ""
$b = $b -replace " ", '", val: '
$b = $b -replace "^", '{nemonic: "'
$b = $b -replace "$", "},"
# ------------------------------------------------------
# Cierro datos y exporto module si estamos en Node.js
$b[0] = $b[0] -replace "^", "var bootCode = [`r`n"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", "`r`n];"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "`r`ntry{module.exports = bootCode;} catch(e){}"
$b | out-file input.js -encoding utf8 