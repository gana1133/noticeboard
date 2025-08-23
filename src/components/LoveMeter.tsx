import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap } from 'lucide-react';

const LoveMeter: React.FC = () => {
  const [lovePercentage, setLovePercentage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Calculate love percentage based on time (always increasing!)
    const startDate = new Date('2024-01-01');
    const now = new Date();
    const daysPassed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    // Love grows every day, but caps at 100% (though it's really infinite!)
    const basePercentage = Math.min(95 + (daysPassed % 5), 100);
    setLovePercentage(basePercentage);
  }, []);

  // Telegram message sender
  const sendMessageToTelegram = async (text: string) => {
    try {
      await fetch("https://api.telegram.org/botYOUR_BOT/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: 809190054, // Gana's chat id
          text,
        }),
      });
    } catch (error) {
      console.error("❌ Failed to send Telegram notification:", error);
    }
  };

  const handleHeartClick = () => {
    setIsAnimating(true);

    // Temporarily boost the love meter
    setLovePercentage(100);

    // Send Telegram notification
    sendMessageToTelegram(
      `💖 Radha just filled your heart with love! (Love Meter: 100%)`
    );

    setTimeout(() => {
      setIsAnimating(false);
      // Return to calculated percentage after animation
      const startDate = new Date('2024-01-01');
      const now = new Date();
      const daysPassed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const basePercentage = Math.min(95 + (daysPassed % 5), 100);
      setLovePercentage(basePercentage);
    }, 3000);
  };

  const getHeartColor = () => {
    if (lovePercentage >= 90) return 'text-pink-400';
    if (lovePercentage >= 70) return 'text-rose-400';
    if (lovePercentage >= 50) return 'text-red-400';
    return 'text-gray-400';
  };

  const getMeterColor = () => {
    if (lovePercentage >= 90) return 'from-pink-500 to-rose-500';
    if (lovePercentage >= 70) return 'from-rose-500 to-red-500';
    if (lovePercentage >= 50) return 'from-red-500 to-pink-500';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <section id="love-meter" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="text-pink-400 w-8 h-8 fill-current" />
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            Love Meter
          </h2>
        </div>
        <p className="text-white/70 max-w-2xl mx-auto">
          A measure of the infinite love that grows stronger every day
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
        >
          {/* Main heart display */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleHeartClick}
              className="cursor-pointer inline-block"
              animate={isAnimating ? {
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              } : {}}
              transition={{ duration: 0.5, repeat: isAnimating ? 3 : 0 }}
            >
              <Heart 
                className={`w-24 h-24 md:w-32 md:h-32 ${getHeartColor()} fill-current transition-colors duration-500`}
                style={{
                  filter: isAnimating ? 'drop-shadow(0 0 20px rgba(244, 114, 182, 0.8))' : 'none'
                }}
              />
            </motion.div>
          </div>

          {/* Percentage display */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent mb-2"
            >
              {lovePercentage}%
            </motion.div>
            <p className="text-white/80 text-lg">
              {lovePercentage === 100 ? "Infinite Love Achieved! 💖" : "Growing Every Day"}
            </p>
          </div>

          {/* Progress bar */}
          <div className="relative mb-8">
            <div className="w-full bg-white/20 rounded-full h-6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${lovePercentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
                className={`h-full bg-gradient-to-r ${getMeterColor()} rounded-full relative overflow-hidden`}
              >
                {/* Animated shine effect */}
                <motion.div
                  animate={{ x: [-100, 300] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />
              </motion.div>
            </div>
            
            {/* Sparkle effects */}
            {isAnimating && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, x: '50%', y: '50%' }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0, 1, 0],
                      x: `${50 + (Math.random() - 0.5) * 200}%`,
                      y: `${50 + (Math.random() - 0.5) * 200}%`
                    }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="absolute"
                  >
                    <Zap className="text-yellow-400 w-4 h-4" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Fun facts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl font-bold text-pink-300 mb-1">∞</div>
              <div className="text-white/70 text-sm">Actual Love Level</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl font-bold text-pink-300 mb-1">24/7</div>
              <div className="text-white/70 text-sm">Always Growing</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-2xl font-bold text-pink-300 mb-1">💖</div>
              <div className="text-white/70 text-sm">Pure & True</div>
            </div>
          </div>

          {/* Click hint */}
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center text-white/50 text-sm mt-6"
          >
            Click the heart for a love boost! 💕
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveMeter;
