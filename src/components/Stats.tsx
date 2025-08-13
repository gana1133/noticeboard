import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Heart } from 'lucide-react';

interface StatsProps {
  totalPages: number;
  latestDate: string;
}

const Stats: React.FC<StatsProps> = ({ totalPages, latestDate }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const stats = [
    {
      icon: FileText,
      value: totalPages,
      label: 'Total Pages',
      color: 'text-yellow-400',
    },
    {
      icon: Calendar,
      value: formatDate(latestDate),
      label: 'Last Updated',
      color: 'text-pink-400',
    },
    {
      icon: Heart,
      value: '∞',
      label: 'Love Given',
      color: 'text-rose-400',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-wrap justify-center gap-6 mb-12"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 border border-white/20 shadow-lg"
        >
          <div className={`${stat.color} p-2 rounded-xl bg-white/10`}>
            <stat.icon size={24} />
          </div>
          <div>
            <div className={`text-xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-white/70 text-sm">
              {stat.label}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Stats;