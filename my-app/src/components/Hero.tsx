"use client"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const Hero: React.FC = () => {
  const titleText = "Full Stack Web Developer"
  
  
  const titleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.5 },
    },
  }

  const letterAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="home"
      className="relative flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-5 py-24 md:py-36 gap-12 md:gap-20"
    >
      {/* Profile Image */}
      <motion.div
        className="relative w-48 h-48 md:w-72 md:h-72 shrink-0"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-blue-500/20 shadow-2xl">
          <Image
            src="/profile.jpg" 
            alt="Maisam Abbas"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      
      <div className="text-center md:text-left max-w-xl flex flex-col gap-2">
        <motion.p
          className="text-lg md:text-xl text-gray-400"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Hi, I am <span className="font-bold text-white">Maisam Abbas</span>
        </motion.p>

        
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold text-blue-400 leading-tight"
          variants={titleContainer}
          initial="hidden"
          animate="visible"
        >
          {titleText.split("").map((char, index) => (
            <motion.span key={index} variants={letterAnimation}>
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-gray-300 text-sm md:text-base mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          A self-taught UI/UX designer & developer, crafting meaningful digital
          products for 2+ years. I blend user needs and business goals
          seamlessly.
         
        </motion.p>

       
        <motion.div
          className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition transform hover:scale-105"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-gray-500 text-white font-semibold rounded-lg hover:bg-gray-700 transition transform hover:scale-105"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero