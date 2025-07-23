"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Sparkles, Bot, User, Loader2 } from "lucide-react"
import PageTransition from "../components/PageTransition"

const Chatbot = () => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("http://localhost:8000/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      })

      const data = await res.json()
      const botMessage = {
        role: "bot",
        content: data.response || "⚠️ Sorry, I couldn't understand that.",
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "❌ Error contacting the assistant." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-6 py-20 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-lime-500/10 border border-lime-400/20 text-lime-300 text-sm">
            <Sparkles className="w-4 h-4" />
            AI Eco-Chatbot
          </div>
          <h1 className="text-4xl font-semibold">Talk Sustainability with AI</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Ask your eco-assistant anything about recycling, waste management, and green living.
          </p>
        </motion.div>

        {/* Chat Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl bg-neutral-900 border border-white/10 p-6 h-[400px] overflow-y-auto space-y-4 shadow-xl"
        >
          {messages.length === 0 && !loading && (
            <div className="text-center text-gray-500 pt-20">
              🤖 Ask me anything eco-friendly!
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "bot" && (
                <div className="bg-lime-500 text-black rounded-full p-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`rounded-lg px-4 py-2 max-w-xs whitespace-pre-wrap text-sm ${
                  msg.role === "user"
                    ? "bg-lime-500 text-neutral-900"
                    : "bg-neutral-800 text-gray-200"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="bg-gray-600 text-white rounded-full p-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="bg-lime-500 text-black rounded-full p-1">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-neutral-800 text-gray-400 rounded-lg px-4 py-2 text-sm">
                <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
                Thinking...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </motion.div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Ask me anything green..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-neutral-800 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-3 bg-lime-500 hover:bg-lime-400 text-neutral-900 rounded-lg transition-colors flex items-center gap-2 font-medium disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </form>
      </div>
    </PageTransition>
  )
}

export default Chatbot
