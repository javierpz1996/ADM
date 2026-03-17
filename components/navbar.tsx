"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Trophy } from "lucide-react";

const navLinks = [
  { name: "Inicio", href: "#hero" },
  { name: "Equipos", href: "#teams" },
  { name: "Noticias", href: "#news" },
  { name: "Mercado", href: "#merch" },
  { name: "Streamers", href: "#streamers" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Cambia de color cuando se scrollea bastante (más que el alto del hero)
      const heroHeight = window.innerHeight * 0.9;
      const threshold = heroHeight;
      setScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/20 backdrop-blur-md"
          : "bg-transparent border-b border-transparent"
      }`}
      style={scrolled ? { backgroundColor: "#896afdb3" } : undefined}
    >
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between w-full">
          {/* Logo - izquierda */}
          <Link href="/" className="shrink-0 group" style={{ fontFamily: "'Bison Bold', sans-serif" }}>
            <span className="text-3xl font-black uppercase tracking-[0.25em] text-white group-hover:text-[#a78bfa] transition-colors">
              ADL
            </span>
          </Link>

          {/* Navegación y CTA - derecha */}
          <div className="hidden md:flex items-center gap-1 ml-auto" style={{ fontFamily: "'Bison Bold', sans-serif" }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-2xl font-medium text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/10"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-[#a78bfa]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#020617]/95 backdrop-blur-md border-b border-white/10" style={{ fontFamily: "'Bison Bold', sans-serif" }}>
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-3 text-xl font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
