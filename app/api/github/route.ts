import { NextRequest, NextResponse } from "next/server";
import { getGitHubStats } from "@/lib/github";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username") || process.env.GITHUB_USERNAME || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "octocat";

  if (!username) {
    return NextResponse.json(
      { error: "GitHub username is required" },
      { status: 400 }
    );
  }

  try {
    const stats = await getGitHubStats(username);
    
    if (!stats) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub data" },
        { status: 500 }
      );
    }

    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error: any) {
    console.error("API Error:", error);
    const errorMessage = error.message || "Failed to fetch GitHub data";
    const statusCode = error.response?.status || error.status || 500;
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}

