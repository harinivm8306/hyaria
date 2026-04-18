"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf, Sun, Moon } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Problems", href: "/problem" },
  { name: "Solution", href: "/solution" },
  { name: "Architecture", href: "/architecture" },
  { name: "Features", href: "/features" },
  { name: "Disease Detector", href: "/detector" },
  { name: "Live Dashboard", href: "/dashboard" },
  { name: "AI Tech", href: "/ai" },
  { name: "Prototype", href: "/prototype" },
  { name: "Results", href: "/results" },
  { name: "About Team", href: "/team" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Check initial theme from HTML class or localStorage
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3 bg-background/80 backdrop-blur-md border-b border-glass-border shadow-sm" : "py-5 bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            HY-<span className="text-primary">ARIA</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, 7).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className="p-2 glass rounded-xl hover:scale-110 transition-all text-foreground"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-600" />}
          </button>

          <Link
            href="/dashboard"
            className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            Launch App
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 text-foreground"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-glass-border p-6 lg:hidden shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-text-muted hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/dashboard"
                className="mt-4 px-5 py-3 bg-primary text-white rounded-xl text-center font-bold"
                onClick={() => setIsOpen(false)}
              >
                Launch App
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
