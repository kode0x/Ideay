import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                Ideay
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-zinc-300 hover:text-rose-400 transition-colors duration-300 font-medium"
            >
              Home
            </Link>

            <a
              href="#how-it-works"
              className="text-zinc-300 hover:text-rose-400 transition-colors duration-300 font-medium"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-zinc-300 hover:text-rose-400 transition-colors duration-300 font-medium"
            >
              Features
            </a>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block"
          >
            <Link
              to="/search"
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Start Exploring
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-zinc-300 hover:text-rose-400 transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4 border-t border-zinc-800">
            <Link
              to="/"
              className="block text-zinc-300 hover:text-rose-400 transition-colors duration-300 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="#how-it-works"
              className="block text-zinc-300 hover:text-rose-400 transition-colors duration-300 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#features"
              className="block text-zinc-300 hover:text-rose-400 transition-colors duration-300 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <div className="pt-4">
              <Link
                to="/search"
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 flex items-center gap-2 justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="w-4 h-4" />
                Start Exploring
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}

export default Navbar;
