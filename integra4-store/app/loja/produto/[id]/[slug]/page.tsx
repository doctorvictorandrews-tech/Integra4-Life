import { getProduct } from "@/lib/shopify";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";

// FORÇA O NEXT.JS A NÃO FAZER CACHE (Resolve o problema do produto fake)
export const runtime = 'edge';
export const dynamic = 'force-dynamic'; 

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}