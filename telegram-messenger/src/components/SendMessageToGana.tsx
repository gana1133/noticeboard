'use client';

import React, { useState } from 'react';

const SendMessageToGana: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      alert('Please enter a message before sending.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Message sent successfully 💖');
        setMessage(''); // Clear the textarea after successful send
      } else {
        alert('Failed to send message');
        console.error('Error:', data.error);
      }
    } catch (error) {
      alert('Failed to send message');
      console.error('Network error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
          💌 Send Message to Gana
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Share your thoughts, feedback, or just say hello! Your message will be sent directly to Gana.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          {/* Message Textarea */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none transition-all duration-200"
              disabled={isLoading}
            />
            <div className="text-right text-sm text-gray-400 mt-1">
              {message.length} characters
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !message.trim()}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-300 transform ${
              isLoading || !message.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 hover:scale-105 hover:shadow-lg active:scale-95'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span>Send to Telegram</span>
                <span>💌</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SendMessageToGana;