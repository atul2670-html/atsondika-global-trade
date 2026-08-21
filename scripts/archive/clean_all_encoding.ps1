$dir = "c:\Users\patel\Software\import-export-website"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# Function to clean mangled strings in a file
function Clean-MangledFile($filePath) {
    if (Test-Path $filePath) {
        $text = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

        # Replacements for common mangled sequences
        $replacements = @{
            "ðŸ“ž" = "📞";
            "âœ‰ï¸ " = "✉️";
            "âœ‰" = "✉️";
            "ðŸ” " = "🔐";
            "ðŸ“¥" = "📥";
            "ðŸ‡¬ðŸ‡§" = "🇬🇧";
            "ðŸ‡®ðŸ‡³" = "🇮🇳";
            "ðŸ‡«ðŸ‡·" = "🇫🇷";
            "â–¼" = "▼";
            "â˜°" = "☰";
            "âœ¨" = "✨";
            "âœ✓" = "✓";
            "âœ" = "✓";
            "ðŸ›ï¸ " = "🛠️";
            "ðŸ“ " = "📋";
            "ðŸ’💬" = "💬";
            "ðŸ’" = "💬";
            "àª àª¡àª®àª¿àª¨" = "એડમિન";
            "àª‡àª¨à« àª•à« àªµàª¾àª¯àª°à«€" = "ઇન્ક્વાયરી";
            "àª—à« àªœàª°àª¾àª¤à«€" = "ગુજરાતી";
            "à¤¹à¤¿à¤¨à¥ à¤¦à¥€" = "હિन्दी";
            "FranÃ§ais" = "Français";
            "Â©" = "©"
        }

        foreach ($k in $replacements.Keys) {
            $text = $text.Replace($k, $replacements[$k])
        }

        [System.IO.File]::WriteAllText($filePath, $text, $utf8NoBom)
        Write-Host "Cleaned encoding in: $filePath"
    }
}

Clean-MangledFile "$dir\index.html"
Clean-MangledFile "$dir\src\i18n.js"
Clean-MangledFile "$dir\src\products.js"
Clean-MangledFile "$dir\src\certificates.js"
Clean-MangledFile "$dir\src\branches.js"
Clean-MangledFile "$dir\src\main.js"

# Re-generate bundle.js
$i18n = [System.IO.File]::ReadAllText("$dir\src\i18n.js", [System.Text.Encoding]::UTF8) -replace "export const", "const"
$products = [System.IO.File]::ReadAllText("$dir\src\products.js", [System.Text.Encoding]::UTF8) -replace "export const", "const"
$certs = [System.IO.File]::ReadAllText("$dir\src\certificates.js", [System.Text.Encoding]::UTF8) -replace "export const", "const"
$branches = [System.IO.File]::ReadAllText("$dir\src\branches.js", [System.Text.Encoding]::UTF8) -replace "export const", "const"

$main = [System.IO.File]::ReadAllText("$dir\src\main.js", [System.Text.Encoding]::UTF8)
$mainLines = $main -split "`r?`n" | Where-Object { $_ -notmatch "^import\s+" }
$mainClean = $mainLines -join "`r`n"

$bundle = "// Standalone Clean UTF8 Bundle Script`r`n" + $i18n + "`r`n`r`n" + $products + "`r`n`r`n" + $certs + "`r`n`r`n" + $branches + "`r`n`r`n" + $mainClean

[System.IO.File]::WriteAllText("$dir\src\bundle.js", $bundle, $utf8NoBom)
Write-Host "✅ Re-generated bundle.js with clean UTF-8!"
