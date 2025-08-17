import SpecialAnnouncements from '@/components/SpecialAnnouncements';
import SendMessageToGana from '@/components/SendMessageToGana';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Welcome to Our Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest announcements and connect with us directly through our messaging system.
          </p>
        </div>

        {/* Special Announcements Section */}
        <SpecialAnnouncements />

        {/* Send Message to Gana Section */}
        <SendMessageToGana />

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Made with 💖 using Next.js 14 and Tailwind CSS
          </p>
        </footer>
      </div>
    </main>
  );
}