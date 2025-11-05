"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";
import { Project } from "@/types";
import { ProjectSkeleton } from "./LoadingSkeleton";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Use environment variable or default to octocat for demo
        const username = (typeof window !== "undefined" && (window as any).__GITHUB_USERNAME__)
          || process.env.NEXT_PUBLIC_GITHUB_USERNAME 
          || "octocat";
        const response = await fetch(`/api/github?username=${username}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch projects`);
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        if (data.repos && Array.isArray(data.repos)) {
          const formattedProjects: Project[] = data.repos.slice(0, 6).map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || "No description available",
            url: repo.html_url,
            language: repo.language || "Unknown",
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            topics: repo.topics || [],
            updatedAt: repo.updated_at,
          }));
          setProjects(formattedProjects);
        } else {
          throw new Error("No repositories data received from API");
        }
      } catch (err) {
        console.error("Projects Error:", err);
        setError(err instanceof Error ? err.message : "An error occurred while fetching projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Portfolio Projects
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg max-w-2xl mx-auto">
            A selection of applications demonstrating technical proficiency and innovative solutions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error && !loading) {
    return (
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Portfolio Projects
          </h2>
          <div className="text-center p-8 rounded-lg bg-gray-800/50 border border-red-500/30">
            <div className="text-red-400 mb-2 font-semibold text-lg">Unable to load project data</div>
            <div className="text-gray-400 text-sm mb-4">{error}</div>
            <div className="text-gray-500 text-xs mt-4 p-4 rounded bg-gray-900/50 border border-gray-700">
              <p className="mb-2">To display your GitHub projects:</p>
              <p>1. Add <code className="px-1 py-0.5 bg-gray-800 rounded text-purple-400">NEXT_PUBLIC_GITHUB_USERNAME=your-username</code> to <code className="px-1 py-0.5 bg-gray-800 rounded text-purple-400">.env.local</code></p>
              <p className="mt-2">2. Remove <code className="px-1 py-0.5 bg-gray-800 rounded text-purple-400">GITHUB_TOKEN</code> if it contains placeholder text</p>
              <p className="mt-2">3. Restart your development server</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Portfolio Projects
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg max-w-2xl mx-auto">
            A selection of applications demonstrating technical proficiency and innovative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-6 rounded-lg bg-gray-800/50 border border-gray-700 backdrop-blur-sm hover:border-purple-500 transition-all duration-300 overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  {project.name}
                </h3>
                <div className="flex gap-2">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                    aria-label="View on GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                    aria-label="Open project"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <p className="text-gray-400 mb-4 text-sm line-clamp-3">
                {project.description}
              </p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {project.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {project.forks}
                  </span>
                </div>
                <span className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  {project.language}
                </span>
              </div>

              {project.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.topics.slice(0, 3).map((topic, topicIndex) => (
                    <span
                      key={topicIndex}
                      className="px-2 py-1 rounded text-xs bg-gray-700/50 text-gray-300 hover:bg-purple-500/20 hover:text-purple-300 transition-colors duration-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
              </div>
            </motion.div>
          ))}
        </div>

        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            className="text-center text-gray-400 mt-8"
          >
            No repositories available at this time. Please configure your GitHub username in the environment variables to display projects.
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;

