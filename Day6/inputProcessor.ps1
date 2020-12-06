$a = Get-Content .\input.sql -Raw
$b = $a -replace "\n\n", "__"
$b = $b -replace "\n", ""
$b = $b -replace "__", "`r`n"
$b > tempInput.txt
$a = Get-Content .\tempInput.txt
$b = $a -replace "^", '"'
$b = $b -replace "$", '",'
# ------------------------------------------------------
# Cierro datos y exporto módulo si estamos en Node.js
$b[0] = $b[0] -replace "^", "var customDeclarationFormAnswersByGroup = ["
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", "];"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "`r`ntry{module.exports = customDeclarationFormAnswersByGroup;} catch(e){}"
$b | out-file input.js -encoding utf8
Remove-Item .\tempInput.txt