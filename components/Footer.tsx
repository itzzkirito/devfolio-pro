"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, Code } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:your.email@example.com", label: "Email" },
  ];

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Kirito
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Professional software engineering portfolio of Kirito. Built with Next.js, Framer Motion, and TailwindCSS.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-gray-300 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Skills", "Projects", "Contact"].map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-gray-300 font-semibold mb-4">Connect</h4>
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-purple-400 hover:border-purple-500 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              className="text-gray-400 text-sm flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Kirito
            </motion.p>

            <p className="text-gray-500 text-sm">
              © {currentYear} Kirito. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

