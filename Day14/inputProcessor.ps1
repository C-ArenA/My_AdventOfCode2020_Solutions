$a = Get-Content .\input.sql 
$b = $a -replace "mask = ([X10]+)", '{mask: "$1",'
$b = $b -replace "{", "`t]`r`n},`r`n{`r`n"
$b = $b -replace "mem\[", "`t{memoryAddress: "
$b = $b -replace "\] = ([0-9]+)", ', value: $1},'
$b = $b -replace '",', "`",`r`ndata:`r`n`t["

$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", "`r`n`t]`r`n}"
$b[0] = $b[0] -replace "^`t]`r`n},", ""
$b
$b | out-file temp.js -encoding utf8
$a = Get-Content .\temp.js -RAW
$b = $a -replace ",`r`n`t]", "`r`n`t]"
$b | out-file temp.js -encoding utf8
$a = Get-Content .\temp.js
$b = $a

# ------------------------------------------------------
# Cierro datos y exporto module si estamos en Node.js
$b[0] = $b[0] -replace "^", "var initializationProgram = [`r`n"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "`r`n];"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "`r`ntry{module.exports = initializationProgram;} catch(e){}"
$b | out-file input.js -encoding utf8
Remove-Item -path .\temp.js