# ------------------------------------------------------
# Cierro datos y exporto módulo si estamos en Node.js
$b[0] = $b[0] -replace "^", "var mapOfTrees = ["
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", "];"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "`r`ntry{module.exports = ;} catch(e){}"
$b > input.js