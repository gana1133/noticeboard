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

        {/* White Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full border border-gray-100"
        >
          {/* Title */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="text-pink-500 w-6 h-6 fill-current" />
            <h2 className="text-2xl md:text-3xl font-bold text-pink-600">
              Message to your Gana
            </h2>
            <Heart className="text-pink-500 w-6 h-6 fill-current" />
          </div>

          {/* Floating envelope */}
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-4xl md:text-5xl mb-4 text-center">
            💌
          </motion.div>

          {/* Center message */}
          <div className="text-center max-w-lg mx-auto mb-8">
            <p className="text-pink-700/80 text-sm md:text-base mb-3">
              Whatever happens, in every joy or every pain…
            </p>
            <p className="text-pink-600 font-semibold text-sm md:text-base leading-relaxed mb-6">
              Your Gana is always here for you 💖 <br />
              Every word you share here will reach him, and he will always respond with love 🌸
            </p>
            
            {/* Instructions */}
            <div className="bg-pink-50 rounded-2xl p-4 mb-6 border border-pink-100">
              <p className="text-pink-700 text-sm leading-relaxed">
                💕 <strong>If you miss him</strong> - Click the "Miss You" button<br />
                💌 <strong>If you want to send a note</strong> - Click "Send a Note" and he will definitely respond to you with love
              </p>
            </div>
          </div>

          {/* Two buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {/* Miss You Button */}
            <motion.button
              onClick={() => sendMessageToTelegram("Radha clicked 'Miss You 💖'")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300"
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
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
                >
                  Send a Note 💌
                </motion.button>
              ) : (
                <div className="flex flex-col items-center w-full max-w-sm">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write from your heart..."
                    className="w-full rounded-xl p-4 border-2 border-pink-300 focus:outline-none focus:ring-4 focus:ring-purple-400/30 focus:border-purple-400 bg-pink-50/50 text-gray-800 shadow-inner resize-none transition-all duration-300 mb-3"
                    rows={4}
                  />
                  <motion.button
                    onClick={() => {
                      if (message.trim()) {
                        sendMessageToTelegram(`💌 Radha's Note: ${message.trim()}`);
                      } else {
                        alert("Please write something 💖");
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-rose-500 transition-all duration-300 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Note
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* Small caption */}
          <p className="mt-6 text-center text-sm text-pink-600 italic font-medium">
            🌸 Always love you Radha
          </p>
        </div>
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
            className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm mx-4"
          >
            <div className="text-4xl mb-4">💖</div>
            <p className="text-pink-600 text-lg font-semibold mb-2">
              Message Sent Successfully!
            </p>
            <p className="text-pink-500 text-sm">
              🌸 Your words have reached Gana… he will be there for you, always 💖
            </p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default MessageToGana;