import { getProducts } from "@/lib/shopify";
import StoreGrid from "@/components/StoreGrid";

// CONFIRA SE ESTA LINHA ESTÁ AQUI:
export const dynamic = 'force-dynamic';

export default async function StorePage() {
  const products = await getProducts();
  return <StoreGrid products={products} />;
}