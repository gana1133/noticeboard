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
        "https://api.telegram.org/botYOUR_BOT/sendMessage",
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
      <section className="relative py-8 md:py-10 px-4 md:px-6 flex flex-col items-center">
        {/* Floating sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300/30"
              style={{
                left: `${(i * 13) % 100}%`,
                top: `${(i * 19) % 100}%`,
                fontSize: `${10 + (i % 4) * 3}px`,
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0.2, 0.6, 0.2],
                rotate: [0, 6, -6, 0],
              }}
              transition={{
                duration: 6 + (i % 3),
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>

        {/* White Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-xl w-full border border-gray-100"
        >
          {/* Indirect Title */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="text-pink-500 w-5 h-5 fill-current" />
            <h2 className="text-xl md:text-2xl font-bold text-pink-600 text-center">
              💌 A Few Words That Always Find Their Way to You
            </h2>
            <Heart className="text-pink-500 w-5 h-5 fill-current" />
          </div>

          {/* Floating envelope */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl md:text-4xl mb-3 text-center"
          >
            💌
          </motion.div>

          {/* Center message */}
          <div className="text-center max-w-md mx-auto mb-6">
            <p className="text-pink-700/80 text-sm md:text-base mb-2">
              Whatever happens, in every joy or every pain…
            </p>
            <p className="text-pink-600 font-medium text-sm md:text-base leading-relaxed mb-4">
              Your Gana is always here for you 💖 <br />
              Every word you share here will reach him, and he will always
              respond with love 🌸
            </p>

            {/* Instructions */}
            <div className="bg-pink-50 rounded-xl p-3 mb-5 border border-pink-100 text-sm">
              <p className="text-pink-700 leading-relaxed">
                💕 <strong>If you miss him</strong> – Click "Miss You"<br />
                💌 <strong>If you want to send a note</strong> – Click "Send a
                Note" and he will definitely respond with love
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {/* Miss You Button */}
            <motion.button
              onClick={() =>
                sendMessageToTelegram("Radha clicked 'Miss You 💖'")
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              Miss You 💖
            </motion.button>

            {/* Send Note */}
            <div className="flex flex-col items-center">
              {!showNoteBox ? (
                <motion.button
                  onClick={() => setShowNoteBox(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Send a Note 💌
                </motion.button>
              ) : (
                <div className="flex flex-col items-center w-full max-w-sm">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write from your heart..."
                    className="w-full rounded-lg p-3 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-purple-400/30 bg-pink-50/70 text-gray-800 resize-none transition mb-3 text-sm"
                    rows={3}
                  />
                  <motion.button
                    onClick={() => {
                      if (message.trim()) {
                        sendMessageToTelegram(
                          `💌 Radha's Note: ${message.trim()}`
                        );
                      } else {
                        alert("Please write something 💖");
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-2 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    Send Note
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* Caption */}
          <p className="mt-5 text-center text-xs text-pink-600 italic">
            🌸 Always love you Radha
          </p>
        </motion.div>
      </section>

      {/* Confirmation Modal */}
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
            className="bg-white rounded-xl shadow-lg p-6 text-center max-w-sm mx-4"
          >
            <div className="text-3xl mb-3">💖</div>
            <p className="text-pink-600 text-base font-semibold mb-1">
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
