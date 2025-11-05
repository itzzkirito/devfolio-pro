"use client";

import { motion } from "framer-motion";

const SectionDivider = () => {
  return (
    <div className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-800"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-gray-900 px-4">
          <motion.div
            className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;

