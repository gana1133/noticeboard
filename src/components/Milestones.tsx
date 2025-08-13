import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp } from 'lucide-react';

interface Milestone {
  id: number;
  title: string;
  description: string;
  type: 'days' | 'count';
  count?: number;
  icon: string;
}

interface MilestoneData {
  startDate: string;
  milestones: Milestone[];
}

const Milestones: React.FC = () => {
  const [milestoneData, setMilestoneData] = useState<MilestoneData | null>(null);
  const [daysSinceStart, setDaysSinceStart] = useState(0);

  useEffect(() => {
    // In a real app, this would fetch from the JSON file
    const mockMilestoneData: MilestoneData = {
  startDate: "2019-12-14", // the day your "phase" with Radha started
  milestones: [
    {
      id: 1,
      title: "Days Since First Sight",
      description: "Every day since that 3:10–3:30 break has been filled with hope and longing",
      type: "days",
      icon: "📖"
    },
    {
      id: 2,
      title: "Moments Shared",
      description: "Every glance, every smile, every small interaction we've had",
      type: "count",
      count: 1500, // you can estimate total meaningful moments
      icon: "✨"
    },
    {
      id: 3,
      title: "Love Letters & Messages",
      description: "All the words I've written and shared with you, silently or aloud",
      type: "count",
      count: 50, // total proposals, messages, and letters combined
      icon: "💌"
    },
    {
      id: 4,
      title: "Promises in Heart",
      description: "Vows and silent commitments I will carry forever",
      type: "count",
      count: 7, // your sacred promises
      icon: "🤝"
    }
  ]
};

    setMilestoneData(mockMilestoneData);

    // Calculate days since start
    const startDate = new Date(mockMilestoneData.startDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysSinceStart(diffDays);
  }, []);

  if (!milestoneData) return null;

  const getMilestoneValue = (milestone: Milestone) => {
    if (milestone.type === 'days') {
      return daysSinceStart;
    }
    return milestone.count || 0;
  };

  return (
    <section id="milestones" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="text-yellow-400 w-8 h-8" />
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            Milestones
          </h2>
        </div>
        <p className="text-white/70 max-w-2xl mx-auto">
          Celebrating our journey together and the beautiful moments we've created
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {milestoneData.milestones.map((milestone, index) => (
          <motion.div
            key={milestone.id}
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
            <motion.div
              whileHover={{
                rotateX: 5,
                rotateY: 5,
                scale: 1.02,
              }}
              transition={{ duration: 0.2 }}
              className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 h-full border border-white/20 shadow-2xl group-hover:shadow-pink-500/25 group-hover:shadow-2xl transition-all duration-300 text-center"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Icon */}
              <div className="text-4xl mb-4">
                {milestone.icon}
              </div>

              {/* Value */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent mb-2"
              >
                {getMilestoneValue(milestone).toLocaleString()}
              </motion.div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                {milestone.title}
              </h3>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed">
                {milestone.description}
              </p>

              {/* Trending indicator */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-4 right-4"
              >
                <TrendingUp className="text-green-400 w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Milestones;