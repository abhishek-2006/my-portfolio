"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-extrabold text-center 
                    bg-gradient-to-r from-cyan-400 to-indigo-400 
                    text-transparent bg-clip-text mb-16 pt-4 pb-8"
        >
            <Zap className="w-10 h-10 inline-block mr-3 mb-1" />
            All Projects
        </motion.h1>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          
          {/* Skeleton Loading */}
          {!projects &&
            [...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="h-48 bg-gray-800 rounded-xl animate-pulse border border-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}

          {/* Projects */}
          {projects &&
            projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02, // Less aggressive scale
                  boxShadow: "0 0 25px rgba(0, 150, 255, 0.25)",
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: "easeOut",
                }}
                // Premium Card Styling
                className="p-6 bg-gray-900/50 rounded-xl border border-indigo-700/50 hover:border-cyan-500/70 transition-all shadow-xl shadow-black/50"
              >
                <h2 className="text-2xl font-bold mb-2 text-white">{project.name}</h2>

                <p className="text-base text-gray-400 mb-4">
                  {project.description || "No description available."}
                </p>

                {/* Languages (badges) */}
                {project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((lang) => (
                      <motion.span
                        key={lang}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        // Premium Tag Styling
                        className="text-xs px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-300 ring-1 ring-indigo-500/30"
                      >
                        {lang}
                      </motion.span>
                    ))}
                  </div>
                )}

                {/* --- Link Section (NEW ROW LAYOUT) --- */}
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-800/50">
                    
                    {/* 1. Live Link (If available) */}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        className="text-cyan-400 font-medium hover:text-cyan-300 transition w-full text-left"
                      >
                        Live Demo →
                      </Link>
                    )}

                    {/* 2. GitHub Link (Always available) */}
                    <Link
                      href={project.url ?? "#"}
                      target="_blank"
                      className="text-indigo-400 font-medium hover:text-indigo-300 transition w-full text-left"
                    >
                      View on GitHub →
                    </Link>
                </div>
                
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
