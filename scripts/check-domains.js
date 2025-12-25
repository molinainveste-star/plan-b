/**
 * 🔍 Domain Availability Checker
 * 
 * Este script verifica a disponibilidade de domínios usando DNS lookup.
 * Se o domínio NÃO resolver (erro), provavelmente está disponível.
 * 
 * Como usar:
 * node scripts/check-domains.js
 */

const dns = require('dns');
const { promisify } = require('util');

const resolveDns = promisify(dns.resolve);

// Lista de todos os nomes sugeridos
const names = [
  // TIER 1 - 4 letras
  'kivo', 'aevo', 'vexo', 'nexa', 'revo', 'prio', 'kora', 'luvo', 'ziro', 'nevo',
  
  // TIER 2 - 5 letras sólidos
  'kreo', 'skyvo', 'reach', 'prove', 'clout', 'pulse', 'prism', 'spark', 'bloom', 'pitch', 'scale',
  
  // TIER 3 - Inventados raros
  'brevix', 'grovy', 'tryvo', 'wyndr', 'phylo', 'fyndr', 'stryv', 'blynd',
  
  // TIER 4 - Ultra raros
  'zuvio', 'qevra', 'vykor', 'kryon', 'provyx', 'nexvo', 'aervo', 'kreyo', 'plexo', 'brivv', 'trovx',
  
  // TIER 5 - Combinações exóticas
  'xyvo', 'qolab', 'xevor', 'yvora', 'zenko', 'quoro', 'wevo', 'jexo',
  
  // TIER 6 - Fluidos modernos
  'onyro', 'elyo', 'ovio', 'axio', 'unio', 'airo', 'vyra',
  
  // TIER 7 - Consonantais fortes
  'threx', 'drex', 'vorn', 'zolt', 'brix', 'travo',
  
  // Extras
  'trovio', 'quivr', 'influo', 'metrio'
];

const extensions = ['.com', '.io', '.co'];

async function checkDomain(domain) {
  try {
    await resolveDns(domain);
    return { domain, status: '❌ OCUPADO', available: false };
  } catch (error) {
    if (error.code === 'ENOTFOUND' || error.code === 'ENODATA') {
      return { domain, status: '✅ PROVÁVEL DISPONÍVEL', available: true };
    }
    return { domain, status: '⚠️ INCERTO', available: null };
  }
}

async function main() {
  console.log('\n🔍 Verificando disponibilidade de domínios...\n');
  console.log('=' .repeat(60));
  
  const results = {
    available: [],
    taken: [],
    uncertain: []
  };
  
  for (const name of names) {
    console.log(`\n📦 ${name.toUpperCase()}`);
    
    for (const ext of extensions) {
      const domain = name + ext;
      const result = await checkDomain(domain);
      
      console.log(`   ${result.status} ${domain}`);
      
      if (result.available === true) {
        results.available.push(domain);
      } else if (result.available === false) {
        results.taken.push(domain);
      } else {
        results.uncertain.push(domain);
      }
      
      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 100));
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 RESUMO\n');
  
  console.log('✅ PROVAVELMENTE DISPONÍVEIS:');
  if (results.available.length > 0) {
    results.available.forEach(d => console.log(`   • ${d}`));
  } else {
    console.log('   Nenhum encontrado');
  }
  
  console.log('\n❌ OCUPADOS:');
  console.log(`   ${results.taken.length} domínios`);
  
  console.log('\n⚠️ INCERTOS (verificar manualmente):');
  if (results.uncertain.length > 0) {
    results.uncertain.forEach(d => console.log(`   • ${d}`));
  } else {
    console.log('   Nenhum');
  }
  
  console.log('\n💡 PRÓXIMO PASSO:');
  console.log('   Verifique os domínios "disponíveis" em namecheap.com ou godaddy.com');
  console.log('   DNS lookup não é 100% preciso - domínios podem estar registrados mas não configurados.\n');
}

main().catch(console.error);

