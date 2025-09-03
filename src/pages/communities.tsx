import Navbar from "../components/Navbar";
import { communities } from "../constants/Communities";
import { sort } from "../constants/Sort";
import { communityIcons } from "../constants/CommunityIcons";
import { sortIcons } from "../constants/SortIcons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Users, ArrowRight, Filter, Zap } from "lucide-react";

function Communities() {
  const navigate = useNavigate();
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(
    null
  );

  const handleCommunitySelect = (community: {
    id: number;
    title: string;
    link: string;
  }) => {
    console.log("Selected community:", community.title);
    setSelectedCommunity(community.title);
  };

  const handleSortSelect = (sortItem: { id: number; title: string }) => {
    console.log("Selected Sort:", sortItem.title);
    console.log("For community:", selectedCommunity);
    navigate(
      `/posts?community=${encodeURIComponent(
        selectedCommunity!
      )}&sort=${encodeURIComponent(sortItem.title)}`
    );
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <Navbar />

      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-pink-500/5"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-500/30 text-rose-400 px-6 py-3 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Search className="w-4 h-4" />
              <span>Choose Your Community</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
            >
              Discover{" "}
              <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                Trending
              </span>{" "}
              SaaS Ideas
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-zinc-400 max-w-4xl mx-auto leading-relaxed"
            >
              Select from our curated list of Reddit communities where
              entrepreneurs, developers, and innovators share their latest ideas
              and insights.
            </motion.p>
          </motion.div>

          {/* Communities Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Popular Communities
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-zinc-400 text-lg"
              >
                Choose the community that matches your interests
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {communities.map((item, index) => {
                const IconComponent =
                  communityIcons[item.title as keyof typeof communityIcons] ||
                  Users;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.8 + index * 0.05,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative"
                  >
                    <button
                      onClick={() => handleCommunitySelect(item)}
                      className={`w-full relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border border-zinc-700/50 rounded-3xl p-6 text-left transition-all duration-500 hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-500/20 hover:bg-gradient-to-br hover:from-zinc-800/90 hover:to-zinc-700/90 ${
                        selectedCommunity === item.title
                          ? "border-rose-500/70 bg-gradient-to-br from-rose-500/10 to-pink-500/10 shadow-2xl shadow-rose-500/20"
                          : ""
                      }`}
                    >
                      {/* Background glow effect */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                          selectedCommunity === item.title ? "opacity-100" : ""
                        }`}
                      ></div>

                      {/* Icon */}
                      <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-rose-500/25">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-rose-400 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-zinc-400 text-sm">
                          Explore trending discussions and ideas
                        </p>
                      </div>

                      {/* Selection indicator */}
                      {selectedCommunity === item.title && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, type: "spring" }}
                          className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center"
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </motion.div>
                      )}

                      {/* Hover effect line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Sort Section - Only show when a community is selected */}
          <AnimatePresence>
            {selectedCommunity && (
              <motion.div
                initial={{ opacity: 0, y: 50, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -50, height: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  height: { duration: 0.4 },
                }}
                className="overflow-hidden"
              >
                <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border border-zinc-700/50 rounded-3xl p-12 backdrop-blur-sm">
                  <div className="text-center mb-12">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-500/30 text-rose-400 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm"
                    >
                      <Filter className="w-4 h-4" />
                      <span>Choose Sorting Method</span>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-3xl md:text-4xl font-bold text-white mb-4"
                    >
                      Sort Posts In{" "}
                      <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                        {selectedCommunity}
                      </span>
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-zinc-400 text-lg"
                    >
                      Select how you want to view the posts
                    </motion.p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {sort.map((item, index) => {
                      const SortIconComponent =
                        sortIcons[item.title as keyof typeof sortIcons] || Zap;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.5 + index * 0.1,
                          }}
                          whileHover={{ y: -5, scale: 1.02 }}
                          className="group"
                        >
                          <button
                            onClick={() => handleSortSelect(item)}
                            className="w-full bg-gradient-to-br from-zinc-800/90 to-zinc-700/90 border border-zinc-600/50 rounded-2xl p-6 text-center transition-all duration-300 hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-500/20 hover:bg-gradient-to-br hover:from-zinc-700/90 hover:to-zinc-600/90"
                          >
                            {/* Icon */}
                            <div className="w-16 h-16 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-rose-500/20">
                              <SortIconComponent className="w-8 h-8 text-rose-400" />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-rose-400 transition-colors duration-300">
                              {item.title}
                            </h3>

                            {/* Arrow */}
                            <div className="flex justify-center">
                              <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-rose-400 transition-colors duration-300 group-hover:translate-x-1" />
                            </div>
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Communities;
