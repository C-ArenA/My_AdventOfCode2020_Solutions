$a = Get-Content .\input3.txt
$b = $a -replace ":", ",`r`nimage: ["
$b = $b -replace "Tile ", "{id: "
$b = $b -replace "([#.]+)", '[$1],'
$b = $b -replace "#", "1, "
$b = $b -replace "\.", "0, "
$b = $b -replace ", ]", "]"
for ($i = 5; $i -lt $b.Count; $i+=7) {
    $b[$i] = $b[$i] -replace ",$", "`r`n]`r`n},"
}
$b[0] = $b[0] -replace "^", "var imageTiles = [`r`n"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", "`r`n];"

# ------------------------------------------------------
#exporto module si estamos en Node.js
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "`r`ntry{module.exports = imageTiles;} catch(e){}"
$b | out-file input3.js -encoding utf8 #>