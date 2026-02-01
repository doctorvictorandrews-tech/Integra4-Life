"use client";

import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartSidebar() {
  const { isOpen, closeCart, cartItems, removeFromCart } = useCart();

  // Calcular total (Remove o "R$", troca vírgula por ponto e multiplica pela quantidade)
  const total = cartItems.reduce((acc, item) => {
    // Tratamento de segurança para garantir que é uma string antes de dar replace
    const priceString = String(item.price);
    const priceNumber = parseFloat(priceString.replace("R$ ", "").replace(",", "."));
    return acc + (isNaN(priceNumber) ? 0 : priceNumber) * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fundo Escuro (Backdrop) - Clicar fora fecha o carrinho */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* A Gaveta Lateral */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FAFAF9] shadow-2xl z-[70] flex flex-col border-l border-stone-200"
          >
            {/* Cabeçalho */}
            <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-white">
              <h2 className="font-serif text-2xl text-[#2D1B4E]">Seu Ritual</h2>
              <button onClick={closeCart} className="text-stone-400 hover:text-[#2D1B4E] transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Lista de Produtos */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-light">Sua sacola está vazia.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Imagem do Produto */}
                    <div className="w-20 h-20 bg-stone-200 rounded-md overflow-hidden flex-shrink-0 border border-stone-100">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Detalhes */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-[#2D1B4E] leading-tight mb-1 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-[#4A6C48] text-sm font-medium">{item.price}</p>
                      </div>
                      
                      {/* Controles (+ / - / Remover) */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 border border-stone-300 rounded-full px-2 py-1">
                          <button className="text-stone-500 hover:text-stone-800 transition-colors">
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-medium w-4 text-center text-[#2D1B4E]">
                            {item.quantity}
                          </span>
                          <button className="text-stone-500 hover:text-stone-800 transition-colors">
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-red-400 hover:text-red-600 underline transition-colors"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Rodapé (Total + Checkout) */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-stone-200 space-y-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center text-[#2D1B4E]">
                  <span className="uppercase tracking-widest text-sm font-medium">Subtotal</span>
                  <span className="font-serif text-2xl">
                    R$ {total.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <p className="text-xs text-stone-500 text-center pb-2">
                  Taxas e frete calculados no checkout.
                </p>
                <button 
                  onClick={() => {
                    alert("Redirecionando para o Checkout Seguro da Shopify...");
                    closeCart();
                  }}
                  className="w-full bg-[#2D1B4E] text-white py-4 rounded-full uppercase tracking-[0.2em] hover:bg-[#5B3C85] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform active:scale-95"
                >
                  Finalizar Compra <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}