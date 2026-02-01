// components/StoreGrid.tsx
// ARQUIVO COMPLETO E ATUALIZADO

"use client";
import { useState } from "react";
import Link from "next/link";
import { getDimensionColor } from "@/lib/shopify";
import DimensionFilters from "./DimensionFilters";

export default function StoreGrid({ products }: { products: any[] }) {
  const [filter, setFilter] = useState<string | null>(null);
  
  const safeProducts = products || [];
  
  // Filtrar produtos baseado na dimensão selecionada
  const filteredProducts = filter 
    ? safeProducts.filter(p => 
        p.tags.some((tag: string) => tag.toLowerCase().includes(filter))
      )
    : safeProducts;

  return (
    <div className="bg-[#FAFAF9] min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <h1 className="font-serif text-5xl md:text-6xl text-[#2D1B4E] mb-4 text-center">
          Nossos Rituais
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Produtos cuidadosamente selecionados para cada dimensão do seu ser
        </p>
        
        {/* Filtros por Dimensão */}
        <DimensionFilters onFilterChange={setFilter} />
        
        {/* Grid de Produtos */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">
              Nenhum produto encontrado nesta dimensão.
            </p>
            <button 
              onClick={() => setFilter(null)}
              className="text-[#2D1B4E] underline hover:text-[#4A6C48]"
            >
              Ver todos os produtos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const dimension = getDimensionColor(product.tags);
              const price = parseFloat(product.priceRange?.minVariantPrice?.amount || "0");
              const formattedPrice = `R$ ${price.toFixed(2).replace('.', ',')}`;
              
              return (
                <Link 
                  key={product.id} 
                  href={`/loja/produto/${product.handle}`} 
                  className="group block"
                >
                  {/* Card do Produto */}
                  <div className="aspect-[4/5] bg-stone-200 overflow-hidden relative mb-4 rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300">
                    {/* Badge da Dimensão */}
                    <div 
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-white text-xs font-bold z-10 shadow-lg"
                      style={{ backgroundColor: dimension.color }}
                    >
                      <span className="mr-1">{dimension.icon}</span>
                      {dimension.name}
                    </div>
                    
                    {/* Imagem do Produto */}
                    {product.images?.edges[0]?.node?.url && (
                      <img 
                        src={product.images.edges[0].node.url} 
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    
                    {/* Overlay no Hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                  </div>
                  
                  {/* Info do Produto */}
                  <div>
                    <h3 className="font-serif text-xl text-[#2D1B4E] mb-2 group-hover:text-[#4A6C48] transition-colors">
                      {product.title}
                    </h3>
                    
                    <p 
                      className="text-xl font-bold"
                      style={{ color: dimension.color }}
                    >
                      {formattedPrice}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}