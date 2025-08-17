"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Send } from "lucide-react";

const MessageToGana: React.FC = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessageToTelegram = async () => {
    if (!message.trim()) {
      alert("Please write something from your heart 💌");
      return;
    }

    const confirmed = confirm(`Do you want to send this message to Gana? 💖\n\n"${message}"`);
    if (!confirmed) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.telegram.org/bot7731464090:AAEvV2Ut-_1sfBO7ifjNCWZYo3s5X1DeXr0/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: "809190054",
            text: `💌 New Message for Gana:\n\n${message}`,
          }),
        }
      );

      if (response.ok) {
        alert("✅ Your message has reached Gana 💖 He will respond to you soon.");
        setMessage("");
      } else {
        alert("❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("⚠️ Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-pink-50 via-rose-100 to-pink-50 overflow-hidden">
      {/* floating background hearts */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400"
            initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
            animate={{ y: "-10vh" }}
            transition={{ duration: 8 + Math.random() * 5, repeat: Infinity, delay: i * 0.8 }}
          >
            ❤️
          </motion.div>
        ))}
      </motion.div>

      <div className="relative max-w-3xl mx-auto text-center backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl p-12 border border-pink-200">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-pink-700 flex justify-center items-center gap-3">
            <Heart className="w-8 h-8 text-rose-500 animate-pulse" />
            Message to Gana
            <Heart className="w-8 h-8 text-rose-500 animate-pulse" />
          </h2>
          <p className="mt-4 text-lg md:text-xl text-pink-700/80">
            Write your heart here 💌 Your words will reach Gana, and he will respond for you.
          </p>
        </motion.div>

        {/* Input area */}
        <motion.div
          className="mt-8 flex flex-col gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your heartfelt message..."
            className="w-full h-40 p-4 rounded-2xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 shadow-inner"
          />
          <motion.button
            onClick={sendMessageToTelegram}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:shadow-pink-300 transition-all"
          >
            {loading ? "Sending..." : "Send to Gana"}
            <Send className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default MessageToGana;
