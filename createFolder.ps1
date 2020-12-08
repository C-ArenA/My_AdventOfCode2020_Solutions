# Con este script de PowerShell puedo crear mi carpeta y archivos para cada día de forma automática :P
$dayNumber = Read-Host -Prompt 'Input the number of the day'
$dayName = Read-Host -Prompt 'Input the NAME of the day without Spaces'
Write-Host "Perfect! I'll create all you need for Day $dayNumber : $dayName. Hope you enjoy it!"
New-Item -Path ".\" -Name "Day$dayNumber" -ItemType "directory"
Set-Location .\Day$dayNumber
New-Item -Path . -Name "day${dayNumber}Part1.js" -ItemType "file" -Value "try{var inputYourVariableNameHere = require('./input.js');} catch(error){}`r`n`r`nfunction day${dayNumber}_${dayName}_Part1(){`r`n}"
New-Item -Path . -Name "day${dayNumber}Part2.js" -ItemType "file" -Value "try{var inputYourVariableNameHere = require('./input.js');} catch(error){}`r`n`r`nfunction day${dayNumber}_${dayName}_Part2(){`r`n}"
New-Item -Path . -Name "inputProcessor.ps1" -ItemType "file" -Value '# ------------------------------------------------------
# Cierro datos y exporto module si estamos en Node.js
$b[0] = $b[0] -replace "^", "var customDeclarationFormAnswersByGroup = ["
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "];"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "`r`ntry{module.exports = customDeclarationFormAnswersByGroup;} catch(e){}"
$b | out-file input.js -encoding utf8'


