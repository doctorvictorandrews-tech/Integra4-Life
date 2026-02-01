import { getProducts } from "@/lib/shopify";
import StoreGrid from "@/components/StoreGrid";

// Força o site a buscar dados novos sempre (evita cache antigo)
export const dynamic = 'force-dynamic';

export default async function StorePage() {
  // 1. Busca os produtos reais na Shopify
  const products = await getProducts();

  // 2. Manda para o componente visual
  return <StoreGrid products={products} />;
}