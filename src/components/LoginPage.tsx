import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock, User } from 'lucide-react';
import md5 from "md5"; // ✅ make sure you installed: npm install md5

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Store the MD5 hash of the correct password "142314"
  const correctPasswordHash = "8f14e45fceea167a5a36dedd4bea2543";

  // ✅ Check password with MD5 hash
  const checkPassword = (inputPassword: string): boolean => {
    const inputHash = md5(inputPassword);
    return inputHash === correctPasswordHash;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    if (checkPassword(password)) {
      onLoginSuccess();
    } else {
      setError('Sorry wrong, try again Radha 💔');
    }

    setIsLoading(false);
  };

  // Floating hearts animation data
  const floatingHearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 15,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 4,
  }));

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500">
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/50 via-purple-400/50 to-blue-400/50 animate-pulse" />
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-300/40"
            style={{
              fontSize: `${heart.size}px`,
              left: `${heart.x}%`,
              top: `${heart.y}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 0.7, 0.3],
              rotate: [-10, 10, -10],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💖
          </motion.div>
        ))}
      </div>

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Glassmorphism card */}
        <div className="backdrop-blur-xl bg-white/20 rounded-3xl p-8 shadow-2xl border border-white/30 relative overflow-hidden">
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl" />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Heart className="w-16 h-16 text-pink-300 fill-current mx-auto" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-white/80 text-sm">
              Enter your details to access the notice board
            </p>
          </motion.div>

          {/* Login form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onSubmit={handleLogin}
            className="space-y-6"
          >
            {/* Username field */}
            <div className="relative">
              <label className="block text-white/90 text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="text"
                  value="mylove"
                  readOnly
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-transparent transition-all duration-300 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="relative">
              <label className="block text-white/90 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-transparent transition-all duration-300 focus:bg-white/20"
                  required
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-300 text-sm text-center bg-red-500/20 rounded-lg p-3 border border-red-400/30"
              >
                {error}
              </motion.div>
            )}

            {/* Login button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                </div>
              )}
              <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
                Login
              </span>
            </motion.button>

            {/* ✅ Hint Section Updated */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center bg-white/10 rounded-xl p-4 border border-white/20"
            >
              <p className="text-white/60 text-xs">
                <span className="font-semibold text-white/80">Hint:</span> gana birthday, yours birthday, the day he saw you first (6-digit password format) <span className="font-bold text-pink-300">{`{GGGGGG}`}</span>
              </p>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>

      {/* Additional magical effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
    </div>
  );
};

export default LoginPage;
