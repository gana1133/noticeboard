import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Megaphone, Star, Sparkles } from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  message: string;
  date: string;
  priority: string;
  glowing: boolean;
  link?: string; // New optional link field
}

const SpecialAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const mockAnnouncements: Announcement[] = [
      {
        id: 1,
        title: "Smile Radha 😊",
        message:
          "A special page made just to bring a smile to your face, my Radha. 💖",
        date: "2025-08-10",
        priority: "high",
        glowing: true,
        link: "https://smileradha.vercel.app/",
      },
      {
        id: 2,
        title: "The Day My Heart First Knew You 💖",
        message:
          "On December 14, 2019, during the short break, our eyes met for the first time. That moment still lives in my heart, untouched by time.",
        date: "2019-12-14",
        priority: "medium",
        glowing: true,
      },
      {
        id: 3,
        title: "Every Day, I Whispered Your Name ✨",
        message:
          "Each day, without fail, your name slipped from my lips in silence… a prayer, a promise, and a piece of my soul that will always belong to you.",
        date: "∞",
        priority: "medium",
        glowing: false,
      },
      {
        id: 4,
        title: "A Promise Kept in Silence 🌸",
        message:
          "Even in quiet days, I keep my promise — you are my forever in my heart, no matter where life takes us.",
        date: "2025-05-26",
        priority: "medium",
        glowing: true,
      },
    ];
    setAnnouncements(mockAnnouncements);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || announcements.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [announcements.length, isAutoPlaying]);

  const nextAnnouncement = () => {
    setIsAutoPlaying(false); // Stop auto-play when user manually navigates
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const prevAnnouncement = () => {
    setIsAutoPlaying(false); // Stop auto-play when user manually navigates
    setCurrentIndex(
      (prev) => (prev - 1 + announcements.length) % announcements.length
    );
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  if (announcements.length === 0) return null;

  const currentAnnouncement = announcements[currentIndex];

  const formatDate = (dateStr: string) => {
    if (dateStr === "∞") return "Forever";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section id="announcements" className="mb-16">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400/20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
              fontSize: `${16 + (i % 3) * 8}px`,
            }}
            animate={{
              y: [-10, -20, -10],
              rotate: [0, 10, -10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            ⭐
          </motion.div>
        ))}
      </div>

      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 relative z-10"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Megaphone className="text-yellow-400 w-10 h-10" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-rose-300 bg-clip-text text-transparent">
            Special Announcements
          </h2>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <Sparkles className="text-pink-400 w-10 h-10" />
          </motion.div>
        </div>
        <p className="text-white/80 text-lg max-w-3xl mx-auto">
          Important messages and special moments shared just for you
        </p>
        
        {/* Special indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 rounded-full border border-yellow-400/30"
        >
          <Star className="text-yellow-400 w-4 h-4 fill-current" />
          <span className="text-yellow-300 text-sm font-medium">Extra Special</span>
          <Star className="text-yellow-400 w-4 h-4 fill-current" />
        </motion.div>
      </motion.div>

      {/* Announcement Card */}
      <div className="relative max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative"
          >
            {/* Glowing border */}
            {currentAnnouncement.glowing && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-yellow-400 rounded-3xl opacity-60 blur-lg animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-400 to-rose-400 rounded-3xl opacity-40 blur-md animate-pulse" style={{ animationDelay: '1s' }} />
              </>
            )}

            {/* Card */}
            <div
              className={`relative group bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-10 md:p-16 border border-white/30 shadow-2xl ${
                currentAnnouncement.glowing ? "ring-2 ring-pink-400/60 shadow-pink-500/25" : "shadow-purple-500/10"
              }`}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-4 left-4 text-yellow-400/30">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div className="absolute top-4 right-4 text-pink-400/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="absolute bottom-4 left-4 text-rose-400/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="absolute bottom-4 right-4 text-yellow-400/30">
                <Star className="w-6 h-6 fill-current" />
              </div>

              {/* Priority Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
                  currentAnnouncement.priority === "high"
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30"
                    : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30"
                } border border-white/20`}
              >
                {currentAnnouncement.priority === "high"
                  ? "🔥 High Priority"
                  : "📢 Announcement"}
              </motion.div>

              {/* Title */}
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent mb-8 leading-tight"
              >
                {currentAnnouncement.title}
              </motion.h3>

              {/* Message */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/95 text-xl leading-relaxed mb-8 font-light"
              >
                {currentAnnouncement.message}
              </motion.p>

              {/* Button if link exists */}
              {currentAnnouncement.link && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <a
                    href={currentAnnouncement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-pink-500/40 hover:scale-105 transition-all duration-300 font-semibold text-lg border border-pink-400/30"
                  >
                    <span>💖 Visit Page</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </a>
                </motion.div>
              )}

              {/* Date */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/70 text-base mt-6 font-medium"
              >
                {formatDate(currentAnnouncement.date)}
              </motion.div>

              {/* Navigation Buttons */}
              {announcements.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevAnnouncement}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-full p-4 text-white hover:from-white/30 hover:to-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg border border-white/20"
                  >
                    <ChevronLeft size={28} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextAnnouncement}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-full p-4 text-white hover:from-white/30 hover:to-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg border border-white/20"
                  >
                    <ChevronRight size={28} />
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        {announcements.length > 1 && (
          <div className="flex justify-center gap-3 mt-8">
            {announcements.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-pink-400 to-rose-400 border-pink-300 shadow-lg shadow-pink-400/50"
                    : "bg-white/20 border-white/40 hover:bg-white/40 hover:border-white/60"
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Auto-play indicator */}
        {announcements.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-4"
          >
            <p className="text-white/50 text-sm">
              {isAutoPlaying ? "Auto-playing • Click navigation to pause" : "Auto-play paused"}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SpecialAnnouncements;
