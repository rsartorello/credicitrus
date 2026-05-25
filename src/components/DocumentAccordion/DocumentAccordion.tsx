'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';

export interface DocumentOption {
  label: string;
  url: string;
  year?: string;
  semester?: '1S' | '2S';
  month?: string; // "01" a "12"
}

export interface DocumentItem {
  title: string;
  type?: 'annual' | 'semestral' | 'monthly';
  options: DocumentOption[];
}

interface DocumentAccordionProps {
  subtitle?: string;
  title: string;
  items: DocumentItem[];
}

const getMonthName = (monthNum?: string) => {
  const months: { [key: string]: string } = {
    '01': 'Janeiro',
    '02': 'Fevereiro',
    '03': 'Março',
    '04': 'Abril',
    '05': 'Maio',
    '06': 'Junho',
    '07': 'Julho',
    '08': 'Agosto',
    '09': 'Setembro',
    '10': 'Outubro',
    '11': 'Novembro',
    '12': 'Dezembro'
  };
  return months[monthNum || ''] || 'Mensal';
};

export default function DocumentAccordion({
  subtitle,
  title,
  items
}: DocumentAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedYears, setSelectedYears] = useState<{ [key: number]: string }>({});

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleYearClick = (itemIndex: number, year: string) => {
    setSelectedYears(prev => ({
      ...prev,
      [itemIndex]: prev[itemIndex] === year ? '' : year
    }));
  };

  const renderAccordionContent = (item: DocumentItem, itemIndex: number) => {
    if (item.type === 'semestral') {
      const optionsByYear: { [year: string]: DocumentOption[] } = {};
      item.options.forEach(opt => {
        const y = opt.year || 'Outros';
        if (!optionsByYear[y]) optionsByYear[y] = [];
        optionsByYear[y].push(opt);
      });
      const years = Object.keys(optionsByYear).sort((a, b) => b.localeCompare(a));
      const selectedYear = selectedYears[itemIndex];

      return (
        <div className="flex flex-col gap-6">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Selecione o ano:
          </div>
          <div className="flex flex-wrap gap-2.5">
            {years.map(y => (
              <button
                key={y}
                onClick={() => handleYearClick(itemIndex, y)}
                className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-200 border-2 ${
                  selectedYear === y
                    ? 'bg-verdecredicitrus border-verdecredicitrus text-white shadow-sm'
                    : 'bg-white border-gray-200 text-primary hover:border-verdecredicitrus hover:text-verdecredicitrus'
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          {selectedYear && (
            <div className="mt-4 p-6 bg-gray-50/70 rounded-2xl border border-gray-100/70 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                Selecione o semestre de {selectedYear}:
              </div>
              <div className="flex flex-wrap gap-4">
                {optionsByYear[selectedYear]
                  .sort((a, b) => (a.semester || '').localeCompare(b.semester || ''))
                  .map((opt, oIdx) => {
                    const semLabel = opt.semester === '2S' ? '2º Semestre' : '1º Semestre';
                    return (
                      <a
                        key={oIdx}
                        href={opt.url}
                        download
                        className="flex items-center gap-3 bg-white border border-gray-200 hover:border-verdecredicitrus hover:text-verdecredicitrus text-primary font-bold py-3 px-6 rounded-xl text-sm shadow-sm hover:shadow transition-all duration-200"
                      >
                        <svg className="w-4 h-4 text-verdecredicitrus" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {semLabel}
                      </a>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (item.type === 'monthly') {
      const optionsByYear: { [year: string]: DocumentOption[] } = {};
      item.options.forEach(opt => {
        const y = opt.year || 'Outros';
        if (!optionsByYear[y]) optionsByYear[y] = [];
        optionsByYear[y].push(opt);
      });
      const years = Object.keys(optionsByYear).sort((a, b) => b.localeCompare(a));
      const selectedYear = selectedYears[itemIndex];

      return (
        <div className="flex flex-col gap-6">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Selecione o ano:
          </div>
          <div className="flex flex-wrap gap-2.5">
            {years.map(y => (
              <button
                key={y}
                onClick={() => handleYearClick(itemIndex, y)}
                className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-200 border-2 ${
                  selectedYear === y
                    ? 'bg-verdecredicitrus border-verdecredicitrus text-white shadow-sm'
                    : 'bg-white border-gray-200 text-primary hover:border-verdecredicitrus hover:text-verdecredicitrus'
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          {selectedYear && (
            <div className="mt-4 p-6 bg-gray-50/70 rounded-2xl border border-gray-100/70 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                Selecione o mês de {selectedYear}:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {optionsByYear[selectedYear]
                  .sort((a, b) => (a.month || '').localeCompare(b.month || ''))
                  .map((opt, oIdx) => {
                    const monthName = getMonthName(opt.month);
                    return (
                      <a
                        key={oIdx}
                        href={opt.url}
                        download
                        className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-verdecredicitrus hover:text-verdecredicitrus text-primary font-bold py-3.5 px-4 rounded-xl text-sm shadow-sm hover:shadow transition-all duration-200 text-center"
                      >
                        <svg className="w-4 h-4 text-verdecredicitrus" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {monthName}
                      </a>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Default 'annual' linear grid style
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {item.options.map((opt, oIdx) => (
          <a
            key={oIdx}
            href={opt.url}
            download
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-verdecredicitrus hover:text-verdecredicitrus text-primary font-bold py-3.5 px-4 rounded-xl text-sm shadow-sm hover:shadow transition-all duration-200 text-center"
          >
            <svg className="w-4 h-4 text-verdecredicitrus" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {opt.label}
          </a>
        ))}
      </div>
    );
  };

  return (
    <section className="w-full bg-[#fcfcfc] py-20 md:py-32">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1100px]">
        <SectionHeader subtitle={subtitle} title={title} />

        <div className="mt-20 bg-transparent">
          {items.map((item, index) => (
            <div key={index} className="border-t border-gray-200 last:border-b last:border-gray-200">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between py-8 md:py-10 px-4 md:px-6 hover:bg-gray-50/50 transition-all duration-200"
                aria-expanded={activeIndex === index}
              >
                <span className="text-primary font-extrabold text-lg md:text-xl lg:text-[1.3rem] text-left">
                  {item.title}
                </span>
                
                <span className="text-verdecredicitrus text-3xl font-light w-8 text-center">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>

              {activeIndex === index && (
                <div className="px-4 md:px-6 pb-12 pt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                  {renderAccordionContent(item, index)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
