"use client";

import React from "react";
import Link from "next/link";

export default function TermosPage() {
  const lastUpdate = "27 de dezembro de 2024";

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
              momento. Alterações entrarão em vigor imediatamente após sua
              publicação na Plataforma. O uso continuado após modificações
              constitui aceitação das mudanças.
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

          <Section number={3} title="Cadastro e Conta">
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

          <Section number={4} title="Uso Permitido">
            <p>Você concorda em utilizar a Plataforma apenas para fins lícitos e de acordo com estes Termos. É proibido:</p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Violar leis ou regulamentos aplicáveis</li>
              <li>Infringir direitos de propriedade intelectual de terceiros</li>
              <li>Transmitir conteúdo ilegal, difamatório ou prejudicial</li>
              <li>Tentar acessar sistemas não autorizados</li>
              <li>Usar automação não autorizada ou sobrecarregar servidores</li>
              <li>Revender ou sublicenciar o acesso à Plataforma</li>
            </ul>
          </Section>

          <Section number={5} title="Propriedade Intelectual">
            <p>
              Todo o conteúdo da Plataforma, incluindo mas não limitado a
              logotipos, design, textos, gráficos, software e código-fonte, são
              de propriedade exclusiva do Provly ou de seus licenciadores,
              protegidos por leis de propriedade intelectual.
            </p>
            <p style={{ marginTop: "1rem" }}>
              O conteúdo que você criar e enviar à Plataforma permanece de sua
              propriedade. Ao utilizá-lo em nossos serviços, você nos concede
              uma licença limitada para processá-lo conforme necessário para
              prestação do serviço.
            </p>
          </Section>

          <Section number={6} title="Integrações com Terceiros">
            <p>
              A Plataforma pode integrar-se a serviços de terceiros (como
              YouTube, Google). O uso dessas integrações está sujeito aos termos
              de serviço de cada plataforma. Não somos responsáveis por
              alterações, indisponibilidade ou políticas desses serviços.
            </p>
          </Section>

          <Section number={7} title="Limitação de Responsabilidade">
            <p>
              A Plataforma é fornecida &quot;como está&quot;. Na máxima extensão permitida
              por lei, o Provly não se responsabiliza por:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Danos indiretos, incidentais ou consequentes</li>
              <li>Perda de dados, lucros ou oportunidades de negócio</li>
              <li>Interrupções ou erros no serviço</li>
              <li>Ações de terceiros ou conteúdo de usuários</li>
            </ul>
          </Section>

          <Section number={8} title="Cancelamento">
            <p>
              Você pode cancelar sua conta a qualquer momento através das
              configurações da Plataforma. Reservamo-nos o direito de suspender
              ou encerrar contas que violem estes Termos, sem aviso prévio.
            </p>
          </Section>

          <Section number={9} title="Disposições Gerais">
            <p>
              Estes Termos são regidos pelas leis da República Federativa do
              Brasil. Qualquer disputa será resolvida no foro da Comarca de São
              Paulo, SP, com exclusão de qualquer outro.
            </p>
            <p style={{ marginTop: "1rem" }}>
              A invalidade de qualquer disposição não afetará a validade das
              demais. A omissão em exercer qualquer direito não constitui
              renúncia.
            </p>
          </Section>

          <Section number={10} title="Contato">
            <p>
              Para dúvidas sobre estes Termos, entre em contato:
            </p>
            <p style={{ marginTop: "1rem" }}>
              <strong style={{ color: "#00D4FF" }}>Email:</strong>{" "}
              contato@provly.io
            </p>
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
