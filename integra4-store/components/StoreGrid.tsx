"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StoreGrid({ products }: { products: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  // Se não vier produtos (erro na API), usa array vazio para não quebrar
  const safeProducts = products || [];

  // Extrair categorias das Tags dos produtos reais
  const allTags = safeProducts.reduce((acc: string[], product) => {
    return [...acc, ...(product.tags || [])];
  }, []);
  
  // Remove duplicatas e adiciona "Todos"
  const categories = ["Todos", ...Array.from(new Set(allTags)) as string[]];

  // Filtragem
  const filteredProducts = safeProducts.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || (product.tags || []).includes(selectedCategory);
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FAFAF9] min-h-screen pb-20">
      <div className="pt-32 pb-10 text-center px-4">
        <span className="text-xs font-bold tracking-[0.3em] text-[#4A6C48] uppercase mb-4 block">Loja Oficial</span>
        <h1 className="font-serif text-5xl md:text-6xl text-[#2D1B4E] mb-6">Ferramentas de Conexão</h1>
      </div>

      {/* Barra de Filtros */}
      <div className="sticky top-20 z-30 bg-[#FAFAF9]/95 backdrop-blur border-y border-stone-200 mb-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
          <div className="max-w-md mx-auto relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-hover:text-[#2D1B4E]" size={18} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-stone-200 rounded-full py-2 pl-10 pr-4 outline-none focus:border-[#2D1B4E]"
            />
          </div>
          
          {/* Categorias (só aparece se tiver tags cadastradas) */}
          {categories.length > 1 && (
            <div className="flex justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs uppercase tracking-wider px-3 py-1 rounded-full transition-all whitespace-nowrap ${
                    selectedCategory === cat ? "bg-[#2D1B4E] text-white" : "text-stone-500 hover:text-[#2D1B4E] bg-white border border-stone-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid de Produtos */}
      <div className="max-w-7xl mx-auto px-4 min-h-[400px]">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-stone-400 flex flex-col items-center">
            <ShoppingBag size={48} className="mb-4 opacity-20" />
            <p>Nenhum produto encontrado.</p>
            <p className="text-xs mt-2">Verifique se o produto está como "Ativo" no Shopify.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={product.id}
                >
                  {/* LINK CORRIGIDO: Usa o HANDLE para ir à página certa */}
                  <Link href={`/loja/produto/${product.handle}`} className="group cursor-pointer block h-full">
                    <div className="relative aspect-[4/5] overflow-hidden bg-stone-200 mb-6 rounded-sm border border-stone-100">
                      
                      {/* Imagem */}
                      {product.images?.edges[0] ? (
                        <img 
                          src={product.images.edges[0].node.url} 
                          alt={product.images.edges[0].node.altText || product.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-300">Sem Imagem</div>
                      )}
                      
                      {/* Tag */}
                      {product.tags && product.tags[0] && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest text-[#2D1B4E]">
                          {product.tags[0]}
                        </div>
                      )}

                      {/* Botão Hover */}
                      <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="w-full bg-[#2D1B4E] text-white py-3 text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                          <ShoppingBag size={16} /> Ver Detalhes
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="font-serif text-xl text-[#2D1B4E] mb-2 group-hover:underline decoration-stone-300 underline-offset-4 line-clamp-1">
                        {product.title}
                      </h3>
                      <span className="text-[#4A6C48] font-medium block">
                        R$ {parseFloat(product.priceRange?.minVariantPrice?.amount || "0").toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}