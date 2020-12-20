$a = Get-Content .\input.txt
$b = $a -replace "your ticket:", "var myTicket ="
$b = $b -replace "nearby tickets:", "var nearbyTickets = ["
$b = $b -replace "([a-z ]+):", '"$1":'
$b = $b -replace "-", ','
$b = $b -replace " or ", ','
$b = $b -replace "([0-9,]+)", '[$1],'
$b[0] = $b[0] -replace "^", "var ticketFieldsRules = {`r`n"
$b[19] = $b[19] -replace ",$", "`r`n};"
$b[22] = $b[22] -replace ",$", ";"
$b[$b.Count - 1] = $b[$b.Count - 1] -replace ",$", "`r`n];"
$b
# ------------------------------------------------------
#exporto module si estamos en Node.js
$b[$b.Count - 1] = $b[$b.Count - 1] -replace "$", "`r`ntry{module.exports = {tfr: ticketFieldsRules, mt : myTicket, nt: nearbyTickets};} catch(e){}"
$b | out-file input.js -encoding utf8 #>