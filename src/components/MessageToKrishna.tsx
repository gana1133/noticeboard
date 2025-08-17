import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Send } from 'lucide-react';

const MessageToKrishna: React.FC = () => {
  const sendMessageToTelegram = async (message: string) => {
    try {
      const response = await fetch('https://api.telegram.org/bot7731464090:AAEvV2JmckYlg9HyrS40pDUDVofU-VosoQ4/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: 809190054,
          text: message,
        }),
      });

      if (response.ok) {
        alert('Message sent successfully 💖');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
    }
  };

  const handleSendMessage = () => {
    const message = prompt('Enter your heartfelt message:');
    
    if (message && message.trim()) {
      const confirmed = confirm(`Do you want to send this message to Gana: ${message} ?`);
      
      if (confirmed) {
        sendMessageToTelegram(message.trim());
      }
    }
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden flex justify-center items-center bg-gradient-to-b from-purple-900 via-pink-200 to-purple-900">
      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/20"
            style={{
              left: `${(i * 12) % 90}%`,
              top: `${(i * 18) % 80}%`,
              fontSize: `${14 + (i % 3) * 6}px`,
            }}
            animate={{
              y: [-10, -25, -10],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 6 + (i % 3),
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            💖
          </motion.div>
        ))}
      </div>

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-2xl mx-auto text-center bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-pink-200"
      >
        {/* Title */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Heart className="text-pink-500 w-8 h-8 fill-current" />
          <h2 className="text-4xl font-extrabold text-pink-600">
            Message to Gana ✨
          </h2>
          <Heart className="text-pink-500 w-8 h-8 fill-current" />
        </div>

        {/* Envelope Emoji */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          💌
        </motion.div>

        {/* Subtext */}
        <p className="text-pink-700/80 text-lg md:text-xl max-w-xl mx-auto mb-8">
          Write your thoughts, feelings, or anything from your heart.<br />
          <span className="font-semibold text-pink-600">Gana will respond to you. 💫</span>
        </p>

        {/* Button */}
        <motion.button
          onClick={handleSendMessage}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 15px 30px rgba(236, 72, 153, 0.4)',
          }}
          whileTap={{ scale: 0.95 }}
          className="group relative bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-semibold text-lg md:text-xl py-4 px-10 rounded-full shadow-lg transition-all duration-300 ease-in-out"
        >
          <div className="relative flex items-center gap-3">
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            <span>Send Message</span>
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💌
            </motion.span>
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default MessageToKrishna;
