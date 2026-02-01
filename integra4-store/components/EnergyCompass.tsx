"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wind, Zap, Heart, Activity, X } from "lucide-react";
import Link from "next/link";

export default function EnergyCompass() {
  const [isOpen, setIsOpen] = useState(false);

  // As opções baseadas nas 4 dimensões
  const options = [
    { label: "Estou sem Foco", dimension: "Mental", icon: <Wind size={18} />, color: "bg-blue-100 text-blue-800", link: "/loja?cat=Mental" },
    { label: "Sinto Ansiedade", dimension: "Emocional", icon: <Heart size={18} />, color: "bg-rose-100 text-rose-800", link: "/loja?cat=Emocional" },
    { label: "Corpo Cansado", dimension: "Física", icon: <Activity size={18} />, color: "bg-green-100 text-green-800", link: "/loja?cat=Físico" },
    { label: "Energia Baixa", dimension: "Energética", icon: <Zap size={18} />, color: "bg-purple-100 text-purple-800", link: "/loja?cat=Energia" },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end">
      
      {/* O Menu Aberto (A Bússola) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 bg-white/90 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl w-72"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-[#2D1B4E] text-lg">Como você se sente?</h3>
              <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-red-400">
                <X size={16} />
              </button>
            </div>
            
            <div className="space-y-3">
              {options.map((opt, i) => (
                <Link href={opt.link} key={i} onClick={() => setIsOpen(false)}>
                  <motion.div 
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-stone-100 hover:border-[#D4AF37] transition-colors cursor-pointer shadow-sm group"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${opt.color}`}>
                      {opt.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-700 group-hover:text-[#2D1B4E]">{opt.label}</p>
                      <p className="text-[10px] uppercase tracking-wider text-stone-400">Dimensão {opt.dimension}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* O Botão Flutuante (Orb) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative group"
      >
        {/* Anéis de energia pulsando */}
        <div className="absolute inset-0 bg-[#D4AF37] rounded-full animate-ping opacity-20 group-hover:opacity-40 duration-1000" />
        <div className="absolute -inset-2 bg-[#2D1B4E] rounded-full opacity-10 blur-md" />
        
        {/* O Botão Físico */}
        <div className="relative w-14 h-14 bg-[#2D1B4E] text-[#D4AF37] rounded-full flex items-center justify-center shadow-lg border border-[#D4AF37]/50 overflow-hidden">
            {/* Efeito Brilho */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            
            {isOpen ? <X /> : <Sparkles />}
        </div>

        {/* Tooltip (Texto de ajuda) */}
        {!isOpen && (
            <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#2D1B4E] text-white text-xs px-3 py-1 rounded-md whitespace-nowrap pointer-events-none"
            >
                Oráculo de Energia
                <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#2D1B4E] rotate-45" />
            </motion.div>
        )}
      </motion.button>
    </div>
  );
}