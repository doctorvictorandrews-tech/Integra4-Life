"use client";

import Link from "next/link";
import { useState, use } from "react"; // <--- Adicionamos o 'use' aqui
import { MoveLeft, Star, Truck, ShieldCheck, Leaf, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

// DADOS FICTÍCIOS
const products: any = {
  1: {
    id: 1,
    title: "Vela Aromática Lavanda & Ametista",
    price: "R$ 89,90",
    description: "Uma sinergia criada para acalmar a mente e elevar a vibração. A cera vegetal infundida com óleo essencial de lavanda francesa promove relaxamento profundo, enquanto a drusa de Ametista transmuta energias densas.",
    images: [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1200&auto=format&fit=crop"
    ],
    details: {
      propósito: "Relaxamento, Intuição e Transmutação Energética.",
      ritual: "Acenda a vela, respire profundamente 3 vezes e visualize uma luz violeta envolvendo seu corpo. Perfeita para meditações noturnas.",
      composição: "Cera de coco 100% vegetal, pavio de algodão, óleo essencial de Lavanda Angustifolia e cristal natural de Ametista."
    }
  },
  default: {
    id: 0,
    title: "Produto Integra4 Life",
    price: "R$ 0,00",
    description: "Produto carregando...",
    images: ["https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200"],
    details: { propósito: "Bem-estar", ritual: "Uso consciente.", composição: "Natural." }
  }
};

// AQUI ESTÁ A CORREÇÃO NO TIPO DO PARAMS
export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  
  // CORREÇÃO: Desembrulhamos a promessa usando o hook 'use'
  const { id } = use(params);
  
  // Agora usamos o 'id' direto, sem 'params.id'
  const product = products[id] || products[1]; 
  
  const [activeTab, setActiveTab] = useState("propósito");
  const { addToCart } = useCart();

  return (
    <div className="bg-[#FAFAF9] min-h-screen pb-20">
      
      {/* Botão Voltar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 mb-8">
        <Link href="/loja" className="inline-flex items-center text-stone-500 hover:text-[#2D1B4E] transition-colors text-sm uppercase tracking-wider gap-2">
          <MoveLeft size={16} /> Voltar para Loja
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        
        {/* COLUNA DA ESQUERDA: Imagem */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-stone-200 overflow-hidden rounded-lg shadow-sm">
            <img 
              src={product.images[0]} 
              alt={product.title} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2].map((i) => (
              <div key={i} className="w-24 h-24 flex-shrink-0 bg-stone-200 cursor-pointer opacity-70 hover:opacity-100 transition-opacity rounded-md overflow-hidden border border-stone-300">
                <img src={product.images[0]} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* COLUNA DA DIREITA: Informações e Compra */}
        <div className="pt-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-[#D4AF37]">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
            </div>
            <span className="text-xs text-stone-400">(12 avaliações)</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl text-[#2D1B4E] mb-4 leading-tight">
            {product.title}
          </h1>
          
          <p className="text-2xl font-light text-[#4A6C48] mb-8 border-b border-stone-200 pb-8">
            {product.price}
          </p>

          <p className="text-stone-600 leading-relaxed mb-8 text-lg font-light">
            {product.description}
          </p>

          {/* Botão de Compra */}
          <div className="space-y-4 mb-12">
            <button 
              onClick={() => addToCart({ ...product, image: product.images[0] })}
              className="w-full bg-[#2D1B4E] text-white py-5 rounded-full uppercase tracking-[0.2em] hover:bg-[#5B3C85] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95"
            >
              Adicionar ao Ritual
            </button>
            <p className="text-center text-xs text-stone-400 flex items-center justify-center gap-2">
              <ShieldCheck size={14} /> Compra segura e consciente
            </p>
          </div>

          {/* Abas de Detalhes */}
          <div className="border-t border-stone-200">
            {Object.keys(product.details).map((key) => (
              <div key={key} className="border-b border-stone-200">
                <button 
                  onClick={() => setActiveTab(activeTab === key ? "" : key)}
                  className="w-full py-6 flex justify-between items-center text-left hover:text-[#4A6C48] transition-colors"
                >
                  <span className="uppercase tracking-widest text-sm font-medium text-[#2D1B4E] flex items-center gap-3">
                    {key === 'ritual' && <Flame size={18} />}
                    {key === 'composição' && <Leaf size={18} />}
                    {key === 'propósito' && <Star size={18} />}
                    {key}
                  </span>
                  <span className="text-2xl font-light text-stone-400">
                    {activeTab === key ? "-" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {activeTab === key && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-stone-600 font-light leading-relaxed">
                        {product.details[key]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Frete */}
          <div className="mt-8 bg-white p-6 rounded-xl border border-stone-100 flex gap-4 items-start">
            <Truck className="text-[#4A6C48] flex-shrink-0" size={24} />
            <div>
              <h4 className="text-sm font-bold text-[#2D1B4E] uppercase tracking-wider mb-1">Envio Consciente</h4>
              <p className="text-xs text-stone-500">
                Embalagens biodegradáveis e envio em até 48h úteis após a confirmação.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}