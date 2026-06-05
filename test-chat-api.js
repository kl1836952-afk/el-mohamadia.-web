#!/usr/bin/env node
// Test script for Chat API
const payload = JSON.stringify({ prompt: "السلام عليكم، ما هي خدماتكم؟" });

console.log("Testing Chat API...");
console.log("Payload:", payload);

fetch("http://localhost:3000/chatAi", {
    method: "POST",
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json"
    },
    body: payload
})
    .then(res => {
        console.log("Response Status:", res.status);
        return res.json();
    })
    .then(data => {
        console.log("✓ Success!");
        console.log("Response:", JSON.stringify(data, null, 2));
    })
    .catch(err => {
        console.error("✗ Error:", err.message);
    });
