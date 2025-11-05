"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactLinks = [
    { icon: Mail, href: "mailto:your.email@example.com", label: "Email", text: "your.email@example.com" },
    { icon: Github, href: "https://github.com", label: "GitHub", text: "github.com/username" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", text: "linkedin.com/in/username" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", text: "@username" },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-black"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let&apos;s Connect
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            I welcome opportunities to discuss potential collaborations, innovative projects, or how I can contribute
            to your organization&apos;s technical objectives. Please feel free to reach out through any of the channels below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {contactLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-lg bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:border-purple-500 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-300 group-hover:text-purple-400 transition-colors">
                      {link.label}
                    </div>
                    <div className="text-sm text-gray-400">{link.text}</div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="mailto:your.email@example.com"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
            <Send className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Initiate Contact</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

