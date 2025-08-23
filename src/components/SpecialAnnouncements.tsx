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
  link?: string;
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
        message: "A special page made just to bring a smile to your face, my Radha. 💖",
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

  // Auto-slide
  useEffect(() => {
    if (!isAutoPlaying || announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [announcements.length, isAutoPlaying]);

  const nextAnnouncement = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const prevAnnouncement = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
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
    <section id="announcements" className="mb-12">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Megaphone className="text-yellow-400 w-7 h-7" />
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-rose-300 bg-clip-text text-transparent">
            Special Announcements
          </h2>
          <Sparkles className="text-pink-400 w-7 h-7" />
        </div>
        <p className="text-white/70 text-base max-w-2xl mx-auto">
          Important messages and special moments shared just for you
        </p>
      </motion.div>

      {/* Card Container */}
      <div className="relative max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 60, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative"
          >
            <div
              className={`relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/30 shadow-xl ${
                currentAnnouncement.glowing
                  ? "ring-2 ring-pink-400/50 shadow-pink-500/20"
                  : "shadow-purple-500/10"
              }`}
            >
              {/* Priority */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                  currentAnnouncement.priority === "high"
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                    : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                }`}
              >
                {currentAnnouncement.priority === "high"
                  ? "🔥 High Priority"
                  : "📢 Announcement"}
              </span>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent mb-4"
              >
                {currentAnnouncement.title}
              </motion.h3>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white/90 text-base leading-relaxed mb-4"
              >
                {currentAnnouncement.message}
              </motion.p>

              {/* Link Button */}
              {currentAnnouncement.link && (
                <motion.a
                  href={currentAnnouncement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm font-semibold"
                >
                  💖 Visit Page →
                </motion.a>
              )}

              {/* Date */}
              <div className="text-white/60 text-sm mt-4">
                {formatDate(currentAnnouncement.date)}
              </div>

              {/* Buttons */}
              {announcements.length > 1 && (
                <>
                  <button
                    onClick={prevAnnouncement}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/20 transition"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={nextAnnouncement}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/20 transition"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        {announcements.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-pink-400 shadow-md"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SpecialAnnouncements;
