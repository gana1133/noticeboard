import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send } from 'lucide-react';

const MessageToGana: React.FC = () => {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // ✅ for custom modal

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
        setShowModal(true); // ✅ show modal instead of alert
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
    <>
      <section className="relative py-10 md:py-14 px-4 md:px-6 overflow-hidden flex justify-center items-center 
        bg-gradient-to-b from-pink-100 via-purple-200/40 to-pink-100">
        
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
              animate={{
                y: [-15, -30, -15],
                opacity: [0.2, 0.7, 0.2],
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: 7 + (i % 4),
                repeat: Infinity,
                delay: i * 0.5,
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
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md mx-auto text-center 
            bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 md:p-8 border border-pink-200"
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
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl md:text-5xl mb-3"
          >
            💌
          </motion.div>

          {/* Subtext */}
          <p className="text-pink-700/80 text-base md:text-lg max-w-sm mx-auto mb-4">
            Write your feelings, your thoughts, or even your silence...<br />
            <span className="font-semibold text-pink-600">
              Gana will listen to you and he will respond to you 💖
            </span>
          </p>

          {/* Input box */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write from your heart..."
            className="w-full rounded-xl p-3 text-base border border-pink-300 
              focus:outline-none focus:ring-4 focus:ring-pink-400/70 focus:border-pink-500 
              bg-white/70 text-gray-800 mb-4 shadow-inner resize-none transition-all duration-300"
            rows={3}
          />

          {/* Send Button */}
          <motion.button
            onClick={handleSendMessage}
            whileHover={{ scale: 1.05, boxShadow: '0 12px 24px rgba(236, 72, 153, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-full md:w-auto bg-gradient-to-r from-pink-500 to-rose-400 
              hover:from-pink-600 hover:to-rose-500 text-white font-medium text-base 
              py-3 px-6 rounded-full shadow-md transition-all duration-300 ease-in-out"
          >
            <div className="relative flex items-center justify-center gap-2">
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              <span>Send to Gana</span>
            </div>
          </motion.button>

          {/* Small caption */}
          <p className="mt-3 text-xs text-pink-600 italic">
            🌸 Always love you Radha
          </p>

          {/* Reply simulation */}
          {message !== "" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-3 text-sm text-pink-700 italic"
            >
              💬 Gana will reply soon…
            </motion.p>
          )}
        </motion.div>
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
              🌸 Your words have reached Gana…  
              he will be there for you, always 💖
            </p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default MessageToGana;
