$a = Get-Content .\input.txt 
# Generating Rules Object
$b = $a -replace ": ", ": ["
$b = $b -replace "\|", "'|',"
$b = $b -replace "([0-9]+) ", '$1, '
$b = $b -replace "$", "],"
$b[0] = $b[0] -replace "^", "var rules = {`r`n"
$b[135] = $b[135] -replace ",$", "`r`n};`r`n"

# Generating Received Messages Array
$b = $b -replace "^([ab]+)],$", '"$1",'
$b = $b -replace "^],$", 'var messages = ['
$b = $b -replace "^],$", 'var messages = ['
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", "`r`n];"

# ------------------------------------------------------
# Exporto module si estamos en Node.js
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "`r`ntry{module.exports = {'rules': rules, 'messages': messages};} catch(e){}"
$b | out-file input.js -encoding utf8 #>