"use client"
import React from "react"
import { motion } from "framer-motion"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
} from "react-icons/si"

interface Skill {
  name: string
  icon: React.ReactNode
}

const skills: Skill[] = [
  { name: "React", icon: <SiReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
]

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-5 py-24 md:py-32"
    >
      {/* Heading */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          About Me
        </h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          I’m a passionate <span className="text-blue-400">Full Stack Developer</span>{" "}
          focused on building modern, scalable, and high-performance web
          applications with clean UI and smooth UX.
        </p>
      </motion.div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-14 items-center">
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Who I Am
          </h3>
          <p className="text-gray-300 leading-relaxed">
            I’m a self-taught developer with experience building real-world
            applications using modern technologies like React, Next.js, and
            TypeScript. I love solving problems and crafting beautiful digital
            experiences.
          </p>
          <p className="mt-4 text-gray-300 leading-relaxed">
            My focus is always on performance, scalability, and clean code.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-6"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="group rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.08 }}
            >
              <div className="text-4xl text-blue-400 mb-3 group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] transition">
                {skill.icon}
              </div>
              <span className="text-sm font-medium text-white">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About
