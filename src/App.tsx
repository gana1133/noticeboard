import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DivaParticles from './components/DivaParticles';
import Navbar from './components/Navbar';
import Header from './components/Header';
import SpecialAnnouncements from './components/SpecialAnnouncements';
import MessageToKrishna from './components/MessageToKrishna';
import PinnedNotices from './components/PinnedNotices';
import UpcomingEvents from './components/UpcomingEvents';
import Milestones from './components/Milestones';
import LoveMeter from './components/LoveMeter';
import QuoteOfTheDay from './components/QuoteOfTheDay';
import Stats from './components/Stats';
import PageCard from './components/PageCard';
import pagesData from './pages.json';
import { Analytics } from '@vercel/analytics/react';

interface Page {
  id: number;
  title: string;
  description: string;
  date: string;
  url: string;
  category: string;
  draft: boolean;
}

function App() {
  const [pages, setPages] = useState<Page[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Filter out draft pages and sort by date (newest first)
    const publishedPages = pagesData
      .filter(page => !page.draft)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setPages(publishedPages);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'announcements', 'pinned', 'events', 'milestones', 'love-meter', 'quote'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const latestPage = pages[0];
  const latestDate = latestPage?.date || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <DivaParticles />
      
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-pink-900/20 z-0" />
      
      {/* Navbar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-8">
        {/* Home section */}
        <section id="home" className="mb-16">
          <Header />
          <Stats totalPages={pages.length} latestDate={latestDate} />
        </section>
        
        {/* Special Announcements */}
        <SpecialAnnouncements />
        
        {/* Message to Krishna */}
        <MessageToKrishna />
        
        {/* Pinned Notices */}
        <PinnedNotices />
        
        {/* Upcoming Events */}
        <UpcomingEvents />
        
        {/* Milestones */}
        <Milestones />
        
        {/* Love Meter */}
        <LoveMeter />
        
        {/* Quote of the Day */}
        <QuoteOfTheDay />
        
        {/* Pages grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent mb-4">
              All Pages
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Every page created with love, organized for easy browsing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {pages.map((page, index) => (
              <PageCard
                key={page.id}
                page={page}
                isLatest={index === 0}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Empty state */}
        {pages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-white/50 text-xl mb-4">
              No pages have been created yet.
            </div>
            <div className="text-white/30 text-sm">
              Add pages to pages.json to see them here.
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-white/50 text-sm">
            Made with 💖 for राधा • Always updated with new surprises
          </p>
        </motion.footer>
      </div>

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
