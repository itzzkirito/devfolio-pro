"use client";

import { useRef, useEffect, useState } from "react";
import { MessageCircle, Clock } from "lucide-react";

interface DiscordPresenceData {
  status?: "online" | "idle" | "dnd" | "offline";
  activity?: {
    name: string;
    type: number;
  };
}

const DiscordPresence = () => {
  const ref = useRef<HTMLElement>(null);
  // Initialize with offline status immediately - don't wait for useEffect
  const [presence, setPresence] = useState<DiscordPresenceData>({ status: "offline", activity: undefined });
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("DiscordPresence component mounted");
    
    // Discord presence widget - using Lanyard API
    const fetchDiscordPresence = async () => {
      setLoading(true);
      try {
        // Get Discord User ID from environment (client-side accessible)
        const userId = typeof window !== "undefined" 
          ? (window as any).__DISCORD_USER_ID__ || process.env.NEXT_PUBLIC_DISCORD_USER_ID
          : process.env.NEXT_PUBLIC_DISCORD_USER_ID;
        
        if (!userId || userId === "your-discord-user-id" || userId.trim() === "") {
          // Show offline status when no Discord ID is provided
          setPresence({
            status: "offline",
            activity: undefined,
          });
          setLoading(false);
          return;
        }

        // Using Lanyard API for Discord presence
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, {
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error("Failed to fetch Discord presence");
        }

        const data = await response.json();
        
        if (data.success && data.data) {
          setPresence({
            status: data.data.discord_status || "offline",
            activity: data.data.activities?.[0] || undefined,
          });
        } else {
          // If API call succeeds but no data
          setPresence({
            status: "offline",
            activity: undefined,
          });
        }
      } catch (err: any) {
        console.error("Discord presence error:", err);
        // Fallback to offline status - always set presence so component shows
        setPresence({
          status: "offline",
          activity: undefined,
        });
      } finally {
        setLoading(false);
      }
    };

    // Set a timeout to ensure loading doesn't stay true forever
    const loadingTimeout = setTimeout(() => {
      setPresence({
        status: "offline",
        activity: undefined,
      });
      setLoading(false);
    }, 3000);

    fetchDiscordPresence();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchDiscordPresence, 30000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(loadingTimeout);
    };
  }, []);

  // Ensure component always renders - show loading state immediately
  if (!mounted) {
    return (
      <section
        id="discord-presence"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-sm"
        style={{ minHeight: "400px", display: "block", visibility: "visible" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-lg bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <MessageCircle className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl font-bold text-gray-300">Current Status</h2>
            </div>
            <div className="text-gray-400">Initializing...</div>
          </div>
        </div>
      </section>
    );
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "idle":
        return "bg-yellow-500";
      case "dnd":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case "online":
        return "Online";
      case "idle":
        return "Idle";
      case "dnd":
        return "Do Not Disturb";
      default:
        return "Offline";
    }
  };

  // Always show content - presence is never null now
  const currentStatus = presence.status || "offline";

  return (
    <section
      id="discord-presence"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-sm"
      style={{ minHeight: "400px", display: "block", visibility: "visible", opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="p-8 rounded-lg bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <MessageCircle className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold text-gray-300">Current Status</h2>
          </div>

          <div className="space-y-4" style={{ minHeight: "120px", display: "block" }}>
            {loading && (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 rounded-full bg-gray-700 animate-pulse"></div>
                <span className="text-gray-400">Loading status...</span>
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-4 h-4 rounded-full ${getStatusColor(currentStatus)}`} />
                {currentStatus !== "offline" && (
                  <div
                    className={`absolute inset-0 w-4 h-4 rounded-full ${getStatusColor(currentStatus)} animate-ping opacity-75`}
                  />
                )}
              </div>
              <span className="text-gray-300">
                Status: <span className="font-semibold">{getStatusText(currentStatus)}</span>
              </span>
            </div>

            {presence.activity ? (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                <Clock className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-sm text-gray-400">Currently</div>
                  <div className="text-lg font-semibold text-gray-300">
                    {presence.activity.name}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-sm">
                No active activity at the moment
              </div>
            )}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-gray-900/30 border border-gray-700/50">
            <p className="text-sm text-gray-400">
              {!presence || !process.env.NEXT_PUBLIC_DISCORD_USER_ID || process.env.NEXT_PUBLIC_DISCORD_USER_ID === "your-discord-user-id" ? (
                <>To enable live Discord status, add your Discord User ID to <code className="px-1 py-0.5 bg-gray-800 rounded text-purple-400">NEXT_PUBLIC_DISCORD_USER_ID</code> in your <code className="px-1 py-0.5 bg-gray-800 rounded text-purple-400">.env.local</code> file.</>
              ) : (
                <>Real-time status integration active. Status updates every 30 seconds.</>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscordPresence;

