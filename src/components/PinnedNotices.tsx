import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pin, ExternalLink, Calendar } from 'lucide-react';

interface PinnedNotice {
  id: number;
  title: string;
  description: string;
  date: string;
  url: string;
  category: string;
  pinned: boolean;
}

const PinnedNotices: React.FC = () => {
  const [pinnedNotices, setPinnedNotices] = useState<PinnedNotice[]>([]);

  useEffect(() => {
    const mockPinnedNotices: PinnedNotice[] = [
      {
        id: 1,
        title: "First Ever Page for You ❤️",
        description: "The very first page I created just for you — the beginning of putting my love into words and design.",
        date: "2025-01-05",
        url: "https://blushaura.netlify.app/",
        category: "Memories",
        pinned: true
      },
      {
        id: 2,
        title: "Your Birthday Celebration 🎂",
        description: "A special page made to celebrate the day you came into this world — my most precious day after meeting you.",
        date: "2025-04-23",
        url: "https://birthdaydayforyouradha.netlify.app/",
        category: "Special Days",
        pinned: true
      }
    ];

    setPinnedNotices(mockPinnedNotices);
  }, []);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Memories': 'from-blue-400 to-purple-400',
      'Special Days': 'from-pink-400 to-rose-400',
      'Letters': 'from-purple-400 to-pink-400',
      'Dreams': 'from-indigo-400 to-blue-400',
      'Poetry': 'from-rose-400 to-pink-400',
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (pinnedNotices.length === 0) return null;

  return (
    <section id="pinned" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Pin className="text-yellow-400 w-8 h-8" />
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            Pinned Notices
          </h2>
        </div>
        <p className="text-white/70 max-w-2xl mx-auto">
          Important pages that deserve special attention, always at the top
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {pinnedNotices.map((notice, index) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.2 }
            }}
            className="relative group"
          >
            {/* Pinned badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="absolute -top-2 -right-2 z-10"
            >
              <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                <Pin size={12} />
                Pinned
              </div>
            </motion.div>

            {/* Glowing border for pinned items */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 rounded-2xl opacity-40 blur-sm" />

            <motion.div
              whileHover={{
                rotateX: 5,
                rotateY: 5,
                scale: 1.02,
              }}
              transition={{ duration: 0.2 }}
              className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 h-full border border-white/20 shadow-2xl ring-2 ring-yellow-400/30 group-hover:shadow-yellow-500/25 group-hover:shadow-2xl transition-all duration-300"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Category badge */}
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(notice.category)} mb-4`}>
                {notice.category}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-300 transition-colors duration-300">
                {notice.title}
              </h3>

              {/* Description */}
              <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
                {notice.description}
              </p>

              {/* Date */}
              <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
                <Calendar size={16} />
                <span>{formatDate(notice.date)}</span>
              </div>

              {/* Action button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => window.open(notice.url, '_blank')}
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group/btn"
                >
                  <span>Visit Page</span>
                  <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PinnedNotices;
