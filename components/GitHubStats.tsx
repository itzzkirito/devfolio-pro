"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Github, Star, GitFork, Users, Code } from "lucide-react";
import { StatsSkeleton, LanguageSkeleton } from "./LoadingSkeleton";

interface GitHubStatsData {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  languages: Record<string, number>;
}

const GitHubStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [stats, setStats] = useState<GitHubStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Use environment variable or default to octocat for demo
        const username = (typeof window !== "undefined" && (window as any).__GITHUB_USERNAME__) 
          || process.env.NEXT_PUBLIC_GITHUB_USERNAME 
          || "octocat";
        const response = await fetch(`/api/github?username=${username}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch GitHub stats`);
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        if (data.stats) {
          setStats(data.stats);
        } else {
          throw new Error("No stats data received from API");
        }
      } catch (err) {
        console.error("GitHub Stats Error:", err);
        setError(err instanceof Error ? err.message : "An error occurred while fetching GitHub statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsCards = [
    {
      icon: Code,
      label: "Total Repositories",
      value: stats?.totalRepos || 0,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Star,
      label: "Total Stars",
      value: stats?.totalStars || 0,
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: GitFork,
      label: "Total Forks",
      value: stats?.totalForks || 0,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const topLanguages = stats?.languages
    ? Object.entries(stats.languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
    : [];

  if (loading) {
    return (
      <section id="github-stats" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-3 mb-12"
          >
            <Github className="w-8 h-8 text-gray-400" />
            <h2 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Development Activity
            </h2>
            <p className="text-center text-gray-400 text-lg max-w-2xl mx-auto">
              Open-source contributions and code repository metrics
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <StatsSkeleton key={i} />
            ))}
          </div>
          <div className="p-6 rounded-lg bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-gray-300">Top Languages</h3>
            <LanguageSkeleton />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="github-stats"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-black min-h-[400px]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <Github className="w-8 h-8 text-gray-400" />
          <h2 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Development Activity
          </h2>
          <p className="text-center text-gray-400 text-lg max-w-2xl mx-auto">
            Open-source contributions and code repository metrics
          </p>
        </div>

        {error ? (
          <div className="text-center p-8 rounded-lg bg-gray-900/50 border border-red-500/30">
            <Github className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <div className="text-red-400 mb-2 font-semibold text-lg">Unable to retrieve development statistics</div>
            <div className="text-gray-400 text-sm mb-4">{error}</div>
            <div className="text-gray-500 text-xs mt-4 p-4 rounded bg-gray-900/50 border border-gray-700">
              <p className="mb-2">To display your GitHub data:</p>
              <p>1. Add <code className="px-1 py-0.5 bg-gray-800 rounded text-purple-400">NEXT_PUBLIC_GITHUB_USERNAME=your-username</code> to <code className="px-1 py-0.5 bg-gray-800 rounded text-purple-400">.env.local</code></p>
              <p className="mt-2">2. Remove <code className="px-1 py-0.5 bg-gray-800 rounded text-purple-400">GITHUB_TOKEN</code> if it contains placeholder text</p>
              <p className="mt-2">3. Restart your development server</p>
            </div>
          </div>
        ) : stats ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {statsCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-6 rounded-lg bg-gray-900/50 border border-gray-800 backdrop-blur-sm"
                    whileHover={{ scale: 1.05, borderColor: "#a855f7" }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} opacity-20`}>
                        <Icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                      </div>
                      <div>
                        <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                          {stat.value.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {topLanguages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="p-6 rounded-lg bg-gray-900/50 border border-gray-800 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-300">Top Languages</h3>
                <div className="space-y-4">
                  {topLanguages.map(([language, count], index) => {
                    const total = Object.values(stats?.languages || {}).reduce((a, b) => a + b, 0);
                    const percentage = ((count / total) * 100).toFixed(1);
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">{language}</span>
                          <span className="text-gray-400">{percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center p-8 rounded-lg bg-gray-900/50 border border-gray-800">
            <div className="text-gray-400 mb-4">No statistics available</div>
            <div className="text-gray-500 text-sm">
              <p>Add <code className="px-1 py-0.5 bg-gray-800 rounded text-purple-400">NEXT_PUBLIC_GITHUB_USERNAME=itzzkirito</code> to your <code className="px-1 py-0.5 bg-gray-800 rounded text-purple-400">.env.local</code> file</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GitHubStats;

