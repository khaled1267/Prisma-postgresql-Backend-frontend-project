"use client";

import { useState, useRef, useEffect } from "react";
import PageContainer from "@/components/ui/PageContainer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ProductCard from "@/components/products/ProductCard";
import aiService from "@/services/ai.service";
import { ChatMessage } from "@/types/ai";
import { formatDate } from "@/utils/formatters";
import {
  Bot,
  User,
  Send,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Trash2,
  Cpu,
  RefreshCw,
} from "lucide-react";

const SUGGESTED_QUESTIONS = [
  "Which AI drone is best for beginner aerial video?",
  "Recommend smart wearables with long battery life",
  "Show high performance noise-canceling headsets in stock",
  "Compare AI smart glasses vs standard AR glasses",
];

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backendNotice, setBackendNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue.trim();
    if (!query || isLoading) return;

    setBackendNotice(null);

    // Append user message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      content: query,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsLoading(true);

    try {
      // API Call to /api/ai/chat
      const response = await aiService.sendMessage({ message: query });

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "assistant",
        content: response.reply,
        recommendedProducts: response.recommendedProducts,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorText =
        err.response?.data?.message ||
        err.message ||
        "Failed to connect to backend AI assistant endpoint.";

      setBackendNotice(errorText);

      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "assistant",
        content: errorText,
        isError: true,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setBackendNotice(null);
  };

  return (
    <PageContainer maxWidth="7xl" className="py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
            <Sparkles className="w-4 h-4 text-warning" />
            <span>AI Hardware Assistant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
            GadgetAI <span className="gradient-title">Copilot</span>
          </h1>
        </div>

        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearChat}
            className="text-error hover:bg-error/10"
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            Clear Conversation
          </Button>
        )}
      </div>

      {/* Main Chat Container */}
      <div className="bg-base-200 border border-base-300 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[650px]">
        
        {/* Chat Header Bar */}
        <div className="bg-base-300/60 p-4 border-b border-base-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-base-100 shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-base-content flex items-center gap-2">
                GadgetAI Assistant
                <span className="badge badge-success badge-xs gap-1 font-bold text-[9px] text-base-100">
                  ONLINE
                </span>
              </div>
              <div className="text-[10px] text-base-content/60">
                Powered by backend AI intelligence (/api/ai/chat)
              </div>
            </div>
          </div>
        </div>

        {/* Backend Warning Banner if Endpoint Missing */}
        {backendNotice && (
          <div className="bg-warning/10 border-b border-warning/20 p-3 px-6 text-xs text-warning flex items-center justify-between font-bold">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{backendNotice}</span>
            </div>
            <button
              onClick={() => setBackendNotice(null)}
              className="btn btn-ghost btn-xs btn-circle text-warning"
            >
              ✕
            </button>
          </div>
        )}

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Welcome Screen when Chat is Empty */}
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6">
              <div className="p-4 rounded-3xl bg-primary/10 text-primary border border-primary/20 shadow-xl">
                <Cpu className="w-12 h-12" />
              </div>

              <div className="max-w-md space-y-2">
                <h2 className="text-xl font-black text-base-content">
                  Ask Me Anything About Gadgets!
                </h2>
                <p className="text-xs text-base-content/60 leading-relaxed">
                  I can help you analyze hardware specifications, discover top-rated gadgets, compare features, and get personal recommendations.
                </p>
              </div>

              {/* Suggested Starter Questions */}
              <div className="w-full max-w-lg space-y-2 pt-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-base-content/50 flex items-center justify-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" /> Suggested Queries
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                  {SUGGESTED_QUESTIONS.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(question)}
                      className="p-3 bg-base-100 hover:bg-base-300 rounded-2xl border border-base-300 text-xs text-base-content/80 hover:text-primary transition font-semibold flex items-center justify-between group"
                    >
                      <span className="line-clamp-2">{question}</span>
                      <Sparkles className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Conversation Bubble Entries */}
          {messages.map((msg) => {
            const isUser = msg.sender === "user";

            return (
              <div
                key={msg.id}
                className={`flex gap-3 items-start ${isUser ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs shadow-md ${
                    isUser
                      ? "bg-primary text-base-100"
                      : msg.isError
                      ? "bg-error text-white"
                      : "bg-gradient-to-tr from-primary to-secondary text-base-100"
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Content Bubble */}
                <div className={`space-y-2 max-w-[80%] ${isUser ? "text-right" : "text-left"}`}>
                  <div
                    className={`p-4 rounded-3xl text-xs leading-relaxed shadow-lg ${
                      isUser
                        ? "bg-primary text-primary-content font-medium rounded-tr-none"
                        : msg.isError
                        ? "bg-error/10 border border-error/30 text-error rounded-tl-none font-semibold"
                        : "bg-base-100 border border-base-300 text-base-content rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Render Product Recommendation Cards if present */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div className="pt-2 space-y-2">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                        Recommended Hardware ({msg.recommendedProducts.length})
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {msg.recommendedProducts.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timestamp */}
                  <div className="text-[9px] text-base-content/40 px-1">
                    {formatDate(msg.timestamp)}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary text-base-100 flex items-center justify-center shrink-0 shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-base-100 border border-base-300 p-3 px-4 rounded-3xl rounded-tl-none flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                <span className="text-[10px] text-base-content/50 font-bold ml-1">AI Copilot is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-base-300/60 border-t border-base-300">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2 items-center"
          >
            <div className="flex-1">
              <Input
                placeholder="Ask GadgetAI copilot about hardware specs, recommendations..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                leftIcon={<Sparkles className="w-4 h-4 text-primary" />}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!inputValue.trim() || isLoading}
              isLoading={isLoading}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Send
            </Button>
          </form>
        </div>

      </div>

    </PageContainer>
  );
}
