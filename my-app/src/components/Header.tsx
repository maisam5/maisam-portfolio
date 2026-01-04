"use client"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"

interface NavLink {
  name: string
  id: string
}

const navLinks: NavLink[] = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
]

const Header: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [active, setActive] = useState<string>("home")

  // Scroll spy
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      let current = "home"
      navLinks.forEach((link) => {
        const el = document.getElementById(link.id)
        if (el && window.scrollY >= el.offsetTop - 100) current = link.id
      })
      setActive(current)

      // Update URL hash without reload
      window.history.replaceState(null, "", `#${current}`)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scroll to section smoothly
  const handleScroll = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth" })
    setOpen(false)
  }

  // Mobile link animation
  const mobileLinkVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, type: "spring", stiffness: 300 },
    }),
  }

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all
        ${scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto h-16 px-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white drop-shadow-md">Maisam</h1>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className="relative text-white/80 hover:text-white transition"
                onClick={() => handleScroll(link.id)}
              >
                {link.name}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-blue-400"
                  layoutId="underline"
                  animate={{ width: active === link.id ? "100%" : "0%" }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </button>
            ))}
          </nav>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white text-2xl"
          >
            ☰
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Slide Menu */}
            <motion.div
              className="fixed top-0 right-0 h-full w-72 bg-[#0a0825] z-[60] md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="h-16 px-5 flex items-center justify-between border-b border-white/10">
                <span className="text-white font-bold">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white text-2xl"
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-col p-6 gap-6">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={mobileLinkVariants}
                    className={`text-white text-left text-lg transition ${
                      active === link.id ? "text-blue-400" : ""
                    }`}
                    onClick={() => handleScroll(link.id)}
                  >
                    {link.name}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
