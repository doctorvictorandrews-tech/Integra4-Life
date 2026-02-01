"use client";

import { useState } from "react";
import { checkoutAction } from "@/app/actions"; // Importa a ação segura
import { Minus, Plus, ShoppingBag, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductDetails({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Tratamento seguro dos dados
  const price = parseFloat(product.priceRange?.minVariantPrice?.amount || "0");
  const formattedPrice = `R$ ${price.toFixed(2).replace(".", ",")}`;
  const mainImage = product.images?.edges[0]?.node?.url || "";
  
  // Pega o ID da variante para comprar
  const variantId = product.variants?.edges[0]?.node?.id;

  const handleBuyNow = async () => {
    if (!variantId) {
      alert("Erro: Produto indisponível para compra direta.");
      return;
    }

    setLoading(true);
    try {
      // Chama a ação do servidor que criamos no app/actions.ts
      await checkoutAction(variantId, quantity);
    } catch (error) {
      console.error(error);
      alert("Erro ao iniciar o checkout. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        <Link href="/loja" className="inline-flex items-center gap-2 text-stone-500 hover:text-[#2D1B4E] mb-8 text-sm uppercase tracking-widest transition-colors">
          <ArrowLeft size={16} /> Voltar para Loja
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Imagem */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="aspect-[4/5] bg-stone-100 rounded-lg overflow-hidden relative border border-stone-200">
            {mainImage ? (
              <img src={mainImage} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-stone-400">Sem Imagem</div>
            )}
          </motion.div>

          {/* Informações */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col justify-center">
            
            <h1 className="font-serif text-4xl md:text-5xl text-[#2D1B4E] mb-4 leading-tight">
              {product.title}
            </h1>
            
            <p className="text-3xl font-light text-[#4A6C48] mb-8">{formattedPrice}</p>

            <div className="prose prose-stone mb-10 text-stone-600 font-light" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

            {/* Seletor de Quantidade */}
            <div className="flex items-center gap-6 mb-8 border-y border-stone-200 py-6">
              <span className="text-xs uppercase tracking-widest text-stone-500">Quantidade</span>
              <div className="flex items-center gap-4 bg-white border border-stone-200 rounded-full px-4 py-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-[#D4AF37]"><Minus size={16}/></button>
                <span className="w-6 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="hover:text-[#D4AF37]"><Plus size={16}/></button>
              </div>
            </div>

            {/* BOTÃO DE COMPRA */}
            <button 
              onClick={handleBuyNow}
              disabled={loading}
              className="w-full bg-[#2D1B4E] text-white py-5 rounded-lg uppercase tracking-[0.2em] font-medium hover:bg-[#4A6C48] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              {loading ? (
                <> <Loader2 className="animate-spin" /> Redirecionando... </>
              ) : (
                <> <ShoppingBag size={20} /> Comprar Agora </>
              )}
            </button>
            
            <p className="text-[10px] text-stone-400 mt-4 text-center uppercase tracking-wide">
              Pagamento seguro via Shopify
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}