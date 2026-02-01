import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-2xl text-[#2D1B4E] mb-4">
              Integra4 Life
            </h3>
            <p className="text-gray-600 mb-4">
              Sua jornada de conexão e bem-estar através das 4 dimensões do ser humano.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-[#2D1B4E]">Instagram</a>
              <a href="#" className="text-gray-600 hover:text-[#2D1B4E]">Facebook</a>
            </div>
          </div>

          {/* Links Úteis */}
          <div>
            <h4 className="font-semibold text-[#2D1B4E] mb-4">Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/sobre" className="hover:text-[#2D1B4E]">Sobre Nós</Link></li>
              <li><Link href="/contato" className="hover:text-[#2D1B4E]">Contato</Link></li>
              <li><Link href="/faq" className="hover:text-[#2D1B4E]">FAQ</Link></li>
            </ul>
          </div>

          {/* Políticas */}
          <div>
            <h4 className="font-semibold text-[#2D1B4E] mb-4">Políticas</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/privacidade" className="hover:text-[#2D1B4E]">Privacidade</Link></li>
              <li><Link href="/trocas" className="hover:text-[#2D1B4E]">Trocas</Link></li>
              <li><Link href="/termos" className="hover:text-[#2D1B4E]">Termos</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Integra4 Life. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}