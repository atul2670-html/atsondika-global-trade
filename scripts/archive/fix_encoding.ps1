$dir = "c:\Users\patel\Software\import-export-website"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# Function to re-save file with UTF8 No BOM
function Fix-FileEncoding($filePath) {
    if (Test-Path $filePath) {
        $text = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
        [System.IO.File]::WriteAllText($filePath, $text, $utf8NoBom)
        Write-Host "✅ Fixed encoding for: $filePath"
    }
}

Fix-FileEncoding "$dir\index.html"
Fix-FileEncoding "$dir\src\i18n.js"
Fix-FileEncoding "$dir\src\products.js"
Fix-FileEncoding "$dir\src\certificates.js"
Fix-FileEncoding "$dir\src\branches.js"
Fix-FileEncoding "$dir\src\main.js"

# Now build bundle.js cleanly with UTF8 No BOM
$i18n = [System.IO.File]::ReadAllText("$dir\src\i18n.js", [System.Text.Encoding]::UTF8) -replace "export const", "const"
$products = [System.IO.File]::ReadAllText("$dir\src\products.js", [System.Text.Encoding]::UTF8) -replace "export const", "const"
$certs = [System.IO.File]::ReadAllText("$dir\src\certificates.js", [System.Text.Encoding]::UTF8) -replace "export const", "const"
$branches = [System.IO.File]::ReadAllText("$dir\src\branches.js", [System.Text.Encoding]::UTF8) -replace "export const", "const"

$main = [System.IO.File]::ReadAllText("$dir\src\main.js", [System.Text.Encoding]::UTF8)
$mainLines = $main -split "`r?`n" | Where-Object { $_ -notmatch "^import\s+" }
$mainClean = $mainLines -join "`r`n"

$bundle = "// Standalone Clean UTF8 Bundle Script`r`n" + $i18n + "`r`n`r`n" + $products + "`r`n`r`n" + $certs + "`r`n`r`n" + $branches + "`r`n`r`n" + $mainClean

[System.IO.File]::WriteAllText("$dir\src\bundle.js", $bundle, $utf8NoBom)
Write-Host "✅ bundle.js successfully generated with UTF8 No BOM!"
