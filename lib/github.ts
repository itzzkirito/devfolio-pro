import axios from "axios";
import { GitHubUser, GitHubRepo } from "@/types";

const GITHUB_API = "https://api.github.com";

export async function getGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    // Only use token if it's a real token (not a placeholder)
    const token = process.env.GITHUB_TOKEN;
    const isValidToken = token && 
      token !== "your-github-token-optional" && 
      token.trim().length > 0 &&
      !token.includes("your-github-token");

    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };

    if (isValidToken) {
      headers.Authorization = `token ${token}`;
    }

    const response = await axios.get(`${GITHUB_API}/users/${username}`, {
      headers,
      timeout: 10000, // 10 second timeout
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching GitHub user:", error);
    if (error.response?.status === 404) {
      throw new Error(`GitHub user "${username}" not found`);
    }
    if (error.response?.status === 401) {
      throw new Error("Invalid GitHub token. Remove GITHUB_TOKEN from .env.local if you don't have a valid token. Public data can be fetched without a token.");
    }
    if (error.response?.status === 403) {
      throw new Error("GitHub API rate limit exceeded. Please add a valid GITHUB_TOKEN to increase limits.");
    }
    throw new Error(error.message || "Failed to fetch GitHub user data");
  }
}

export async function getGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    // Only use token if it's a real token (not a placeholder)
    const token = process.env.GITHUB_TOKEN;
    const isValidToken = token && 
      token !== "your-github-token-optional" && 
      token.trim().length > 0 &&
      !token.includes("your-github-token");

    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };

    if (isValidToken) {
      headers.Authorization = `token ${token}`;
    }

    const response = await axios.get(`${GITHUB_API}/users/${username}/repos`, {
      params: {
        sort: "updated",
        per_page: 10,
        type: "owner",
      },
      headers,
      timeout: 10000, // 10 second timeout
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching GitHub repos:", error);
    if (error.response?.status === 401) {
      throw new Error("Invalid GitHub token. Remove GITHUB_TOKEN from .env.local if you don't have a valid token.");
    }
    if (error.response?.status === 403) {
      throw new Error("GitHub API rate limit exceeded. Please add a valid GITHUB_TOKEN to increase limits.");
    }
    // Return empty array on error, but log it
    return [];
  }
}

export async function getGitHubStats(username: string) {
  try {
    const [user, repos] = await Promise.all([
      getGitHubUser(username),
      getGitHubRepos(username),
    ]);

    if (!user) {
      throw new Error("Failed to fetch user data");
    }

    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
    const languages = repos.reduce((acc: Record<string, number>, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    return {
      user,
      repos,
      stats: {
        totalStars,
        totalForks,
        languages,
        totalRepos: user.public_repos,
      },
    };
  } catch (error: any) {
    console.error("Error fetching GitHub stats:", error);
    throw error; // Re-throw to let the API route handle it
  }
}

