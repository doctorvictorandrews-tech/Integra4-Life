"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useRef } from "react";
import InfiniteMarquee from "@/components/InfiniteMarquee";

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF9] overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#2D1B4E]">
            {/* Imagem de Fundo (Mulher meditando/atmosfera) - LINK CORRIGIDO */}
            <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-50 mix-blend-overlay">
                <img 
                    src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2600&auto=format&fit=crop" 
                    className="w-full h-full object-cover" 
                    alt="Background textura natural"
                />
            </motion.div>
            {/* Gradientes Aura */}
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} 
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#4A6C48] rounded-full blur-[120px] opacity-30 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#FAFAF9]/10 z-0 pointer-events-none" />
        </div>

        <div className="relative z-10 text-center px-4">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
                <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1 mb-8 backdrop-blur-sm bg-white/5">
                    <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
                    <span className="text-white text-[10px] tracking-[0.2em] uppercase font-medium">Nova Coleção Disponível</span>
                </div>
                
                <h1 className="font-serif text-6xl md:text-9xl text-white mb-2 leading-[0.9] tracking-tight opacity-95 drop-shadow-lg">
                    INTEGRA<span className="italic font-light">4</span>
                </h1>
                <p className="font-serif text-3xl md:text-5xl text-white/90 italic font-light mb-10 drop-shadow-md">
                    Life Store
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <Link href="/loja" className="bg-[#D4AF37] text-[#2D1B4E] px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-all transform hover:scale-105 duration-300 shadow-lg hover:shadow-[#D4AF37]/50">
                        Começar Ritual
                    </Link>
                    <button className="flex items-center gap-3 text-white text-xs uppercase tracking-widest hover:text-[#D4AF37] transition-colors group">
                        <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#D4AF37]">
                            <Play size={10} fill="currentColor" />
                        </div>
                        Ver Manifesto
                    </button>
                </div>
            </motion.div>
        </div>
      </section>

      <InfiniteMarquee />

      {/* 2. MANIFESTO */}
      <section className="py-32 bg-[#FAFAF9] relative">
         <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
                <span className="text-[#4A6C48] font-bold text-xs tracking-[0.3em] uppercase mb-6 block">Sobre a Essência</span>
                <h2 className="font-serif text-4xl md:text-6xl text-[#2D1B4E] leading-[1.1] mb-8">
                    Não vendemos produtos. <br/> <span className="italic text-stone-400">Entregamos frequência.</span>
                </h2>
                <p className="text-stone-600 leading-relaxed font-light text-lg mb-8">
                    A Integra4 Life nasce da união entre ciência e espiritualidade. Cada vela, cristal ou aroma é uma ferramenta tecnológica ancestral para recalibrar suas quatro dimensões.
                </p>
                <Link href="/sobre" className="text-[#2D1B4E] border-b border-[#2D1B4E] pb-1 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                    Conheça nossa filosofia
                </Link>
            </div>
            <div className="relative">
                <div className="absolute -inset-4 border border-[#2D1B4E]/10 rounded-full rotate-6 z-0"></div>
                {/* Imagem do Produto/Kit - LINK CORRIGIDO */}
                <img 
                    src="https://images.unsplash.com/photo-1616523910543-162788e02580?q=80&w=1200&auto=format&fit=crop" 
                    className="relative z-10 rounded-2xl shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                    alt="Kit de produtos"
                />
            </div>
         </div>
      </section>

      {/* 3. AS DIMENSÕES - LINKS DE IMAGENS ATUALIZADOS */}
      <section className="py-24 bg-[#2D1B4E] text-white overflow-hidden">
        <div className="px-6 mb-12 flex justify-between items-end max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl">Escolha sua Dimensão</h2>
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase hidden md:block">Navegue pelas energias</span>
        </div>
        
        <div className="flex gap-6 overflow-x-auto px-6 pb-12 no-scrollbar snap-x">
            <DimensionCard 
                number="01" title="Física" subtitle="Corpo & Matéria" 
                img="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop" 
            />
            <DimensionCard 
                number="02" title="Mental" subtitle="Foco & Clareza" 
                img="https://images.unsplash.com/photo-1499209971180-41bb66802800?q=80&w=800&auto=format&fit=crop" 
            />
            <DimensionCard 
                number="03" title="Emocional" subtitle="Sentir & Curar" 
                img="https://images.unsplash.com/photo-1518133526743-494b598b9f70?q=80&w=800&auto=format&fit=crop" 
            />
            <DimensionCard 
                number="04" title="Energética" subtitle="Vibração & Alma" 
                img="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop" 
            />
        </div>
      </section>
    </div>
  );
}

function DimensionCard({ number, title, subtitle, img }: any) {
    return (
        <div className="min-w-[300px] md:min-w-[400px] h-[500px] relative group cursor-pointer overflow-hidden rounded-lg snap-center border border-white/10">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10" />
            <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={title} />
            
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <span className="text-6xl font-serif text-white/20 absolute -top-12 left-6">{number}</span>
                <h3 className="text-3xl font-serif mb-2 relative">{title}</h3>
                <div className="w-full h-[1px] bg-white/30 mb-4 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <p className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs">{subtitle}</p>
            </div>
        </div>
    )
}