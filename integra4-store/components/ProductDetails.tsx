// components/ProductDetails.tsx
// ARQUIVO COMPLETO E ATUALIZADO

"use client";
import { useState } from "react";
import { checkoutAction } from "@/app/actions";
import { Minus, Plus, ShoppingBag, Loader2, ArrowLeft } from "lucide-react";
import { getDimensionColor } from "@/lib/shopify";
import Link from "next/link";

export default function ProductDetails({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const price = parseFloat(product.priceRange?.minVariantPrice?.amount || "0");
  const formattedPrice = `R$ ${price.toFixed(2).replace(".", ",")}`;
  const mainImage = product.images?.edges[0]?.node?.url;
  const variantId = product.variants?.edges[0]?.node?.id;
  const dimension = getDimensionColor(product.tags);

  const handleBuyNow = async () => {
    if (!variantId) return alert("Erro: Produto indisponível.");
    setLoading(true);
    try {
      await checkoutAction(variantId, quantity);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb - Voltar */}
        <Link 
          href="/loja" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2D1B4E] mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar para loja
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Coluna Esquerda - Imagens */}
          <div>
            {/* Imagem Principal */}
            <div className="aspect-[4/5] bg-stone-100 rounded-xl overflow-hidden mb-4 shadow-lg">
              {mainImage && (
                <img 
                  src={mainImage} 
                  alt={product.title} 
                  className="w-full h-full object-cover" 
                />
              )}
            </div>
            
            {/* Miniaturas (se houver mais imagens) */}
            {product.images?.edges.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.edges.slice(1, 5).map((img: any, idx: number) => (
                  <div 
                    key={idx} 
                    className="aspect-square bg-stone-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-offset-2 transition-all"
            
                  >
                    <img 
                      src={img.node.url} 
                      alt={`${product.title} - ${idx + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Coluna Direita - Informações */}
          <div className="flex flex-col justify-center">
            {/* Badge da Dimensão */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-bold mb-6 w-fit shadow-lg"
              style={{ backgroundColor: dimension.color }}
            >
              <span className="text-lg">{dimension.icon}</span>
              <span>Dimensão {dimension.name}</span>
            </div>

            {/* Título */}
            <h1 className="font-serif text-4xl md:text-5xl text-[#2D1B4E] mb-4 leading-tight">
              {product.title}
            </h1>
            
            {/* Preço */}
            <p 
              className="text-4xl font-bold mb-8"
              style={{ color: dimension.color }}
            >
              {formattedPrice}
            </p>

            {/* Descrição */}
            {product.description && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-[#2D1B4E] mb-3">
                  Sobre este produto
                </h2>
                <div 
                  className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: product.descriptionHtml || product.description 
                  }}
                />
              </div>
            )}

            {/* Seletor de Quantidade */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Quantidade:
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={18} className="text-gray-600" />
                  </button>
                  <span className="w-16 text-center font-bold text-lg">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)} 
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={18} className="text-gray-600" />
                  </button>
                </div>
                <span className="text-gray-600 text-sm">
                  {quantity > 1 && `Total: R$ ${(price * quantity).toFixed(2).replace('.', ',')}`}
                </span>
              </div>
            </div>

            {/* Botão Comprar */}
            <button 
              onClick={handleBuyNow}
              disabled={loading}
              className="w-full py-4 rounded-full flex justify-center items-center gap-3 text-white font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              style={{ backgroundColor: dimension.color }}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Processando...
                </>
              ) : (
                <>
                  <ShoppingBag size={24} />
                  Comprar Agora
                </>
              )}
            </button>

            {/* Informações Adicionais */}
            <div className="mt-10 pt-8 border-t border-gray-200 space-y-3">
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <span className="text-green-600 text-lg">✓</span>
                <span>Frete grátis para compras acima de R$ 150,00</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <span className="text-green-600 text-lg">✓</span>
                <span>Produtos 100% naturais e selecionados</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <span className="text-green-600 text-lg">✓</span>
                <span>7 dias para trocas e devoluções</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <span className="text-green-600 text-lg">✓</span>
                <span>Pagamento seguro via Shopify</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}