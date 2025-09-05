"use client";
import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };
type Chat = { id: string; title: string; messages: Message[] };

export default function ChatDemo() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");

  const activeChat = chats.find((c) => c.id === activeChatId);

  async function sendMessage() {
    if (!input.trim() || !activeChatId) return;

    // Add user message
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [...chat.messages, { role: "user", content: input }],
            }
          : chat
      )
    );

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHAT_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          ...(activeChat?.messages || []),
          { role: "user", content: input },
        ],
      }),
    });

    const data = await res.json();
    const reply =
      data.choices?.[0]?.message?.content ??
      data?.error?.message ??
      "No response";

    // Add assistant reply
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { role: "assistant", content: reply },
              ],
            }
          : chat
      )
    );

    setInput("");
  }

  function newChat() {
    const id = Date.now().toString();
    setChats((prev) => [
      ...prev,
      { id, title: `Chat ${prev.length + 1}`, messages: [] },
    ]);
    setActiveChatId(id);
  }

  function deleteChat(id: string) {
    setChats((prev) => prev.filter((chat) => chat.id !== id));
    if (id === activeChatId) setActiveChatId(null);
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 p-4 flex flex-col gap-2">
        <button
          onClick={newChat}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          + New Chat
        </button>

        <div className="flex-1 overflow-y-auto mt-4 space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-2 rounded cursor-pointer flex justify-between items-center ${
                chat.id === activeChatId
                  ? "bg-blue-500 text-white"
                  : "bg-white shadow"
              }`}
              onClick={() => setActiveChatId(chat.id)}
            >
              <span className="truncate">{chat.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 bg-gray-100">
        <header className="bg-blue-600 text-white p-4 text-lg font-semibold shadow">
          {activeChat ? activeChat.title : "Select or Create a Chat"}
        </header>

        <main className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeChat?.messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl max-w-[70%] ${
                msg.role === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-white shadow"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </main>

        {activeChat && (
          <footer className="p-4 bg-white border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Send
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
