#!/bin/bash
# Unix/Linux version of start-all script

echo "=== Starting AI Chat Services ==="
echo ""

# Kill existing Node processes
echo "[1/3] Cleaning up old processes..."
pkill -f "node main.js" 2>/dev/null
pkill -f "npm run dev" 2>/dev/null
sleep 2

echo "[2/3] Starting main.js (Groq AI API)..."
nohup node main.js > logs/main.log 2>&1 &
sleep 3

echo "[3/3] Starting dev server (Vite)..."
npm run dev &

echo ""
echo "✅ Services started!"
echo ""
echo "🌐 Browser: http://localhost:3000"
echo "🤖 Groq API: http://localhost:3000/chatAi"
echo ""
echo "Logs:"
echo "- Main API: logs/main.log"
