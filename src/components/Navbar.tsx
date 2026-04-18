import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GeniXLogo } from "./GeniXLogo";

const links = [
  { label: "Proqram", href: "#programs" },
  { label: "Necə işləyir", href: "#timeline" },
  { label: "Kim üçün", href: "#audience" },
  { label: "Müraciət", href: "#apply" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 backdrop-blur-xl bg-background/60 border-b border-white/5" : "py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#" className="text-xl">
          <GeniXLogo />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
};
