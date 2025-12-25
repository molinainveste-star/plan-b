/**
 * 🧬 Gerador de Nomes Únicos
 * 
 * Usa combinações fonéticas raras para gerar nomes
 * com maior probabilidade de estar disponíveis.
 */

// Sílabas iniciais raras (menos usadas)
const rareStarts = [
  'Vry', 'Zyx', 'Qua', 'Ply', 'Bry', 'Gly', 'Kry', 'Thy', 
  'Wry', 'Xyn', 'Zvy', 'Qvo', 'Pvy', 'Fry', 'Svy', 'Tvy',
  'Vyx', 'Zyr', 'Qyr', 'Pyx', 'Byx', 'Gyx', 'Kyx', 'Myx',
  'Nyx', 'Ryx', 'Syx', 'Vyr', 'Zyn', 'Qyn', 'Pyn', 'Byn'
];

// Sílabas do meio
const middles = [
  'a', 'e', 'i', 'o', 'u', 'ae', 'io', 'eo', 'ia', 'ua',
  'or', 'ar', 'er', 'ir', 'ur', 'al', 'el', 'il', 'ol', 'ul'
];

// Finais raros
const rareEnds = [
  'x', 'q', 'z', 'v', 'yx', 'vx', 'zx', 'qx',
  'vo', 'xo', 'zo', 'qo', 'vy', 'xy', 'zy', 'qy',
  'vr', 'xr', 'zr', 'qr', 'vn', 'xn', 'zn', 'qn'
];

// Padrões que soam bem
const goodPatterns = [
  // Padrão 1: Consoante + Vogal + Consoante + Vogal (CVCV)
  { starts: ['Ky', 'Zy', 'Vy', 'Xy', 'Qy'], ends: ['vo', 'xo', 'zo', 'ro', 'lo'] },
  // Padrão 2: CVC com vogal no meio
  { starts: ['Zr', 'Vr', 'Kr', 'Pr', 'Br'], ends: ['ix', 'ax', 'ox', 'ux', 'ex'] },
  // Padrão 3: Suave
  { starts: ['Lu', 'Nu', 'Mu', 'Su', 'Ru'], ends: ['vio', 'xia', 'zia', 'via', 'ria'] },
];

// Gerar nomes baseados em conceitos do produto
const concepts = {
  metrics: ['Met', 'Dat', 'Ana', 'Sta', 'Num'],
  influence: ['Inf', 'Flu', 'Imp', 'Rea', 'Sco'],
  brand: ['Bra', 'Mar', 'Pro', 'Pit', 'Kit'],
  connect: ['Con', 'Lin', 'Net', 'Hub', 'Nex'],
  growth: ['Gro', 'Ris', 'Sca', 'Amp', 'Boo']
};

// Sufixos modernos
const modernSuffixes = ['ify', 'ly', 'io', 'eo', 'ia', 'ix', 'ex', 'ox', 'ax', 'ux'];

function generateRandomName() {
  const start = rareStarts[Math.floor(Math.random() * rareStarts.length)];
  const mid = middles[Math.floor(Math.random() * middles.length)];
  const end = rareEnds[Math.floor(Math.random() * rareEnds.length)];
  return start + mid + end;
}

function generateConceptName() {
  const conceptKeys = Object.keys(concepts);
  const concept = concepts[conceptKeys[Math.floor(Math.random() * conceptKeys.length)]];
  const base = concept[Math.floor(Math.random() * concept.length)];
  const suffix = modernSuffixes[Math.floor(Math.random() * modernSuffixes.length)];
  return base + suffix;
}

function generateBlendName() {
  // Blend de duas palavras relacionadas ao produto
  const words1 = ['Proof', 'Reach', 'Brand', 'Pitch', 'Scale', 'Grow', 'Data', 'Meta'];
  const words2 = ['Kit', 'Hub', 'Lab', 'Box', 'Pad', 'Deck', 'Spot', 'Base'];
  
  const w1 = words1[Math.floor(Math.random() * words1.length)];
  const w2 = words2[Math.floor(Math.random() * words2.length)];
  
  return w1 + w2;
}

function generateAcronym() {
  // Acrônimos que soam como palavras
  const acronyms = [
    { letters: 'PROV', meaning: 'Platform for Reach & Organic Value' },
    { letters: 'KYTE', meaning: 'Know Your True Engagement' },
    { letters: 'MIKA', meaning: 'Media Intelligence & Kit Automation' },
    { letters: 'VISO', meaning: 'Visual Influence Score Optimizer' },
    { letters: 'REKO', meaning: 'Reach & Engagement Kit Optimizer' },
    { letters: 'ZUMA', meaning: 'Zero to Unlimited Media Analytics' },
    { letters: 'KYRA', meaning: 'Kit for Your Reach Analytics' },
    { letters: 'NOVU', meaning: 'New Optimized Value Unit' },
    { letters: 'SOVA', meaning: 'Score Optimizer for Value & Analytics' },
    { letters: 'VERA', meaning: 'Value & Engagement Reach Analytics' },
  ];
  return acronyms[Math.floor(Math.random() * acronyms.length)];
}

