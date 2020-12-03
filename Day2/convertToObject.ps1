# Tomo mi input
$a = Get-Content .\inputRAW.txt
# Hago que cada línea se ponga en formato de objeto
$b = $a -replace ": ", ' password:"'
$b = $b -replace "^", "{minQ:"
$b = $b -replace "$", '"}'
$b = $b -replace "-", " maxQ:"
$b = $b -replace "([\s][\w])[\s]", ' character:$1" '
$b = $b -replace ": ", ':"'
$b = $b -replace " ", ', '
$b > inputMadeObjects.txt
# Genero un array de los objetos antes generados
$c = Get-Content .\inputMadeObjects.txt -Raw
$d = $c -replace "\r\n", ", "
$d = $d -replace ", $", "];"
$d = $d -replace "^", "let listOfPasswords = ["
$d > inputProcessed.js