import { getProduct } from "@/lib/shopify";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";

// OBRIGATÓRIO PARA O CLOUDFLARE
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}