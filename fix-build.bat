@echo off
REM ====================================
REM Fix Build Permission Error Script
REM ====================================

echo.
echo [1/4] إغلاق جميع Node processes...
taskkill /IM node.exe /F 2>nul
timeout /t 3 /nobreak

echo [2/4] حذف dist folder...
if exist "dist" rmdir /s /q "dist"
if exist ".vite" rmdir /s /q ".vite"

echo [3/4] تنظيف node_modules cache...
if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite"

echo [4/4] إعادة البناء...
npm run build

echo.
echo [✓] تمت إعادة البناء بنجاح!
pause
