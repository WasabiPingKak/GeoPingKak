"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAssistantChat } from "@/hooks/useAssistantChat";
import type { ChatMessage } from "@/types/assistant";

function AssistantMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
        ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 my-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 my-1">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        a: ({ href, children }) => (
          <a href={href || "#"} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-blue-600 text-white rounded-br-md"
            : "bg-zinc-700 text-zinc-100 rounded-bl-md"
        }`}
      >
        {isUser ? message.content : <AssistantMarkdown content={message.content} />}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-zinc-700 rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

const EXAMPLE_QUESTIONS = [
  "怎麼從車牌辨認歐洲國家？",
  "非洲有哪些國家有街景覆蓋？",
  "什麼是 NMPZ？",
  "怎麼判斷南半球還是北半球？",
];

export default function AssistantClient() {
  const { messages, isLoading, error, sendMessage, clearMessages } = useAssistantChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleExampleClick = (question: string) => {
    sendMessage(question);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] max-w-3xl">
      {/* 標題列 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">GeoGuessr 助手</h1>
          <p className="text-muted-foreground text-sm mt-1">
            問我任何跟 GeoGuessr 相關的問題
          </p>
        </div>
        {hasMessages && (
          <button
            onClick={clearMessages}
            className="text-sm text-zinc-400 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-zinc-700"
          >
            清除對話
          </button>
        )}
      </div>

      {/* 對話區域 */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 sidebar-scroll">
        {!hasMessages && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-5xl mb-4">🦆</div>
            <p className="text-zinc-400 text-sm mb-6">
              我可以幫你解答 GeoGuessr 的地理辨識技巧、遊戲策略或任何相關問題。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {EXAMPLE_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleExampleClick(q)}
                  className="text-left text-sm text-zinc-300 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 hover:bg-zinc-700 hover:border-zinc-600 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isLoading && <TypingIndicator />}

        {error && (
          <div className="flex justify-start">
            <div className="bg-red-900/50 border border-red-700 text-red-300 rounded-2xl rounded-bl-md px-4 py-3 text-sm max-w-[85%]">
              {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 輸入區 */}
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="輸入你的問題..."
          rows={1}
          className="flex-1 resize-none rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-500 placeholder:text-zinc-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          送出
        </button>
      </form>
    </div>
  );
}
