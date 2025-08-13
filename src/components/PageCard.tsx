import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Heart } from 'lucide-react';

interface Page {
  id: number;
  title: string;
  description: string;
  date: string;
  url: string;
  category: string;
  draft: boolean;
}

interface PageCardProps {
  page: Page;
  isLatest: boolean;
  index: number;
}

const PageCard: React.FC<PageCardProps> = ({ page, isLatest, index }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Promises': 'from-pink-400 to-rose-400',
      'Letters': 'from-purple-400 to-pink-400',
      'Memories': 'from-blue-400 to-purple-400',
      'Dreams': 'from-indigo-400 to-blue-400',
      'Poetry': 'from-rose-400 to-pink-400',
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="relative group"
    >
      {/* Latest page ribbon */}
      {isLatest && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-2 -right-2 z-10"
        >
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <Heart size={12} className="fill-current" />
            New
          </div>
        </motion.div>
      )}

      {/* Glowing border for latest page */}
      {isLatest && (
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 rounded-2xl opacity-60 blur-sm animate-pulse" />
      )}

      <motion.div
        whileHover={{
          rotateX: 5,
          rotateY: 5,
          scale: 1.02,
        }}
        transition={{ duration: 0.2 }}
        className={`
          relative bg-white/10 backdrop-blur-md rounded-2xl p-6 h-full
          border border-white/20 shadow-2xl
          ${isLatest ? 'ring-2 ring-pink-400/50' : ''}
          group-hover:shadow-pink-500/25 group-hover:shadow-2xl
          transition-all duration-300
        `}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Category badge */}
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(page.category)} mb-4`}>
          {page.category}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-300 transition-colors duration-300">
          {page.title}
        </h3>

        {/* Description */}
        <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
          {page.description}
        </p>

        {/* Date */}
        <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
          <Calendar size={16} />
          <span>{formatDate(page.date)}</span>
        </div>

        {/* Action button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={() => window.open(page.url, '_blank')}
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group/btn"
          >
            <span>Visit Page</span>
            <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PageCard;