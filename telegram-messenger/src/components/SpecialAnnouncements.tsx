'use client';

import React from 'react';

const SpecialAnnouncements: React.FC = () => {
  const announcements = [
    {
      id: 1,
      title: "Welcome to Our Platform! 🎉",
      message: "We're excited to have you here. This is where special updates and important news will be shared.",
      date: "2024-01-15",
      priority: "high"
    },
    {
      id: 2,
      title: "New Features Coming Soon ✨",
      message: "Stay tuned for exciting new features that will enhance your experience with us.",
      date: "2024-01-10",
      priority: "medium"
    }
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          📢 Special Announcements
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Important updates and news you need to know about
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
              announcement.priority === 'high' 
                ? 'bg-red-100 text-red-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {announcement.priority === 'high' ? '🔥 High Priority' : '📢 Announcement'}
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {announcement.title}
            </h3>
            
            <p className="text-gray-600 leading-relaxed mb-4">
              {announcement.message}
            </p>
            
            <div className="text-gray-400 text-sm">
              {new Date(announcement.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialAnnouncements;