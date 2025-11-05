"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      category: "Frontend Development",
      skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      category: "Backend Development",
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"],
      color: "from-green-500 to-emerald-500",
    },
    {
      category: "DevOps & Tools",
      skills: ["Git", "Docker", "AWS", "Vercel", "Figma"],
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-black"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg max-w-2xl mx-auto">
            Proficient in modern development frameworks, cloud platforms, and industry-standard tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="p-6 rounded-lg bg-gray-900/50 border border-gray-800 backdrop-blur-sm"
            >
              <h3
                className={`text-2xl font-bold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
              >
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="group relative px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-gray-300 text-sm overflow-hidden"
                    whileHover={{ scale: 1.1, borderColor: "#a855f7" }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10">{skill}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

