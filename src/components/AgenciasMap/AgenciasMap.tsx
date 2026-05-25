'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { agenciasData, Agencia } from './agenciasData';

// Normalização de string para busca fuzzy (remove acentos e converte para minúsculas)
function normalizeString(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// Distância de Levenshtein para tolerar erros de digitação
function getLevenshteinDistance(a: string, b: string): number {
  const tmp = [];
  for (let i = 0; i <= a.length; i++) {
    tmp[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    tmp[0][j] = j;
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[a.length][b.length];
}

// Verifica correspondência aproximada para um único token de busca contra as palavras do texto da agência
function matchSearchToken(token: string, words: string[]): { matched: boolean; score: number } {
  let bestScore = 0;
  let matched = false;

  for (const word of words) {
    if (word === token) {
      bestScore = Math.max(bestScore, 100);
      matched = true;
    } else if (word.startsWith(token)) {
      bestScore = Math.max(bestScore, 80);
      matched = true;
    } else if (word.includes(token)) {
      bestScore = Math.max(bestScore, 50);
      matched = true;
    } else {
      // Tolera erro de digitação de até 1 caractere para palavras curtas e 2 para palavras longas
      const maxDistance = token.length > 4 ? 2 : 1;
      const distance = getLevenshteinDistance(token, word);
      if (distance <= maxDistance) {
        const score = Math.max(0, 40 - distance * 15);
        bestScore = Math.max(bestScore, score);
        matched = true;
      }
    }
  }

  return { matched, score: bestScore };
}

// Filtra e ordena as agências usando busca aproximada/fuzzy
function getFuzzyFilteredAgencias(agencias: Agencia[], query: string): Agencia[] {
  const cleanQuery = normalizeString(query);
  if (!cleanQuery) return agencias;

  const queryTokens = cleanQuery.split(/\s+/).filter(t => t.length > 0);
  if (queryTokens.length === 0) return agencias;

  const scored = agencias
    .map(ag => {
      const agText = `${ag.cidade} ${ag.estado} ${ag.pa} ${ag.endereco}`;
      const agTextClean = normalizeString(agText);
      const agTextNoSpaces = agTextClean.replace(/\s+/g, "");
      const queryNoSpaces = cleanQuery.replace(/\s+/g, "");

      // Fallback 1: match contínuo sem espaços (ex: "riopreto" em "riopreto")
      if (agTextNoSpaces.includes(queryNoSpaces)) {
        const score = 500 - (agTextNoSpaces.length - queryNoSpaces.length);
        return { ag, matched: true, score };
      }

      // Fallback 2: token match individual
      const agWords = agTextClean.split(/\s+/).filter(w => w.length > 0);
      let totalScore = 0;
      let allTokensMatched = true;

      for (const token of queryTokens) {
        const { matched, score } = matchSearchToken(token, agWords);
        if (!matched) {
          allTokensMatched = false;
          break;
        }
        totalScore += score;
      }

      return { ag, matched: allTokensMatched, score: totalScore };
    })
    .filter(item => item.matched)
    .sort((a, b) => b.score - a.score);

  return scored.map(item => item.ag);
}

export default function AgenciasMap() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAgencia, setSelectedAgencia] = useState<Agencia | null>(null);
  const [activeEstadoFilter, setActiveEstadoFilter] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtra as agências com base no estado ativo e na busca fuzzy
  const filteredAgencias = (() => {
    let data = agenciasData;
    if (activeEstadoFilter) {
      data = data.filter(ag => ag.estado === activeEstadoFilter);
    }
    return getFuzzyFilteredAgencias(data, searchTerm);
  })();

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (agencia: Agencia) => {
    setSelectedAgencia(agencia);
    setActiveEstadoFilter(agencia.estado);
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const handleStateClick = (estado: string) => {
    if (activeEstadoFilter === estado) {
      setActiveEstadoFilter(null);
    } else {
      setActiveEstadoFilter(estado);
      if (selectedAgencia && selectedAgencia.estado !== estado) {
        setSelectedAgencia(null);
      }
    }
    setIsDropdownOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  return (
    <section className="w-full bg-[#f8f9fa] py-16 lg:py-24 font-sans">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1200px]">

        {/* Header da Seção */}
        <div className="text-center mb-12">
          <h2 className="text-[#003641] text-2xl md:text-3xl lg:text-[2rem] font-bold mb-4 leading-tight">
            Serviços, orientações e apoio<br className="hidden sm:block" />
            para o seu dia a dia financeiro
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Acesse endereços e horários das agências.
          </p>
        </div>

        {/* Mapa e Lógica */}
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto">

          {/* Mapa Real */}
          <div className="relative w-full max-w-[400px] md:max-w-[500px] mx-auto mb-12 z-0">
            <div className="relative w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1641 1017"
                className="w-full h-auto drop-shadow-xl animate-fade-in"
              >
                <path
                  id="MTS"
                  fill={activeEstadoFilter === 'MS' || selectedAgencia?.estado === 'MS' ? '#8CC63F' : '#067067'}
                  className="transition-colors duration-500 cursor-pointer hover:opacity-90"
                  onClick={() => handleStateClick('MS')}
                  d="M336.808,899.093c-0.876-2.714-3.91-6.158-12.124-12.024-21.857-15.628-17.172-19.531-39.03-7.035s-45.279,21.1-49.181,1.566-8.413-16.5-5.7-37.368-1.363-25.854-6.8-39.465-8.157-7.705-3.628-23.128-17.676-11.8-10.879-25.4S192.7,728.112,185,731.743s-23.122,3.63-28.106-8.163-9.519-14.971-16.317-4.539-15.412,21.773-29.465,10.883-25.841-11.341-34-5.893-23.118-10.889-33.544-6.8S3.682,727.2,14.561,706.791,12.744,669.144,20,648.731s13.618-29.525,5.717-44.781S13.576,583.9,12.449,574.014,0.031,559.892,1.158,553.674s-4.234-18.077,4.516-23.16S28.255,519.22,18.1,510.181,0.309,486.662,5.913,474.942s18.34-41.787,22.923-60.647,2.036-21.409,10.694-38.736,13.244-21.912,2.547-35.676c-9.8-12.608-7.2-16.7-11.072-30.44a69.259,69.259,0,0,1,14.945,9.709c6.247,5.09,9.115,7.426,15.688,1.885,2.768-2.337,8.452-3.909,14.543-5.6,12.339-3.424,26.165-7.26,28.381-20.214v-0.013l0.51-3.053v-0.013c2.285-13.844,3.942-23.857,24.405-24.256,10.146-.2,18.96-3.735,27.266-7.073,11.914-4.785,22.7-9.112,33.72-.445,3.5,2.754,7.188,5.94,11.124,9.337,20.33,17.546,46.923,40.494,74.169,30.54a112.434,112.434,0,0,0,22.622-11.421c9.46-5.906,13.893-8.667,28.688,1.785,23.188,16.371,27.347,10.452,36.962-3.252,1.778-2.521,3.767-5.362,5.955-8.1,6.613-8.263,12.594-15.091,16.865-18.111,1.419-1,2.335-.743,2.421,1.56a52.875,52.875,0,0,1-3.323,18.814,92.515,92.515,0,0,1-10.67,20.977,26,26,0,0,0-4.477,11.248,15.786,15.786,0,0,0,2.09,10.378,16.935,16.935,0,0,0,9.536,7c4.715,1.539,11.088,2,19.384.883l2.321-.319c11.116-1.507,20.744-2.821,28.185-3.192,8.847-.438,14.106.232,14.252,3.252,0.119,2.323-.663,5.308-1.439,8.315-2.507,9.622-5.066,19.464,10.358,22.994,7.409,1.692,10.877,3.225,11.832,5.143,0.855,1.7-.212,4.779-2.043,9.264-2.586,6.325-3.76,12.277-.4,16.969,3.13,4.373,10.086,6.954,23.489,6.51,17.455-.584,22.753,2.641,35.725,10.525,4.338,2.641,9.47,5.766,15.738,9.224,12.434,6.869,18.96,8.833,25.18,10.691,7.216,2.163,14,4.2,30.228,14.586v0.007c13.88,8.892,22.853,13.677,28.735,16.809,6.141,3.272,8.469,4.513,9.524,6.776l-0.014.006a7.5,7.5,0,0,0,1.618,2.356c0.511,1.785.212,5.86-6.751,13.87-11.181,12.861-7.878,21.216-4.271,30.347a66.275,66.275,0,0,1,2.321,6.5c2.335,8.415.949,9.423-15.047,21.037l-3.051,2.216a139.281,139.281,0,0,1-12.686,8.169c-10.784,6.325-15.187,8.906-23.483,32.836-6.884,19.848-8.111,21.693-12.707,28.568-2.48,3.7-5.882,8.793-11.386,18.336-6.97,12.065-8.907,18.137-10.584,23.393-2.143,6.722-3.841,12.024-17.27,29.358-11.9,15.35-11.068,21.162-10.591,24.494,0.153,1.082.18,1.234-16.261,8.872-31.7,14.726-47.907,33.626-51.21,37.761-3.455,1.646-5.783,4-8.356,6.589-3.966,4.009-8.654,8.734-21.666,11.76-23.41,5.448-22.893,11.281-21.964,21.634a37.544,37.544,0,0,1-.464,12.482,35.467,35.467,0,0,0-.5,13.412c0.577,4.765.776,6.417-18.476,12.277-25.4,7.737-21.8,25.96-18.774,41.263,1.041,5.289,2.01,10.181,1.353,13.478C352.581,894.023,345.83,896.837,336.808,899.093Z"
                />
                <path
                  id="SP"
                  fill={activeEstadoFilter === 'SP' || selectedAgencia?.estado === 'SP' ? '#8CC63F' : '#00333f'}
                  className="transition-colors duration-500 cursor-pointer hover:opacity-90"
                  onClick={() => handleStateClick('SP')}
                  d="M1160.31,853.7c-4.17.344-12.78,1.731-29,11.586-28.69,17.413-28.04,23.87-27.39,27.089,0.63,3.225,7.41,5.807-19.02.968s-43.27,3.8-66.19,19.086-60.611,41.264-87.2,53.355-40.295,12.1-46.741,33.068c-2.288,7.442-4.377,13.362-6.731,17.842a20.593,20.593,0,0,1-8.223-5.93c-4.126-5.49-4.808-8.85-5.233-10.9-1.047-5.13-1.28-6.251-10.492-6.251l-0.012.014-2.594.013h-0.013c-8.2.073-13.436,0.119-13.926-11.222-0.107-2.468-.113-4.4-0.12-5.973-0.013-4.678-.027-7.041-2.241-8.972h-0.014c-2.016-1.752-4.642-1.791-9.921-1.851-1.8-.02-3.972-0.053-6.724-0.153-2.839-.1-5.492-0.166-7.879-0.219-11.917-.259-17.19-0.378-32.781-7.068-9.954-4.267-10.219-7.737-8.3-12.223,0.511-1.2,1.154-2.5,1.831-3.862a78.813,78.813,0,0,0,3.5-7.818c3.787-10.293-2.076-17.7-9.908-27.579l-0.007.006a130.152,130.152,0,0,1-11.6-16.458c-5.013-8.779-4.012-11.208-3.116-13.345h0.006c1.413-3.371,2.66-6.357-2.48-14.281-5.239-8.063-5.126-8.8-4.523-12.808a78.468,78.468,0,0,0,.955-12.827c0-2.993.046-4.772,0.08-6.292,0.132-5.494.2-8.388-1.38-11.68-1.625-3.41-4.708-6.357-11.181-12.535l-3.654-3.5c-14.212-13.677-15.034-13.346-21.46-10.691a30.061,30.061,0,0,1-8.078,2.23c-8.1,1.109-14.244.325-23.178-.81-7.188-.915-16.108-2.05-29.073-2.654-19.285-.9-23.483-5.2-30.791-12.708a120.124,120.124,0,0,0-13.973-12.7c-12.9-9.895-19.007-7.751-25.791-5.369-4.112,1.44-8.562,3.007-16.242.093-10.252-3.9-16.851-6.025-23.21-6.39-6.467-.379-12.315,1.068-21,4.327-9.563,3.59-18.761,2.076-30.659.119a220.179,220.179,0,0,0-25.645-3.073c-2.088-.113-3.972-0.119-5.683-0.053,7.387-7.426,21.321-19.271,42.834-29.265,20.99-9.756,20.884-10.525,20.108-15.934-0.332-2.3-.909-6.33,9.244-19.437,14.14-18.25,16-24.062,18.351-31.436,1.565-4.9,3.368-10.557,10.007-22.058C559.3,627.721,562.6,622.79,565,619.2c4.96-7.419,6.287-9.41,13.469-30.122,7.474-21.567,11.267-23.784,20.545-29.219a147.541,147.541,0,0,0,13.231-8.521l3.05-2.216C632.129,536.9,635.67,534.33,634,525.5c4.867-.246,12.554-2.409,21.175-11.448,2.115-2.216,3.867-4.26,5.419-6.072,6.837-7.983,9.105-10.624,29.391-.71,13.767,6.722,23.152,9.782,31.5,10.844,8.409,1.075,15.465.113,24.756-1.168a36.416,36.416,0,0,1,22.21,3.6,31.07,31.07,0,0,1,14.2,15.6c3.3,7.93,6.825,15.077,11.918,19.211,5.623,4.56,12.626,5.442,22.209-.093a28.835,28.835,0,0,0,10.571-9.881c2.786-4.041,4.6-6.676,25.738-5.92l7.613,0.279c28.324,1.049,30.526,1.135,45.01-4.9,6.718-2.8,12.554-1.693,17.959-.671,6.253,1.182,12.03,2.276,18.6-1.373a7.691,7.691,0,0,1,4.814-1.122,6.2,6.2,0,0,1,2.984,1.354,10.944,10.944,0,0,1,2.653,3.258,21.451,21.451,0,0,1,2.076,13.093c-0.331,2.329-.7,4.374-1.067,6.351-1.837,10.047-3.456,18.867,2.393,41.217,1.413,5.389,2.713,11.5,4.012,17.632,5.107,24.11,10.293,48.531,27.078,46.739a65.013,65.013,0,0,0,14.321-3.451c6.4-2.13,10.23-3.4,14.87,4.872,6.03,10.8,4.17,13.948.49,20.2-1.1,1.851-2.33,3.935-3.69,6.656-4.73,9.47-4.24,18.263-3.72,27.394a111.607,111.607,0,0,1,.24,11.44c-0.15,3.232-3.45,4.925-6.36,6.418a18.959,18.959,0,0,0-5.606,3.716c-3.568,3.922-3.244,9.012,7.436,18.767,8.72,7.957,9.52,16.471,10.19,23.7,1,10.81,1.79,19.345,19.67,22.124,16.46,2.562,26.36-3.629,35.86-9.575,7.15-4.473,14.06-8.786,23.4-8.169,20.41,1.36,36.56-6.457,57.41-16.544,2.31-1.122,4.68-2.269,7.15-3.451-0.53,5.209,3.25,10.983,21.01,12.762a85.168,85.168,0,0,0,24.27-.87h0.01c4.84-.79,6.35-1.029,7.97,4.659a50.591,50.591,0,0,0,3.16,8.089c0.6,1.261,1.91.942,1.44,1.467-0.71.762-5.2,1.619-15.9,3.649l-2.63.5c-15.2,2.9-30.49,8.442-38.17,19.689C1153.89,824.376,1152.67,836.707,1160.31,853.7Z"
                />
                <path
                  id="MG"
                  fill={activeEstadoFilter === 'MG' || selectedAgencia?.estado === 'MG' ? '#8CC63F' : '#009f92'}
                  className="transition-colors duration-500 cursor-pointer hover:opacity-90"
                  onClick={() => handleStateClick('MG')}
                  d="M648.622,463.144c-2.686,3.7-4.914,6.775-7.049,8.381,0.53,4.041-.789,10.193-8.158,18.668-8.488,9.775-5.908,16.318-3.077,23.465,0.657,1.666,1.327,3.358,1.93,5.2,2.878,0.253,9.47-.451,18.032-9.43,2.016-2.11,3.7-4.075,5.186-5.813,9.39-10.963,12.5-14.586,37.45-2.4,13.084,6.4,21.818,9.278,29.391,10.247,7.514,0.955,14.206.039,23.019-1.175a43.055,43.055,0,0,1,26.261,4.314,37.773,37.773,0,0,1,17.256,18.972c2.945,7.068,5.989,13.366,9.948,16.577,3.429,2.774,7.985,3.146,14.637-.7a23,23,0,0,0,8.376-7.877c4.058-5.887,6.691-9.7,31.507-8.82l7.613,0.279c26.951,1,29.04,1.075,42.191-4.4,8.568-3.577,15.426-2.277,21.772-1.068,5.027,0.948,9.669,1.831,14.106-.638a14.265,14.265,0,0,1,9.019-1.911,12.879,12.879,0,0,1,6.227,2.748,17.583,17.583,0,0,1,4.331,5.262,28.3,28.3,0,0,1,2.872,17.307c-0.326,2.283-.73,4.479-1.122,6.61-1.7,9.271-3.183,17.406,2.288,38.324,1.512,5.76,2.8,11.839,4.092,17.924,4.483,21.156,9.032,42.591,19.783,41.443a59.557,59.557,0,0,0,12.932-3.132c9.7-3.226,15.5-5.151,22.835,7.957,7.93,14.174,5.42,18.434.42,26.909-1.1,1.852-2.33,3.935-3.48,6.231-3.92,7.851-3.47,15.788-3.01,24.029a115.213,115.213,0,0,1,.24,12.125c-0.33,7.114-5.48,9.755-10.02,12.078a14.777,14.777,0,0,0-3.68,2.27c-0.86.935,0.28,3.125,6.99,9.251,10.64,9.708,11.56,19.636,12.34,28.077,0.74,7.89,1.31,14.115,14.02,16.093,13.97,2.176,22.8-3.352,31.29-8.654,8.07-5.05,15.89-9.934,27.39-9.171,18.64,1.247,34.1-6.232,54.04-15.887,3.37-1.633,6.89-3.331,10.48-5.03,14.82-6.975,20.31-6.935,27.96-6.875,5.73,0.046,12.81.1,27.24-3.458,13.38-3.3,19.52-6.43,24.74-9.1,7.77-3.962,13.67-6.974,35.49-8.182,12.11-.671,21.66-0.565,29.9-0.471,16.03,0.179,26.9.305,42.84-5.88,11.92-4.619,20.64-10.306,27.39-17.009s11.61-14.48,15.75-23.253A89.935,89.935,0,0,0,1396.17,667v-0.013c2.93-11.156,5.57-21.19,18.9-31.861A86.942,86.942,0,0,1,1428.93,626h0.01c5.84-3.192,7.18-3.935,6.86-18.242-0.29-12.636,1.08-20.646,6.18-26.877,4.98-6.1,13.2-9.987,26.69-14.487,16.52-5.508,23.48-18.774,29.7-30.652,3.01-5.727,5.87-11.169,9.54-15.555h0.02l1.17-1.4c10.04-11.925,16.17-19.211,15.2-37.063-0.44-8.216-6.69-16.113-11.54-22.224-3.46-4.367-6.3-7.964-6.71-11.235-0.52-4.134,1.67-6.8,8.33-7.625,6.36-.8,7.32-1.666,7.11-3.384l0.01-.007c-0.09-.757-0.29-1.686-0.49-2.721h-0.02a43.849,43.849,0,0,1-.96-13.956c0.55-5.621-1.96-10.937-4.21-15.707-4.25-8.986-7.8-16.5,3.58-23.831,4.29-2.754,7.73-6.53,11.08-10.22,8.42-9.251,16.44-18.071,36.4-14.407,12.95,2.382,23.12,4.233,29.35,4.041,3.66-.113,5.29-1.208,4.4-4.014-1.34-4.2-4.76-6.869-8.72-9.935l0.01-.006c-5.87-4.566-12.74-9.909-17.37-21.986h0.01l-1.7-4.42c-6.79-17.539-9.16-23.678-2.22-39.81,4.34-10.073,11.86-15.369,18.34-19.928,4.19-2.961,7.89-5.562,9.21-8.614,2.1-4.871,7.37-12.815,13.31-20.526,5.87-7.638,12.47-15.177,17.33-19.411,4.33-3.762,10.04-9.43,11.28-15.575,1.16-5.774-1.86-12.469-14.58-19.324-19.53-10.519-29.4-13.81-40.24-17.427-5.17-1.719-10.55-3.511-16.94-6.026-9.96-3.915-15.56-5.694-19.59-5.773-3.61-.073-6.36,1.407-10.63,4.035a22.656,22.656,0,0,1-10.72,3.451,16.2,16.2,0,0,1-7.88-1.54v-0.007a14.932,14.932,0,0,1-6.26-5.754l0.01-.006a23.558,23.558,0,0,1-3.14-11.421c-0.5-10.983-5.37-15.249-12.48-21.468-2.42-2.123-5.08-4.459-7.93-7.312l-0.01.006c-2.59-2.582-4.64-4.944-6.36-6.921-4.86-5.575-6.45-7.407-17.23-5.442-8.71,1.579-17.17.61-27.05-2.814-9.57-3.317-20.43-8.932-34.23-16.769-7.55-4.28-12.92-6.9-16.7-8.746-3.84-1.871-6.16-3.006-7.93-4.539-3.03-2.628-3.52-5.216-4.73-11.707l-0.32-1.678a19.513,19.513,0,0,0-6.33-10.843,18.951,18.951,0,0,0-6.93-3.935,16.718,16.718,0,0,0-8.07-.439c-4.17.79-8.55,3.265-12.68,7.964-3.25,3.7-5.54,6.6-7.27,8.806-3.13,3.981-4.77,6.072-7.43,6.842-3.09.9-5.49-.411-10.53-3.152-1.83-.989-4.08-2.21-6.84-3.6-4.35-2.176-8.67-3.888-12.4-5.362-4.54-1.8-8.26-3.278-10.97-5.216-5.88-4.194-6.82-9.185,0-18.734,4.68-6.564,6.59-11.441,4.72-14.315-2.14-3.272-8.82-5.15-21.25-5.481-5.94-.166-10.67-0.571-14.82-0.923-15.01-1.274-22.2-1.891-38.06,13.976-11.77,11.786-22.6,14.652-31.94,17.121-7.54,2-13.98,3.7-18.57,10.445-6.11,8.966-8.7,9.158-12.64,9.443-2.87.212-6.85,0.511-18.1,11.043-16.1,15.077-25.36,13.531-32.29,12.377-2.58-.425-4.7-0.783-6.39.451-9.9,7.2-13.31-8.661-14.39-16.843-3.99.472-7.51-1.553-11.17-4.738-1.53-1.334-3.13-2.966-4.83-4.705v0.007A77.847,77.847,0,0,0,1058.23,42c-4.83-3.762-7.63-4.97-9.18-3.544-2.45,2.236-4.33,8.627-6.66,19.272-2.65,12.111-6.29,14.016-11.49,12.881a24.2,24.2,0,0,1-4.06-1.447c-3.41-1.447-7.83-3.318-13.65-.033l0.01,0.007c-4.11,2.323-4.03,4.346-2.92,6.331V75.459c0.57,1,1.36,2.09,2.13,3.193,3.88,5.415,7.83,10.95.71,17.6-4.41,4.121-3.29,6.7-1.31,11.255a54.919,54.919,0,0,1,5.21,20c1.2,18.031-12.18,19.875-27.387,21.966-5.577.77-11.453,1.58-16.579,3.358-8.9,3.079-8.317,8.488-7.547,15.648,0.6,5.574,1.286,11.985-.816,19.344-3.906,13.685-.305,16.04,7.4,21.083,0.756,0.492,1.578,1.036,3.263,2.177,9.344,6.338,9.55,10.531,9.907,17.838a60.237,60.237,0,0,0,.982,9.085c2.838,14.62-13.575,26.166-26.527,35.278l-1.791,1.261a12.954,12.954,0,0,0-4.734,5.176,4.283,4.283,0,0,0-.186,3.039l0.006-.006a6.118,6.118,0,0,0,2.288,2.84,17.61,17.61,0,0,0,8.966,2.88,16.606,16.606,0,0,1,7.414,2.137v0.006a9.6,9.6,0,0,1,4.643,6.683,14.7,14.7,0,0,1-1.028,7.877,34.412,34.412,0,0,1-8.236,11.667c-5.956,5.734-2.746,10.511.908,15.953,0.862,1.281,1.744,2.6,2.547,3.915,3.461,5.694,3.077,9.941-.086,13.638-2.573,3.012-7.07,5.249-12.793,7.618a83.986,83.986,0,0,0-14.557,7.32h-0.013c-5.074,3.278-10.922,7.99-18.981,15.694-14.7,14.055-22.68,6.417-29.962-.544A30.617,30.617,0,0,0,888.8,376L888.8,376c-3.72-2.1-8.317-3.245-15.359-3.8V372.2c-7.487-.584-17.482-0.491-31.7-0.133l-1.5.04c-26.414.664-29.14,0.736-39.392,8.063-2.308,1.652-4.7,3.5-6.91,5.229-8.675,6.756-15.167,11.806-21.879,7.333l-0.013-.013c-0.922-.618-1.618-1.115-2.262-1.586-3.621-2.628-6.26-4.532-14.51,1.162-9.271,6.4-9.834,6.376-21.752,6.025-4.29-.133-10.2-0.306-18.794-0.193-22.674.292-24.153,5.362-26.255,12.6a59.615,59.615,0,0,1-2.109,6.3v-0.007c-4.855,11.727-14.729,21.229-25.227,31.316L659.406,450A98.751,98.751,0,0,0,648.622,463.144Z"
                />
              </svg>

              {/* Pin Dinâmico */}
              {selectedAgencia && (
                <div
                  className="absolute w-10 h-10 transition-all duration-700 ease-in-out -translate-x-1/2 -translate-y-full"
                  style={{ top: selectedAgencia.mapY, left: selectedAgencia.mapX }}
                >
                  <svg viewBox="0 0 24 24" fill="white" className="w-full h-full drop-shadow-md">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="3.5" fill="#013742" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Seção de Busca */}
          <div className="w-full max-w-[400px] relative z-10 mb-12" ref={dropdownRef}>
            <div
              className="w-full bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-between px-4 py-3 cursor-text"
              onClick={() => {
                if (!isDropdownOpen) setSearchTerm("");
                setIsDropdownOpen(true);
              }}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder={activeEstadoFilter ? `Pesquise no estado de ${activeEstadoFilter}` : "Pesquise por cidade, estado ou agência"}
                className="w-full outline-none text-sm text-gray-700 bg-transparent placeholder-gray-400"
                value={isDropdownOpen ? searchTerm : (selectedAgencia ? `${selectedAgencia.cidade}/${selectedAgencia.estado} - ${selectedAgencia.pa}` : '')}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                }}
              />
              {(searchTerm || selectedAgencia || activeEstadoFilter) ? (
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchTerm("");
                    setSelectedAgencia(null);
                    setActiveEstadoFilter(null);
                    setIsDropdownOpen(true);
                    setTimeout(() => inputRef.current?.focus(), 50);
                  }}
                >
                  <X size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  className="text-[#003641] ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                >
                  {isDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              )}
            </div>

            {/* Dropdown Options */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[240px] overflow-y-auto z-20">
                {filteredAgencias.length > 0 ? (
                  filteredAgencias.map((ag) => (
                    <div
                      key={ag.id}
                      className={`px-4 py-3 text-sm cursor-pointer transition-colors ${selectedAgencia?.id === ag.id
                          ? 'bg-gray-300 text-gray-800 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      onClick={() => handleSelect(ag)}
                    >
                      {ag.cidade}/{ag.estado} - {ag.pa}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">Nenhuma cidade encontrada.</div>
                )}
              </div>
            )}
          </div>

          {/* Detalhes da Agência */}
          {selectedAgencia && (
            <div className="w-full max-w-[700px] mx-auto grid grid-cols-1 md:grid-cols-2 items-start mt-4 gap-8 transition-opacity duration-500">
              {/* Esquerda: Nome */}
              <div className="flex flex-col items-start md:pr-4">
                <span className="text-[#8CC63F] text-xs font-bold tracking-wider mb-1 uppercase">
                  {selectedAgencia.pa}
                </span>
                <h3 className="text-[#003641] text-3xl font-bold">
                  {selectedAgencia.cidade}/{selectedAgencia.estado}
                </h3>
              </div>

              {/* Direita: Endereço Detalhado */}
              <div className="flex flex-col items-start text-[#003641] text-sm leading-relaxed font-medium md:pl-4">
                <p><span className="font-bold">Endereço:</span> {selectedAgencia.endereco}</p>
                <p><span className="font-bold">Número:</span> {selectedAgencia.numero}</p>
                <p><span className="font-bold">Bairro:</span> {selectedAgencia.bairro}</p>
                <p><span className="font-bold">CEP:</span> {selectedAgencia.cep}</p>
                <p><span className="font-bold">CNPJ:</span> {selectedAgencia.cnpj}</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
