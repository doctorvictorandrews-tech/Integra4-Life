import Link from "next/link";
import { Instagram, Mail, Facebook, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2D1B4E] text-stone-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Coluna 1: A Marca */}
        <div className="col-span-1 md:col-span-1 space-y-6">
          <Link href="/" className="block">
            <span className="font-serif text-3xl text-white tracking-wider">
              INTEGRA4
            </span>
            <span className="block text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mt-1">
              Life Store
            </span>
          </Link>
          <p className="text-sm font-light leading-relaxed text-stone-400">
            Promovendo o equilíbrio entre corpo, mente, emoções e energia. Uma jornada de autoconhecimento unindo ciência e espiritualidade.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Mail size={20} /></a>
          </div>
        </div>

        {/* Coluna 2: Links Rápidos */}
        <div>
          <h4 className="text-white font-serif text-lg mb-6">Explorar</h4>
          <ul className="space-y-3 text-sm font-light">
            <li><Link href="/loja" className="hover:text-[#D4AF37] transition-colors">Loja Oficial</Link></li>
            <li><Link href="/jornadas" className="hover:text-[#D4AF37] transition-colors">Nossas Jornadas</Link></li>
            <li><Link href="/sobre" className="hover:text-[#D4AF37] transition-colors">Sobre a Integra4</Link></li>
            <li><Link href="/blog" className="hover:text-[#D4AF37] transition-colors">Blog & Artigos</Link></li>
          </ul>
        </div>

        {/* Coluna 3: Suporte */}
        <div>
          <h4 className="text-white font-serif text-lg mb-6">Ajuda</h4>
          <ul className="space-y-3 text-sm font-light">
            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Minha Conta</Link></li>
            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Rastrear Pedido</Link></li>
            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Política de Envio</Link></li>
            <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Termos & Privacidade</Link></li>
          </ul>
        </div>

        {/* Coluna 4: Newsletter */}
        <div>
          <h4 className="text-white font-serif text-lg mb-6">Sintonia</h4>
          <p className="text-sm font-light mb-4 text-stone-400">
            Receba rituais lunares, novidades e convites exclusivos.
          </p>
          <div className="flex border-b border-stone-600 pb-2">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="bg-transparent w-full outline-none text-white placeholder-stone-600 text-sm"
            />
            <button className="text-[#D4AF37] hover:text-white transition-colors">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>

      {/* Linha Final */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 font-light">
        <p>&copy; 2024 Integra4 Life. Todos os direitos reservados.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span>Feito com energia ✨</span>
        </div>
      </div>
    </footer>
  );
}