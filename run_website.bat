@echo off
title ADIDEV SMART SOLUTION - Web Server Launcher
echo ============================================================
echo   ADIDEV SMART SOLUTION - GLOBAL TRADING HOUSE
echo   Starting Local Development Server on Port 8080...
echo ============================================================
echo.
timeout /t 2 /nobreak >nul
start http://localhost:8080
cmd /c "C:\Program Files\nodejs\npx.cmd" vite --port 8080 --host || npm run dev
pause
