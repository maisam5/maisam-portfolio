"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface Project {
  title: string
  image: string
  link: string
}

const projects: Project[] = [
  {
    title: "Portfolio Website",
    image: "/webs.png",
    link: "https://your-project-1.vercel.app",
  },
  {
    title: "E-Commerce Store",
    image: "/ecoom.png",
    link: "https://your-project-2.vercel.app",
  },
  {
    title: "Admin Dashboard",
    image: "/landing.png",
    link: "https://your-project-3.vercel.app",
  },
  {
    title: "Landing Page",
    image: "/landing.png",
    link: "https://your-project-4.vercel.app",
  },
]

const Project: React.FC = () => {
  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-5 py-24 md:py-32"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Projects
        </h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          A selection of projects I’ve built using modern technologies like
          React, Next.js, and TypeScript.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden"
          >
            {/* Image */}
            <div className="relative w-full h-48">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white mb-3">
                {project.title}
              </h3>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-blue-400 hover:text-blue-300 transition"
              >
                View on Vercel →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Project