// Palavras de outros idiomas com significados relevantes
const foreignWords = [
  { word: 'Hikaru', lang: 'JP', meaning: 'Brilhar' },
  { word: 'Tsunagu', lang: 'JP', meaning: 'Conectar' },
  { word: 'Kasvu', lang: 'FI', meaning: 'Crescimento' },
  { word: 'Valoa', lang: 'FI', meaning: 'Luz' },
  { word: 'Luova', lang: 'FI', meaning: 'Criativo' },
  { word: 'Skapa', lang: 'SE', meaning: 'Criar' },
  { word: 'Vaxa', lang: 'SE', meaning: 'Crescer' },
  { word: 'Lyser', lang: 'NO', meaning: 'Brilhar' },
  { word: 'Vekst', lang: 'NO', meaning: 'Crescimento' },
  { word: 'Pruva', lang: 'TR', meaning: 'Prova' },
  { word: 'Olcu', lang: 'TR', meaning: 'Medida' },
  { word: 'Birlik', lang: 'TR', meaning: 'União' },
  { word: 'Zveno', lang: 'RU', meaning: 'Elo' },
  { word: 'Svyaz', lang: 'RU', meaning: 'Conexão' },
  { word: 'Rasti', lang: 'LT', meaning: 'Encontrar' },
  { word: 'Kurti', lang: 'LT', meaning: 'Criar' },
  { word: 'Matau', lang: 'NZ-Maori', meaning: 'Conhecer' },
  { word: 'Aroha', lang: 'NZ-Maori', meaning: 'Amor/conexão' },
  { word: 'Mana', lang: 'NZ-Maori', meaning: 'Poder/autoridade' },
];

// Nomes compostos criativos
const creativeCompounds = [
  'ProofPad', 'ReachKit', 'BrandDeck', 'PitchHub', 'ScaleBox',
  'DataNest', 'MetaSpot', 'GrowLab', 'FluxKit', 'PulseBox',
  'ProofNest', 'ReachLab', 'BrandNest', 'PitchPad', 'ScaleSpot',
  'MetricPad', 'InfluBox', 'CreatorPad', 'MediaNest', 'KitLab'
];

// Prefixos + conceitos
function generatePrefixedName() {
  const prefixes = ['Get', 'Try', 'Use', 'Go', 'Hey', 'My', 'One', 'Be', 'Do', 'So'];
  const cores = ['Proof', 'Reach', 'Brand', 'Pitch', 'Scale', 'Metric', 'Influ', 'Kit', 'Media', 'Data'];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const core = cores[Math.floor(Math.random() * cores.length)];
  
  return prefix + core;
}

// Gerar e exibir
console.log('\n🧬 GERADOR DE NOMES ÚNICOS\n');
console.log('='.repeat(60));

console.log('\n📦 NOMES ALEATÓRIOS ÚNICOS (Alta chance de disponibilidade):\n');
const randomNames = new Set();
while (randomNames.size < 20) {
  randomNames.add(generateRandomName());
}
randomNames.forEach(n => console.log(`   • ${n}`));

console.log('\n📦 BASEADOS EM CONCEITOS DO PRODUTO:\n');
const conceptNames = new Set();
while (conceptNames.size < 15) {
  conceptNames.add(generateConceptName());
}
conceptNames.forEach(n => console.log(`   • ${n}`));

console.log('\n📦 COMPOSTOS CRIATIVOS:\n');
creativeCompounds.forEach(n => console.log(`   • ${n}`));

console.log('\n📦 COM PREFIXOS MODERNOS:\n');
const prefixedNames = new Set();
while (prefixedNames.size < 15) {
  prefixedNames.add(generatePrefixedName());
}
prefixedNames.forEach(n => console.log(`   • ${n}`));

console.log('\n📦 ACRÔNIMOS QUE SOAM COMO PALAVRAS:\n');
const acronyms = [];
for (let i = 0; i < 10; i++) {
  acronyms.push(generateAcronym());
}
[...new Map(acronyms.map(a => [a.letters, a])).values()].forEach(a => {
  console.log(`   • ${a.letters} - "${a.meaning}"`);
});

console.log('\n📦 PALAVRAS DE OUTROS IDIOMAS:\n');
foreignWords.forEach(w => {
  console.log(`   • ${w.word} (${w.lang}) - "${w.meaning}"`);
});

console.log('\n📦 BLENDS ÚNICOS:\n');
const blends = new Set();
while (blends.size < 15) {
  blends.add(generateBlendName());
}
blends.forEach(n => console.log(`   • ${n}`));

console.log('\n' + '='.repeat(60));
console.log('\n💡 DICA: Copie os nomes interessantes e verifique em namecheap.com\n');
console.log('   Extensões sugeridas: .app, .so, .xyz, .kit, .studio\n');

