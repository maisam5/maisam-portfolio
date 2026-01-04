"use client";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

import { useState, FormEvent, ReactNode } from "react";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

const socials = [
  {
    label: "LinkedIn",
    icon: <FaLinkedinIn size={20} />,
    link: "https://www.linkedin.com/in/yourprofile",
  },
  {
    label: "GitHub",
    icon: <FaGithub size={20} />,
    link: "https://github.com/yourusername",
  },
];

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [token, setToken] = useState<string | null>(null);

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const form = e.currentTarget;
  const formData = new FormData(form);

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    if (!res.ok) throw new Error("Failed");

    setToast(true);
    form.reset();
    setTimeout(() => setToast(false), 2500);
  } catch {
    alert("Submission failed. Try again.");
  } finally {
    setLoading(false);
  }
};




  return (
    <section
      id="contact"
      className="relative min-h-screen bg-black text-white px-6 py-24 flex items-center justify-center overflow-hidden"
    >
      {/* Hero-style glow */}
      <div className="absolute -top-40 -left-40 w-[380px] h-[380px] bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/20 blur-3xl rounded-full" />

      <div className="relative w-full max-w-6xl grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-14">
        {/* SOCIAL TIMELINE */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative flex md:flex-col flex-row items-center justify-center gap-6"
        >
          {/* Timeline Line */}
          <motion.div
            initial={{ scaleY: 0, scaleX: 0 }}
            whileInView={{ scaleY: 1, scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="
              absolute md:w-[2px] md:h-full md:top-0 md:left-1/2
              w-full h-[2px] left-0 top-1/2 
              bg-gradient-to-b md:bg-gradient-to-b bg-gradient-to-r
              from-cyan-500/0 via-cyan-400 to-cyan-500/0
            "
          />

          {socials.map((item, i) => (
            <MagneticIcon  key={item.label} index={i} {...item} />
          ))}
        </motion.div>

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Let’s Build <br />
            <span className="text-cyan-400">Something Great</span>
          </h2>

          <p className="text-gray-400 max-w-md">
            Whether it’s a product, startup, or portfolio — I love working on
            ideas that make an impact.
          </p>

          <div className="flex items-center gap-3 text-gray-300">
            <FaEnvelope />
            <span>maisamabbas1272@gmail.com</span>
          </div>

          <p className="text-gray-400">📍 Pakistan</p>
        </motion.div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-6"
        >
          <input
            required
            name="name"
            placeholder="Your Name"
            className="w-full px-4 py-3 bg-black/40 rounded-lg border border-white/10 focus:border-cyan-400 outline-none transition"
          />

          <input
            required
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 bg-black/40 rounded-lg border border-white/10 focus:border-cyan-400 outline-none transition"
          />

          <textarea
            required
            rows={4}
            name="message"
            placeholder="Your Message"
            className="w-full px-4 py-3 bg-black/40 rounded-lg border border-white/10 focus:border-cyan-400 outline-none resize-none transition"
          />
         
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </div>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-8 right-8 bg-cyan-500 text-black px-6 py-3 rounded-lg shadow-xl"
          >
            ✅ Message sent successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;

/* ---------------- MAGNETIC ICON ---------------- */

type MagneticProps = {
  icon: ReactNode;
  label: string;
  link: string;
  index: number;
};

const MagneticIcon = ({ icon, label, link, index }: MagneticProps) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      className="group relative z-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      whileHover={{ scale: 1.1 }}
    >
      {/* Tooltip */}
      <span
        className="
          absolute md:left-14 md:top-1/2 md:-translate-y-1/2
          bottom-14 left-1/2 -translate-x-1/2
          opacity-0 group-hover:opacity-100
          transition
          bg-black text-white text-xs px-3 py-1 rounded-md
          pointer-events-none
        "
      >
        {label}
      </span>

      {/* Icon */}
      <div
        className="
          w-12 h-12 rounded-full
          bg-black flex items-center justify-center
          border border-white/10
          text-white
          group-hover:text-cyan-400
          transition-colors duration-300
        "
      >
        {icon}
      </div>
    </motion.a>
  );
};

