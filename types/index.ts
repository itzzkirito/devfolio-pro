export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  location?: string;
  blog?: string;
  twitter_username?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
}

export interface DiscordPresenceData {
  status?: "online" | "idle" | "dnd" | "offline";
  activity?: {
    name: string;
    type: number;
  };
}

