"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Leaf, Wind, Zap, Heart } from "lucide-react";

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Efeito Parallax para a imagem de fundo
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="bg-[#FAFAF9] min-h-screen overflow-hidden">
      
      {/* 1. HERO CONCEITUAL */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2600" 
            className="w-full h-full object-cover opacity-90 brightness-75"
          />
        </motion.div>
        
        <div className="relative z-10 text-center max-w-5xl px-6 mix-blend-difference text-white">
            <motion.h1 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="font-serif text-6xl md:text-9xl leading-none mb-6"
            >
                Somos <br/> <span className="italic font-light">Integrados</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-xl md:text-2xl font-light tracking-wide max-w-2xl mx-auto"
            >
                A união entre a sabedoria ancestral e a tecnologia do bem-estar.
            </motion.p>
        </div>
      </section>

      {/* 2. O TEXTO QUE "RESPIRA" (Scroll Reveal) */}
      <section className="py-32 px-6 bg-[#FAFAF9]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
            <RevealText>
                "Não acreditamos em soluções rápidas."
            </RevealText>
            <RevealText delay={0.2}>
                "Acreditamos em rituais. Acreditamos que a cura vem de dentro para fora, integrando as quatro dimensões do ser humano: o corpo físico, a mente inquieta, o coração sensível e a energia vital."
            </RevealText>
            <div className="w-[1px] h-32 bg-[#2D1B4E]/20 mx-auto mt-12"></div>
        </div>
      </section>

      {/* 3. GALERIA DESCONSTRUÍDA (As 4 Dimensões) */}
      <section className="py-20 px-6 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto relative">
            <span className="absolute top-0 left-0 text-[10rem] md:text-[20rem] font-serif text-[#FAFAF9] leading-none -z-10 select-none">
                4D
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mt-20">
                {/* Imagem Artística */}
                <div className="relative">
                    <div className="absolute -inset-4 border border-[#D4AF37] rounded-full opacity-50 rotate-12"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1596468138838-7066d66ae9e4?q=80&w=1200" 
                        className="rounded-t-[10rem] rounded-b-lg shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </div>

                {/* Lista de Valores */}
                <div className="space-y-12">
                    <ValueItem 
                        icon={<Leaf />} 
                        title="Física" 
                        text="O corpo é o templo. Nutrimos ele com movimento, alimento e autocuidado sensorial." 
                    />
                    <ValueItem 
                        icon={<Wind />} 
                        title="Mental" 
                        text="Clareza é poder. Reprogramamos padrões limitantes para expandir a consciência." 
                    />
                    <ValueItem 
                        icon={<Heart />} 
                        title="Emocional" 
                        text="Sentir é curar. Acolhemos cada emoção como uma mensageira da alma." 
                    />
                    <ValueItem 
                        icon={<Zap />} 
                        title="Energética" 
                        text="Tudo é vibração. Elevamos a frequência através de cristais, sons e intenção." 
                    />
                </div>
            </div>
         </div>
      </section>

      {/* 4. O FUNDADOR / VISÃO (Editorial) */}
      <section className="py-32 bg-[#2D1B4E] text-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 order-2 md:order-1">
                <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-6 block">Nossa Origem</span>
                <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
                    Nascemos da necessidade de <span className="italic text-[#D4AF37]">reconexão</span>.
                </h2>
                <p className="text-stone-300 font-light leading-relaxed mb-8 text-lg">
                    A Integra4 Life não é apenas uma loja ou um curso. É um movimento. Percebemos que as pessoas cuidavam do corpo na academia, da mente na terapia, mas esqueciam da alma. Criamos um espaço onde tudo se encontra.
                </p>
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Sig_Freud_signature.svg" 
                    className="h-12 invert opacity-50" 
                    alt="Assinatura" 
                />
            </div>
            <div className="md:col-span-7 order-1 md:order-2 relative">
                 <img 
                    src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1600" 
                    className="w-full h-[600px] object-cover rounded-lg opacity-80"
                 />
                 <div className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-md p-6 border border-white/20 rounded-lg max-w-xs">
                    <p className="font-serif text-xl italic">"A cura verdadeira acontece quando paramos de fragmentar quem somos."</p>
                 </div>
            </div>
        </div>
      </section>

      {/* 5. CTA FINAL */}
      <section className="h-[50vh] flex flex-col items-center justify-center bg-[#D4AF37] text-[#2D1B4E] text-center px-4 relative overflow-hidden">
         <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/4 w-[100vw] h-[100vw] border-[1px] border-[#2D1B4E]/10 rounded-full border-dashed"
         />
         
         <h2 className="font-serif text-5xl md:text-7xl mb-8 relative z-10">Pronto para integrar?</h2>
         <Link href="/jornadas" className="bg-[#2D1B4E] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-[#2D1B4E] transition-all relative z-10 flex items-center gap-3">
            Iniciar Jornada <ArrowRight />
         </Link>
      </section>

    </div>
  );
}

// Componente de Texto que se revela
function RevealText({ children, delay = 0 }: { children: string, delay?: number }) {
    return (
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay }}
            className="font-serif text-2xl md:text-4xl text-[#2D1B4E] leading-relaxed"
        >
            {children}
        </motion.p>
    )
}

function ValueItem({ icon, title, text }: any) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex gap-6 group"
        >
            <div className="w-16 h-16 rounded-full bg-[#FAFAF9] flex items-center justify-center text-[#2D1B4E] group-hover:bg-[#D4AF37] group-hover:text-white transition-colors flex-shrink-0">
                {icon}
            </div>
            <div>
                <h3 className="font-serif text-2xl text-[#2D1B4E] mb-2">{title}</h3>
                <p className="text-stone-500 font-light leading-relaxed">{text}</p>
            </div>
        </motion.div>
    )
}