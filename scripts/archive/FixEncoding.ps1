$dir = "c:\Users\patel\Software\import-export-website"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# Function to fix mangled strings safely using regex
function Fix-MangledText($filePath) {
    if (Test-Path $filePath) {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $str = [System.Text.Encoding]::UTF8.GetString($bytes)

        $str = $str -replace "ðŸ“ž", [char]0xD83D + [char]0xDCDE
        $str = $str -replace "âœ‰ï¸ ", [char]0x2709 + [char]0xFE0F
        $str = $str -replace "âœ‰", [char]0x2709
        $str = $str -replace "ðŸ” ", [char]0xD83D + [char]0xDD12
        $str = $str -replace "ðŸ“¥", [char]0xD83D + [char]0xDCE5
        $str = $str -replace "ðŸ‡¬ðŸ‡§", [char]0xD83C + [char]0xDDEC + [char]0xD83C + [char]0xDDE7
        $str = $str -replace "ðŸ‡®ðŸ‡³", [char]0xD83C + [char]0xDDEE + [char]0xD83C + [char]0xDDF3
        $str = $str -replace "ðŸ‡«ðŸ‡·", [char]0xD83C + [char]0xDDEB + [char]0xD83C + [char]0xDDF7
        $str = $str -replace "â–¼", [char]0x25BC
        $str = $str -replace "â˜°", [char]0x2630
        $str = $str -replace "âœ✨", [char]0x2728
        $str = $str -replace "âœ✓", [char]0x2713
        $str = $str -replace "àª àª¡àª®àª¿àª¨", "એડમિન"
        $str = $str -replace "àª‡àª¨à« àª•à« àªµàª¾àª¯àª°à«€", "ઇન્ક્વાયરી"
        $str = $str -replace "àª—à« àªœàª°àª¾àª¤à«€", "ગુજરાતી"
        $str = $str -replace "à¤¹à¤¿à¤¨à¥ à¤¦à¥€", "હિन्दी"
        $str = $str -replace "FranÃ§ais", "Français"

        [System.IO.File]::WriteAllText($filePath, $str, $utf8NoBom)
        Write-Host "Fixed: $filePath"
    }
}

Fix-MangledText "$dir\index.html"
Fix-MangledText "$dir\src\i18n.js"
Fix-MangledText "$dir\src\products.js"
Fix-MangledText "$dir\src\certificates.js"
Fix-MangledText "$dir\src\branches.js"
Fix-MangledText "$dir\src\main.js"

# Re-generate bundle.js
$i18n = [System.IO.File]::ReadAllText("$dir\src\i18n.js", $utf8NoBom) -replace "export const", "const"
$products = [System.IO.File]::ReadAllText("$dir\src\products.js", $utf8NoBom) -replace "export const", "const"
$certs = [System.IO.File]::ReadAllText("$dir\src\certificates.js", $utf8NoBom) -replace "export const", "const"
$branches = [System.IO.File]::ReadAllText("$dir\src\branches.js", $utf8NoBom) -replace "export const", "const"

$main = [System.IO.File]::ReadAllText("$dir\src\main.js", $utf8NoBom)
$mainLines = $main -split "`r?`n" | Where-Object { $_ -notmatch "^import\s+" }
$mainClean = $mainLines -join "`r`n"

$bundle = "// Standalone Clean UTF8 Bundle Script`r`n" + $i18n + "`r`n`r`n" + $products + "`r`n`r`n" + $certs + "`r`n`r`n" + $branches + "`r`n`r`n" + $mainClean

[System.IO.File]::WriteAllText("$dir\src\bundle.js", $bundle, $utf8NoBom)
Write-Host "✅ bundle.js generated cleanly!"
