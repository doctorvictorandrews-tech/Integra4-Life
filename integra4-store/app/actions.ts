"use server";

import { createCheckoutMutation } from "@/lib/shopify";
import { redirect } from "next/navigation";

export async function checkoutAction(variantId: string, quantity: number) {
  // Cria o carrinho na Shopify
  const url = await createCheckoutMutation(variantId, quantity);
  
  // Redireciona o usuário para o pagamento
  if (url) {
    redirect(url);
  }
}