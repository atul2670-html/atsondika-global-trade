$dir = "c:\Users\patel\Software\import-export-website"
$i18n = [System.IO.File]::ReadAllText("$dir\src\i18n.js") -replace "export const", "const"
$products = [System.IO.File]::ReadAllText("$dir\src\products.js") -replace "export const", "const"
$certs = [System.IO.File]::ReadAllText("$dir\src\certificates.js") -replace "export const", "const"
$branches = [System.IO.File]::ReadAllText("$dir\src\branches.js") -replace "export const", "const"

$main = [System.IO.File]::ReadAllText("$dir\src\main.js")
$mainLines = $main -split "`r?`n" | Where-Object { $_ -notmatch "^import\s+" }
$mainClean = $mainLines -join "`r`n"

$bundle = "// Standalone Bundle Script`r`n" + $i18n + "`r`n`r`n" + $products + "`r`n`r`n" + $certs + "`r`n`r`n" + $branches + "`r`n`r`n" + $mainClean

[System.IO.File]::WriteAllText("$dir\src\bundle.js", $bundle, [System.Text.Encoding]::UTF8)
Write-Host "✅ bundle.js successfully written!"
