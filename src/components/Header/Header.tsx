'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchIndex, setSearchIndex] = useState<any[]>([]);
  const pathname = usePathname();
  const isParaVoce = pathname === '/para-voce' || pathname.startsWith('/para-voce/');
  const isParaEmpresa = pathname === '/para-sua-empresa' || pathname.startsWith('/para-sua-empresa/');
  const isParaAgro = pathname === '/para-o-agronegocio' || pathname.startsWith('/para-o-agronegocio/');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery("");
  };

  // Fecha o menu e a busca ao mudar de rota
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Carrega o índice de busca quando a overlay abre
  useEffect(() => {
    if (isSearchOpen && searchIndex.length === 0) {
      fetch('/search-index.json')
        .then(res => res.json())
        .then(data => setSearchIndex(data))
        .catch(err => console.error("Erro ao carregar o índice de busca:", err));
    }
  }, [isSearchOpen, searchIndex]);

  // Efeito para filtrar sempre que a query mudar
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const tokens = searchQuery.toLowerCase().split(/\s+/).filter(t => t.length > 1);
    if (tokens.length === 0) {
      setSearchResults([]);
      return;
    }

    const filtered: any[] = [];
    for (const item of searchIndex) {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const descLower = item.description.toLowerCase();
      const contentLower = item.content.toLowerCase();

      for (const token of tokens) {
        if (titleLower.includes(token)) {
          score += 10;
          if (titleLower.startsWith(token)) score += 5;
        }
        if (descLower.includes(token)) {
          score += 5;
        }
        if (contentLower.includes(token)) {
          score += 2;
          const occurrences = contentLower.split(token).length - 1;
          score += occurrences * 0.5;
        }
      }

      if (score > 0) {
        filtered.push({ ...item, score });
      }
    }

    setSearchResults(filtered.sort((a, b) => b.score - a.score));
  }, [searchQuery, searchIndex]);

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm relative">
      {/* Top Bar - Mobile Only */}
      <div className="lg:hidden w-full bg-white border-b border-gray-100 py-3">
        <div className="container mx-auto px-4 flex justify-center gap-6 text-[11px] font-bold uppercase tracking-wider">
          <Link 
            href="/para-voce" 
            className={isParaVoce ? "text-secondary" : "text-primary/60 hover:text-secondary"}
          >
            Para você
          </Link>
          <Link 
            href="/para-sua-empresa" 
            className={isParaEmpresa ? "text-secondary" : "text-primary/60 hover:text-secondary"}
          >
            Para sua empresa
          </Link>
          <Link 
            href="/para-o-agronegocio" 
            className={isParaAgro ? "text-secondary" : "text-primary/60 hover:text-secondary"}
          >
            Para o agro
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">

        {/* Esquerda: Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/header/logo-header.svg"
            alt="Credicitrus Há mais de 40 anos com você"
            width={280}
            height={56}
            className="h-auto w-[160px] md:w-[280px]"
            style={{ height: 'auto' }}
            priority
          />
        </Link>

        {/* Centro: Navegação Principal (Desktop) */}
        <nav className="hidden lg:flex items-center gap-2">
          <Link href="/para-voce" className="bg-primary hover:bg-secondary text-white text-base font-semibold px-6 py-3 rounded-full transition-colors">
            Para você
          </Link>
          <Link href="/para-sua-empresa" className="bg-primary hover:bg-secondary text-white text-base font-semibold px-6 py-3 rounded-full transition-colors">
            Para sua empresa
          </Link>
          <Link href="/para-o-agronegocio" className="bg-primary hover:bg-secondary text-white text-base font-semibold px-6 py-3 rounded-full transition-colors">
            Para o agro
          </Link>
        </nav>

        {/* Direita: Ações / Busca / Menu */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {/* Abra sua conta - Visível no mobile também conforme layout */}
          <Link
            href="/abra-sua-conta"
            className="bg-secondary hover:bg-primary text-white text-[10px] md:text-base font-bold px-4 md:px-8 py-2 md:py-3 rounded-full transition-colors uppercase md:normal-case"
          >
            Abra sua conta
          </Link>

          <button
            aria-label="Buscar"
            className="hidden md:block p-1.5 md:p-2 hover:opacity-75 transition-opacity"
            onClick={toggleSearch}
          >
            <Image
              src="/header/lupa.webp"
              alt="Buscar"
              width={28}
              height={28}
              className="w-6 h-6 md:w-7 md:h-7 object-contain"
            />
          </button>

          <button
            aria-label="Menu"
            className="p-1.5 md:p-2 hover:opacity-75 transition-opacity"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="w-7 h-7 md:w-8 md:h-8 text-primary" />
            ) : (
              <Menu className="w-7 h-7 md:w-8 md:h-8 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mega Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:bg-transparent lg:absolute lg:inset-auto lg:top-full lg:left-0 lg:w-full"
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="absolute top-[88px] md:top-[100px] lg:top-0 right-0 w-full max-w-[100%] lg:w-full bg-[#003641] text-white shadow-xl transition-all origin-top transform max-h-[calc(100vh-88px)] md:max-h-[calc(100vh-100px)] lg:max-h-[calc(100vh-100px)] overflow-y-auto border-t border-[#00a99d]/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                {/* Coluna 1: Atendimento */}
                <div className="flex flex-col">
                  <h3 className="text-secondary font-bold text-lg mb-4 uppercase tracking-wider">Atendimento</h3>
                  <ul className="space-y-3 flex flex-col items-start">
                    <li><span className="text-white hover:text-secondary text-sm md:text-base transition-colors font-semibold">Telefone</span></li>
                    <li><a href="tel:+551733459000" className="text-white/80 hover:text-white text-sm md:text-base transition-colors">(17) 3345-9000</a></li>
                    <li className="mt-2"><span className="text-white hover:text-secondary text-sm md:text-base transition-colors font-semibold">WhatsApp:</span></li>
                    <li><a href="https://wa.me/551733445020" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white text-sm md:text-base transition-colors">(17) 3344-5020</a></li>
                    <li className="mt-2"><span className="text-white hover:text-secondary text-sm md:text-base transition-colors font-semibold">Ouvidoria</span></li>
                    <li><a href="tel:08007706883" className="text-white/80 hover:text-white text-sm md:text-base transition-colors">0800 770 6883</a></li>
                    <li className="mt-4"><Link href="/nossas-agencias" onClick={toggleMenu} className="text-white hover:text-secondary text-sm md:text-base transition-colors font-semibold">Nossas agências</Link></li>
                    <li><Link href="/fale-com-a-gente" onClick={toggleMenu} className="text-white hover:text-secondary text-sm md:text-base transition-colors font-semibold">Fale conosco</Link></li>
                  </ul>
                </div>

                {/* Coluna 2: A Credicitrus */}
                <div className="flex flex-col">
                  <h3 className="text-secondary font-bold text-lg mb-4 uppercase tracking-wider">A Credicitrus</h3>
                  <ul className="space-y-3 flex flex-col items-start">
                    <li><Link href="/duvidas-frequentes" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">FAQ</Link></li>
                    <li><Link href="#" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">Quem somos</Link></li>
                    <li><Link href="#" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">Nossos diferenciais</Link></li>
                    <li><Link href="#" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">Estrutura de governança</Link></li>
                    <li><Link href="#" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">Sustentabilidade</Link></li>
                    <li><Link href="#" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">Capital social</Link></li>
                    <li><Link href="#" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">Blog Credicitrus</Link></li>
                    <li><Link href="#" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">Instituto Credicitrus</Link></li>
                    <li><Link href="#" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">Trabalhe conosco</Link></li>
                  </ul>
                </div>

                {/* Coluna 3: Ética */}
                <div className="flex flex-col">
                  <h3 className="text-secondary font-bold text-lg mb-4 uppercase tracking-wider">Ética</h3>
                  <ul className="space-y-3 flex flex-col items-start">
                    <li><Link href="/transparencia/assembleia" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">Assembleias</Link></li>
                    <li><Link href="/transparencia/relatorios" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">Relatórios</Link></li>
                    <li><Link href="/transparencia/normativos" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">Normativos</Link></li>
                    <li><Link href="/transparencia/etica-e-integridade" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">Ética e integridade</Link></li>
                    <li><a href="/files/transparencia/tabela_tarifa_atualizada_2025_A4_nov-1.pdf" download target="_blank" rel="noopener noreferrer" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">Tabela de tarifas</a></li>
                    <li><Link href="/transparencia/prevencao-a-fraudes-e-golpes" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">Prevenção a fraudes e golpes</Link></li>
                    <li><Link href="/transparencia/gerenciamento-de-riscos-e-capital" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">Gerenciamento de riscos e capital</Link></li>
                    <li><Link href="/transparencia/seguranca-e-privacidade" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">Segurança e privacidade</Link></li>
                  </ul>
                </div>

                {/* Coluna 4: Credicitrus Club */}
                <div className="flex flex-col">
                  <h3 className="text-secondary font-bold text-lg mb-4 uppercase tracking-wider">Credicitrus Club</h3>
                  <ul className="space-y-3 flex flex-col items-start">
                    <li><Link href="/para-voce/credicitrus-club" onClick={toggleMenu} className="text-white/80 hover:text-secondary text-sm md:text-base transition-colors">Conheça o Credicitrus Club</Link></li>
                  </ul>
                </div>

              </div>
            </div>
            {/* Fechar no mobile quando clica fora - opcional mas melhora UX */}
            <div className="lg:hidden h-[200px] w-full" onClick={toggleMenu}></div>
          </div>
        </div>
      )}
      {/* Search Lightbox Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-[#003641]/95 backdrop-blur-md flex flex-col items-center justify-start pt-20 md:pt-32 p-4 overflow-y-auto">
          <button
            className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white hover:text-secondary transition-colors"
            onClick={toggleSearch}
          >
            <X className="w-10 h-10 md:w-12 md:h-12" />
          </button>

          <div className="w-full max-w-3xl bg-white rounded-[2rem] md:rounded-[3rem] p-3 md:p-4 flex items-center shadow-2xl border-2 border-transparent focus-within:border-secondary transition-all duration-300">
            <input
              type="text"
              placeholder="O que você está procurando?"
              className="flex-1 bg-transparent text-[#003641] font-bold text-lg md:text-2xl outline-none px-6 md:px-8 placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#00a99d] text-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 md:w-8 md:h-8"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          {/* Área de Resultados */}
          {searchQuery.trim() !== "" && (
            <div className="w-full max-w-3xl mt-6 bg-white rounded-[2rem] p-6 md:p-8 shadow-2xl max-h-[50vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300 text-left">
              {searchResults.length > 0 ? (
                <div className="flex flex-col gap-6">
                  <div className="text-xs font-bold text-secondary uppercase tracking-wider border-b border-gray-100 pb-3">
                    Resultados encontrados ({searchResults.length}):
                  </div>
                  <div className="flex flex-col divide-y divide-gray-100">
                    {searchResults.map((result, idx) => (
                      <Link
                        key={idx}
                        href={result.route}
                        onClick={toggleSearch}
                        className="py-4 first:pt-0 last:pb-0 block hover:bg-gray-50/50 rounded-xl px-4 -mx-4 transition-colors"
                      >
                        <h4 className="text-[#003641] font-extrabold text-base md:text-lg hover:text-[#00a99d] transition-colors mb-1.5">
                          {result.title}
                        </h4>
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-2">
                          {result.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500 font-bold text-base">
                  Nenhum resultado encontrado para "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
