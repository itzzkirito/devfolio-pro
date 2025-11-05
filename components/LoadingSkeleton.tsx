"use client";

import { motion } from "framer-motion";

export const ProjectSkeleton = () => {
  return (
    <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700 backdrop-blur-sm animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="h-6 w-32 bg-gray-700 rounded"></div>
        <div className="flex gap-2">
          <div className="h-5 w-5 bg-gray-700 rounded"></div>
          <div className="h-5 w-5 bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-700 rounded w-4/6"></div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
        <div className="flex gap-4">
          <div className="h-4 w-12 bg-gray-700 rounded"></div>
          <div className="h-4 w-12 bg-gray-700 rounded"></div>
        </div>
        <div className="h-6 w-16 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export const StatsSkeleton = () => {
  return (
    <div className="p-6 rounded-lg bg-gray-900/50 border border-gray-800 backdrop-blur-sm animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-lg bg-gray-700 w-12 h-12"></div>
        <div>
          <div className="h-8 w-24 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export const LanguageSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-12 bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div className="h-2 bg-gray-700 rounded-full animate-pulse" style={{ width: `${Math.random() * 100}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

