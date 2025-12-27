"use client";

import React from "react";
import Link from "next/link";

export default function TermosPage() {
  const lastUpdate = "27 de dezembro de 2025";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0A0E14 0%, #0D1117 100%)",
        color: "#F0F6FC",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "1.5rem 2rem",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            Provly
          </span>
        </Link>
        <nav style={{ display: "flex", gap: "2rem" }}>
          <Link
            href="/termos"
            style={{
              color: "#00D4FF",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            Termos de Uso
          </Link>
          <Link
            href="/privacidade"
            style={{
              color: "#8B949E",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            Privacidade
          </Link>
        </nav>
      </header>

      {/* Content */}
      <main
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "3rem 2rem 4rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            marginBottom: "0.5rem",
            background: "linear-gradient(135deg, #F0F6FC 0%, #C9D1D9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Termos e Condições de Uso
        </h1>

        <p
          style={{
            color: "#8B949E",
            marginBottom: "3rem",
            fontSize: "0.95rem",
          }}
        >
          Última atualização: {lastUpdate}
        </p>

        <div
          style={{
            color: "#C9D1D9",
            lineHeight: 1.8,
            fontSize: "1rem",
          }}
        >
          <p style={{ marginBottom: "1.5rem" }}>
            Estes Termos e Condições de Uso (&quot;Termos&quot;) regulam o acesso e uso da
            plataforma <strong style={{ color: "#00D4FF" }}>Provly</strong>{" "}
            (&quot;Plataforma&quot;), desenvolvida e operada por Provly Tecnologia LTDA
            (&quot;Provly&quot;, &quot;nós&quot; ou &quot;nosso&quot;). Ao acessar ou utilizar nossos
            serviços, você concorda com estes Termos.
          </p>

          <Section number={1} title="Aceite dos Termos">
            <p>
              Ao acessar a Plataforma, você declara ter lido, compreendido e
              concordado com estes Termos. Se você não concordar com qualquer
              disposição, não utilize nossos serviços.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Reservamo-nos o direito de modificar estes Termos a qualquer
              momento. Alterações materiais serão notificadas com antecedência
              mínima de <strong>30 (trinta) dias</strong> por email ou aviso na
              Plataforma. Alterações menores ou correções podem entrar em vigor
              imediatamente após publicação. O uso continuado após o prazo de
              notificação constitui aceitação das mudanças.
            </p>
          </Section>

          <Section number={2} title="Descrição do Serviço">
            <p>
              O Provly é uma plataforma que permite a criadores de conteúdo:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Gerar Media Kits profissionais automatizados</li>
              <li>Integrar métricas de plataformas como YouTube</li>
              <li>Criar narrativas assistidas por Inteligência Artificial</li>
              <li>Exportar documentos em formato PDF</li>
              <li>Compartilhar páginas públicas com marcas e parceiros</li>
            </ul>
          </Section>

          <Section number={3} title="Capacidade e Idade Mínima">
            <p>
              A Plataforma é destinada a usuários maiores de{" "}
              <strong>18 (dezoito) anos</strong>. Menores de 18 anos somente
              poderão utilizar os serviços com consentimento e supervisão de
              seus responsáveis legais, conforme previsto na Lei Geral de
              Proteção de Dados (LGPD).
            </p>
            <p style={{ marginTop: "1rem" }}>
              Não coletamos intencionalmente dados de menores de 13 anos. Se
              tomarmos conhecimento de tal coleta, excluiremos as informações
              imediatamente.
            </p>
          </Section>

          <Section number={4} title="Cadastro e Conta">
            <p>
              Para utilizar determinadas funcionalidades, você deverá criar uma
              conta fornecendo informações verdadeiras, completas e atualizadas.
              Você é responsável por:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Manter a confidencialidade de suas credenciais</li>
              <li>Todas as atividades realizadas em sua conta</li>
              <li>Notificar imediatamente qualquer uso não autorizado</li>
            </ul>
          </Section>

          <Section number={5} title="Uso Permitido">
            <p>
              Você concorda em utilizar a Plataforma apenas para fins lícitos e
              de acordo com estes Termos. É proibido:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Violar leis ou regulamentos aplicáveis</li>
              <li>Infringir direitos de propriedade intelectual de terceiros</li>
              <li>Transmitir conteúdo ilegal, difamatório ou prejudicial</li>
              <li>Tentar acessar sistemas não autorizados</li>
              <li>Usar automação não autorizada ou sobrecarregar servidores</li>
              <li>Revender ou sublicenciar o acesso à Plataforma</li>
            </ul>
          </Section>

          <Section number={6} title="Uso de Inteligência Artificial">
            <p>
              A Plataforma utiliza tecnologias de Inteligência Artificial para:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Gerar narrativas e textos para Media Kits</li>
              <li>Analisar métricas e sugerir insights</li>
              <li>Identificar nichos de mercado e posicionamento</li>
              <li>Criar conteúdo personalizado automaticamente</li>
            </ul>
            <p style={{ marginTop: "1rem" }}>
              Conforme o Art. 20 da LGPD, você tem o direito de solicitar{" "}
              <strong>revisão humana</strong> de decisões tomadas exclusivamente
              com base em tratamento automatizado que afetem seus interesses.
              Para exercer esse direito, entre em contato conosco pelo email
              indicado ao final destes Termos.
            </p>
          </Section>

          <Section number={7} title="Propriedade Intelectual">
            <p>
              Todo o conteúdo da Plataforma, incluindo mas não limitado a
              logotipos, design, textos, gráficos, software e código-fonte, são
              de propriedade exclusiva do Provly ou de seus licenciadores,
              protegidos por leis de propriedade intelectual.
            </p>
            <p style={{ marginTop: "1rem" }}>
              O conteúdo que você criar e enviar à Plataforma permanece de sua
              propriedade. Ao utilizá-lo em nossos serviços, você nos concede
              uma licença limitada, não exclusiva e revogável para processá-lo
              conforme necessário para prestação do serviço.
            </p>
          </Section>

          <Section number={8} title="Privacidade e Proteção de Dados">
            <p>
              O tratamento de seus dados pessoais é regido por nossa{" "}
              <Link href="/privacidade" style={{ color: "#00D4FF" }}>
                Política de Privacidade
              </Link>
              , que integra estes Termos. Ao utilizar a Plataforma, você também
              concorda com nossa Política de Privacidade.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Estamos comprometidos com a conformidade à Lei Geral de Proteção
              de Dados (LGPD) e, quando aplicável, ao Regulamento Geral de
              Proteção de Dados da União Europeia (GDPR).
            </p>
          </Section>

          <Section number={9} title="Integrações com Terceiros">
            <p>
              A Plataforma pode integrar-se a serviços de terceiros (como
              YouTube, Google). O uso dessas integrações está sujeito aos termos
              de serviço de cada plataforma. Não somos responsáveis por
              alterações, indisponibilidade ou políticas desses serviços.
            </p>
          </Section>

          <Section number={10} title="Isenção de Garantias e Limitação de Responsabilidade">
            <p>
              A Plataforma é fornecida &quot;como está&quot; e &quot;conforme disponível&quot;,
              sem garantias de qualquer tipo, expressas ou implícitas,
              incluindo, mas não limitado a, garantias de comercialização,
              adequação a um propósito específico ou não violação.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Na máxima extensão permitida por lei, o Provly não se
              responsabiliza por:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Danos indiretos, incidentais ou consequentes</li>
              <li>Perda de dados, lucros ou oportunidades de negócio</li>
              <li>Interrupções ou erros no serviço</li>
              <li>Ações de terceiros ou conteúdo de usuários</li>
              <li>
                Decisões tomadas com base nas informações geradas pela
                Plataforma
              </li>
            </ul>
          </Section>

          <Section number={11} title="Indenização">
            <p>
              Você concorda em indenizar e isentar o Provly, seus diretores,
              funcionários, parceiros e afiliados de quaisquer reclamações,
              perdas, danos, custos e despesas (incluindo honorários
              advocatícios razoáveis) decorrentes de:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Sua violação destes Termos</li>
              <li>Uso indevido da Plataforma</li>
              <li>
                Violação de direitos de terceiros por conteúdo que você criar ou
                enviar
              </li>
              <li>Qualquer atividade ilegal realizada através de sua conta</li>
            </ul>
          </Section>

          <Section number={12} title="Cancelamento e Suspensão">
            <h4
              style={{
                color: "#F0F6FC",
                fontSize: "1rem",
                marginBottom: "0.75rem",
              }}
            >
              Cancelamento pelo Usuário
            </h4>
            <p>
              Você pode cancelar sua conta a qualquer momento através das
              configurações da Plataforma ou solicitando via email. Não há
              multas ou penalidades por cancelamento.
            </p>

            <h4
              style={{
                color: "#F0F6FC",
                fontSize: "1rem",
                marginTop: "1.25rem",
                marginBottom: "0.75rem",
              }}
            >
              Suspensão ou Encerramento pelo Provly
            </h4>
            <p>
              Reservamo-nos o direito de suspender temporariamente ou encerrar
              definitivamente contas que:
            </p>
            <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
              <li>Violem estes Termos de forma grave ou reiterada</li>
              <li>Pratiquem fraude ou uso abusivo</li>
              <li>Permaneçam inativas por mais de 12 (doze) meses</li>
            </ul>
            <p style={{ marginTop: "1rem" }}>
              Sempre que possível, notificaremos com 7 (sete) dias de
              antecedência, exceto em casos de violação grave que exijam ação
              imediata.
            </p>
          </Section>

          <Section number={13} title="Retenção de Dados após Cancelamento">
            <p>
              Após o cancelamento de sua conta, seus dados serão mantidos por
              até <strong>30 (trinta) dias</strong> para fins de backup e
              recuperação a seu pedido.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Após este prazo, seus dados serão anonimizados ou excluídos,
              exceto quando a retenção for necessária para:
            </p>
            <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
              <li>Cumprimento de obrigação legal ou regulatória</li>
              <li>Defesa em processos judiciais ou administrativos</li>
              <li>Exercício regular de direitos</li>
            </ul>
          </Section>

          <Section number={14} title="Força Maior">
            <p>
              O Provly não será responsável por falhas ou atrasos no cumprimento
              de suas obrigações quando decorrentes de eventos fora de seu
              controle razoável, incluindo, mas não limitado a:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Desastres naturais</li>
              <li>Guerras, conflitos armados ou atos de terrorismo</li>
              <li>Epidemias ou pandemias</li>
              <li>Falhas de infraestrutura de terceiros</li>
              <li>Atos governamentais ou alterações legislativas</li>
              <li>Interrupções de energia ou telecomunicações</li>
            </ul>
          </Section>

          <Section number={15} title="Comunicações">
            <p>
              Ao criar uma conta, você concorda em receber comunicações
              eletrônicas do Provly relacionadas ao serviço, incluindo:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Notificações sobre sua conta e serviços</li>
              <li>Alertas de segurança</li>
              <li>Atualizações de Termos e Políticas</li>
            </ul>
            <p style={{ marginTop: "1rem" }}>
              Você pode optar por não receber comunicações de marketing a
              qualquer momento através das configurações da Plataforma ou
              clicando em &quot;cancelar inscrição&quot; nos emails recebidos.
            </p>
          </Section>

          <Section number={16} title="Disposições Gerais">
            <p>
              Estes Termos são regidos pelas leis da República Federativa do
              Brasil. Qualquer disputa será resolvida no foro da Comarca de São
              Paulo, Estado de São Paulo, com exclusão de qualquer outro, por
              mais privilegiado que seja.
            </p>
            <p style={{ marginTop: "1rem" }}>
              A invalidade ou inexequibilidade de qualquer disposição não
              afetará a validade das demais, que permanecerão em pleno vigor. A
              omissão do Provly em exercer qualquer direito ou faculdade não
              constitui renúncia a tal direito.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Estes Termos, juntamente com a Política de Privacidade,
              constituem o acordo integral entre você e o Provly em relação ao
              uso da Plataforma.
            </p>
          </Section>

          <Section number={17} title="Contato">
            <p>Para dúvidas sobre estes Termos, entre em contato:</p>
            <div
              style={{
                marginTop: "1rem",
                background: "rgba(124, 58, 237, 0.1)",
                border: "1px solid rgba(124, 58, 237, 0.3)",
                borderRadius: "8px",
                padding: "1.25rem",
              }}
            >
              <p style={{ margin: 0, fontWeight: 600, color: "#F0F6FC" }}>
                Provly Tecnologia LTDA
              </p>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.9rem" }}>
                CNPJ: XX.XXX.XXX/0001-XX
              </p>
              <p style={{ margin: "0.75rem 0 0" }}>
                <strong style={{ color: "#00D4FF" }}>Email:</strong>{" "}
                <a href="mailto:contato@provly.io" style={{ color: "#00D4FF" }}>
                  contato@provly.io
                </a>
              </p>
            </div>
          </Section>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: "2rem",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          color: "#8B949E",
          fontSize: "0.875rem",
        }}
      >
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <Link
            href="/termos"
            style={{ color: "#8B949E", textDecoration: "none" }}
          >
            Termos de Uso
          </Link>
          <Link
            href="/privacidade"
            style={{ color: "#8B949E", textDecoration: "none" }}
          >
            Privacidade
          </Link>
        </div>
        © 2025 Provly. Todos os direitos reservados.
      </footer>
    </div>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "#F0F6FC",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <span
          style={{
            background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {number}.
        </span>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
