import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Lightbulb,
  TrendingUp,
  DollarSign,
  Target,
  Zap,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";

interface RedditPost {
  title: string;
  body: string;
  author: string;
  link: string;
  score: number;
  comments: number;
}

interface BusinessPlan {
  saasName: string;
  tagline: string;
  problemStatement: string;
  solution: string;
  targetMarket: string;
  businessModel: string;
  keyFeatures: string[];
  marketingStrategy: string;
  competitiveAdvantage: string;
  revenueModel: string;
  implementation: string;
  risks: string[];
  nextSteps: string[];
}

function GenerateIdea() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<RedditPost | null>(null);
  const [businessPlan, setBusinessPlan] = useState<BusinessPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Try to get data from sessionStorage first, then URL params as fallback
    const storedData = sessionStorage.getItem("ideaGenerationData");
    const postData = searchParams.get("post");
    const providerParam = searchParams.get("provider");
    const apiKeyParam = searchParams.get("apiKey");

    if (storedData) {
      try {
        const { post: parsedPost, provider, apiKey } = JSON.parse(storedData);
        setPost(parsedPost);
        // Clear the stored data after using it
        sessionStorage.removeItem("ideaGenerationData");
        generateBusinessPlan(parsedPost, provider, apiKey);
      } catch (err) {
        console.error("Failed to parse stored data:", err);
        setError("Invalid stored data. Please try again.");
      }
    } else if (postData && providerParam && apiKeyParam) {
      try {
        const parsedPost = JSON.parse(decodeURIComponent(postData));
        setPost(parsedPost);
        generateBusinessPlan(
          parsedPost,
          providerParam,
          decodeURIComponent(apiKeyParam)
        );
      } catch (err) {
        console.error("Failed to parse parameters:", err);
        setError("Invalid parameters. Please try again.");
      }
    } else {
      setError(
        "Missing required parameters. Please select a post and configure AI settings."
      );
    }
  }, [searchParams]);

  const generateBusinessPlan = async (
    postData: RedditPost,
    aiProvider: string,
    key: string
  ) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/generate-idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: postData,
          provider: aiProvider,
          apiKey: key,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to generate business plan: ${response.statusText}`
        );
      }

      const result = await response.json();
      setBusinessPlan(result.businessPlan);
    } catch (err) {
      console.error("Generation error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to generate business plan"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPlan = () => {
    if (!businessPlan) return;

    const content = `# ${businessPlan.saasName}
${businessPlan.tagline}

## Problem Statement
${businessPlan.problemStatement}

## Solution
${businessPlan.solution}

## Target Market
${businessPlan.targetMarket}

## Key Features
${businessPlan.keyFeatures.map((feature) => `• ${feature}`).join("\n")}

## Business Model
${businessPlan.businessModel}

## Revenue Model
${businessPlan.revenueModel}

## Marketing Strategy
${businessPlan.marketingStrategy}

## Competitive Advantage
${businessPlan.competitiveAdvantage}

## Implementation Plan
${businessPlan.implementation}

## Risks & Mitigation
${businessPlan.risks.map((risk) => `• ${risk}`).join("\n")}

## Next Steps
${businessPlan.nextSteps.map((step) => `• ${step}`).join("\n")}

---
Generated from Reddit post: ${post?.title}
By: ${post?.author}`;

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${businessPlan.saasName.replace(
      /[^a-zA-Z0-9]/g,
      "_"
    )}_business_plan.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="bg-zinc-950 min-h-screen text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="text-center"
          >
            <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-400 text-lg">
              Generating your SaaS business plan...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-zinc-950 min-h-screen text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Generation Failed</h2>
            <p className="text-red-400 mb-6">{error}</p>
            <button
              onClick={() => navigate("/posts")}
              className="bg-rose-500 hover:bg-rose-600 px-6 py-3 rounded-lg transition-colors"
            >
              Back to Posts
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-rose-500 hover:text-rose-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              SaaS Business Plan
            </span>
          </h1>

          {businessPlan && (
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button
                onClick={downloadPlan}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center hover:scale-105 transition-transform"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Plan
              </button>
            </div>
          )}
        </motion.div>

        {businessPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border border-zinc-700/50 rounded-3xl p-8 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {businessPlan.saasName}
              </h2>
              <p className="text-xl text-zinc-400 mb-6">
                {businessPlan.tagline}
              </p>
              <div className="flex justify-center items-center text-green-500">
                <CheckCircle className="w-6 h-6 mr-2" />
                <span className="font-semibold">
                  Business Plan Generated Successfully
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Target className="w-6 h-6 text-rose-500 mr-3" />
                  Problem & Solution
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-rose-400 mb-2">
                      Problem Statement
                    </h4>
                    <p className="text-zinc-300">
                      {businessPlan.problemStatement}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">
                      Our Solution
                    </h4>
                    <p className="text-zinc-300">{businessPlan.solution}</p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <DollarSign className="w-6 h-6 text-green-500 mr-3" />
                  Market & Revenue
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-2">
                      Target Market
                    </h4>
                    <p className="text-zinc-300">{businessPlan.targetMarket}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">
                      Revenue Model
                    </h4>
                    <p className="text-zinc-300">{businessPlan.revenueModel}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="w-6 h-6 text-yellow-500 mr-3" />
                Key Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {businessPlan.keyFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-zinc-800/50 p-4 rounded-xl"
                  >
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-zinc-300">{feature}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 text-purple-500 mr-3" />
                  Strategy
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-purple-400 mb-2">
                      Marketing Strategy
                    </h4>
                    <p className="text-zinc-300">
                      {businessPlan.marketingStrategy}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-400 mb-2">
                      Competitive Advantage
                    </h4>
                    <p className="text-zinc-300">
                      {businessPlan.competitiveAdvantage}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Lightbulb className="w-6 h-6 text-yellow-500 mr-3" />
                  Implementation
                </h3>
                <p className="text-zinc-300">{businessPlan.implementation}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4 text-red-400">
                  Risks & Mitigation
                </h3>
                <ul className="space-y-2">
                  {businessPlan.risks.map((risk, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-zinc-300">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4 text-green-400">
                  Next Steps
                </h3>
                <ul className="space-y-2">
                  {businessPlan.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-zinc-300">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {post && (
              <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">
                  Inspired by Reddit Post
                </h3>
                <div className="bg-zinc-800/50 rounded-xl p-4">
                  <h4 className="font-semibold text-white mb-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-zinc-400">
                    by {post.author} • {post.score} upvotes
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default GenerateIdea;
