"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Check, Star, ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Jornadas() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <div className="bg-[#1C1917] min-h-screen text-stone-200 selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. HERO COM VÍDEO BACKGROUND (Imersão Total) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Overlay Gradiente */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-[#1C1917]" />
        
        {/* Vídeo de Fundo (Simulado com Imagem + Animação lenta por enquanto) */}
        <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20 }}
            className="absolute inset-0 z-0 opacity-60"
        >
            <img 
                src="https://images.unsplash.com/photo-1599447421405-0e32096f3071?q=80&w=2600" 
                className="w-full h-full object-cover" 
            />
        </motion.div>

        <div className="relative z-20 text-center max-w-4xl px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <span className="inline-block py-1 px-3 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-6 bg-black/20 backdrop-blur-md">
                    Integra4 Studio
                </span>
                <h1 className="font-serif text-5xl md:text-8xl text-white mb-6 leading-none">
                    Sua Jornada <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FBF5D4]">Interior</span>
                </h1>
                <p className="text-lg md:text-xl text-stone-300 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
                    Acesse centenas de aulas, meditações e práticas guiadas para alinhar suas quatro dimensões. O Netflix do seu autoconhecimento.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-[#D4AF37] text-black px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105">
                        Começar 7 dias grátis
                    </button>
                    <button className="flex items-center justify-center gap-2 text-white px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest backdrop-blur-sm">
                        <Play size={12} fill="currentColor" /> Ver Trailer
                    </button>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 2. CARROSSEL HORIZONTAL DE CONTEÚDO (Efeito Streaming) */}
      <section ref={targetRef} className="relative h-[300vh] bg-[#1C1917]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
            <div className="px-12 mb-8">
                <h2 className="font-serif text-4xl text-white mb-2">Trilhas Originais</h2>
                <p className="text-stone-400 font-light">Séries exclusivas criadas por especialistas.</p>
            </div>
            
            <motion.div style={{ x }} className="flex gap-8 px-12">
                <SerieCard 
                    title="Despertar Matinal" 
                    episodes="12 Aulas" 
                    category="Físico" 
                    img="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=600"
                />
                <SerieCard 
                    title="Ansiedade Zero" 
                    episodes="8 Sessões" 
                    category="Mental" 
                    img="https://images.unsplash.com/photo-1474418397713-7ede21d49118?q=80&w=600"
                />
                <SerieCard 
                    title="Cura Emocional" 
                    episodes="15 Práticas" 
                    category="Emocional" 
                    img="https://images.unsplash.com/photo-1518133526743-494b598b9f70?q=80&w=600"
                />
                <SerieCard 
                    title="Alinhamento de Chakras" 
                    episodes="7 Rituais" 
                    category="Energético" 
                    img="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600"
                />
                 <SerieCard 
                    title="Nutrição da Alma" 
                    episodes="Masterclass" 
                    category="Físico" 
                    img="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=600"
                />
            </motion.div>
        </div>
      </section>

      {/* 3. PLANOS DE ASSINATURA (Design Premium) */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#1C1917] to-black">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
                <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">Membership</span>
                <h2 className="font-serif text-5xl text-white mt-4 mb-6">Escolha seu caminho</h2>
                <p className="text-stone-400 max-w-xl mx-auto">Sem fidelidade. Cancele quando quiser. Evolua no seu ritmo.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Plano Free */}
                <PlanCard 
                    title="Iniciante" 
                    price="Grátis" 
                    features={["Acesso a 3 aulas/mês", "Comunidade aberta", "Blog exclusivo"]} 
                />
                
                {/* Plano Pro (Destaque) */}
                <div className="relative transform md:-translate-y-8">
                    <div className="absolute -inset-[1px] bg-gradient-to-b from-[#D4AF37] to-[#5B3C85] rounded-2xl opacity-50 blur-sm"></div>
                    <div className="relative bg-[#262321] p-10 rounded-2xl border border-[#D4AF37]/30 h-full flex flex-col">
                        <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase tracking-wider">
                            Mais Popular
                        </div>
                        <h3 className="font-serif text-3xl text-white mb-2">Jornada Completa</h3>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-sm text-stone-400">R$</span>
                            <span className="text-5xl font-light text-[#D4AF37]">49</span>
                            <span className="text-sm text-stone-400">/mês</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {[
                                "Acesso ilimitado a todas as trilhas", 
                                "Novos conteúdos toda semana", 
                                "Desconto de 10% na Loja",
                                "Downloads offline",
                                "Lives mensais com mentores"
                            ].map((feat, i) => (
                                <li key={i} className="flex items-start gap-3 text-stone-300 text-sm">
                                    <Check size={16} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                            Assinar Agora
                        </button>
                    </div>
                </div>

                {/* Plano Anual */}
                <PlanCard 
                    title="Anual" 
                    price="R$ 490" 
                    period="/ano"
                    features={["Tudo do plano Completo", "2 meses grátis", "Kit de boas-vindas (Físico)", "Mentoria em grupo trimestral"]} 
                />
            </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 text-center border-t border-white/5">
        <h2 className="font-serif text-3xl text-white mb-8">Ainda não tem certeza?</h2>
        <div className="flex flex-col items-center gap-4">
            <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-[#1C1917] bg-stone-700 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} />
                    </div>
                ))}
            </div>
            <p className="text-stone-400 text-sm">Junte-se a mais de 2.000 alunos transformados.</p>
            <Link href="/sobre" className="text-[#D4AF37] border-b border-[#D4AF37] pb-1 hover:text-white transition-colors mt-4 inline-flex items-center gap-2">
                Conheça nossos mentores <ArrowUpRight size={14} />
            </Link>
        </div>
      </section>
    </div>
  );
}

// Componentes Auxiliares
function SerieCard({ title, episodes, category, img }: any) {
    return (
        <div className="min-w-[300px] h-[450px] relative group cursor-pointer overflow-hidden rounded-xl bg-stone-800">
            <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-[10px] uppercase font-bold border border-white/10">
                {category}
            </div>
            <div className="absolute bottom-6 left-6">
                <p className="text-[#D4AF37] text-xs font-bold uppercase mb-1 flex items-center gap-1">
                    <Play size={10} fill="currentColor"/> {episodes}
                </p>
                <h3 className="font-serif text-2xl text-white group-hover:text-[#D4AF37] transition-colors">{title}</h3>
            </div>
            {/* Lock Icon se não for assinante (Visual Only) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                <Lock size={32} className="text-white/50" />
            </div>
        </div>
    )
}

function PlanCard({ title, price, period="/mês", features }: any) {
    return (
        <div className="bg-[#262321] p-10 rounded-2xl border border-white/5 flex flex-col h-full hover:border-white/20 transition-colors">
            <h3 className="font-serif text-2xl text-white mb-2">{title}</h3>
            <div className="flex items-baseline gap-1 mb-8">
                <span className="text-sm text-stone-400">{price === "Grátis" ? "" : "R$"}</span>
                <span className="text-4xl font-light text-white">{price}</span>
                <span className="text-sm text-stone-400">{price === "Grátis" ? "" : period}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feat: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-stone-400 text-sm">
                        <Check size={16} className="text-stone-600 flex-shrink-0 mt-0.5" />
                        {feat}
                    </li>
                ))}
            </ul>
            <button className="w-full bg-white/10 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Começar
            </button>
        </div>
    )
}