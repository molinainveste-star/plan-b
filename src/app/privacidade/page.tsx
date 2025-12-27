"use client";

import React from "react";
import Link from "next/link";

export default function PrivacidadePage() {
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
              color: "#8B949E",
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
              color: "#00D4FF",
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
          Política de Privacidade
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
            Esta Política de Privacidade (&quot;Política&quot;) descreve como a{" "}
            <strong style={{ color: "#00D4FF" }}>Provly</strong> (&quot;nós&quot;, &quot;nosso&quot;
            ou &quot;Plataforma&quot;) coleta, usa, armazena e protege suas informações
            pessoais quando você utiliza nossos serviços.
          </p>

          <div
            style={{
              background: "rgba(0, 212, 255, 0.1)",
              border: "1px solid rgba(0, 212, 255, 0.3)",
              borderRadius: "8px",
              padding: "1rem 1.25rem",
              marginBottom: "2rem",
            }}
          >
            <p style={{ margin: 0, fontSize: "0.95rem" }}>
              <strong style={{ color: "#00D4FF" }}>Importante:</strong> Ao
              utilizar a Plataforma, você concorda com a coleta e uso de
              informações de acordo com esta Política. Se você não concorda,
              não utilize nossos serviços.
            </p>
          </div>

          <Section number={1} title="Dados Coletados">
            <p>Coletamos os seguintes tipos de informações:</p>

            <h4
              style={{
                color: "#F0F6FC",
                fontSize: "1rem",
                marginTop: "1.25rem",
                marginBottom: "0.5rem",
              }}
            >
              Dados fornecidos por você:
            </h4>
            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>Nome, email e informações de perfil</li>
              <li>Dados de autenticação (via Google OAuth)</li>
              <li>Conteúdo que você cria na Plataforma</li>
              <li>Comunicações com nosso suporte</li>
            </ul>

            <h4
              style={{
                color: "#F0F6FC",
                fontSize: "1rem",
                marginTop: "1.25rem",
                marginBottom: "0.5rem",
              }}
            >
              Dados coletados automaticamente:
            </h4>
            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>Endereço IP e dados de localização aproximada</li>
              <li>Tipo de navegador e dispositivo</li>
              <li>Páginas visitadas e interações na Plataforma</li>
              <li>Cookies e tecnologias similares</li>
            </ul>

            <h4
              style={{
                color: "#F0F6FC",
                fontSize: "1rem",
                marginTop: "1.25rem",
                marginBottom: "0.5rem",
              }}
            >
              Dados de terceiros:
            </h4>
            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>
                Métricas do YouTube (visualizações, inscritos, engajamento)
                mediante sua autorização
              </li>
              <li>Informações de perfil do Google quando você faz login</li>
            </ul>
          </Section>

          <Section number={2} title="Como Usamos seus Dados">
            <p>Utilizamos suas informações para:</p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Fornecer, manter e melhorar nossos serviços</li>
              <li>Gerar seu Media Kit com métricas e narrativas</li>
              <li>Personalizar sua experiência na Plataforma</li>
              <li>Enviar comunicações sobre o serviço</li>
              <li>Prevenir fraudes e garantir segurança</li>
              <li>Cumprir obrigações legais</li>
              <li>Desenvolver novos recursos e funcionalidades</li>
            </ul>
          </Section>

          <Section number={3} title="Compartilhamento de Dados">
            <p>
              Não vendemos suas informações pessoais. Podemos compartilhar dados
              com:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>
                <strong>Provedores de serviço:</strong> empresas que nos ajudam
                a operar (hospedagem, analytics, processamento)
              </li>
              <li>
                <strong>Integrações autorizadas:</strong> quando você conecta
                serviços como YouTube
              </li>
              <li>
                <strong>Páginas públicas:</strong> o conteúdo do seu Media Kit
                compartilhado publicamente será visível para qualquer pessoa
                com o link
              </li>
              <li>
                <strong>Obrigações legais:</strong> quando exigido por lei ou
                autoridades competentes
              </li>
            </ul>
          </Section>

          <Section number={4} title="Integrações com YouTube">
            <p>
              Quando você conecta sua conta do YouTube, acessamos dados através
              da YouTube API Services. Isso inclui:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Estatísticas do canal (inscritos, visualizações)</li>
              <li>Dados de vídeos (títulos, métricas de desempenho)</li>
              <li>Informações básicas do perfil</li>
            </ul>
            <p style={{ marginTop: "1rem" }}>
              Você pode revogar este acesso a qualquer momento nas{" "}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#00D4FF" }}
              >
                configurações de segurança do Google
              </a>
              . Consulte também a{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#00D4FF" }}
              >
                Política de Privacidade do Google
              </a>
              .
            </p>
          </Section>

          <Section number={5} title="Armazenamento e Segurança">
            <p>
              Seus dados são armazenados em servidores seguros com criptografia.
              Implementamos medidas técnicas e organizacionais para proteger
              suas informações, incluindo:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Criptografia em trânsito (HTTPS/TLS)</li>
              <li>Criptografia em repouso</li>
              <li>Controles de acesso restritos</li>
              <li>Monitoramento de segurança</li>
            </ul>
            <p style={{ marginTop: "1rem" }}>
              Retemos seus dados enquanto sua conta estiver ativa ou conforme
              necessário para cumprir obrigações legais.
            </p>
          </Section>

          <Section number={6} title="Seus Direitos (LGPD)">
            <p>
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem
              direito a:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>
                <strong>Acesso:</strong> saber quais dados temos sobre você
              </li>
              <li>
                <strong>Correção:</strong> corrigir dados incompletos ou
                incorretos
              </li>
              <li>
                <strong>Exclusão:</strong> solicitar a exclusão de seus dados
              </li>
              <li>
                <strong>Portabilidade:</strong> receber seus dados em formato
                estruturado
              </li>
              <li>
                <strong>Revogação:</strong> retirar consentimento a qualquer
                momento
              </li>
              <li>
                <strong>Oposição:</strong> opor-se a determinados tratamentos
              </li>
            </ul>
            <p style={{ marginTop: "1rem" }}>
              Para exercer esses direitos, entre em contato pelo email abaixo.
            </p>
          </Section>

          <Section number={7} title="Cookies">
            <p>Utilizamos cookies e tecnologias similares para:</p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Manter você autenticado</li>
              <li>Lembrar suas preferências</li>
              <li>Analisar uso da Plataforma</li>
              <li>Melhorar nossos serviços</li>
            </ul>
            <p style={{ marginTop: "1rem" }}>
              Você pode gerenciar cookies nas configurações do seu navegador.
              Note que desabilitar cookies pode afetar funcionalidades da
              Plataforma.
            </p>
          </Section>

          <Section number={8} title="Menores de Idade">
            <p>
              A Plataforma não é destinada a menores de 18 anos. Não coletamos
              intencionalmente dados de menores. Se tomarmos conhecimento de tal
              coleta, excluiremos as informações imediatamente.
            </p>
          </Section>

          <Section number={9} title="Alterações nesta Política">
            <p>
              Podemos atualizar esta Política periodicamente. Notificaremos
              sobre alterações significativas por email ou aviso na Plataforma.
              O uso continuado após alterações constitui aceitação da nova
              Política.
            </p>
          </Section>

          <Section number={10} title="Contato">
            <p>
              Para questões sobre privacidade ou exercer seus direitos, entre em
              contato:
            </p>
            <div
              style={{
                marginTop: "1rem",
                background: "rgba(124, 58, 237, 0.1)",
                border: "1px solid rgba(124, 58, 237, 0.3)",
                borderRadius: "8px",
                padding: "1rem 1.25rem",
              }}
            >
              <p style={{ margin: 0 }}>
                <strong style={{ color: "#7C3AED" }}>
                  Encarregado de Proteção de Dados (DPO)
                </strong>
              </p>
              <p style={{ margin: "0.5rem 0 0" }}>
                Email:{" "}
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
        <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center", gap: "2rem" }}>
          <Link href="/termos" style={{ color: "#8B949E", textDecoration: "none" }}>
            Termos de Uso
          </Link>
          <Link href="/privacidade" style={{ color: "#8B949E", textDecoration: "none" }}>
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
