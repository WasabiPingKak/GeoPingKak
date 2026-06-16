import { useState, useCallback, useRef, useEffect } from "react";
import type { ChatMessage, AskResponse } from "@/types/assistant";

const API_BASE = process.env.NEXT_PUBLIC_ASSISTANT_API_BASE || "";

export function useAssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/assistant/status`)
      .then((res) => {
        setIsDisabled(res.status === 403);
      })
      .catch(() => {
        setIsDisabled(false);
      });
  }, []);

  const sendMessage = useCallback(async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    };

    const history = messagesRef.current.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const updatedWithUser = [...messagesRef.current, userMsg];
    messagesRef.current = updatedWithUser;
    setMessages(updatedWithUser);
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/assistant/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed, history }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        if (res.status === 403 && body?.error === "assistant_disabled") {
          setIsDisabled(true);
          return;
        }
        throw new Error(body?.error || `請求失敗（${res.status}）`);
      }

      const data: AskResponse = await res.json();

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.answer,
        timestamp: Date.now(),
      };

      const updatedWithAssistant = [...messagesRef.current, assistantMsg];
      messagesRef.current = updatedWithAssistant;
      setMessages(updatedWithAssistant);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "發生未知錯誤";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearMessages = useCallback(() => {
    messagesRef.current = [];
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isLoading, error, isDisabled, sendMessage, clearMessages };
}
