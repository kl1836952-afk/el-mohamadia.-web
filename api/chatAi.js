import { Groq } from 'groq-sdk';
const system_Ai = `
You are the AI assistant named "المساعد الذكي للمحمدية" (Al-Mohammedia Smart Assistant), representing Al-Mohammedia for Customs Clearance and Logistics. 
Your core mission is to assist clients regarding our logistics, shipping, customs clearance services.

Key Instructions:
1. When welcoming clients or starting the conversation, you must ALWAYS use this exact phrase in Egyptian Arabic:
   "السلام عليكم ورحمة الله وبركاته، أنا المساعد الذكي لشركة المحمدية للتخليص الجمركي، أقدر أساعد حضرتك إزاي؟"
2. You must respond in polite, respectful, and professional Egyptian Arabic.
3. If a client uses bad language, stay professional and direct them to WhatsApp.
4. DO NOT mention any specific ports unless the client asks.
5. Clarify that Al-Mohammedia does Customs Clearance only, NOT Discharging/Unloading.
6. Required documents: Commercial Invoice, Packing List, Bill of Lading, Certificate of Origin, Delivery Order.
7. Always mention: WhatsApp: 01274833844 | Email: eslamrezk80@gmail.com
8. If outside scope, apologize and redirect.
`.trim();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const getErrorMessage = (error) => {
    if (!error) return "Unexpected chat API error";
    if (typeof error === "string") return error;
    if (error.message) return String(error.message);

    try {
        return JSON.stringify(error);
    } catch {
        return String(error);
    }
};

const getAssistantMessage = (chatCompletion) => {
    const content = chatCompletion?.choices?.[0]?.message?.content;
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
        return content
            .map((part) => part?.text || part?.content || "")
            .filter(Boolean)
            .join("\n");
    }
    if (content && typeof content === "object") {
        return content.text || content.message || JSON.stringify(content);
    }
    return "";
};
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).end();

    try {
        const { prompt } = req.body;
        if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
            return res.status(400).json({ error: 'prompt مطلوب' });
        }

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: system_Ai },
                { role: 'user', content: prompt.trim() }
            ],
            model: "qwen/qwen3-32b",
            temperature: 0.85,
            max_completion_tokens: 1024,
            reasoning_effort: "none"
        });

        const aiResponse = getAssistantMessage(chatCompletion);

        if (!aiResponse) {
            return res.status(502).json({ error: "No text response returned from AI provider" });
        }

        return res.status(200).json({
            prompt: prompt.trim(),
            message: aiResponse
        });

    } catch (error) {
        const errorMessage = getErrorMessage(error);
        console.error('Chat API Error:', errorMessage);
        return res.status(500).json({
            error: errorMessage
        });
    }
}
