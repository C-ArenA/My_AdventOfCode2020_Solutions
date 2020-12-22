$a = Get-Content .\inputEx.txt
$b = $a -replace "Player ", "var player"
$b = $b -replace ":", " = ["
$b = $b -replace "([0-9]+)$", '    $1,'
$b = $b -replace "^$", "];"

for ($i = 0; $i -lt $a.Count; $i++) {
    if ($a[$i+1] -eq "") {
        $b[$i] = "    " + $a[$i];
    }
    if ($i -eq $a.Count-1) {
        $b[$i] = "    " + $a[$i] + "`r`n];"
    }
}
# ------------------------------------------------------
# exporto module si estamos en Node.js
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "`r`ntry{module.exports = {p1: player1, p2:player2};} catch(e){}"
$b | out-file inputEx.js -encoding utf8 #>