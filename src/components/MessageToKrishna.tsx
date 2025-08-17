import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Send } from "lucide-react";

const MessageToGana: React.FC = () => {
  const [message, setMessage] = useState("");
  const [showNoteBox, setShowNoteBox] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const sendMessageToTelegram = async (text: string) => {
    try {
      const response = await fetch(
        "https://api.telegram.org/bot7731464090:AAEvV2JmckYlg9HyrS40pDUDVofU-VosoQ4/sendMessage",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: 809190054,
            text,
          }),
        }
      );
      if (response.ok) {
        setShowModal(true);
        setMessage("");
        setShowNoteBox(false);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      alert("❌ Failed to send message. Please try again.");
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      {/* Section */}
      <section className="relative py-10 md:py-14 px-4 md:px-6 overflow-hidden flex flex-col items-center bg-transparent">
        {/* Floating sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300/30"
              style={{
                left: `${(i * 13) % 100}%`,
                top: `${(i * 19) % 100}%`,
                fontSize: `${12 + (i % 4) * 4}px`,
              }}
              animate={{ y: [-15, -30, -15], opacity: [0.2, 0.7, 0.2], rotate: [0, 8, -8, 0] }}
              transition={{ duration: 7 + (i % 4), repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            >
              ✨
            </motion.div>
          ))}
        </div>

        {/* Title */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="text-pink-500 w-6 h-6 fill-current" />
          <h2 className="text-2xl md:text-3xl font-bold text-pink-600">
            Message to your Gana
          </h2>
          <Heart className="text-pink-500 w-6 h-6 fill-current" />
        </div>

        {/* Floating envelope */}
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-4xl md:text-5xl mb-4">
          💌
        </motion.div>

        {/* Center message */}
        <div className="text-center max-w-sm mb-6">
          <p className="text-pink-700/80 text-sm md:text-base mb-1">
            Whatever happens, in every joy or every pain…
          </p>
          <p className="text-pink-600 font-semibold text-sm md:text-base leading-relaxed">
            Your Gana is always here for you 💖 <br />
            Every word you share here will reach him, and he will always respond with love 🌸
          </p>
        </div>

        {/* Two buttons */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Miss You Button */}
          <motion.button
            onClick={() => sendMessageToTelegram("Radha clicked 'Miss You 💖'")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-2xl shadow-md hover:bg-pink-600 transition"
          >
            Miss You 💖
          </motion.button>

          {/* Send a Note Button + input */}
          <div className="flex flex-col items-center">
            {!showNoteBox ? (
              <motion.button
                onClick={() => setShowNoteBox(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-2xl shadow-md hover:bg-purple-600 transition"
              >
                Send a Note 💌
              </motion.button>
            ) : (
              <div className="flex flex-col items-center mt-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write from your heart..."
                  className="w-64 rounded-xl p-3 border border-pink-300 focus:outline-none focus:ring-4 focus:ring-purple-400 bg-white/70 text-gray-800 shadow-inner resize-none transition-all duration-300"
                  rows={3}
                />
                <motion.button
                  onClick={() => {
                    if (message.trim()) {
                      sendMessageToTelegram(`💌 Radha’s Note: ${message.trim()}`);
                    } else {
                      alert("Please write something 💖");
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-xl shadow-md hover:from-pink-600 hover:to-rose-500 transition"
                >
                  <Send className="inline w-4 h-4 mr-2" />
                  Send Note
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Small caption */}
        <p className="mt-4 text-xs text-pink-600 italic">🌸 Always love you Radha</p>

      </section>

      {/* Custom modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-6 text-center max-w-sm"
          >
            <p className="text-pink-600 text-lg font-semibold">
              🌸 Your words have reached Gana… he will be there for you, always 💖
            </p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default MessageToGana;
