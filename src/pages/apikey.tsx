import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Key,
  Eye,
  EyeOff,
  Shield,
  Zap,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { usePostsStore } from "../store/postsStore";

interface RedditPost {
  title: string;
  body: string;
  author: string;
  link: string;
  score: number;
  comments: number;
}

function ApiKey() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("google");
  const [post, setPost] = useState<RedditPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const postParam = searchParams.get("post");
    if (postParam) {
      try {
        const decodedPost = JSON.parse(decodeURIComponent(postParam));
        setPost(decodedPost);
      } catch (err) {
        setError(
          `Invalid post data: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      }
    } else {
      setError("No post selected");
    }
  }, [searchParams]);

  const providers = [
    {
      id: "google",
      name: "Google AI",
      description: "Gemini 1.5 Flash - Fast and reliable",
      icon: "",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!apiKey.trim()) {
      setError("Please enter your API key");
      return;
    }

    if (!post) {
      setError("No post data found");
      return;
    }

    setIsLoading(true);

    try {
      // Navigate to idea generator with API key and post data
      const params = new URLSearchParams({
        post: encodeURIComponent(JSON.stringify(post)),
        provider: selectedProvider,
        apiKey: encodeURIComponent(apiKey),
      });

      navigate(`/generate-idea?${params.toString()}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed To Proceed. Please Try Again."
      );
      setIsLoading(false);
    }
  };

  if (!post && error) {
    return (
      <div className="bg-zinc-950 min-h-screen text-white">
        <Navbar />
        <div className="mx-5 py-5"></div>

        <div className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-pink-500/5"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">No Post Selected</h2>
              <p className="text-red-400 mb-6">{error}</p>
              <button
                onClick={() => {
                  const { currentCommunity, currentSort } =
                    usePostsStore.getState();
                  if (currentCommunity && currentSort) {
                    navigate(
                      `/posts?community=${encodeURIComponent(
                        currentCommunity
                      )}&sort=${encodeURIComponent(currentSort)}`
                    );
                  } else {
                    navigate("/posts");
                  }
                }}
                className="bg-rose-500 hover:bg-rose-600 px-6 py-3 rounded-lg transition-colors flex items-center mx-auto"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go to Posts
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-zinc-950 min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <Navbar />

      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-pink-500/5"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => {
              const { currentCommunity, currentSort } =
                usePostsStore.getState();
              if (currentCommunity && currentSort) {
                navigate(
                  `/posts?community=${encodeURIComponent(
                    currentCommunity
                  )}&sort=${encodeURIComponent(currentSort)}`
                );
              } else {
                navigate("/posts");
              }
            }}
            className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-16"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Posts
          </motion.button>

          {/* Header Section */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-500/30 text-rose-400 px-6 py-3 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Key className="w-4 h-4" />
              <span>AI Configuration</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
            >
              Configure Your{" "}
              <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                AI Model
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-zinc-400 max-w-4xl mx-auto leading-relaxed"
            >
              Enter your AI provider API key to generate a comprehensive SaaS
              business plan based on the selected Reddit post.
            </motion.p>
          </div>

          {/* Selected Post Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border border-zinc-700/50 rounded-3xl p-12 backdrop-blur-sm">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500 mr-4" />
                Selected Post
              </h2>
              <div className="bg-zinc-800/50 rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="text-xl font-bold text-white mb-4 line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center justify-center text-sm text-zinc-400 mb-6 space-x-6">
                  <span>by u/{post.author}</span>
                  <span>•</span>
                  <span>{post.score} upvotes</span>
                  <span>•</span>
                  <span>{post.comments} comments</span>
                </div>
                {post.body && (
                  <p className="text-zinc-300 text-center line-clamp-3">
                    {post.body}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* API Configuration Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border border-zinc-700/50 rounded-3xl p-12 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Provider Selection */}
                <div>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Choose AI Provider
                    </h2>
                    <p className="text-zinc-400 text-lg">
                      Select your preferred AI model for generating the business
                      plan
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {providers.map((provider) => (
                      <motion.button
                        key={provider.id}
                        type="button"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        onClick={() => setSelectedProvider(provider.id)}
                        className={`group relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border border-zinc-700/50 rounded-3xl p-8 text-left transition-all duration-500 hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-500/20 hover:bg-gradient-to-br hover:from-zinc-800/90 hover:to-zinc-700/90 ${
                          selectedProvider === provider.id
                            ? "border-rose-500/70 bg-gradient-to-br from-rose-500/10 to-pink-500/10 shadow-2xl shadow-rose-500/20"
                            : ""
                        }`}
                      >
                        {/* Background glow effect */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                            selectedProvider === provider.id
                              ? "opacity-100"
                              : ""
                          }`}
                        ></div>

                        {/* Icon */}
                        <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-rose-500/25 mx-auto">
                          <span className="text-3xl">{provider.icon}</span>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 text-center">
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-rose-400 transition-colors duration-300">
                            {provider.name}
                          </h3>
                          <p className="text-zinc-400 text-sm">
                            {provider.description}
                          </p>
                        </div>

                        {/* Selection indicator */}
                        {selectedProvider === provider.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, type: "spring" }}
                            className="absolute top-6 right-6 w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center"
                          >
                            <svg
                              className="w-5 h-5 text-white"
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
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* API Key Input */}
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      API Key
                    </h3>
                    <p className="text-zinc-400">
                      Enter your{" "}
                      {providers.find((p) => p.id === selectedProvider)?.name}{" "}
                      API key
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      type={showApiKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder={`Enter your ${
                        providers.find((p) => p.id === selectedProvider)?.name
                      } API key`}
                      className="w-full px-8 py-6 bg-zinc-800/50 border border-zinc-600/50 rounded-2xl text-white placeholder-zinc-400 focus:outline-none focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/20 transition-all duration-300 pr-16 text-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                    >
                      {showApiKey ? (
                        <EyeOff className="w-6 h-6" />
                      ) : (
                        <Eye className="w-6 h-6" />
                      )}
                    </button>
                  </div>

                  {/* Security Notice */}
                  <div className="mt-6 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                    <div className="flex items-start">
                      <Shield className="w-6 h-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-blue-400 font-semibold mb-2">
                          Security Notice
                        </h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          Your API key is processed securely and is not stored
                          on our servers. It's only used for this session to
                          generate your SaaS idea.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto"
                  >
                    <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                      <div className="flex items-center">
                        <AlertCircle className="w-6 h-6 text-red-400 mr-4" />
                        <p className="text-red-400 font-medium">{error}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isLoading || !apiKey.trim()}
                    className="group bg-gradient-to-r from-rose-500 to-pink-500 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-lg hover:shadow-rose-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100 flex items-center mx-auto"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-4"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-6 h-6 mr-4 group-hover:scale-110 transition-transform" />
                        Generate SaaS Idea & Business Plan
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ApiKey;
