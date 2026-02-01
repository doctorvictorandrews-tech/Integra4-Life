"use server";

import { createCheckoutMutation } from "@/lib/shopify";
import { redirect } from "next/navigation";

export async function checkoutAction(variantId: string, quantity: number) {
  const url = await createCheckoutMutation(variantId, quantity);
  
  if (url) {
    redirect(url);
  }
}