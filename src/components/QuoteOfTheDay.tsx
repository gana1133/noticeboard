import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, RefreshCw } from 'lucide-react';

interface QuoteData {
  id: number;
  quote: string;
  author: string;
}

const QuoteOfTheDay: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<QuoteData | null>(null);
  const [quotes, setQuotes] = useState<QuoteData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from the JSON file
    const mockQuotes: QuoteData[] = [
      {
        id: 1,
        quote: "In your eyes, I found my home. In your heart, I found my love. In your soul, I found my mate.",
        author: "For राधा"
      },
      {
        id: 2,
        quote: "Every sunrise reminds me of your smile, every sunset of your grace. You are my eternal dawn and dusk.",
        author: "With endless love"
      },
      {
        id: 3,
        quote: "If I could give you one thing in life, I would give you the ability to see yourself through my eyes. Only then would you realize how special you are to me.",
        author: "Forever yours"
      },
      {
        id: 4,
        quote: "You are the poetry I never knew how to write and the song I never knew how to sing.",
        author: "My beloved राधा"
      },
      {
        id: 5,
        quote: "In a sea of people, my eyes will always search for you. In a room full of voices, my ears will always listen for yours.",
        author: "Eternally devoted"
      },
      {
        id: 6,
        quote: "You are my today and all of my tomorrows. My heart beats your name in every rhythm.",
        author: "With all my love"
      },
      {
        id: 7,
        quote: "Distance means nothing when someone means everything. You are my everything, राधा.",
        author: "Always and forever"
      }
    ];
    
    setQuotes(mockQuotes);
    
    // Get quote of the day based on current date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % mockQuotes.length;
    setCurrentQuote(mockQuotes[quoteIndex]);
  }, []);

  const refreshQuote = () => {
    if (quotes.length === 0) return;
    
    setIsRefreshing(true);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
      setIsRefreshing(false);
    }, 500);
  };

  if (!currentQuote) return null;

  return (
    <section id="quote" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Quote className="text-yellow-400 w-8 h-8" />
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            Quote of the Day
          </h2>
        </div>
        <p className="text-white/70 max-w-2xl mx-auto">
          Daily inspiration and words of love, just for you
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
        >
          {/* Decorative quotes */}
          <div className="absolute top-6 left-6 text-6xl text-pink-400/20 font-serif">
            "
          </div>
          <div className="absolute bottom-6 right-6 text-6xl text-pink-400/20 font-serif rotate-180">
            "
          </div>

          {/* Quote content */}
          <motion.div
            key={currentQuote.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center relative z-10"
          >
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 font-light italic">
              {currentQuote.quote}
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent flex-1 max-w-20"></div>
              <p className="text-pink-300 font-medium">
                {currentQuote.author}
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent flex-1 max-w-20"></div>
            </div>
          </motion.div>

          {/* Refresh button */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={refreshQuote}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <motion.div
                animate={isRefreshing ? { rotate: 360 } : {}}
                transition={{ duration: 0.5 }}
              >
                <RefreshCw size={18} />
              </motion.div>
              <span>{isRefreshing ? 'Getting new quote...' : 'New Quote'}</span>
            </motion.button>
          </div>

          {/* Floating hearts decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-400/20"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 2) * 80}%`,
                }}
                animate={{
                  y: [-10, -20, -10],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                💖
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteOfTheDay;