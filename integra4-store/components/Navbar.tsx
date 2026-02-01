"use client";

import Link from "next/link";
import { ShoppingBag, Menu, Search, User } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openCart, cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Loja", path: "/loja" },
    { name: "Jornadas", path: "/jornadas" },
    { name: "Sobre", path: "/sobre" },
  ];

  // Cores dinâmicas baseadas no scroll
  const textColor = isScrolled ? "text-[#2D1B4E]" : "text-white";
  const hoverColor = isScrolled ? "hover:text-[#4A6C48]" : "hover:text-[#D4AF37]";
  const lineColor = isScrolled ? "bg-[#2D1B4E]" : "bg-[#D4AF37]";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-[#FAFAF9]/95 backdrop-blur-md border-b border-stone-200 py-4 shadow-sm" 
            : "bg-gradient-to-b from-black/60 to-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            
            {/* Menu Mobile Trigger */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`${textColor} transition-colors`}>
                <Menu size={24} /> 
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none md:justify-start">
              <Link href="/" className="flex flex-col items-center md:items-start group">
                <span className={`font-serif tracking-widest transition-all duration-500 ${textColor} ${isScrolled ? "text-xl" : "text-2xl md:text-3xl"}`}>
                  INTEGRA4
                </span>
                <span className={`text-[10px] uppercase tracking-[0.4em] transition-all duration-500 ${isScrolled ? "text-[#4A6C48] opacity-100" : "text-white/80 opacity-90"}`}>
                  Life Store
                </span>
              </Link>
            </div>

            {/* Links Desktop - Cores Corrigidas */}
            <div className="hidden md:flex space-x-12 items-center justify-center flex-1">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`relative text-xs uppercase tracking-[0.2em] font-medium transition-colors group ${textColor} ${hoverColor}`}
                >
                  {item.name}
                  <span className={`absolute -bottom-2 left-0 w-0 h-[1px] ${lineColor} transition-all duration-300 group-hover:w-full`}></span>
                </Link>
              ))}
            </div>

            {/* Ícones da Direita */}
            <div className={`hidden md:flex items-center space-x-8 ${textColor}`}>
              <button className={`transition-colors ${hoverColor}`}><Search size={20} strokeWidth={1.5} /></button>
              <Link href="/account" className={`transition-colors ${hoverColor}`}><User size={20} strokeWidth={1.5} /></Link>
              
              <div onClick={openCart} className={`relative cursor-pointer transition-colors ${hoverColor}`}>
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#D4AF37] text-[#2D1B4E] text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white/20">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </div>

            {/* Carrinho Mobile */}
            <div className="flex items-center md:hidden" onClick={openCart}>
               <ShoppingBag size={20} className={textColor} />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Menu Mobile Fullscreen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#FAFAF9] md:hidden flex flex-col justify-center items-center space-y-8"
          >
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-3xl text-[#2D1B4E] hover:text-[#4A6C48] transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 p-2 text-[#2D1B4E]">
               X
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}