"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageSquareMore, Send, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    messages: [
      {
        id: "greeting",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hi there! I'm Dai Phan. Ask me anything about my experience and skills!",
          },
        ],
      },
    ] as UIMessage[],
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getMessageText = (message: (typeof messages)[number]) =>
    message.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("") || "";

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        ) : (
          <MessageSquareMore className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        )}
      </motion.button>

      {/* Chat Window */}
      <motion.div
        className={`fixed bottom-20 sm:bottom-28 right-4 sm:right-8 w-[calc(100vw-32px)] max-w-[320px] sm:max-w-[384px] h-[400px] sm:h-[500px] bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden ${
          isOpen ? "block" : "hidden"
        }`}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={
          isOpen
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.8, y: 20 }
        }
        transition={{ duration: 0.3 }}
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-cyan-500/30 p-3 sm:p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">
                DP
              </span>
            </div>
            <div className="ml-3">
              <h3 className="text-white font-semibold text-sm sm:text-base">
                DP&apos;s AI Assistant
              </h3>
              <p className="text-cyan-300 text-xs hidden sm:block">
                Ask me anything about Dai&apos;s skills and experience
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-xl sm:rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    : "bg-white/10 backdrop-blur-sm border border-cyan-500/20 text-white"
                }`}
              >
                {getMessageText(message)}
              </div>
            </div>
          ))}
          {isLoading && !getMessageText(messages[messages.length - 1]) && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-xl sm:rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm border border-cyan-500/20 text-white">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim() && !isLoading) {
              sendMessage({ text: input });
              setInput("");
            }
          }}
          className="border-t border-cyan-500/30 p-3 sm:p-4"
        >
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 border border-cyan-500/30 rounded-full text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:border-cyan-400"
              disabled={isLoading}
            />
            <motion.button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              <Send className="h-4 w-4 mt-2 rotate-[-45deg] sm:h-5 sm:w-5 " />
            </motion.button>
          </div>
        </form>
      </motion.div>
    </>
  );
}
