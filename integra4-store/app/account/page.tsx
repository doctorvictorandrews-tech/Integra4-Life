"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Lock, User, Sparkles } from "lucide-react";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-4 pt-24 pb-20">
      
      {/* Container Principal com Sombra Suave e Borda Fina */}
      <div className="bg-white w-full max-w-5xl h-[800px] rounded-[2rem] shadow-2xl overflow-hidden flex relative border border-stone-100">
        
        {/* 1. LADO VISUAL (Imagem Imersiva) */}
        <motion.div 
          className="hidden lg:block w-1/2 relative bg-[#2D1B4E]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Imagem com Overlay */}
          <div className="absolute inset-0 opacity-60 mix-blend-overlay">
             <img 
               src="https://images.unsplash.com/photo-1518133526743-494b598b9f70?q=80&w=1200&auto=format&fit=crop" 
               alt="Cristais e Luz"
               className="w-full h-full object-cover"
             />
          </div>
          
          {/* Texto Sobreposto (Dinâmico) */}
          <div className="absolute inset-0 flex flex-col justify-between p-12 text-white z-10">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Sparkles size={18} />
              <span className="text-xs uppercase tracking-[0.3em] font-medium">Espaço do Membro</span>
            </div>

            <div className="space-y-6">
              <h2 className="font-serif text-5xl leading-tight">
                {isLogin ? "Sua jornada continua aqui." : "Comece sua transformação."}
              </h2>
              <p className="text-stone-300 font-light text-lg max-w-md leading-relaxed">
                {isLogin 
                  ? "Acesse seus rituais, acompanhe seus pedidos e reconecte-se com sua essência." 
                  : "Junte-se à comunidade Integra4 e descubra ferramentas para as quatro dimensões do seu ser."}
              </p>
            </div>

            <div className="text-xs text-white/40 uppercase tracking-widest">
              © 2024 Integra4 Life
            </div>
          </div>
        </motion.div>

        {/* 2. LADO DO FORMULÁRIO (Interativo) */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "register"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-md mx-auto w-full space-y-8"
            >
              {/* Cabeçalho do Form */}
              <div className="text-center">
                <span className="text-[#4A6C48] text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
                  {isLogin ? "Bem-vindo de volta" : "Nova Conta"}
                </span>
                <h1 className="font-serif text-4xl text-[#2D1B4E] mb-2">
                  {isLogin ? "Acesse sua conta" : "Crie seu perfil"}
                </h1>
              </div>

              {/* Campos do Formulário */}
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                
                {!isLogin && (
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#2D1B4E] transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="Seu nome completo" 
                      className="w-full bg-[#FAFAF9] border border-stone-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-[#2D1B4E] focus:bg-white transition-all text-stone-700 placeholder:text-stone-400"
                    />
                  </div>
                )}

                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#2D1B4E] transition-colors" size={18} />
                  <input 
                    type="email" 
                    placeholder="Seu e-mail" 
                    className="w-full bg-[#FAFAF9] border border-stone-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-[#2D1B4E] focus:bg-white transition-all text-stone-700 placeholder:text-stone-400"
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#2D1B4E] transition-colors" size={18} />
                  <input 
                    type="password" 
                    placeholder="Sua senha" 
                    className="w-full bg-[#FAFAF9] border border-stone-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-[#2D1B4E] focus:bg-white transition-all text-stone-700 placeholder:text-stone-400"
                  />
                </div>

                {isLogin && (
                  <div className="flex justify-end">
                    <button className="text-xs text-[#4A6C48] hover:text-[#2D1B4E] underline transition-colors">
                      Esqueceu sua senha?
                    </button>
                  </div>
                )}

                <button className="w-full bg-[#2D1B4E] text-white py-4 rounded-full font-medium tracking-wide uppercase text-sm hover:bg-[#5B3C85] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                  {isLogin ? "Entrar" : "Cadastrar"}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Toggle Login/Register */}
              <div className="text-center pt-4 border-t border-stone-100">
                <p className="text-stone-500 text-sm">
                  {isLogin ? "Ainda não tem conta?" : "Já possui cadastro?"}{" "}
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-[#2D1B4E] font-bold hover:underline ml-1"
                  >
                    {isLogin ? "Criar conta" : "Fazer login"}
                  </button>
                </p>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}