$env:PATH = "C:\Program Files\nodejs;$env:PATH"
Write-Host "Starting Vite Dev Server for React App on port 8080..."
& "C:\Program Files\nodejs\npx.cmd" vite --port 8080 --host
