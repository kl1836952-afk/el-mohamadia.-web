@echo off
REM ====================================
REM Start Both Servers
REM ====================================

echo.
echo [Copilot CLI] Starting AI Chat Services...
echo.

REM Kill existing Node processes
echo [1/3] تنظيف العمليات القديمة...
taskkill /IM node.exe /F 2>nul
timeout /t 2 /nobreak

echo [2/3] تشغيل main.js (Groq AI API)...
start "AI Chat API (Groq)" cmd /k "node main.js"
timeout /t 3 /nobreak

echo [3/3] تشغيل server.ts (Dev Server)...
start "Dev Server (Vite)" cmd /k "npm run dev"

echo.
echo ✅ تم تشغيل السيرفرات!
echo.
echo 🌐 المتصفح: http://localhost:3000
echo 🤖 Groq API: http://localhost:3000/chatAi
echo.
echo اضغط على أي مفتاح للخروج...
pause
