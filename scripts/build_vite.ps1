$env:PATH = "C:\Program Files\nodejs;$env:PATH"
Write-Host "Installing dependencies (npm install)..."
& "C:\Program Files\nodejs\npm.cmd" install
Write-Host "Running Vite Production Build..."
& "C:\Program Files\nodejs\npx.cmd" vite build
Write-Host "✅ Vite Build Completed Successfully!"
