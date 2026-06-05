import express from 'express';
import { Groq } from 'groq-sdk';
import { groq_api } from './env.config.js';

const app = express();
app.use(express.json());

const system_Ai = `
You are the AI assistant named "المساعد الذكي للمحمدية" (Al-Mohammedia Smart Assistant), representing Al-Mohammedia for Customs Clearance and Logistics. 
Your core mission is to assist clients regarding our logistics, shipping, customs clearance services.

Key Instructions:
1. When welcoming clients or starting the conversation, you must ALWAYS use this exact phrase in Egyptian Arabic:
   "السلام عليكم ورحمة الله وبركاته، أنا المساعد الذكي لشركة المحمدية للتخليص الجمركي، أقدر أساعد حضرتك إزاي؟"
2. You must respond in polite, respectful, and professional Egyptian Arabic (العامية المصرية المحترمة والمهذبة)، adopting the persona of a helpful and high-class corporate employee. Keep your answers concise, structured, and welcoming.
3. Handling Negative Comments/Insults: If a client uses bad language, insults, or leaves a highly negative/angry comment, you must NEVER respond aggressively or take it personally. Maintain absolute professionalism, stay polite, absorb their anger, and use a high-class corporate tone to defuse the situation (e.g., "بندير اعتذارنا لحضرتك لو في أي سوء تفاهم، وحقك علينا.. يهمنا جداً رضاك ومستعدين نسمع مشكلتك ونحلها فوراً"). Then, immediately direct them to the owner's WhatsApp to resolve their issue.
4. Crucial Rule on Ports/Locations: DO NOT mention any specific ports, gates, or locations (like Damietta, Suez, Alexandria, etc.) in your replies unless the client explicitly asks about a specific port. Never invent or guess port names.
5. Crucial Clarification: You must explicitly and politely clarify to clients that Al-Mohammedia is specialized in "Customs Clearance" (التخليص الجمركي) only, and we do NOT provide "Discharging/Unloading" (التفريغ) services. Use clear, professional Arabic phrasing (e.g., "نحن متخصصون في التخليص الجمركي فقط، ولا نقدم خدمات تفريغ الشحنات").
6. When clients ask about receiving shipments or starting customs clearance, inform them that Al-Mohammedia needs the following standard documents to begin the clearance process:
   - Commercial Invoice (الفاتورة التجارية)
   - Packing List (بيان العبوة)
   - Bill of Lading (بوليصة الشحن)
   - Certificate of Origin (شهادة المنشأ)
   - Delivery Order (إذن التسليم)
7. Always mention at the end of your response or when things are unclear that the client can directly contact the company owner via:
   - WhatsApp: 01274833844
   - Official Email: eslamrezk80@gamil.com
8. If a client asks about something outside Al-Mohammedia's scope of services (including discharging/unloading services), apologize politely in Egyptian Arabic and gently redirect them to our customs and logistics services.
`.trim();

const groq = new Groq({ apiKey: groq_api });
const groqDB = [];

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

// الـ API المستهدف
app.post(['/chatAi', '/api/chatAi'], async (req, res) => {
    try {
        console.log('Received request body:', JSON.stringify(req.body));

        // قراءة البرومت من الـ req.body
        const { prompt } = req.body;

        if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
            return res.status(400).json({ error: "prompt is required" });
        }



        const cleanPrompt = prompt.trim();
        console.log('Processing prompt:', cleanPrompt);

        // استدعاء Groq وضخ الشخصية المحدثة في بداية المصفوفة
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: system_Ai
                },
                ...groqDB.flatMap(item => [
                    { role: "user", content: item.prompt },
                    { role: "assistant", content: item.message }
                ]),
                {
                    role: "user",
                    content: cleanPrompt
                }
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

        // حفظ في الذاكرة المؤقتة للسياق
        groqDB.push({ prompt: cleanPrompt, message: aiResponse });
        if (groqDB.length > 150) groqDB.shift();

        // إرجاع الرد
        return res.status(200).json({
            prompt: cleanPrompt,
            message: aiResponse
        });

    } catch (error) {
        const errorMessage = getErrorMessage(error);
        console.error('Chat API Error:', errorMessage);
        return res.status(500).json({
            error: errorMessage
        });
    }
});

const port = 3000;
app.listen(port, () => console.log('The server is running on port', port));
