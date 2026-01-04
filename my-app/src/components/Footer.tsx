"use client";

import React from "react";
import {
  FaArrowUp,
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

const socials = [
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn size={16} />,
    link: "https://linkedin.com/in/yourprofile",
  },
  {
    name: "GitHub",
    icon: <FaGithub size={16} />,
    link: "https://github.com/yourusername",
  },
  {
    name: "Facebook",
    icon: <FaFacebookF size={16} />,
    link: "https://facebook.com/yourprofile",
  },
  {
    name: "Instagram",
    icon: <FaInstagram size={16} />,
    link: "https://instagram.com/yourprofile",
  },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full px-6 py-10 mt-20">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Social Icons Row */}
        <div className="flex justify-center gap-6">
          {socials.map((item) => (
            <a
              key={item.name}
              href={item.link}
              target="_blank"
              className="group flex flex-col items-center gap-2"
            >
              <div
                className="
                  w-10 h-10 rounded-full
                  flex items-center justify-center
                  border border-[#00E5FF]/40
                  text-[#00E5FF]
                  group-hover:bg-[#00E5FF]
                  group-hover:text-black
                  transition-all
                "
              >
                {item.icon}
              </div>

              <span className="text-[11px] text-slate-400 group-hover:text-white transition">
                {item.name}
              </span>
            </a>
          ))}
        </div>

       
        <div className="flex items-center gap-4">
          <div className="flex-grow border-t-2 border-[#00E5FF]"></div>

          <p className="shrink-0 text-[12px] md:text-sm text-slate-400 font-medium tracking-wide">
            © {new Date().getFullYear()} All rights reserved.
          </p>

          <div className="flex-grow border-t-2 border-[#00E5FF]"></div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 shrink-0 group hover:opacity-80 transition-opacity"
          >
            <span className="text-[10px] md:text-[11px] font-extrabold text-[#00E5FF] uppercase tracking-[0.2em]">
              Back to top
            </span>
            <FaArrowUp
              size={14}
              className="text-[#00E5FF] group-hover:-translate-y-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
