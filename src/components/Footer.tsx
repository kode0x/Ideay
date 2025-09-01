import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                Ideay
              </span>
            </div>
            <p className="text-zinc-400 mb-6 max-w-md leading-relaxed">
              Discover your next million-dollar SaaS idea with our AI-powered
              Reddit scraper. We analyze trending discussions to surface
              innovative business opportunities.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/kode0x/Ideay"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-rose-400 transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-rose-400 transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-rose-400 transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@ideay.com"
                className="text-zinc-400 hover:text-rose-400 transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-zinc-400 hover:text-rose-400 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-zinc-400 hover:text-rose-400 transition-colors duration-300"
                >
                  Communities
                </Link>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-zinc-400 hover:text-rose-400 transition-colors duration-300"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-zinc-400 hover:text-rose-400 transition-colors duration-300"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/kode0x/Ideay/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-rose-400 transition-colors duration-300"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/kode0x/Ideay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-rose-400 transition-colors duration-300"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@ideay.com"
                  className="text-zinc-400 hover:text-rose-400 transition-colors duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-zinc-400 hover:text-rose-400 transition-colors duration-300"
                >
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 mb-12"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with Latest Ideas
            </h3>
            <p className="text-zinc-400 mb-6 max-w-md mx-auto">
              Get notified about trending SaaS opportunities and market insights
              delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-rose-500 transition-colors duration-300"
              />
              <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-zinc-400 text-sm mb-4 md:mb-0">
              © 2025 Ideay. All rights reserved. Made with{" "}
              <Heart className="inline w-4 h-4 text-rose-500" /> by Jyotiraditya
              Singh.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-zinc-400 hover:text-rose-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-rose-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-rose-400 transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
