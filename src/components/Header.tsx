import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12 relative z-10"
    >
      {/* Decorative elements */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="text-yellow-400 w-8 h-8" />
        </motion.div>
      </div>

      {/* Main title */}
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent mb-4"
      >
        राधा Notice Board
      </motion.h1>

      {/* Subtitle with heart animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-2 text-white/90 text-lg md:text-xl font-medium mb-2"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="text-pink-400 w-6 h-6 fill-current" />
        </motion.div>
        <span>Pages Created with Love</span>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <Heart className="text-pink-400 w-6 h-6 fill-current" />
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-white/70 text-sm md:text-base max-w-2xl mx-auto"
      >
        A special place where every page is crafted with devotion, just for you. 
        Visit anytime to discover new expressions of love and care.
      </motion.p>
    </motion.header>
  );
};

export default Header;