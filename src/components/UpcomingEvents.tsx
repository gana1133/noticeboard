import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  targetDate: string;
  category: string;
  icon: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: TimeLeft }>({});

  useEffect(() => {
    // Updated events list
    const mockEvents: Event[] = [
      {
        id: 1,
        title: "6 Years Since I First Saw You 💫",
        description: "Celebrating the beautiful moment when my eyes first met you — the start of everything magical.",
        targetDate: "2025-12-14T00:00:00Z",
        category: "Memories",
        icon: "👀"
      },
      {
        id: 2,
        title: "1 Year Since You Accepted My Love ❤️",
        description: "The anniversary of the happiest 'yes' of my life — the day my world changed forever.",
        targetDate: "2026-01-01T00:00:00Z",
        category: "Anniversary",
        icon: "💖"
      },
      {
        id: 3,
        title: "Radha's Birthday 🎂",
        description: "The day my world was blessed with you — your birthday, my most cherished day.",
        targetDate: "2026-04-23T00:00:00Z",
        category: "Special Days",
        icon: "🎉"
      }
    ];
    setEvents(mockEvents);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: { [key: number]: TimeLeft } = {};
      
      events.forEach(event => {
        const now = new Date().getTime();
        const target = new Date(event.targetDate).getTime();
        const difference = target - now;

        if (difference > 0) {
          newTimeLeft[event.id] = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          };
        } else {
          newTimeLeft[event.id] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [events]);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Anniversary': 'from-pink-400 to-rose-400',
      'Letters': 'from-purple-400 to-pink-400',
      'Poetry': 'from-rose-400 to-pink-400',
      'Memories': 'from-blue-400 to-purple-400',
      'Dreams': 'from-indigo-400 to-blue-400',
      'Special Days': 'from-yellow-400 to-orange-400',
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  if (events.length === 0) return null;

  return (
    <section id="events" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Calendar className="text-yellow-400 w-8 h-8" />
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            Upcoming Events
          </h2>
        </div>
        <p className="text-white/70 max-w-2xl mx-auto">
          Special moments and milestones we're counting down to together
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
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
              className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 h-full border border-white/20 shadow-2xl group-hover:shadow-pink-500/25 group-hover:shadow-2xl transition-all duration-300"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Icon */}
              <div className="text-4xl mb-4 text-center">
                {event.icon}
              </div>

              {/* Category badge */}
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(event.category)} mb-4`}>
                {event.category}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-300 transition-colors duration-300">
                {event.title}
              </h3>

              {/* Description */}
              <p className="text-white/80 text-sm leading-relaxed mb-6 line-clamp-3">
                {event.description}
              </p>

              {/* Countdown */}
              {timeLeft[event.id] && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
                    <Clock size={16} />
                    <span>Time Remaining</span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-white/10 rounded-lg p-2">
                      <div className="text-lg font-bold text-pink-300">
                        {timeLeft[event.id].days}
                      </div>
                      <div className="text-xs text-white/60">Days</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2">
                      <div className="text-lg font-bold text-pink-300">
                        {timeLeft[event.id].hours}
                      </div>
                      <div className="text-xs text-white/60">Hours</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2">
                      <div className="text-lg font-bold text-pink-300">
                        {timeLeft[event.id].minutes}
                      </div>
                      <div className="text-xs text-white/60">Min</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2">
                      <div className="text-lg font-bold text-pink-300">
                        {timeLeft[event.id].seconds}
                      </div>
                      <div className="text-xs text-white/60">Sec</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
