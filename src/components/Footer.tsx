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
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-zinc-400 text-sm mb-4 md:mb-0 flex justify-between w-full">
              <p>© 2025 Ideay. All Rights Reserved.</p>
              <p>
                Made With{"  "}
                <Heart className="inline w-4 h-4 text-rose-500" /> By
                Jyotiraditya Singh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
