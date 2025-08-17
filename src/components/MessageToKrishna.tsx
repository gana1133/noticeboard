import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send } from 'lucide-react';

const MessageToKrishna: React.FC = () => {
  const [message, setMessage] = useState("");

  const sendMessageToTelegram = async (message: string) => {
    try {
      const response = await fetch(
        'https://api.telegram.org/bot7731464090:AAEvV2JmckYlg9HyrS40pDUDVofU-VosoQ4/sendMessage',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: 809190054,
            text: message,
          }),
        }
      );

      if (response.ok) {
        alert('✨ Your message reached Krishna 💖');
        setMessage("");
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('❌ Failed to send message. Please try again.');
      console.error('Error sending message:', error);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessageToTelegram(message.trim());
    } else {
      alert("Please write something from your heart 💌");
    }
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden flex justify-center items-center bg-gradient-to-b from-purple-900 via-pink-300/40 to-purple-900">
      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/30"
            style={{
              left: `${(i * 13) % 100}%`,
              top: `${(i * 19) % 100}%`,
              fontSize: `${14 + (i % 4) * 5}px`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.2, 0.8, 0.2],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 8 + (i % 4),
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Message Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-2xl mx-auto text-center bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-pink-200"
      >
        {/* Title */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Heart className="text-pink-500 w-8 h-8 fill-current" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-pink-600">
            Message to Krishna 💫
          </h2>
          <Heart className="text-pink-500 w-8 h-8 fill-current" />
        </div>

        {/* Floating envelope */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          💌
        </motion.div>

        {/* Subtext */}
        <p className="text-pink-700/80 text-lg md:text-xl max-w-xl mx-auto mb-6">
          Write your feelings, your thoughts, or even your silence...<br />
          <span className="font-semibold text-pink-600">
            Krishna will hear you instantly 💖
          </span>
        </p>

        {/* Input box */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write from your heart..."
          className="w-full rounded-2xl p-4 text-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/70 text-gray-800 mb-6 shadow-inner resize-none"
          rows={4}
        />

        {/* Send Button */}
        <motion.button
          onClick={handleSendMessage}
          whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(236, 72, 153, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          className="group relative bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-semibold text-lg py-4 px-10 rounded-full shadow-lg transition-all duration-300 ease-in-out"
        >
          <div className="relative flex items-center gap-3">
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            <span>Send to Krishna</span>
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default MessageToKrishna;
