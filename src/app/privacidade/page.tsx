import Link from "next/link";

export const metadata = {
    title: "Política de Privacidade | Provly",
    description: "Política de Privacidade da plataforma Provly",
};

export default function PrivacidadePage() {
    return (
        <main 
            style={{ 
                minHeight: '100vh',
                background: 'linear-gradient(180deg, #0D1117 0%, #161B22 100%)',
            }}
        >
            {/* Header */}
            <header 
                style={{ 
                    borderBottom: '1px solid rgba(240, 246, 252, 0.1)',
                    background: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#F0F6FC', textDecoration: 'none' }}>
                        Provly
                    </Link>
                    <nav style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
                        <Link href="/termos" style={{ color: '#8B949E', textDecoration: 'none' }}>
                            Termos
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Content */}
            <article style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 24px' }}>
                <div style={{ marginBottom: '48px' }}>
                    <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#F0F6FC', marginBottom: '16px' }}>
                        Política de Privacidade
                    </h1>
                    <p style={{ color: '#8B949E' }}>Última atualização: 27 de dezembro de 2024</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    <Section title="1. Introdução">
                        <p style={{ marginBottom: '16px' }}>
                            O Provly (&ldquo;nós&rdquo;, &ldquo;nosso&rdquo;) está comprometido com a proteção da sua privacidade. 
                            Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas 
                            informações quando você usa nossa plataforma de Media Kit digital.
                        </p>
                        <p>
                            Esta política está em conformidade com a <strong style={{ color: '#00D4FF' }}>Lei Geral de Proteção de Dados 
                            (LGPD - Lei nº 13.709/2018)</strong> do Brasil e outras legislações aplicáveis de proteção de dados.
                        </p>
                    </Section>

                    <Section title="2. Dados que Coletamos">
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#F0F6FC', marginBottom: '12px', marginTop: '8px' }}>
                            2.1 Dados fornecidos por você:
                        </h3>
                        <ul style={{ listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                            <li>Nome e informações de perfil</li>
                            <li>Endereço de e-mail</li>
                            <li>Informações de contato profissional</li>
                            <li>Conteúdo que você cria na plataforma (textos, descrições, preços)</li>
                        </ul>

                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#F0F6FC', marginBottom: '12px' }}>
                            2.2 Dados de redes sociais conectadas:
                        </h3>
                        <p style={{ marginBottom: '16px' }}>
                            Quando você conecta suas contas de redes sociais, coletamos dados públicos e métricas 
                            autorizadas por você:
                        </p>
                        
                        <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                            <div>
                                <span style={{ color: '#F0F6FC', fontWeight: '500' }}>📺 YouTube (Google)</span>
                                <p style={{ fontSize: '14px', color: '#8B949E', marginTop: '4px' }}>Nome do canal, foto, descrição, número de inscritos, visualizações, lista de vídeos públicos.</p>
                            </div>
                            <div>
                                <span style={{ color: '#F0F6FC', fontWeight: '500' }}>🎵 TikTok</span>
                                <p style={{ fontSize: '14px', color: '#8B949E', marginTop: '4px' }}>Nome de usuário, foto de perfil, número de seguidores, curtidas totais, lista de vídeos.</p>
                            </div>
                            <div>
                                <span style={{ color: '#F0F6FC', fontWeight: '500' }}>📸 Instagram/Facebook (Meta)</span>
                                <p style={{ fontSize: '14px', color: '#8B949E', marginTop: '4px' }}>Nome de usuário, foto de perfil, número de seguidores, métricas de posts (apenas contas Business/Creator).</p>
                            </div>
                            <div>
                                <span style={{ color: '#F0F6FC', fontWeight: '500' }}>💼 LinkedIn</span>
                                <p style={{ fontSize: '14px', color: '#8B949E', marginTop: '4px' }}>Nome, foto de perfil, headline, número de conexões/seguidores.</p>
                            </div>
                        </div>

                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#F0F6FC', marginBottom: '12px' }}>
                            2.3 Dados coletados automaticamente:
                        </h3>
                        <ul style={{ listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Endereço IP e informações do dispositivo</li>
                            <li>Dados de navegação e uso da plataforma</li>
                            <li>Cookies e tecnologias similares</li>
                        </ul>
                    </Section>

                    <Section title="3. Como Usamos seus Dados">
                        <p style={{ marginBottom: '16px' }}>Utilizamos seus dados para:</p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Fornecer e manter o Serviço</li>
                            <li>Exibir suas métricas de redes sociais no seu Media Kit</li>
                            <li>Personalizar sua experiência na plataforma</li>
                            <li>Comunicar atualizações e informações importantes</li>
                            <li>Analisar uso e melhorar o Serviço</li>
                            <li>Prevenir fraudes e garantir segurança</li>
                            <li>Cumprir obrigações legais</li>
                        </ul>
                    </Section>

                    <Section title="4. Compartilhamento de Dados">
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#F0F6FC', marginBottom: '12px', marginTop: '8px' }}>
                            4.1 Dados públicos do seu Media Kit:
                        </h3>
                        <p style={{ marginBottom: '20px' }}>
                            As informações que você escolhe exibir no seu Media Kit público (nome, foto, métricas, 
                            descrição, preços) são visíveis para qualquer pessoa com acesso ao seu link.
                        </p>

                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#F0F6FC', marginBottom: '12px' }}>
                            4.2 Provedores de serviço:
                        </h3>
                        <ul style={{ listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                            <li><strong style={{ color: '#F0F6FC' }}>Supabase</strong> - Armazenamento de dados e autenticação</li>
                            <li><strong style={{ color: '#F0F6FC' }}>Vercel</strong> - Hospedagem da plataforma</li>
                            <li><strong style={{ color: '#F0F6FC' }}>Google (Gemini AI)</strong> - Geração de conteúdo assistido por IA</li>
                        </ul>

                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#F0F6FC', marginBottom: '12px' }}>
                            4.3 Não vendemos seus dados:
                        </h3>
                        <p>
                            Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para 
                            fins de marketing sem seu consentimento explícito.
                        </p>
                    </Section>

                    <Section title="5. Integrações com Plataformas de Terceiros">
                        <p style={{ marginBottom: '16px' }}>
                            Ao conectar suas contas de redes sociais, você está autorizando essas plataformas a 
                            compartilhar dados conosco de acordo com suas próprias políticas de privacidade:
                        </p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                            <li><a href="https://policies.google.com/privacy" style={{ color: '#00D4FF' }} target="_blank" rel="noopener noreferrer">Política de Privacidade do Google/YouTube</a></li>
                            <li><a href="https://www.tiktok.com/legal/privacy-policy" style={{ color: '#00D4FF' }} target="_blank" rel="noopener noreferrer">Política de Privacidade do TikTok</a></li>
                            <li><a href="https://www.facebook.com/privacy/policy" style={{ color: '#00D4FF' }} target="_blank" rel="noopener noreferrer">Política de Privacidade da Meta</a></li>
                            <li><a href="https://www.linkedin.com/legal/privacy-policy" style={{ color: '#00D4FF' }} target="_blank" rel="noopener noreferrer">Política de Privacidade do LinkedIn</a></li>
                        </ul>
                        <p>
                            Você pode revogar o acesso a qualquer momento desconectando sua conta nas configurações 
                            do Provly ou diretamente nas configurações de privacidade de cada plataforma.
                        </p>
                    </Section>

                    <Section title="6. Seus Direitos (LGPD)">
                        <p style={{ marginBottom: '16px' }}>
                            De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem os seguintes direitos:
                        </p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                            <li><strong style={{ color: '#F0F6FC' }}>Confirmação e Acesso:</strong> Confirmar se tratamos seus dados e acessá-los</li>
                            <li><strong style={{ color: '#F0F6FC' }}>Correção:</strong> Solicitar correção de dados incompletos ou desatualizados</li>
                            <li><strong style={{ color: '#F0F6FC' }}>Anonimização ou Eliminação:</strong> Solicitar anonimização ou exclusão de dados desnecessários</li>
                            <li><strong style={{ color: '#F0F6FC' }}>Portabilidade:</strong> Solicitar transferência de seus dados para outro fornecedor</li>
                            <li><strong style={{ color: '#F0F6FC' }}>Eliminação:</strong> Solicitar exclusão de dados tratados com base no consentimento</li>
                            <li><strong style={{ color: '#F0F6FC' }}>Informação:</strong> Ser informado sobre compartilhamento de dados</li>
                            <li><strong style={{ color: '#F0F6FC' }}>Revogação:</strong> Revogar consentimento a qualquer momento</li>
                        </ul>
                        <p>
                            Para exercer esses direitos, entre em contato: <strong style={{ color: '#00D4FF' }}>contato@provly.io</strong>
                        </p>
                    </Section>

                    <Section title="7. Segurança dos Dados">
                        <p style={{ marginBottom: '16px' }}>
                            Implementamos medidas técnicas e organizacionais para proteger seus dados:
                        </p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Criptografia em trânsito (HTTPS/TLS)</li>
                            <li>Criptografia em repouso para dados sensíveis</li>
                            <li>Controle de acesso baseado em funções</li>
                            <li>Monitoramento e logs de segurança</li>
                            <li>Backups regulares</li>
                        </ul>
                    </Section>

                    <Section title="8. Retenção de Dados">
                        <p>
                            Mantemos seus dados enquanto sua conta estiver ativa ou conforme necessário para fornecer 
                            o Serviço. Quando você excluir sua conta, removeremos seus dados pessoais em até 30 dias, 
                            exceto quando a retenção for necessária para cumprimento de obrigações legais.
                        </p>
                    </Section>

                    <Section title="9. Cookies">
                        <p style={{ marginBottom: '16px' }}>
                            Utilizamos cookies e tecnologias similares para:
                        </p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                            <li>Manter sua sessão autenticada</li>
                            <li>Lembrar suas preferências</li>
                            <li>Analisar uso da plataforma</li>
                        </ul>
                        <p>
                            Você pode controlar cookies através das configurações do seu navegador.
                        </p>
                    </Section>

                    <Section title="10. Menores de Idade">
                        <p>
                            O Serviço não é destinado a menores de 18 anos. Não coletamos intencionalmente dados de 
                            menores. Se tomarmos conhecimento de que coletamos dados de um menor, tomaremos medidas 
                            para excluí-los.
                        </p>
                    </Section>

                    <Section title="11. Alterações nesta Política">
                        <p>
                            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre alterações 
                            significativas por e-mail ou através do Serviço. Recomendamos revisar esta política regularmente.
                        </p>
                    </Section>

                    <Section title="12. Contato">
                        <p>
                            Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados, 
                            entre em contato conosco:
                        </p>
                        <div style={{ marginTop: '16px' }}>
                            <p style={{ color: '#00D4FF', fontWeight: '500' }}>📧 E-mail: contato@provly.io</p>
                            <p style={{ color: '#00D4FF', fontWeight: '500', marginTop: '8px' }}>🌐 Website: provly.io</p>
                        </div>
                    </Section>

                </div>
            </article>

            {/* Footer */}
            <footer style={{ borderTop: '1px solid rgba(240, 246, 252, 0.1)', background: 'rgba(0, 0, 0, 0.2)' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <p style={{ color: '#8B949E', fontSize: '14px' }}>
                        © 2024 Provly. Todos os direitos reservados.
                    </p>
                    <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
                        <Link href="/termos" style={{ color: '#8B949E', textDecoration: 'none' }}>
                            Termos
                        </Link>
                        <Link href="/privacidade" style={{ color: '#00D4FF', textDecoration: 'none' }}>
                            Privacidade
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section 
            style={{ 
                background: 'rgba(22, 27, 34, 0.8)',
                border: '1px solid rgba(240, 246, 252, 0.1)',
                borderRadius: '16px',
                padding: '32px',
            }}
        >
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#F0F6FC', marginBottom: '16px' }}>
                {title}
            </h2>
            <div style={{ color: '#C9D1D9', lineHeight: '1.7' }}>
                {children}
            </div>
        </section>
    );
}
