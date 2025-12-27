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
            <strong style={{ color: "#00D4FF" }}>Provly</strong> (&quot;nós&quot;,
            &quot;nosso&quot; ou &quot;Plataforma&quot;) coleta, usa, armazena e protege suas
            informações pessoais quando você utiliza nossos serviços.
          </p>

          {/* Controlador de Dados */}
          <div
            style={{
              background: "rgba(124, 58, 237, 0.1)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              borderRadius: "8px",
              padding: "1rem 1.25rem",
              marginBottom: "2rem",
            }}
          >
            <p style={{ margin: 0, fontWeight: 600, color: "#F0F6FC" }}>
              Controlador de Dados
            </p>
            <p style={{ margin: "0.5rem 0 0", fontSize: "0.95rem" }}>
              <strong>Provly Tecnologia LTDA</strong>
              <br />
              CNPJ: XX.XXX.XXX/0001-XX
              <br />
              Email:{" "}
              <a href="mailto:contato@provly.io" style={{ color: "#00D4FF" }}>
                contato@provly.io
              </a>
            </p>
          </div>

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
              informações de acordo com esta Política e nossos{" "}
              <Link href="/termos" style={{ color: "#00D4FF" }}>
                Termos de Uso
              </Link>
              . Se você não concorda, não utilize nossos serviços.
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
              <li>Conteúdo que você cria na Plataforma (textos, imagens)</li>
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
                mediante sua autorização explícita
              </li>
              <li>Informações de perfil do Google quando você faz login</li>
            </ul>
          </Section>

          <Section number={2} title="Base Legal para Tratamento">
            <p>
              Tratamos seus dados pessoais com base nas seguintes hipóteses
              legais previstas no Art. 7 da LGPD:
            </p>

            <div style={{ marginTop: "1rem", overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9rem",
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <th
                      style={{
                        textAlign: "left",
                        padding: "0.75rem",
                        color: "#F0F6FC",
                      }}
                    >
                      Finalidade
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "0.75rem",
                        color: "#F0F6FC",
                      }}
                    >
                      Base Legal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>
                      Prestação do serviço e geração de Media Kit
                    </td>
                    <td style={{ padding: "0.75rem", color: "#00D4FF" }}>
                      Execução de contrato (Art. 7, V)
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>
                      Integração com YouTube
                    </td>
                    <td style={{ padding: "0.75rem", color: "#00D4FF" }}>
                      Consentimento (Art. 7, I)
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>
                      Comunicações sobre o serviço
                    </td>
                    <td style={{ padding: "0.75rem", color: "#00D4FF" }}>
                      Legítimo interesse (Art. 7, IX)
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>
                      Segurança e prevenção de fraudes
                    </td>
                    <td style={{ padding: "0.75rem", color: "#00D4FF" }}>
                      Legítimo interesse (Art. 7, IX)
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>Analytics e melhorias</td>
                    <td style={{ padding: "0.75rem", color: "#00D4FF" }}>
                      Legítimo interesse (Art. 7, IX)
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>
                      Marketing (quando aplicável)
                    </td>
                    <td style={{ padding: "0.75rem", color: "#00D4FF" }}>
                      Consentimento (Art. 7, I)
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.75rem" }}>Obrigações legais</td>
                    <td style={{ padding: "0.75rem", color: "#00D4FF" }}>
                      Cumprimento de obrigação legal (Art. 7, II)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section number={3} title="Como Usamos seus Dados">
            <p>Utilizamos suas informações para:</p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Fornecer, manter e melhorar nossos serviços</li>
              <li>Gerar seu Media Kit com métricas e narrativas personalizadas</li>
              <li>Processar dados via Inteligência Artificial para geração de conteúdo</li>
              <li>Personalizar sua experiência na Plataforma</li>
              <li>Enviar comunicações sobre o serviço</li>
              <li>Prevenir fraudes e garantir segurança</li>
              <li>Cumprir obrigações legais e regulatórias</li>
              <li>Desenvolver novos recursos e funcionalidades</li>
            </ul>
          </Section>

          <Section number={4} title="Processamento por Inteligência Artificial">
            <p>
              A Plataforma utiliza sistemas de Inteligência Artificial para
              aprimorar nossos serviços. Especificamente, usamos IA para:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Gerar narrativas e textos personalizados para seu Media Kit</li>
              <li>Analisar métricas e identificar insights sobre seu canal</li>
              <li>Classificar seu nicho de mercado automaticamente</li>
              <li>Sugerir melhorias e estratégias baseadas em dados</li>
            </ul>

            <div
              style={{
                background: "rgba(0, 212, 255, 0.1)",
                border: "1px solid rgba(0, 212, 255, 0.3)",
                borderRadius: "8px",
                padding: "1rem 1.25rem",
                marginTop: "1.25rem",
              }}
            >
              <p style={{ margin: 0, fontWeight: 600, color: "#00D4FF" }}>
                Seus Direitos sobre Decisões Automatizadas (Art. 20, LGPD)
              </p>
              <p style={{ margin: "0.5rem 0 0", fontSize: "0.95rem" }}>
                Você pode solicitar:
              </p>
              <ul
                style={{
                  margin: "0.5rem 0 0",
                  paddingLeft: "1.5rem",
                  fontSize: "0.95rem",
                }}
              >
                <li>
                  Informações claras sobre os critérios e lógica utilizados
                  nas decisões automatizadas
                </li>
                <li>
                  Revisão humana de decisões que afetem significativamente
                  seus interesses
                </li>
              </ul>
            </div>
          </Section>

          <Section number={5} title="Compartilhamento de Dados">
            <p>
              <strong>Não vendemos suas informações pessoais.</strong> Podemos
              compartilhar dados com:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>
                <strong>Provedores de serviço (operadores):</strong> empresas
                que nos ajudam a operar, incluindo hospedagem, analytics,
                processamento de IA e infraestrutura. Estes provedores estão
                vinculados por contratos que garantem a proteção de seus dados.
              </li>
              <li>
                <strong>Integrações autorizadas:</strong> quando você conecta
                serviços como YouTube, mediante seu consentimento expresso.
              </li>
              <li>
                <strong>Páginas públicas:</strong> o conteúdo do seu Media Kit
                compartilhado publicamente será visível para qualquer pessoa
                com o link.
              </li>
              <li>
                <strong>Obrigações legais:</strong> quando exigido por lei,
                ordem judicial ou autoridades competentes.
              </li>
              <li>
                <strong>Proteção de direitos:</strong> para proteger nossos
                direitos, propriedade ou segurança, e de nossos usuários.
              </li>
            </ul>
          </Section>

          <Section number={6} title="Transferência Internacional de Dados">
            <p>
              Para prestação dos serviços, seus dados podem ser transferidos e
              processados em servidores localizados fora do Brasil, incluindo
              Estados Unidos e Europa.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Essas transferências são realizadas com base em:
            </p>
            <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
              <li>
                Cláusulas contratuais padrão aprovadas por autoridades de
                proteção de dados
              </li>
              <li>
                Países ou organizações com nível adequado de proteção de dados
              </li>
              <li>Seu consentimento específico, quando aplicável</li>
            </ul>

            <h4
              style={{
                color: "#F0F6FC",
                fontSize: "1rem",
                marginTop: "1.25rem",
                marginBottom: "0.5rem",
              }}
            >
              Principais provedores internacionais:
            </h4>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9rem",
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <th
                      style={{
                        textAlign: "left",
                        padding: "0.75rem",
                        color: "#F0F6FC",
                      }}
                    >
                      Provedor
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "0.75rem",
                        color: "#F0F6FC",
                      }}
                    >
                      Localização
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "0.75rem",
                        color: "#F0F6FC",
                      }}
                    >
                      Finalidade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>Google / YouTube</td>
                    <td style={{ padding: "0.75rem" }}>EUA</td>
                    <td style={{ padding: "0.75rem" }}>
                      Autenticação, métricas, IA
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>Supabase</td>
                    <td style={{ padding: "0.75rem" }}>EUA</td>
                    <td style={{ padding: "0.75rem" }}>
                      Banco de dados, autenticação
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.75rem" }}>Vercel</td>
                    <td style={{ padding: "0.75rem" }}>EUA</td>
                    <td style={{ padding: "0.75rem" }}>Hospedagem</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section number={7} title="Integrações com YouTube">
            <p>
              Quando você conecta sua conta do YouTube, acessamos dados através
              da YouTube API Services. Isso inclui:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Estatísticas do canal (inscritos, visualizações totais)</li>
              <li>Dados de vídeos (títulos, thumbnails, métricas de desempenho)</li>
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
              </a>{" "}
              e os{" "}
              <a
                href="https://www.youtube.com/t/terms"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#00D4FF" }}
              >
                Termos de Serviço do YouTube
              </a>
              .
            </p>
          </Section>

          <Section number={8} title="Armazenamento e Segurança">
            <p>
              Seus dados são armazenados em servidores seguros com criptografia.
              Implementamos medidas técnicas e organizacionais para proteger
              suas informações, incluindo:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>Criptografia em trânsito (HTTPS/TLS)</li>
              <li>Criptografia em repouso para dados sensíveis</li>
              <li>Controles de acesso baseados em funções</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Backups regulares com recuperação de desastres</li>
              <li>Políticas de senhas fortes e autenticação segura</li>
            </ul>
          </Section>

          <Section number={9} title="Retenção de Dados">
            <p>
              Retemos seus dados pelos períodos necessários para cumprir as
              finalidades descritas nesta Política:
            </p>

            <div style={{ marginTop: "1rem", overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9rem",
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <th
                      style={{
                        textAlign: "left",
                        padding: "0.75rem",
                        color: "#F0F6FC",
                      }}
                    >
                      Tipo de Dado
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "0.75rem",
                        color: "#F0F6FC",
                      }}
                    >
                      Período
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "0.75rem",
                        color: "#F0F6FC",
                      }}
                    >
                      Justificativa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>Dados de conta</td>
                    <td style={{ padding: "0.75rem" }}>
                      Conta ativa + 30 dias
                    </td>
                    <td style={{ padding: "0.75rem" }}>Prestação do serviço</td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>Métricas do YouTube</td>
                    <td style={{ padding: "0.75rem" }}>Histórico de 12 meses</td>
                    <td style={{ padding: "0.75rem" }}>Geração de Media Kits</td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>Logs de acesso</td>
                    <td style={{ padding: "0.75rem" }}>6 meses</td>
                    <td style={{ padding: "0.75rem" }}>
                      Marco Civil da Internet
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>Dados para defesa</td>
                    <td style={{ padding: "0.75rem" }}>Até prescrição legal</td>
                    <td style={{ padding: "0.75rem" }}>
                      Exercício de direitos
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.75rem" }}>Dados fiscais</td>
                    <td style={{ padding: "0.75rem" }}>5 anos</td>
                    <td style={{ padding: "0.75rem" }}>Obrigação tributária</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginTop: "1rem" }}>
              Após os períodos indicados, os dados serão anonimizados ou
              excluídos de forma segura.
            </p>
          </Section>

          <Section number={10} title="Seus Direitos (LGPD)">
            <p>
              De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018),
              você tem direito a:
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>
                <strong>Confirmação e Acesso:</strong> confirmar a existência de
                tratamento e acessar seus dados
              </li>
              <li>
                <strong>Correção:</strong> corrigir dados incompletos, inexatos
                ou desatualizados
              </li>
              <li>
                <strong>Anonimização, bloqueio ou eliminação:</strong> para
                dados desnecessários, excessivos ou tratados em desconformidade
              </li>
              <li>
                <strong>Portabilidade:</strong> receber seus dados em formato
                estruturado e interoperável
              </li>
              <li>
                <strong>Eliminação:</strong> solicitar a exclusão de dados
                tratados com base no consentimento
              </li>
              <li>
                <strong>Informação:</strong> saber com quem seus dados são
                compartilhados
              </li>
              <li>
                <strong>Revogação:</strong> retirar consentimento a qualquer
                momento
              </li>
              <li>
                <strong>Oposição:</strong> opor-se a tratamento realizado com
                base em outras hipóteses legais
              </li>
              <li>
                <strong>Revisão de decisões automatizadas:</strong> solicitar
                revisão humana de decisões tomadas exclusivamente por tratamento
                automatizado (Art. 20)
              </li>
            </ul>
            <p style={{ marginTop: "1rem" }}>
              Para exercer esses direitos, entre em contato com nosso
              Encarregado de Proteção de Dados (DPO) pelo email indicado ao
              final desta Política. Responderemos em até 15 dias úteis.
            </p>
          </Section>

          <Section number={11} title="Cookies e Tecnologias Similares">
            <p>
              Utilizamos cookies e tecnologias similares para melhorar sua
              experiência:
            </p>

            <div style={{ marginTop: "1rem", overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9rem",
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <th
                      style={{
                        textAlign: "left",
                        padding: "0.75rem",
                        color: "#F0F6FC",
                      }}
                    >
                      Tipo
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "0.75rem",
                        color: "#F0F6FC",
                      }}
                    >
                      Finalidade
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "0.75rem",
                        color: "#F0F6FC",
                      }}
                    >
                      Duração
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>Essenciais</td>
                    <td style={{ padding: "0.75rem" }}>
                      Autenticação e segurança
                    </td>
                    <td style={{ padding: "0.75rem" }}>Sessão</td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>Funcionais</td>
                    <td style={{ padding: "0.75rem" }}>
                      Preferências do usuário
                    </td>
                    <td style={{ padding: "0.75rem" }}>1 ano</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.75rem" }}>Analytics</td>
                    <td style={{ padding: "0.75rem" }}>
                      Análise de uso (anônimo)
                    </td>
                    <td style={{ padding: "0.75rem" }}>2 anos</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginTop: "1rem" }}>
              Você pode gerenciar cookies nas configurações do seu navegador.
              Note que desabilitar cookies essenciais pode afetar
              funcionalidades da Plataforma.
            </p>
          </Section>

          <Section number={12} title="Menores de Idade">
            <p>
              A Plataforma é destinada a maiores de{" "}
              <strong>18 (dezoito) anos</strong>. Não coletamos intencionalmente
              dados de menores de 18 anos sem consentimento parental, nem dados
              de menores de 13 anos em qualquer circunstância.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Se tomarmos conhecimento de coleta de dados de menores em
              desconformidade com a lei, excluiremos as informações
              imediatamente.
            </p>
          </Section>

          <Section number={13} title="Alterações nesta Política">
            <p>
              Podemos atualizar esta Política periodicamente para refletir
              mudanças em nossas práticas ou requisitos legais.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Alterações materiais serão notificadas com antecedência mínima de{" "}
              <strong>30 (trinta) dias</strong> por email ou aviso na
              Plataforma. Alterações menores podem entrar em vigor
              imediatamente.
            </p>
            <p style={{ marginTop: "1rem" }}>
              O uso continuado da Plataforma após o prazo de notificação
              constitui aceitação da nova Política.
            </p>
          </Section>

          <Section number={14} title="Autoridade Nacional de Proteção de Dados">
            <p>
              Caso você considere que o tratamento de seus dados pessoais viola
              a LGPD, após contato conosco, você pode apresentar reclamação à
              Autoridade Nacional de Proteção de Dados (ANPD):
            </p>
            <ul style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
              <li>
                <strong>Site:</strong>{" "}
                <a
                  href="https://www.gov.br/anpd"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#00D4FF" }}
                >
                  www.gov.br/anpd
                </a>
              </li>
            </ul>
          </Section>

          <Section number={15} title="Contato e DPO">
            <p>
              Para questões sobre privacidade, exercer seus direitos ou
              esclarecer dúvidas sobre esta Política, entre em contato:
            </p>
            <div
              style={{
                marginTop: "1rem",
                background: "rgba(124, 58, 237, 0.1)",
                border: "1px solid rgba(124, 58, 237, 0.3)",
                borderRadius: "8px",
                padding: "1.25rem",
              }}
            >
              <p style={{ margin: 0, fontWeight: 600, color: "#7C3AED" }}>
                Encarregado de Proteção de Dados (DPO)
              </p>
              <p style={{ margin: "0.75rem 0 0" }}>
                <strong>Provly Tecnologia LTDA</strong>
              </p>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.9rem" }}>
                CNPJ: XX.XXX.XXX/0001-XX
              </p>
              <p style={{ margin: "0.75rem 0 0" }}>
                Email:{" "}
                <a href="mailto:contato@provly.io" style={{ color: "#00D4FF" }}>
                  contato@provly.io
                </a>
              </p>
              <p
                style={{
                  margin: "0.5rem 0 0",
                  fontSize: "0.85rem",
                  color: "#8B949E",
                }}
              >
                Prazo de resposta: até 15 dias úteis
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
