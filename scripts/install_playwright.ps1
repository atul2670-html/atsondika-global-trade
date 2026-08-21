$env:PATH = "C:\Program Files\nodejs;$env:PATH"
Write-Host "Installing @playwright/test package..."
& "C:\Program Files\nodejs\npm.cmd" install @playwright/test --save-dev --legacy-peer-deps
Write-Host "Installing Playwright Chromium browser binary..."
& "C:\Program Files\nodejs\npx.cmd" playwright install chromium
Write-Host "✅ Playwright & Chromium Installed Successfully!"
