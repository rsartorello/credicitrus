'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { InstagramIcon, FacebookIcon, LinkedInIcon, TikTokIcon, YouTubeIcon } from './Icons';

interface FooterLink {
  label: string;
  href?: string;
  download?: boolean;
  target?: string;
}

interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
}

export default function Rodape() {
  const [openSection, setOpenSection] = React.useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections: FooterSection[] = [
    {
      id: 'produtos',
      title: 'Produtos',
      links: [
        { label: 'Para Você', href: '/para-voce' },
        { label: 'Para Empresas', href: '/para-sua-empresa' },
        { label: 'Para o Agro', href: '/para-o-agronegocio' },
      ]
    },
    {
      id: 'credicitrus',
      title: 'A Credicitrus',
      links: [
        { label: 'FAQ', href: '/duvidas-frequentes' },
        { label: 'Credicitrus Club', href: '/para-voce/credicitrus-club' },
        { label: 'Quem somos', href: '/quem-somos' },
        { label: 'Nossos diferenciais', href: '/quem-somos#diferenciais' },
        { label: 'Estrutura de governança', href: '/quem-somos#governanca' },
        { label: 'Sustentabilidade', href: '/quem-somos#sustentabilidade' },
        { label: 'Capital social', href: '/capital-social' },
        { label: 'Blog Credicitrus', href: 'https://credicitrus.blog', target: '_blank' },
        { label: 'Instituto Credicitrus', href: 'https://institutocredicitrus.com.br/', target: '_blank' },
        { label: 'Trabalhe conosco', href: 'https://credicitrus.vagas.solides.com.br/#quem-somos', target: '_blank' },
      ]
    },
    {
      id: 'transparencia',
      title: 'Transparência',
      links: [
        { label: 'Assembleias', href: '/transparencia/assembleia' },
        { label: 'Relatórios', href: '/transparencia/relatorios' },
        { label: 'Normativos', href: '/transparencia/normativos' },
        { label: 'Ética e integridade', href: '/transparencia/etica-e-integridade' },
        { label: 'Tabela de tarifas', href: '/files/transparencia/tabela_tarifa_atualizada_2025_A4_nov-1.pdf', download: true, target: '_blank' },
        { label: 'Prevenção a fraudes e golpes', href: '/transparencia/prevencao-a-fraudes-e-golpes' },
        { label: 'Gerenciamento de riscos e de capital', href: '/transparencia/gerenciamento-de-riscos-e-capital' },
        { label: 'Segurança e privacidade', href: '/transparencia/seguranca-e-privacidade' },
        { label: 'Consumidor.gov.br', href: 'https://www.consumidor.gov.br', target: '_blank' },
      ]
    },
    {
      id: 'contato',
      title: 'Fale com a gente',
      links: [
        { label: 'Telefone' },
        { label: '(17) 3345-9000', href: 'tel:+551733459000' },
        { label: 'WhatsApp:' },
        { label: '(17) 3344-5020', href: 'https://wa.me/551733445020', target: '_blank' },
        { label: 'Ouvidoria' },
        { label: '0800 770 6883', href: 'tel:08007706883' },
        { label: 'Redes Sociais', href: '/nossas-redes-sociais' },
        { label: 'Nossas agências', href: '/nossas-agencias' },
        { label: 'Fale conosco', href: '/fale-com-a-gente' },
        { label: 'Termos de uso', href: '/files/TERMOS-E-CONDICOES-DE-USO-DO-SITE-INSTITUCIONAL.pdf', target: '_blank' },
        { label: 'Política de privacidade', href: '/files/AVISO-DE-PRIVACIDADE-E-TRATAMENTO-DE-DADOS-CREDICITRUS.pdf', target: '_blank' },
      ]
    }
  ];

  return (
    <footer className="w-full bg-[#003641] pt-12 pb-12 lg:pt-24 lg:pb-16 font-sans">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-7xl">

        {/* Mobile Accordions / Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-8 mb-12 lg:mb-24">
          {sections.map((section) => (
            <div key={section.id} className="flex flex-col border-b border-white/10 lg:border-none">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full py-4 lg:py-0 lg:mb-6 text-left"
              >
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  {section.title}
                </span>
                <span className="lg:hidden text-white text-xl">
                  {openSection === section.id ? '−' : '+'}
                </span>
              </button>

              <div className={`
                flex flex-col gap-2 lg:gap-3 overflow-hidden transition-all duration-300
                ${openSection === section.id ? 'max-h-[500px] pb-6' : 'max-h-0 lg:max-h-none opacity-0 lg:opacity-100'}
              `}>
                {section.links.map((link, idx) => {
                  if (!link.href) {
                    return (
                      <span
                        key={idx}
                        className="text-xs lg:text-sm font-bold text-white mt-2 lg:mt-3 first:mt-0 select-none"
                      >
                        {link.label}
                      </span>
                    );
                  }
                  if (link.download) {
                    return (
                      <a
                        key={idx}
                        href={link.href}
                        download
                        target={link.target}
                        rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                        className="text-xs lg:text-sm font-normal text-white/80 hover:text-secondary transition-colors"
                      >
                        {link.label}
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={idx}
                      href={link.href}
                      target={link.target}
                      rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                      className="text-xs lg:text-sm font-normal text-white/80 hover:text-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CNPJ Block (No Hover, No Button) */}
        <div className="flex justify-center mb-8">
          <p className="text-[10px] lg:text-xs font-normal text-center text-white opacity-80 max-w-3xl">
            CNPJ: 54.037.916/0001-45 | Rua Prudente de Moraes, 534 Centro, CEP 14.700-120, Bebedouro/SP
          </p>
        </div>

        {/* Social Icons Strip (Border Top/Bot) */}
        <div className="w-full border-t border-b border-[#00a99d]/40 py-8 mb-8 flex items-center justify-center gap-6 md:gap-8">

          <Link href="https://www.instagram.com/credicitrus/" className="w-12 h-12 rounded-full bg-[#00a99d] flex items-center justify-center text-[#003641] hover:scale-110 hover:bg-white transition-all transform duration-300" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </Link>

          <Link href="https://www.facebook.com/SicoobCredicitrus/" className="w-12 h-12 rounded-full bg-[#00a99d] flex items-center justify-center text-[#003641] hover:scale-110 hover:bg-white transition-all transform duration-300" target="_blank" rel="noopener noreferrer">
            <FacebookIcon />
          </Link>

          <Link href="https://www.linkedin.com/company/sicoob-credicitrus/" className="w-12 h-12 rounded-full bg-[#00a99d] flex items-center justify-center text-[#003641] hover:scale-110 hover:bg-white transition-all transform duration-300" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </Link>

          <Link href="https://www.tiktok.com/@credicitrus" className="w-12 h-12 rounded-full bg-[#00a99d] flex items-center justify-center text-[#003641] hover:scale-110 hover:bg-white transition-all transform duration-300" target="_blank" rel="noopener noreferrer">
            <TikTokIcon />
          </Link>

          <Link href="https://www.youtube.com/channel/UCjdKzIzfl5Ywst_XO_tsJjA/featured?view_as=subscriber" className="w-12 h-12 rounded-full bg-[#00a99d] flex items-center justify-center text-[#003641] hover:scale-110 hover:bg-white transition-all transform duration-300" target="_blank" rel="noopener noreferrer">
            <YouTubeIcon />
          </Link>

        </div>

        {/* Footer Text 10pt scaled */}
        <div className="flex justify-center mb-8">
          <p className="text-[10px] font-normal text-center text-white/70" suppressHydrationWarning>
            © {new Date().getFullYear()} Credicitrus. Todos os direitos reservados.
          </p>
        </div>

        {/* Base Image Logo Oficial */}
        <div className="flex justify-center w-full relative h-[40px] md:h-[50px]">
          <Image
            src="/soltas/logo-rodape.svg"
            alt="SICOOB CREDICITRUS Cooperativa de Crédito"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

      </div>
    </footer>
  );
}
