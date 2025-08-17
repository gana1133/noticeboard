import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, X } from "lucide-react";

const MessageToGana: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const sendMessageToTelegram = async (msg: string) => {
    try {
      const response = await fetch(
        "https://api.telegram.org/botYOUR_BOT_TOKEN/sendMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: YOUR_CHAT_ID,
            text: msg,
          }),
        }
      );

      if (response.ok) {
        setStatus("success");
        setMessage("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setStatus("error");
      console.error("Error sending message:", error);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      sendMessageToTelegram(message.trim());
    }
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200">
      {/* Floating hearts & sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400/40"
            style={{
              left: `${(i * 13) % 90}%`,
              top: `${(i * 17) % 80}%`,
              fontSize: `${14 + (i % 3) * 6}px`,
            }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0.2, 0.7, 0.2],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 6 + (i % 4),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          >
            {i % 2 === 0 ? "💖" : "✨"}
          </motion.div>
        ))}
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="text-pink-500 w-10 h-10 fill-current" />
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
              A Message for Gana 💌
            </h2>
            <Heart className="text-pink-500 w-10 h-10 fill-current" />
          </div>
          <p className="text-pink-700/80 text-lg md:text-xl leading-relaxed font-medium">
            Sometimes words left unsaid weigh the most on our hearts.  
            Here, you can whisper your feelings, confessions, or love —  
            and they will reach <span className="font-bold text-pink-600">Gana</span> directly.  
          </p>
        </motion.div>

        {/* Button */}
        <motion.button
          onClick={() => setShowModal(true)}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-xl py-5 px-12 rounded-2xl shadow-2xl transition-all"
        >
          <div className="relative flex items-center gap-3">
            <Send className="w-6 h-6" />
            <span>Send Your Heartfelt Message</span>
          </div>
        </motion.button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl relative"
            >
              <button
                className="absolute top-4 right-4 text-pink-600 hover:text-pink-800"
                onClick={() => setShowModal(false)}
              >
                <X className="w-6 h-6" />
              </button>

              {status === "idle" && (
                <>
                  <h3 className="text-2xl font-bold text-pink-600 mb-4">
                    💕 Write your message for Gana
                  </h3>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full p-4 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-400 focus:outline-none resize-none"
                    placeholder="Pour your heart out..."
                  />
                  <motion.button
                    onClick={handleSend}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-3 rounded-xl font-semibold shadow-md"
                  >
                    Send 💌
                  </motion.button>
                </>
              )}

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <p className="text-2xl font-bold text-pink-600">
                    💌 Your message has been delivered to Gana’s heart!
                  </p>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="mt-6 text-5xl"
                  >
                    💖
                  </motion.div>
                  <button
                    className="mt-6 text-pink-600 font-semibold underline"
                    onClick={() => {
                      setShowModal(false);
                      setStatus("idle");
                    }}
                  >
                    Send Another
                  </button>
                </motion.div>
              )}

              {status === "error" && (
                <div className="text-center py-6">
                  <p className="text-xl text-red-500 font-medium">
                    ❌ Failed to send message. Please try again.
                  </p>
                  <button
                    className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-xl"
                    onClick={() => setStatus("idle")}
                  >
                    Retry
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MessageToGana;
