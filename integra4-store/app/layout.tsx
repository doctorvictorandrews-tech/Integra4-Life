// app/layout.tsx
// ARQUIVO COMPLETO E ATUALIZADO

import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif" 
});

export const metadata: Metadata = {
  title: "Integra4 Life - Bem-Estar Integrativo",
  description: "Sua jornada de conexão e bem-estar através das 4 dimensões do ser humano: Física, Mental, Emocional e Energética.",
  keywords: "bem-estar, saúde integrativa, produtos naturais, 4 dimensões, autocuidado, equilíbrio",
  authors: [{ name: "Integra4 Life" }],
  openGraph: {
    title: "Integra4 Life - Bem-Estar Integrativo",
    description: "Produtos naturais para corpo, mente, emoção e energia",
    type: "website",
    locale: "pt_BR",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} ${playfair.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}