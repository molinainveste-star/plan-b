import Link from "next/link";

export const metadata = {
    title: "Política de Privacidade | Provly",
    description: "Política de Privacidade da plataforma Provly",
};

export default function PrivacidadePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-white">
                        Provly
                    </Link>
                    <nav className="flex gap-6 text-sm">
                        <Link href="/termos" className="text-gray-400 hover:text-white transition">
                            Termos
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Content */}
            <article className="max-w-4xl mx-auto px-6 py-16">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Política de Privacidade</h1>
                    <p className="text-gray-400">Última atualização: 27 de Dezembro de 2024</p>
                </div>

                <div className="prose prose-invert prose-lg max-w-none space-y-8">
                    
                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Introdução</h2>
                        <p className="text-gray-300 leading-relaxed">
                            O Provly (&quot;nós&quot;, &quot;nosso&quot;) está comprometido com a proteção da sua privacidade. 
                            Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas 
                            informações quando você usa nossa plataforma de Media Kit digital.
                        </p>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) 
                            do Brasil e outras legislações aplicáveis de proteção de dados.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Dados que Coletamos</h2>
                        
                        <h3 className="text-xl font-medium text-white mt-6 mb-3">2.1 Dados fornecidos por você:</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>Nome e informações de perfil</li>
                            <li>Endereço de e-mail</li>
                            <li>Informações de contato profissional</li>
                            <li>Conteúdo que você cria na plataforma (textos, descrições, preços)</li>
                        </ul>

                        <h3 className="text-xl font-medium text-white mt-6 mb-3">2.2 Dados de redes sociais conectadas:</h3>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Quando você conecta suas contas de redes sociais, coletamos dados públicos e métricas 
                            autorizadas por você, incluindo:
                        </p>
                        
                        <div className="bg-black/30 rounded-xl p-6 space-y-4">
                            <div>
                                <h4 className="text-white font-medium mb-2">📺 YouTube (Google)</h4>
                                <p className="text-gray-400 text-sm">Nome do canal, foto, descrição, número de inscritos, visualizações, lista de vídeos públicos e suas métricas.</p>
                            </div>
                            <div>
                                <h4 className="text-white font-medium mb-2">🎵 TikTok</h4>
                                <p className="text-gray-400 text-sm">Nome de usuário, foto de perfil, número de seguidores, curtidas totais, lista de vídeos e suas métricas.</p>
                            </div>
                            <div>
                                <h4 className="text-white font-medium mb-2">📸 Instagram/Facebook (Meta)</h4>
                                <p className="text-gray-400 text-sm">Nome de usuário, foto de perfil, número de seguidores, métricas de posts (apenas contas Business/Creator).</p>
                            </div>
                            <div>
                                <h4 className="text-white font-medium mb-2">💼 LinkedIn</h4>
                                <p className="text-gray-400 text-sm">Nome, foto de perfil, headline, número de conexões/seguidores.</p>
                            </div>
                        </div>

                        <h3 className="text-xl font-medium text-white mt-6 mb-3">2.3 Dados coletados automaticamente:</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>Endereço IP e informações do dispositivo</li>
                            <li>Dados de navegação e uso da plataforma</li>
                            <li>Cookies e tecnologias similares</li>
                        </ul>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Como Usamos seus Dados</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">Utilizamos seus dados para:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>Fornecer e manter o Serviço</li>
                            <li>Exibir suas métricas de redes sociais no seu Media Kit</li>
                            <li>Personalizar sua experiência na plataforma</li>
                            <li>Comunicar atualizações e informações importantes</li>
                            <li>Analisar uso e melhorar o Serviço</li>
                            <li>Prevenir fraudes e garantir segurança</li>
                            <li>Cumprir obrigações legais</li>
                        </ul>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Compartilhamento de Dados</h2>
                        
                        <h3 className="text-xl font-medium text-white mt-6 mb-3">4.1 Dados públicos do seu Media Kit:</h3>
                        <p className="text-gray-300 leading-relaxed">
                            As informações que você escolhe exibir no seu Media Kit público (nome, foto, métricas, 
                            descrição, preços) são visíveis para qualquer pessoa com acesso ao seu link.
                        </p>

                        <h3 className="text-xl font-medium text-white mt-6 mb-3">4.2 Provedores de serviço:</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Compartilhamos dados com terceiros que nos ajudam a operar o Serviço:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
                            <li><strong>Supabase</strong> - Armazenamento de dados e autenticação</li>
                            <li><strong>Vercel</strong> - Hospedagem da plataforma</li>
                            <li><strong>Google (Gemini AI)</strong> - Geração de conteúdo assistido por IA</li>
                        </ul>

                        <h3 className="text-xl font-medium text-white mt-6 mb-3">4.3 Não vendemos seus dados:</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para 
                            fins de marketing sem seu consentimento explícito.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Integrações com Plataformas de Terceiros</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Ao conectar suas contas de redes sociais, você está autorizando essas plataformas a 
                            compartilhar dados conosco de acordo com suas próprias políticas de privacidade:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li><a href="https://policies.google.com/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Política de Privacidade do Google/YouTube</a></li>
                            <li><a href="https://www.tiktok.com/legal/privacy-policy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Política de Privacidade do TikTok</a></li>
                            <li><a href="https://www.facebook.com/privacy/policy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Política de Privacidade da Meta (Instagram/Facebook)</a></li>
                            <li><a href="https://www.linkedin.com/legal/privacy-policy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Política de Privacidade do LinkedIn</a></li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            Você pode revogar o acesso a qualquer momento desconectando sua conta nas configurações 
                            do Provly ou diretamente nas configurações de privacidade de cada plataforma.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Seus Direitos (LGPD)</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            De acordo com a LGPD, você tem os seguintes direitos:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li><strong>Confirmação e Acesso:</strong> Confirmar se tratamos seus dados e acessá-los</li>
                            <li><strong>Correção:</strong> Solicitar correção de dados incompletos ou desatualizados</li>
                            <li><strong>Anonimização ou Eliminação:</strong> Solicitar anonimização ou exclusão de dados desnecessários</li>
                            <li><strong>Portabilidade:</strong> Solicitar transferência de seus dados para outro fornecedor</li>
                            <li><strong>Eliminação:</strong> Solicitar exclusão de dados tratados com base no consentimento</li>
                            <li><strong>Informação:</strong> Ser informado sobre compartilhamento de dados</li>
                            <li><strong>Revogação:</strong> Revogar consentimento a qualquer momento</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            Para exercer esses direitos, entre em contato pelo e-mail: <strong className="text-white">contato@provly.io</strong>
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Segurança dos Dados</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Implementamos medidas técnicas e organizacionais para proteger seus dados, incluindo:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
                            <li>Criptografia em trânsito (HTTPS/TLS)</li>
                            <li>Criptografia em repouso para dados sensíveis</li>
                            <li>Controle de acesso baseado em funções</li>
                            <li>Monitoramento e logs de segurança</li>
                            <li>Backups regulares</li>
                        </ul>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">8. Retenção de Dados</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Mantemos seus dados enquanto sua conta estiver ativa ou conforme necessário para fornecer 
                            o Serviço. Quando você excluir sua conta, removeremos seus dados pessoais em até 30 dias, 
                            exceto quando a retenção for necessária para cumprimento de obrigações legais.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">9. Cookies</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Utilizamos cookies e tecnologias similares para:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
                            <li>Manter sua sessão autenticada</li>
                            <li>Lembrar suas preferências</li>
                            <li>Analisar uso da plataforma</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            Você pode controlar cookies através das configurações do seu navegador.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">10. Menores de Idade</h2>
                        <p className="text-gray-300 leading-relaxed">
                            O Serviço não é destinado a menores de 18 anos. Não coletamos intencionalmente dados de 
                            menores. Se tomarmos conhecimento de que coletamos dados de um menor, tomaremos medidas 
                            para excluí-los.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">11. Alterações nesta Política</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre alterações 
                            significativas por e-mail ou através do Serviço. Recomendamos revisar esta política regularmente.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">12. Contato</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados, 
                            entre em contato conosco:
                        </p>
                        <div className="mt-4 space-y-2">
                            <p className="text-white font-medium">📧 E-mail: contato@provly.io</p>
                            <p className="text-white font-medium">🌐 Website: provly.io</p>
                        </div>
                    </section>

                </div>
            </article>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-black/20">
                <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2024 Provly. Todos os direitos reservados.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <Link href="/termos" className="text-gray-400 hover:text-white transition">
                            Termos de Serviço
                        </Link>
                        <Link href="/privacidade" className="text-gray-400 hover:text-white transition">
                            Política de Privacidade
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}

