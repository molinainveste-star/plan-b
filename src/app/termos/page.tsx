import Link from "next/link";

export const metadata = {
    title: "Termos de Serviço | Provly",
    description: "Termos de Serviço da plataforma Provly",
};

export default function TermosPage() {
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
                        <Link href="/privacidade" style={{ color: '#8B949E', textDecoration: 'none' }}>
                            Privacidade
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Content */}
            <article style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 24px' }}>
                <div style={{ marginBottom: '48px' }}>
                    <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#F0F6FC', marginBottom: '16px' }}>
                        Termos de Serviço
                    </h1>
                    <p style={{ color: '#8B949E' }}>Última atualização: 27 de dezembro de 2024</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    <Section title="1. Aceitação dos Termos">
                        <p>
                            Ao acessar e usar a plataforma Provly (&ldquo;Serviço&rdquo;), você concorda em cumprir e estar vinculado 
                            a estes Termos de Serviço. Se você não concordar com qualquer parte destes termos, não poderá 
                            acessar o Serviço.
                        </p>
                    </Section>

                    <Section title="2. Descrição do Serviço">
                        <p style={{ marginBottom: '16px' }}>
                            O Provly é uma plataforma de Media Kit digital que permite a criadores de conteúdo:
                        </p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Criar portfólios profissionais para apresentação a marcas e anunciantes</li>
                            <li>Conectar contas de redes sociais (YouTube, TikTok, Instagram, LinkedIn) para exibição de métricas</li>
                            <li>Gerar relatórios de desempenho e engajamento</li>
                            <li>Compartilhar seu Media Kit através de um link público personalizado</li>
                        </ul>
                    </Section>

                    <Section title="3. Conta do Usuário">
                        <p style={{ marginBottom: '16px' }}>
                            Para utilizar determinadas funcionalidades do Serviço, você deve criar uma conta. Ao criar uma conta, você concorda em:
                        </p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Fornecer informações verdadeiras, precisas e completas</li>
                            <li>Manter a segurança de sua senha e conta</li>
                            <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
                            <li>Ser responsável por todas as atividades realizadas em sua conta</li>
                        </ul>
                    </Section>

                    <Section title="4. Integrações com Terceiros">
                        <p style={{ marginBottom: '16px' }}>
                            O Serviço permite integração com plataformas de terceiros, incluindo mas não limitado a:
                        </p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                            <li><strong style={{ color: '#F0F6FC' }}>YouTube</strong> - Google LLC</li>
                            <li><strong style={{ color: '#F0F6FC' }}>TikTok</strong> - ByteDance Ltd.</li>
                            <li><strong style={{ color: '#F0F6FC' }}>Instagram/Facebook</strong> - Meta Platforms, Inc.</li>
                            <li><strong style={{ color: '#F0F6FC' }}>LinkedIn</strong> - Microsoft Corporation</li>
                        </ul>
                        <p>
                            Ao conectar suas contas dessas plataformas, você autoriza o Provly a acessar dados públicos 
                            e métricas de acordo com as permissões concedidas. O uso dessas integrações está sujeito 
                            aos termos de serviço de cada plataforma.
                        </p>
                    </Section>

                    <Section title="5. Uso Aceitável">
                        <p style={{ marginBottom: '16px' }}>Você concorda em não usar o Serviço para:</p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Violar qualquer lei ou regulamento aplicável</li>
                            <li>Infringir direitos de propriedade intelectual de terceiros</li>
                            <li>Transmitir conteúdo ilegal, ofensivo ou prejudicial</li>
                            <li>Tentar acessar sistemas ou dados sem autorização</li>
                            <li>Falsificar métricas ou informações de perfil</li>
                            <li>Usar automação não autorizada ou bots</li>
                        </ul>
                    </Section>

                    <Section title="6. Propriedade Intelectual">
                        <p style={{ marginBottom: '16px' }}>
                            O Serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade 
                            exclusiva do Provly e seus licenciadores. O Serviço é protegido por direitos autorais, marcas 
                            registradas e outras leis.
                        </p>
                        <p>
                            Você mantém todos os direitos sobre o conteúdo que você cria e compartilha através do Serviço.
                        </p>
                    </Section>

                    <Section title="7. Limitação de Responsabilidade">
                        <p style={{ marginBottom: '16px' }}>
                            O Serviço é fornecido &ldquo;como está&rdquo; e &ldquo;conforme disponível&rdquo;, sem garantias de qualquer tipo. 
                            Em nenhuma circunstância o Provly será responsável por:
                        </p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Danos indiretos, incidentais ou consequenciais</li>
                            <li>Perda de dados ou lucros</li>
                            <li>Interrupções ou indisponibilidade do serviço</li>
                            <li>Ações de terceiros ou plataformas integradas</li>
                        </ul>
                    </Section>

                    <Section title="8. Rescisão">
                        <p>
                            Podemos encerrar ou suspender sua conta imediatamente, sem aviso prévio, por qualquer motivo, 
                            incluindo violação destes Termos. Você pode encerrar sua conta a qualquer momento entrando 
                            em contato conosco. Após o encerramento, seu direito de usar o Serviço cessará imediatamente.
                        </p>
                    </Section>

                    <Section title="9. Alterações nos Termos">
                        <p>
                            Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas 
                            serão notificadas por e-mail ou através do Serviço. O uso continuado após tais alterações 
                            constitui aceitação dos novos termos.
                        </p>
                    </Section>

                    <Section title="10. Lei Aplicável">
                        <p>
                            Estes Termos serão regidos e interpretados de acordo com as leis da República Federativa do Brasil, 
                            em conformidade com o Marco Civil da Internet (Lei nº 12.965/2014) e a Lei Geral de Proteção de Dados 
                            (Lei nº 13.709/2018 - LGPD). Qualquer disputa será resolvida nos tribunais competentes do Brasil.
                        </p>
                    </Section>

                    <Section title="11. Contato">
                        <p>
                            Se você tiver dúvidas sobre estes Termos de Serviço, entre em contato conosco:
                        </p>
                        <p style={{ color: '#00D4FF', fontWeight: '500', marginTop: '16px' }}>
                            📧 contato@provly.io
                        </p>
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
                        <Link href="/termos" style={{ color: '#00D4FF', textDecoration: 'none' }}>
                            Termos
                        </Link>
                        <Link href="/privacidade" style={{ color: '#8B949E', textDecoration: 'none' }}>
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
            className="glass-panel"
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
