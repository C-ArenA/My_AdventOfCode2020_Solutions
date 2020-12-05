$a = Get-Content .\input.sql 
# Hago que cada línea se ponga en formato de objeto
$b = $a -replace ": ", ' password:"'
$b = $b -replace "^", "{minQ:"
$b = $b -replace "$", '"},'
$b = $b -replace "-", " maxQ:"
$b = $b -replace "([\s][\w])[\s]", ' character:$1" '
$b = $b -replace ": ", ':"'
$b = $b -replace " ", ', '
$b[0] = $b[0] -replace "^", "let listOfPasswords = ["
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", "];"
$b > inputProcessed.js

