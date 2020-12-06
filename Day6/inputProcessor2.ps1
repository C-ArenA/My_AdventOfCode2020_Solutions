$a = Get-Content .\input.sql
$b = $a -replace "^", '"'
$b = $b -replace "$", '",' 
$b = $b -replace '"",', '' 

$b > tempInput.txt
$a = Get-Content .\tempInput.txt -Raw
$b = $a -replace "\r\n\r\n", "],__["
$b = $b -replace "\r\n", " "
$b = $b -replace "__", "`r`n"
$b = $b -replace ",]", "]"
$b = $b -replace "^", "["
$b = $b -replace ", $", "]"
# ------------------------------------------------------
# Cierro datos y exporto módulo si estamos en Node.js
$b = $b -replace "^", "var customDeclarationFormAnswersByGroup = ["
$b = $b -replace "$", "];"
$b = $b -replace "$", "`r`ntry{module.exports = customDeclarationFormAnswersByGroup;} catch(e){}"
$b | out-file input2.js -encoding utf8 #>
Remove-Item .\tempInput.txt