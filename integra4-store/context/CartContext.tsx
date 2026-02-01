"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Tipos (O que compõe nosso carrinho)
type CartItem = {
  id: number;
  title: string;
  price: string;
  image: string;
  quantity: number;
};

interface CartContextType {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // Adicionar item (se já existe, aumenta quantidade)
  const addToCart = (product: any) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true); // Abre o carrinho automaticamente ao adicionar
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ isOpen, openCart, closeCart, cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook para facilitar o uso em outros arquivos
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de um CartProvider");
  return context;
};