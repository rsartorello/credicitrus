const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx')) {
        arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

const allTsxFiles = getAllFiles('src');

const pfLinks = {
  'Empréstimos e Financiamento': '/emprestimo',
  'Empréstimos e Financiamentos': '/emprestimo',
  'Investimentos': '/investimentos-que-acompanham-seus-objetivos',
  'Consórcio': '/consorcios-para-cada-objetivo',
  'Soluções de Recebimento': '/receba-com-mais-praticidade-e-seguranca',
  'Antecipação de Recebíveis': '/antecipacao-de-recebiveis',
  'Seguros': '/seguro-para-voce',
  'Cartões de crédito': '/cartoes-que-acompanham-o-seu-dia-a-dia',
  'Crédito Rural': '/credito-rural'
};

const pjLinks = {
  'Empréstimos e Financiamentos': '/emprestimo-pj',
  'Empréstimos e Financiamento': '/emprestimo-pj',
  'Investimentos': '/investimento', // Using generic
  'Consórcio': '/consorcios-para-sua-empresa',
  'Soluções de Recebimento': '/receba-com-mais-praticidade-e-seguranca',
  'Antecipação de Recebíveis': '/antecipacao-de-recebiveis',
  'Seguros': '/seguro-empresarial-credicitrus',
  'Cartões de crédito': '/cartoes-que-impulsionam-a-sua-empresa',
  'Crédito Rural': '/credito-rural'
};

const agroLinks = {
  'Empréstimos e Financiamentos': '/credito-rural',
  'Empréstimos e Financiamento': '/credito-rural',
  'Investimentos': '/investimento',
  'Consórcio': '/consorcios-para-sua-fazenda',
  'Soluções de Recebimento': '/receba-com-mais-praticidade-e-seguranca',
  'Seguros': '/seguro-agro-credicitrus',
  'Cartões de crédito': '/cartoes-que-impulsionam-a-sua-empresa',
  'Crédito Rural': '/credito-rural'
};

let modifiedFilesCount = 0;

allTsxFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Determine context
  let linkMap = pfLinks;
  if (file.includes('empresa') || file.includes('pj') || file.includes('recebiveis') || file.includes('-2')) {
    linkMap = pjLinks;
  }
  if (file.includes('agro') || file.includes('rural') || file.includes('fazenda')) {
    linkMap = agroLinks;
  }

  // Find blocks like:
  // title: 'Empréstimos e Financiamento',
  // description: '...',
  // icon: <Banknote />,
  // link: '#',

  // We can use a regex that matches title line, captures the title, then matches up to link: '#'
  const regex = /title:\s*['"]([^'"]+)['"],([\s\S]*?)link:\s*['"](#)['"]/g;

  content = content.replace(regex, (match, title, middle, linkPlaceholder) => {
    let newLink = linkMap[title];
    if (!newLink) {
      newLink = pfLinks[title] || '#'; // fallback
    }
    if (newLink !== '#') {
      return `title: '${title}',${middle}link: '${newLink}'`;
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedFilesCount++;
    console.log(`Updated links in: ${file}`);
  }
});

console.log(`Finished updating links. Modified ${modifiedFilesCount} files.`);
