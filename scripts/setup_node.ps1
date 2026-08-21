$nodeUrl = "https://nodejs.org/dist/v20.18.0/node-v20.18.0-win-x64.zip"
$zipPath = "$PSScriptRoot\node-portable.zip"
$destDir = "$PSScriptRoot\.node"

if (-not (Test-Path $destDir)) {
    Write-Host "Downloading Node.js v20.18.0 Portable..."
    Invoke-WebRequest -Uri $nodeUrl -OutFile $zipPath
    Write-Host "Extracting Node.js..."
    Expand-Archive -Path $zipPath -DestinationPath "$PSScriptRoot\temp_node" -Force
    Move-Item "$PSScriptRoot\temp_node\node-v20.18.0-win-x64" $destDir -Force
    Remove-Item $zipPath -Force
    Remove-Item "$PSScriptRoot\temp_node" -Force -Recurse
    Write-Host "✅ Node.js Portable installed successfully in $destDir"
} else {
    Write-Host "✅ Node.js is already installed at $destDir"
}
