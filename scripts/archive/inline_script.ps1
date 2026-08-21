$dir = "c:\Users\patel\Software\import-export-website"
$htmlPath = "$dir\index.html"
$bundlePath = "$dir\src\bundle.js"

$html = [System.IO.File]::ReadAllText($htmlPath)
$bundle = [System.IO.File]::ReadAllText($bundlePath)

# Replace <script src="src/bundle.js..."></script> with inline <script>... </script>
$scriptTagPattern = '<script src="src/bundle\.js.*"></script>'
$inlineScript = "<script>`r`n" + $bundle + "`r`n</script>"

$newHtml = [System.Text.RegularExpressions.Regex]::Replace($html, $scriptTagPattern, [System.Text.RegularExpressions.MatchEvaluator]{ param($m) return $inlineScript })

[System.IO.File]::WriteAllText($htmlPath, $newHtml, [System.Text.Encoding]::UTF8)
Write-Host "✅ Inlined bundle.js into index.html successfully!"
