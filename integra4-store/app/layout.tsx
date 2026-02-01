import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { CartProvider } from "@/context/CartContext";
import CustomCursor from "@/components/CustomCursor";
import EnergyCompass from "@/components/EnergyCompass"; // <--- Importado aqui

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Integra4 Life Store",
  description: "Bem-estar integrativo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-stone-50 text-stone-800 cursor-none`}>
        {/* cursor-none esconde a seta padrão para usar o CustomCursor */}
        
        <div className="bg-noise" />
        <CustomCursor />
        
        {/* Bússola Flutuante Adicionada */}
        <EnergyCompass /> 
        
        <CartProvider>
          <Navbar />
          <CartSidebar />
          <main className="pt-20 min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}