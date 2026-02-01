"use client";

import { motion } from "framer-motion";

export default function InfiniteMarquee() {
  const words = [
    "Autoconhecimento", "•", "Equilíbrio", "•", "Energia Vital", "•", 
    "Cura Interior", "•", "Integração", "•", "Consciência", "•"
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#D4AF37] py-3 border-y border-[#2D1B4E]">
      {/* Overlay para dar profundidade nas bordas */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#D4AF37] to-transparent z-10" />
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#D4AF37] to-transparent z-10" />

      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20, // Velocidade (quanto menor, mais rápido)
          }}
          className="flex gap-8 items-center"
        >
          {/* Repetimos a lista várias vezes para garantir o loop infinito sem buracos */}
          {[...words, ...words, ...words, ...words].map((word, i) => (
            <span
              key={i}
              className={`text-[#2D1B4E] uppercase tracking-[0.2em] text-xs font-bold ${
                word === "•" ? "text-white scale-150" : ""
              }`}
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}