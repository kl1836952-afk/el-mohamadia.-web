import React, { useState, useRef, useEffect } from "react";
import { Send, MessageSquare, Loader, AlertCircle, Sparkles } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  loading?: boolean;
}

interface ChatInterfaceProps {
  lang: "ar" | "en";
}

const getReadableText = (value: unknown): string => {
  if (typeof value === "string") return value;
  if (value == null) return "";

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    const nestedText =
      record.message ||
      record.response ||
      record.text ||
      record.error ||
      record.details ||
      record.content;

    if (nestedText && nestedText !== value) {
      const text = getReadableText(nestedText);
      if (text) return text;
    }

    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }

  return String(value);
};

export default function ChatInterface({ lang }: ChatInterfaceProps) {
  const isAr = lang === "ar";
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: isAr
        ? "السلام عليكم ورحمة الله وبركاته، أنا المساعد الذكي لشركة المحمدية للتخليص الجمركي، أقدر أساعد حضرتك إزاي؟"
        : "Hello! I'm the Smart Assistant for Al-Muhammadiyah Customs Clearance. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);
    setError(null);

    try {
      // Create JSON payload with proper UTF-8 encoding
      const payload = {
        prompt: inputValue.trim()
      };

      const jsonString = JSON.stringify(payload);

      // Make API call to the backend
      const response = await fetch("/api/chatAi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Accept": "application/json; charset=utf-8"
        },
        body: jsonString,
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = getReadableText(errorData.error || errorData.message || errorData) || errorMessage;
        } catch (e) {
          // If response is not JSON, use status message
          const text = await response.text().catch(() => "");
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const assistantText = getReadableText(data.message || data.response || data.text || data);

      // Add assistant response to chat
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: assistantText || "لم أتمكن من الحصول على رد",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = getReadableText(err instanceof Error ? err.message : err) || "حدث خطأ غير متوقع";
      console.error('Chat error:', errorMessage);
      setError(errorMessage);

      // Add error message to chat
      const errorMsg: Message = {
        id: (Date.now() + 2).toString(),
        type: "assistant",
        content: isAr
          ? `عذراً، حدث خطأ: ${errorMessage}`
          : `Sorry, an error occurred: ${errorMessage}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        type: "assistant",
        content: isAr
          ? "السلام عليكم ورحمة الله وبركاته، أنا المساعد الذكي لشركة المحمدية للتخليص الجمركي، أقدر أساعد حضرتك إزاي؟"
          : "Hello! I'm the Smart Assistant for Al-Muhammadiyah Customs Clearance. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
    setError(null);
  };

  return (
    <div
      className="flex flex-col h-[600px] bg-gradient-to-b from-[#0f1f35] to-[#0a1420] rounded-2xl border border-blue-900/40 shadow-2xl overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/20 border-b border-blue-900/40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-400/10 rounded-lg">
            <MessageSquare className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-bold text-white">
              {isAr ? "المساعد الذكي" : "Smart Assistant"}
            </h3>
            <p className="text-xs text-slate-400">
              {isAr ? "مساعد جمركي ذكي متاح 24/7" : "AI Customs Assistant • Always Available"}
            </p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="px-3 py-1 text-xs font-semibold text-slate-300 hover:text-white bg-blue-900/20 hover:bg-blue-900/40 rounded-lg transition-colors"
        >
          {isAr ? "مسح" : "Clear"}
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-900/40 scrollbar-track-transparent">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl ${message.type === "user"
                ? "bg-amber-500/20 text-amber-50 border border-amber-500/30"
                : "bg-blue-900/30 text-slate-200 border border-blue-900/40"
                }`}
            >
              <p className="text-sm font-normal leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
              <p className="text-xs mt-2 opacity-60">
                {message.timestamp.toLocaleTimeString(isAr ? "ar-EG" : "en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start animate-fadeIn">
            <div className="bg-blue-900/30 text-slate-200 border border-blue-900/40 px-4 py-3 rounded-2xl flex items-center gap-2">
              <Loader className="h-4 w-4 animate-spin text-amber-400" />
              <span className="text-sm">{isAr ? "جاري الرد..." : "Typing..."}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center animate-fadeIn">
            <div className="bg-red-900/20 text-red-300 border border-red-900/40 px-4 py-3 rounded-2xl flex items-center gap-2 max-w-xs">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={sendMessage}
        className="border-t border-blue-900/40 bg-[#0a1420]/80 px-6 py-4"
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isAr ? "اكتب استفسارك هنا..." : "Type your question here..."}
            disabled={loading}
            className="flex-1 bg-blue-900/20 border border-blue-900/40 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 disabled:opacity-50 transition-all text-sm"
          />
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold flex items-center gap-2"
          >
            {loading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            <span className="hidden sm:inline">{isAr ? "إرسال" : "Send"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
