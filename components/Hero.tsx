"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:your.email@example.com", label: "Email" },
  ];

  if (!mounted) return null;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Code className="w-16 h-16 text-purple-400" />
          </motion.div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight"
        >
          Hi, I&apos;m{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Kirito</span>
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-3 bg-purple-500/30 -z-0"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
          </span>
          <br />
          <span className="text-4xl sm:text-5xl md:text-6xl">Full-Stack Software Engineer</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting scalable, high-performance web applications with cutting-edge technologies and best practices
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4 mb-12"
        >
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <Icon className="w-5 h-5 text-gray-300 group-hover:text-purple-400 transition-colors duration-300" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <motion.a
            href="#about"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors"
            whileHover={{ y: 5 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Explore Portfolio</span>
            <ArrowDown className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Hero;

