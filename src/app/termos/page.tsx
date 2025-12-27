import Link from "next/link";

export const metadata = {
    title: "Termos de Serviço | Provly",
    description: "Termos de Serviço da plataforma Provly",
};

export default function TermosPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-white">
                        Provly
                    </Link>
                    <nav className="flex gap-6 text-sm">
                        <Link href="/privacidade" className="text-gray-400 hover:text-white transition">
                            Privacidade
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Content */}
            <article className="max-w-4xl mx-auto px-6 py-16">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Termos de Serviço</h1>
                    <p className="text-gray-400">Última atualização: 27 de Dezembro de 2024</p>
                </div>

                <div className="prose prose-invert prose-lg max-w-none space-y-8">
                    
                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Aceitação dos Termos</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Ao acessar e usar a plataforma Provly (&quot;Serviço&quot;), você concorda em cumprir e estar vinculado 
                            a estes Termos de Serviço. Se você não concordar com qualquer parte destes termos, não poderá 
                            acessar o Serviço.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Descrição do Serviço</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            O Provly é uma plataforma de Media Kit digital que permite a criadores de conteúdo:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>Criar portfólios profissionais para apresentação a marcas e anunciantes</li>
                            <li>Conectar contas de redes sociais (YouTube, TikTok, Instagram, LinkedIn) para exibição de métricas</li>
                            <li>Gerar relatórios de desempenho e engajamento</li>
                            <li>Compartilhar seu Media Kit através de um link público personalizado</li>
                        </ul>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Conta do Usuário</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Para utilizar determinadas funcionalidades do Serviço, você deve criar uma conta. Ao criar uma conta, você concorda em:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>Fornecer informações verdadeiras, precisas e completas</li>
                            <li>Manter a segurança de sua senha e conta</li>
                            <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
                            <li>Ser responsável por todas as atividades realizadas em sua conta</li>
                        </ul>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Integrações com Terceiros</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            O Serviço permite integração com plataformas de terceiros, incluindo mas não limitado a:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                            <li><strong>YouTube</strong> - Google LLC</li>
                            <li><strong>TikTok</strong> - ByteDance Ltd.</li>
                            <li><strong>Instagram/Facebook</strong> - Meta Platforms, Inc.</li>
                            <li><strong>LinkedIn</strong> - Microsoft Corporation</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed">
                            Ao conectar suas contas dessas plataformas, você autoriza o Provly a acessar dados públicos 
                            e métricas de acordo com as permissões concedidas. O uso dessas integrações está sujeito 
                            aos termos de serviço de cada plataforma.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Uso Aceitável</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">Você concorda em não usar o Serviço para:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>Violar qualquer lei ou regulamento aplicável</li>
                            <li>Infringir direitos de propriedade intelectual de terceiros</li>
                            <li>Transmitir conteúdo ilegal, ofensivo ou prejudicial</li>
                            <li>Tentar acessar sistemas ou dados sem autorização</li>
                            <li>Falsificar métricas ou informações de perfil</li>
                            <li>Usar automação não autorizada ou bots</li>
                        </ul>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Propriedade Intelectual</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            O Serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade 
                            exclusiva do Provly e seus licenciadores. O Serviço é protegido por direitos autorais, marcas 
                            registradas e outras leis.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            Você mantém todos os direitos sobre o conteúdo que você cria e compartilha através do Serviço.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Limitação de Responsabilidade</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            O Serviço é fornecido &quot;como está&quot; e &quot;conforme disponível&quot;, sem garantias de qualquer tipo. 
                            Em nenhuma circunstância o Provly será responsável por:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>Danos indiretos, incidentais ou consequenciais</li>
                            <li>Perda de dados ou lucros</li>
                            <li>Interrupções ou indisponibilidade do serviço</li>
                            <li>Ações de terceiros ou plataformas integradas</li>
                        </ul>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">8. Rescisão</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Podemos encerrar ou suspender sua conta imediatamente, sem aviso prévio, por qualquer motivo, 
                            incluindo violação destes Termos. Você pode encerrar sua conta a qualquer momento entrando 
                            em contato conosco. Após o encerramento, seu direito de usar o Serviço cessará imediatamente.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">9. Alterações nos Termos</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas 
                            serão notificadas por e-mail ou através do Serviço. O uso continuado após tais alterações 
                            constitui aceitação dos novos termos.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">10. Lei Aplicável</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Estes Termos serão regidos e interpretados de acordo com as leis da República Federativa do Brasil, 
                            sem consideração a conflitos de disposições legais. Qualquer disputa será resolvida nos tribunais 
                            competentes do Brasil.
                        </p>
                    </section>

                    <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-semibold text-white mb-4">11. Contato</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Se você tiver dúvidas sobre estes Termos de Serviço, entre em contato conosco:
                        </p>
                        <p className="text-white font-medium mt-4">
                            📧 contato@provly.io
                        </p>
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

