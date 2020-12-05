#Normalizar Input para Arrays
$a = Get-Content .\input.sql -RAW
$b = $a -replace "\n\n", ' ],__['
$b = $b -replace "\n", ' '
$b = $b -replace "__", '
'
$b = $b -replace "^", '['
$b = $b -replace "$", ']'
$b > normalArrayInput.txt

#Proceso Input para generar Array de Arrays sólo con las propiedades
$c = Get-Content .\normalArrayInput.txt 
$d = $c -replace ":[# 0-9 a-z]+ ", ", "
$d = $d -replace "([a-z]+)", '"$1"'
$d = $d -replace ", ],", '],'
$d = $d -replace ", ]", ']'
$d[0] = "let propertiesArrays = [" + $d[0]
$d[$d.Count - 1] = $d[$d.Count - 1] + "];"
$d > inputPropArrays.js

#Normalizar Input para Objects
$e = Get-Content .\input.sql -RAW
$f = $e -replace "\n\n", ' },__{'
$f = $f -replace "\n", ' '
$f = $f -replace "__", '
'
$f = $f -replace "^", '{'
$f = $f -replace "$", '}'
$f > normalObjInput.txt

#Proceso Input para generar Array de Objects
$g = Get-Content .\normalObjInput.txt 
$h = $g -replace " ", ", "
$h = $h -replace ":([a-z 0-9 #]+)", ':"$1"'
$h = $h -replace ", },", '},'
$h = $h -replace ", }", '}'
$h[0] = "let objectsArray = [" + $h[0]
$h[$h.Count - 1] = $h[$h.Count - 1] + "];"
$h > inputObjects.js