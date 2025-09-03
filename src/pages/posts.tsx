import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  MessageCircle,
  TrendingUp,
  User,
  Clock,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Lightbulb,
} from "lucide-react";
import Navbar from "../components/Navbar";

interface RedditPost {
  title: string;
  link: string;
  author: string;
  score: number;
  comments: number;
  timestamp: string;
  thumbnail?: string;
  body?: string;
}

function Posts() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set());

  const community = searchParams.get("community");
  const sort = searchParams.get("sort");

  const fetchPosts = async (isLoadMore = false) => {
    if (!community || !sort) {
      setError("Missing Community or Sort Parameters");
      setLoading(false);
      return;
    }

    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setPosts([]);
      }

      const communityName = community.replace("r/", "");
      const sortType = sort.toLowerCase();

      const response = await fetch(
        `http://localhost:3000/api/scrape?community=${communityName}&sort=${sortType}&limit=5`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Server Responded With ${response.status}: ${response.statusText}`
        );
      }

      const newPosts = await response.json();

      console.log("API Response:", newPosts);
      console.log("Posts Length:", newPosts.length);
      console.log("First Post:", newPosts[0]);

      if (isLoadMore) {
        setPosts((prev) => [...prev, ...newPosts]);
      } else {
        setPosts(newPosts);
      }

      setError(null);
    } catch (err) {
      console.error("Fetch Error:", err);
      if (err instanceof TypeError && err.message.includes("fetch")) {
        setError(
          "Cannot Connect To Server. Make Sure The Backend Is Running On Port 3000."
        );
      } else {
        setError(err instanceof Error ? err.message : "Failed To Fetch Posts");
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [community, sort]);

  const formatScore = (score: number) => {
    if (score >= 1000) {
      return `${(score / 1000).toFixed(1)}k`;
    }
    return score.toString();
  };

  const togglePostExpansion = (index: number) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedPosts(newExpanded);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="bg-zinc-950 min-h-screen text-white flex flex-col">
        <div className="mx-5 py-5">
          <Navbar />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full"
          />
          <span className="ml-3 text-lg">Loading posts...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-zinc-950 min-h-screen text-white flex flex-col">
        <div className="mx-5 py-5">
          <Navbar />
        </div>
        <div className="flex-1 flex items-center justify-center flex-col">
          <div className="text-red-400 text-xl mb-4">Error: {error}</div>
          <button
            onClick={() => fetchPosts()}
            className="bg-rose-500 hover:bg-rose-600 px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen text-white flex flex-col">
      <div className="mx-5 py-5">
        <Navbar />
      </div>

      <div className="flex-1 px-5 py-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate("/search")}
              className="flex items-center text-rose-500 hover:text-rose-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back To Communities
            </button>
            <button
              onClick={() => fetchPosts()}
              disabled={loading}
              className="flex items-center bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>

          <h1 className="text-3xl md:text-5xl font-semibold text-center">
            <span className="text-rose-500">{community}</span> - {sort} Posts
          </h1>
        </motion.div>

        {/* Posts Grid */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence>
            {posts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {posts.map((post, index) => (
                  <motion.div
                    key={`${post.link}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-rose-500/50 transition-all duration-300"
                  >
                    {/* Thumbnail */}
                    {post.thumbnail && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src={post.thumbnail}
                          alt="Post Thumbnail"
                          className="w-full h-32 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-semibold mb-3 line-clamp-3 leading-tight">
                      {post.title}
                    </h3>

                    {/* Metadata */}
                    <div className="space-y-2 mb-4 text-sm text-zinc-400">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span>u/{post.author}</span>
                      </div>

                      <div className="space-y-3">
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg transition-colors w-full justify-center"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Post
                        </a>

                        <button
                          onClick={() => {
                            console.log("Post being sent:", post);
                            const postData = encodeURIComponent(
                              JSON.stringify({
                                title: post.title,
                                body: post.body || "",
                                author: post.author,
                                link: post.link,
                                score: post.score,
                                comments: post.comments,
                              })
                            );
                            console.log("Encoded post data:", postData);
                            const url = `/api-key?post=${postData}`;
                            console.log("Navigating to:", url);
                            navigate(url);
                          }}
                          className="inline-flex items-center bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-4 py-2 rounded-lg transition-all duration-300 w-full justify-center transform hover:scale-105"
                        >
                          <Lightbulb className="w-4 h-4 mr-2" />
                          Generate SaaS Idea
                        </button>
                      </div>
                    </div>

                    {/* Action Button */}
                    <AnimatePresence>
                      {expandedPosts.has(index) && post.body && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="mt-4 pt-4 border-t border-zinc-800 overflow-hidden bg-zinc-900"
                        >
                          <div className="text-zinc-400 text-sm leading-relaxed">
                            {post.body}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {post.body && (
                      <button
                        onClick={() => togglePostExpansion(index)}
                        className="flex items-center text-rose-400 hover:text-rose-300 transition-colors text-sm w-full justify-center py-2 mt-3 border border-zinc-800 rounded-lg hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
                      >
                        {expandedPosts.has(index) ? (
                          <>
                            <ChevronUp size={16} className="mr-1" />
                            Hide Content
                          </>
                        ) : (
                          <>
                            <ChevronDown size={16} className="mr-1" />
                            Show Content
                          </>
                        )}
                      </button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-zinc-400 text-xl">No posts found</div>
                <p className="text-zinc-500 mt-2">
                  Try refreshing or selecting different options
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Load More Button */}
          {posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-8"
            >
              <button
                onClick={() => fetchPosts(true)}
                disabled={loadingMore}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? (
                  <div className="flex items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Loading...
                  </div>
                ) : (
                  "More"
                )}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;
