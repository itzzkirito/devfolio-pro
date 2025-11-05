"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-sm"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Professional Overview
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 text-lg text-gray-300 leading-relaxed"
        >
          <p>
            I&apos;m Kirito, a results-driven software engineer specializing in full-stack web development
            with a proven track record of delivering enterprise-grade applications. My expertise
            encompasses modern JavaScript frameworks, cloud infrastructure, and scalable system architecture.
          </p>
          <p>
            Throughout my career, I have consistently delivered high-quality solutions that combine
            technical excellence with exceptional user experience. I excel at translating complex business
            requirements into robust, maintainable code while adhering to industry best practices and
            agile methodologies.
          </p>
          <p>
            I maintain a strong commitment to continuous learning and professional development, staying
            current with emerging technologies and contributing to the open-source community. My collaborative
            approach and strong communication skills enable me to work effectively within cross-functional
            teams and deliver impactful results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            { label: "Years of Experience", value: "3+", icon: "🚀" },
            { label: "Projects Delivered", value: "50+", icon: "💼" },
            { label: "Client Satisfaction", value: "100%", icon: "✨" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="group relative text-center p-6 rounded-lg bg-gray-800/50 border border-gray-700 backdrop-blur-sm overflow-hidden"
              whileHover={{ scale: 1.05, borderColor: "#a855f7" }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;

