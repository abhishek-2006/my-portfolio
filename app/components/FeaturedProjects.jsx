"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Zap } from 'lucide-react';
import StyledLink from "@/app/components/StyledLink";
import Link from "next/link";

// NOTE: Using a static mock array. In a real application, this should be replaced 
// by the GitHub API fetching logic as previously discussed.
const projects = [
  {
    title: "Hotel Management System",
    desc: "A fully functional booking and management system with PHP and MySQL.",
    tech: ["PHP", "MySQL", "HTML/CSS"],
    githubUrl: "https://github.com/abhishek-2006/",
    liveUrl: null,
  },
  {
    title: "Currency Converter",
    desc: "Simple, clean realtime currency converter using API integration.",
    tech: ["JS", "API", "HTML/CSS"],
    githubUrl: "https://github.com/abhishek-2006/Currency-Converter",
    liveUrl: "https://abhishek-2006.github.io/Currency-Converter",
  },
  {
    title: "Portfolio Website",
    desc: "A modern, high-performance portfolio built with Next.js + Tailwind.",
    tech: ["Next.js", "React", "Tailwind"],
    githubUrl: "https://github.com/abhishek-2006/my-portfolio.git",
    liveUrl: "https://my-portfolio-jade-seven-42.vercel.app/",
  },
];

const ProjectCard = ({ project, i }) => {
    // Delay animation based on index
    const delay = i * 0.1;

    return (
        <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delay }}
            viewport={{ once: true }}
            // Premium Card Styling: Darker background, Glass border, Stronger shadow
            className="relative p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-indigo-700/50 
                      hover:border-cyan-500/70 transition-all duration-300 shadow-xl shadow-black/50"
        >
            {/* Project Title and Links */}
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold text-gray-100 hover:text-cyan-400 transition-colors">
                    {project.title}
                </h3>
                
                {/* External Links */}
                <div className="flex space-x-3 text-gray-400">
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" 
                          className="hover:text-cyan-400 transform hover:scale-110 transition">
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    )}
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" 
                      className="hover:text-indigo-400 transform hover:scale-110 transition">
                        <Github className="w-5 h-5" />
                    </a>
                </div>
            </div>

            <p className="text-gray-400 mb-5 text-base leading-relaxed">{project.desc}</p>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800/50">
                {project.tech.map((t, idx) => (
                    <span
                        key={idx}
                        // Premium Tag Styling: Indigo/Cyan color scheme
                        className="px-3 py-1 text-xs font-medium rounded-full 
                                bg-indigo-900/60 text-indigo-300 ring-1 ring-indigo-500/30"
                    >
                        {t}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

export default function FeaturedProjects() {
  return (
    <section className="w-full py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title with Gradient */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl font-extrabold mb-16 text-center 
          bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent"
        >
          <Zap className="w-8 h-8 inline-block mr-3 mb-1" />
          Featured Code
        </motion.h2>

        {/* Project Grid: Enforced 3-column layout on large screens */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} i={i} />
          ))}
        </div>
        
        {/* The 'View All Projects' button is typically rendered in the parent Home.jsx, 
            but if placed here, use the StyledLink component: */}
        { <div className="mt-16 text-center">
            <Link href="projects">
              <StyledLink>View All Projects</StyledLink>
              </Link>
        </div> }
      </div>
    </section>
  );
}