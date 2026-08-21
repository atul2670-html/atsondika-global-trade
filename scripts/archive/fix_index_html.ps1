$path = "c:\Users\patel\Software\import-export-website\index.html"
$lines = Get-Content $path
$cleanLines = $lines[0..901]

$footer = "  <script src=""src/bundle.js""></script>`r`n</body>`r`n</html>"
$cleanContent = ($cleanLines -join "`r`n") + "`r`n" + $footer

[System.IO.File]::WriteAllText($path, $cleanContent, [System.Text.Encoding]::UTF8)
Write-Host "✅ index.html cleaned and restored to 906 lines!"
