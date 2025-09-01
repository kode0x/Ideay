import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-2 rounded-full text-sm font-medium mb-8"
        >
          <TrendingUp className="w-4 h-4" />
          <span>AI-Powered SaaS Discovery Platform</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white"
        >
          Discover Winning{" "}
          <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
            SaaS
          </span>{" "}
          Ideas From{" "}
          <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
            Reddit
          </span>{" "}
          In Minutes
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl lg:text-2xl text-zinc-300 mx-auto max-w-4xl mb-12 leading-relaxed"
        >
          Let our intelligent scraper analyze Reddit's vast discussions to surface
          trending SaaS opportunities, innovative solutions, and niche business
          ideas that could be your next million-dollar venture.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-8 mb-12"
        >
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">15+</div>
            <div className="text-zinc-400 text-sm">Curated Communities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">24/7</div>
            <div className="text-zinc-400 text-sm">Real-time Monitoring</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">AI</div>
            <div className="text-zinc-400 text-sm">Powered Analysis</div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.8,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/search"
            className="group bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-rose-500/25 transition-all duration-300 flex items-center gap-2 hover:scale-105"
          >
            Generate Ideas Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="border border-zinc-600 text-zinc-300 px-8 py-4 rounded-xl font-medium text-lg hover:border-rose-500 hover:text-rose-400 transition-all duration-300 hover:scale-105">
            Watch Demo
          </button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-16 pt-8 border-t border-zinc-800"
        >
          <p className="text-zinc-500 text-sm mb-4">Trusted by entrepreneurs worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
            <div className="text-zinc-400 text-sm">🚀 Startup Founders</div>
            <div className="text-zinc-400 text-sm">💼 Product Managers</div>
            <div className="text-zinc-400 text-sm">👨‍💻 Developers</div>
            <div className="text-zinc-400 text-sm">📈 Growth Hackers</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
