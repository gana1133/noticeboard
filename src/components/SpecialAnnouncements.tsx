import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Megaphone } from "lucide-react";

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

  const nextAnnouncement = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const prevAnnouncement = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + announcements.length) % announcements.length
    );
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
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Megaphone className="text-yellow-400 w-8 h-8" />
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            Special Announcements
          </h2>
        </div>
        <p className="text-white/70 max-w-2xl mx-auto">
          Important messages and special moments shared just for you
        </p>
      </motion.div>

      {/* Announcement Card */}
      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Glowing border */}
            {currentAnnouncement.glowing && (
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 rounded-3xl opacity-60 blur-sm animate-pulse" />
            )}

            {/* Card */}
            <div
              className={`relative group bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl ${
                currentAnnouncement.glowing ? "ring-2 ring-pink-400/50" : ""
              }`}
            >
              {/* Priority Badge */}
              <div
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
                  currentAnnouncement.priority === "high"
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                    : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                }`}
              >
                {currentAnnouncement.priority === "high"
                  ? "🔥 High Priority"
                  : "📢 Announcement"}
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                {currentAnnouncement.title}
              </h3>

              {/* Message */}
              <p className="text-white/90 text-lg leading-relaxed mb-6">
                {currentAnnouncement.message}
              </p>

              {/* Button if link exists */}
              {currentAnnouncement.link && (
                <a
                  href={currentAnnouncement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  💖 Visit Page
                </a>
              )}

              {/* Date */}
              <div className="text-white/60 text-sm mt-4">
                {formatDate(currentAnnouncement.date)}
              </div>

              {/* Navigation Buttons */}
              {announcements.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevAnnouncement}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <ChevronLeft size={24} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextAnnouncement}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        {announcements.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {announcements.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex
                    ? "bg-pink-400"
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
