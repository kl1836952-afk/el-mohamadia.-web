import fetch from "node-fetch";

const testAPI = async () => {
  console.log("🧪 اختبار /chatAi Endpoint...\n");

  const payload = {
    prompt: "السلام عليكم، أنا أختبر الـ API الجديد من ChatInterface",
  };

  try {
    const response = await fetch("http://localhost:3000/chatAi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.log(`❌ Error: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
    console.log("✅ Response received:");
    console.log("────────────────────────");
    console.log(`📝 Your Prompt: ${data.prompt}`);
    console.log(`\n💬 AI Response:\n${data.message}`);
    console.log("────────────────────────\n");
  } catch (error) {
    console.error("❌ API Error:", error.message);
  }
};

testAPI();
