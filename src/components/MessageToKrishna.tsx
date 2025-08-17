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
      const confirmed = confirm(`Do you want to send this message to Krishna: ${message} ?`);
      
      if (confirmed) {
        sendMessageToTelegram(message.trim());
      }
    }
  };

  return (
    <section className="relative py-16 px-4 overflow-hidden" style={{ backgroundColor: '#ffe6f0' }}>
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/30"
            style={{
              left: `${10 + (i * 8) % 80}%`,
              top: `${20 + (i * 15) % 60}%`,
              fontSize: `${12 + (i % 3) * 4}px`,
            }}
            animate={{
              y: [-10, -25, -10],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            💖
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="text-pink-500 w-10 h-10 fill-current" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent">
              Send Your Heartfelt Message
            </h2>
            <Heart className="text-pink-500 w-10 h-10 fill-current" />
          </div>
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            💌
          </motion.div>
          
          <p className="text-pink-700/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Share your thoughts, feelings, or anything that's in your heart. 
            Your message will reach Krishna directly.
          </p>
        </motion.div>

        {/* Send Message Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            onClick={handleSendMessage}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(236, 72, 153, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-600 hover:to-pink-500 text-white font-bold text-xl md:text-2xl py-6 px-12 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out transform"
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            
            {/* Button content */}
            <div className="relative flex items-center gap-3">
              <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
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

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex justify-center gap-8"
        >
          {['💕', '✨', '🌸', '✨', '💕'].map((emoji, index) => (
            <motion.div
              key={index}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className="text-2xl"
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MessageToKrishna;
