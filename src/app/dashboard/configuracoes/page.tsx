"use client";

import React, { useState } from "react";

// Ícones
const Icons = {
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Lock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  Bell: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  ),
  CreditCard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  Shield: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Palette: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="13.5" cy="6.5" r="2.5" />
      <circle cx="19" cy="13" r="2.5" />
      <circle cx="16" cy="19" r="2.5" />
      <circle cx="7" cy="17" r="2.5" />
      <circle cx="5" cy="10" r="2.5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  Globe: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  Trash: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3,6 5,6 21,6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  ),
  Camera: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  ),
};

const tabs = [
  { id: "profile", label: "Perfil", icon: Icons.User },
  { id: "notifications", label: "Notificações", icon: Icons.Bell },
  { id: "billing", label: "Plano & Pagamento", icon: Icons.CreditCard },
  { id: "security", label: "Segurança", icon: Icons.Shield },
  { id: "appearance", label: "Aparência", icon: Icons.Palette },
];

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ margin: 0, color: "#F0F6FC", fontSize: "1.75rem", fontWeight: 700 }}>
          Configurações
        </h2>
        <p style={{ margin: "8px 0 0", color: "#8B949E", fontSize: "1rem" }}>
          Gerencie sua conta e preferências.
        </p>
      </div>

      {/* Content */}
      <div style={{ display: "flex", gap: "32px" }} className="settings-layout">
        {/* Sidebar */}
        <nav
          style={{
            width: "240px",
            flexShrink: 0,
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      background: isActive ? "rgba(0, 212, 255, 0.1)" : "transparent",
                      border: isActive ? "1px solid rgba(0, 212, 255, 0.2)" : "1px solid transparent",
                      borderRadius: "10px",
                      color: isActive ? "#00D4FF" : "#8B949E",
                      fontSize: "0.95rem",
                      fontWeight: isActive ? 600 : 500,
                      cursor: "pointer",
                      textAlign: "left",
                      marginBottom: "4px",
                    }}
                  >
                    <Icon />
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {activeTab === "profile" && <ProfileTab onSave={handleSave} />}
          {activeTab === "notifications" && <NotificationsTab onSave={handleSave} />}
          {activeTab === "billing" && <BillingTab />}
          {activeTab === "security" && <SecurityTab onSave={handleSave} />}
          {activeTab === "appearance" && <AppearanceTab onSave={handleSave} />}
        </div>
      </div>

      {/* Save Toast */}
      {saved && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            padding: "12px 20px",
            background: "rgba(16, 185, 129, 0.9)",
            borderRadius: "10px",
            color: "#fff",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            zIndex: 100,
          }}
        >
          <Icons.Check />
          Alterações salvas!
        </div>
      )}

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .settings-layout {
            flex-direction: column !important;
          }
          .settings-layout nav {
            width: 100% !important;
          }
          .settings-layout nav ul {
            display: flex !important;
            overflow-x: auto !important;
            gap: 8px !important;
          }
          .settings-layout nav ul li button {
            white-space: nowrap !important;
          }
        }
      `}</style>
    </div>
  );
}

// Profile Tab
function ProfileTab({ onSave }: { onSave: () => void }) {
  return (
    <div
      style={{
        background: "#161B22",
        borderRadius: "16px",
        padding: "32px",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <h3 style={{ margin: "0 0 24px", color: "#F0F6FC", fontSize: "1.25rem", fontWeight: 600 }}>
        Informações do Perfil
      </h3>

      {/* Avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px" }}>
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#0D1117",
          }}
        >
          M
        </div>
        <div>
          <button
            style={{
              padding: "10px 20px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              color: "#C9D1D9",
              fontSize: "0.9rem",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Icons.Camera />
            Alterar foto
          </button>
          <p style={{ margin: "8px 0 0", color: "#8B949E", fontSize: "0.8rem" }}>
            JPG, PNG ou GIF. Máximo 2MB.
          </p>
        </div>
      </div>

      {/* Form */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <FormField label="Nome" defaultValue="Manassés" placeholder="Seu nome" />
        <FormField label="Sobrenome" defaultValue="Tech" placeholder="Seu sobrenome" />
        <FormField
          label="Email"
          defaultValue="mana@provly.io"
          placeholder="seu@email.com"
          type="email"
          fullWidth
        />
        <FormField
          label="Nome de usuário"
          defaultValue="@manatech"
          placeholder="@username"
        />
        <FormField label="Website" defaultValue="https://manatech.com.br" placeholder="https://" />
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", color: "#C9D1D9", fontSize: "0.9rem", marginBottom: "8px" }}>
            Bio
          </label>
          <textarea
            defaultValue="Criador de conteúdo focado em tecnologia e produtividade. Compartilhando conhecimento e ajudando outros criadores."
            placeholder="Conte um pouco sobre você..."
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "14px 16px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              color: "#F0F6FC",
              fontSize: "0.95rem",
              resize: "vertical",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Save Button */}
      <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onSave}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
            border: "none",
            borderRadius: "10px",
            color: "#0D1117",
            fontWeight: 600,
            fontSize: "0.95rem",
            cursor: "pointer",
          }}
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}

// Notifications Tab
function NotificationsTab({ onSave }: { onSave: () => void }) {
  const [notifications, setNotifications] = useState({
    email_views: true,
    email_milestones: true,
    email_marketing: false,
    push_views: false,
    push_milestones: true,
  });

  return (
    <div
      style={{
        background: "#161B22",
        borderRadius: "16px",
        padding: "32px",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <h3 style={{ margin: "0 0 8px", color: "#F0F6FC", fontSize: "1.25rem", fontWeight: 600 }}>
        Notificações
      </h3>
      <p style={{ margin: "0 0 32px", color: "#8B949E", fontSize: "0.95rem" }}>
        Escolha como quer ser notificado sobre atividades importantes.
      </p>

      {/* Email Notifications */}
      <div style={{ marginBottom: "32px" }}>
        <h4 style={{ margin: "0 0 16px", color: "#C9D1D9", fontSize: "1rem", fontWeight: 600 }}>
          Notificações por Email
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <ToggleOption
            label="Visualizações do Media Kit"
            description="Receba um email quando alguém visualizar seu Media Kit"
            checked={notifications.email_views}
            onChange={(v) => setNotifications({ ...notifications, email_views: v })}
          />
          <ToggleOption
            label="Marcos e conquistas"
            description="Quando você atingir novos marcos de inscritos ou visualizações"
            checked={notifications.email_milestones}
            onChange={(v) => setNotifications({ ...notifications, email_milestones: v })}
          />
          <ToggleOption
            label="Novidades e dicas"
            description="Receba novidades do Provly e dicas para criadores"
            checked={notifications.email_marketing}
            onChange={(v) => setNotifications({ ...notifications, email_marketing: v })}
          />
        </div>
      </div>

      {/* Push Notifications */}
      <div>
        <h4 style={{ margin: "0 0 16px", color: "#C9D1D9", fontSize: "1rem", fontWeight: 600 }}>
          Notificações Push
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <ToggleOption
            label="Visualizações em tempo real"
            description="Notificação instantânea quando seu Media Kit for visualizado"
            checked={notifications.push_views}
            onChange={(v) => setNotifications({ ...notifications, push_views: v })}
          />
          <ToggleOption
            label="Alertas de marcos"
            description="Notificação quando você atingir novos marcos"
            checked={notifications.push_milestones}
            onChange={(v) => setNotifications({ ...notifications, push_milestones: v })}
          />
        </div>
      </div>

      {/* Save Button */}
      <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onSave}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
            border: "none",
            borderRadius: "10px",
            color: "#0D1117",
            fontWeight: 600,
            fontSize: "0.95rem",
            cursor: "pointer",
          }}
        >
          Salvar Preferências
        </button>
      </div>
    </div>
  );
}

// Billing Tab
function BillingTab() {
  return (
    <div>
      {/* Current Plan */}
      <div
        style={{
          background: "#161B22",
          borderRadius: "16px",
          padding: "32px",
          border: "1px solid rgba(255,255,255,0.06)",
          marginBottom: "24px",
        }}
      >
        <h3 style={{ margin: "0 0 24px", color: "#F0F6FC", fontSize: "1.25rem", fontWeight: 600 }}>
          Seu Plano Atual
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <h4 style={{ margin: 0, color: "#F0F6FC", fontSize: "1.5rem", fontWeight: 700 }}>
                Plano Gratuito
              </h4>
              <span
                style={{
                  padding: "4px 12px",
                  background: "rgba(139, 148, 158, 0.15)",
                  borderRadius: "100px",
                  color: "#8B949E",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                ATUAL
              </span>
            </div>
            <p style={{ margin: "8px 0 0", color: "#8B949E", fontSize: "0.95rem" }}>
              1 Media Kit • Métricas básicas • Export PNG
            </p>
          </div>
          <button
            style={{
              padding: "12px 24px",
              background: "linear-gradient(135deg, #7C3AED 0%, #00D4FF 100%)",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            Upgrade para Pro
          </button>
        </div>
      </div>

      {/* Plans Comparison */}
      <div
        style={{
          background: "#161B22",
          borderRadius: "16px",
          padding: "32px",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <h3 style={{ margin: "0 0 24px", color: "#F0F6FC", fontSize: "1.25rem", fontWeight: 600 }}>
          Comparar Planos
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {/* Free */}
          <PlanCard
            name="Gratuito"
            price="R$ 0"
            period="/mês"
            features={["1 Media Kit", "Métricas básicas", "Export PNG", "Página pública"]}
            current
          />

          {/* Pro */}
          <PlanCard
            name="Pro"
            price="R$ 29"
            period="/mês"
            features={[
              "Media Kits ilimitados",
              "Todas as métricas",
              "Export PDF",
              "Narrativa com IA",
              "Analytics avançado",
              "Remover marca d'água",
            ]}
            highlighted
          />

          {/* Business */}
          <PlanCard
            name="Business"
            price="R$ 79"
            period="/mês"
            features={[
              "Tudo do Pro",
              "API access",
              "White label",
              "Múltiplos usuários",
              "Suporte prioritário",
              "Relatórios customizados",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

// Security Tab
function SecurityTab({ onSave }: { onSave: () => void }) {
  return (
    <div
      style={{
        background: "#161B22",
        borderRadius: "16px",
        padding: "32px",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <h3 style={{ margin: "0 0 24px", color: "#F0F6FC", fontSize: "1.25rem", fontWeight: 600 }}>
        Segurança
      </h3>

      {/* Change Password */}
      <div style={{ marginBottom: "32px" }}>
        <h4 style={{ margin: "0 0 16px", color: "#C9D1D9", fontSize: "1rem", fontWeight: 600 }}>
          Alterar Senha
        </h4>
        <div style={{ display: "grid", gap: "16px", maxWidth: "400px" }}>
          <FormField label="Senha atual" type="password" placeholder="••••••••" />
          <FormField label="Nova senha" type="password" placeholder="••••••••" />
          <FormField label="Confirmar nova senha" type="password" placeholder="••••••••" />
        </div>
      </div>

      {/* Two Factor */}
      <div style={{ marginBottom: "32px" }}>
        <h4 style={{ margin: "0 0 16px", color: "#C9D1D9", fontSize: "1rem", fontWeight: 600 }}>
          Autenticação de Dois Fatores
        </h4>
        <div
          style={{
            padding: "20px",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p style={{ margin: 0, color: "#F0F6FC", fontWeight: 500 }}>
              Proteja sua conta com 2FA
            </p>
            <p style={{ margin: "4px 0 0", color: "#8B949E", fontSize: "0.9rem" }}>
              Adicione uma camada extra de segurança usando um app autenticador.
            </p>
          </div>
          <button
            style={{
              padding: "10px 20px",
              background: "rgba(0, 212, 255, 0.1)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              borderRadius: "10px",
              color: "#00D4FF",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Ativar 2FA
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div>
        <h4 style={{ margin: "0 0 16px", color: "#FF6B6B", fontSize: "1rem", fontWeight: 600 }}>
          Zona de Perigo
        </h4>
        <div
          style={{
            padding: "20px",
            background: "rgba(255, 107, 107, 0.05)",
            border: "1px solid rgba(255, 107, 107, 0.2)",
            borderRadius: "12px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: 0, color: "#F0F6FC", fontWeight: 500 }}>Excluir conta</p>
              <p style={{ margin: "4px 0 0", color: "#8B949E", fontSize: "0.9rem" }}>
                Esta ação é irreversível. Todos os dados serão perdidos.
              </p>
            </div>
            <button
              style={{
                padding: "10px 20px",
                background: "rgba(255, 107, 107, 0.1)",
                border: "1px solid rgba(255, 107, 107, 0.3)",
                borderRadius: "10px",
                color: "#FF6B6B",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Icons.Trash />
              Excluir Conta
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onSave}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
            border: "none",
            borderRadius: "10px",
            color: "#0D1117",
            fontWeight: 600,
            fontSize: "0.95rem",
            cursor: "pointer",
          }}
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}

// Appearance Tab
function AppearanceTab({ onSave }: { onSave: () => void }) {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("pt-BR");

  return (
    <div
      style={{
        background: "#161B22",
        borderRadius: "16px",
        padding: "32px",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <h3 style={{ margin: "0 0 24px", color: "#F0F6FC", fontSize: "1.25rem", fontWeight: 600 }}>
        Aparência
      </h3>

      {/* Theme */}
      <div style={{ marginBottom: "32px" }}>
        <h4 style={{ margin: "0 0 16px", color: "#C9D1D9", fontSize: "1rem", fontWeight: 600 }}>
          Tema
        </h4>
        <div style={{ display: "flex", gap: "16px" }}>
          {[
            { id: "dark", label: "Escuro", icon: "🌙" },
            { id: "light", label: "Claro", icon: "☀️" },
            { id: "system", label: "Sistema", icon: "💻" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              style={{
                flex: 1,
                padding: "20px",
                background: theme === t.id ? "rgba(0, 212, 255, 0.1)" : "rgba(255,255,255,0.02)",
                border:
                  theme === t.id
                    ? "2px solid rgba(0, 212, 255, 0.5)"
                    : "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: theme === t.id ? "#00D4FF" : "#8B949E",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "2rem" }}>{t.icon}</span>
              <span style={{ fontWeight: 600 }}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div style={{ marginBottom: "32px" }}>
        <h4 style={{ margin: "0 0 16px", color: "#C9D1D9", fontSize: "1rem", fontWeight: 600 }}>
          Idioma
        </h4>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "300px",
            padding: "14px 16px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            color: "#F0F6FC",
            fontSize: "0.95rem",
            cursor: "pointer",
          }}
        >
          <option value="pt-BR">🇧🇷 Português (Brasil)</option>
          <option value="en-US">🇺🇸 English (US)</option>
          <option value="es">🇪🇸 Español</option>
        </select>
      </div>

      {/* Save Button */}
      <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onSave}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
            border: "none",
            borderRadius: "10px",
            color: "#0D1117",
            fontWeight: 600,
            fontSize: "0.95rem",
            cursor: "pointer",
          }}
        >
          Salvar Preferências
        </button>
      </div>
    </div>
  );
}

// Helper Components
function FormField({
  label,
  defaultValue,
  placeholder,
  type = "text",
  fullWidth,
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  fullWidth?: boolean;
}) {
  return (
    <div style={{ gridColumn: fullWidth ? "1 / -1" : undefined }}>
      <label style={{ display: "block", color: "#C9D1D9", fontSize: "0.9rem", marginBottom: "8px" }}>
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "14px 16px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "10px",
          color: "#F0F6FC",
          fontSize: "0.95rem",
          outline: "none",
        }}
      />
    </div>
  );
}

function ToggleOption({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        background: "rgba(255,255,255,0.02)",
        borderRadius: "10px",
      }}
    >
      <div>
        <p style={{ margin: 0, color: "#F0F6FC", fontWeight: 500 }}>{label}</p>
        <p style={{ margin: "4px 0 0", color: "#8B949E", fontSize: "0.85rem" }}>{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        style={{
          width: "48px",
          height: "28px",
          borderRadius: "14px",
          background: checked ? "#00D4FF" : "rgba(255,255,255,0.1)",
          border: "none",
          cursor: "pointer",
          position: "relative",
          transition: "background 0.2s",
        }}
      >
        <div
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            background: "#fff",
            position: "absolute",
            top: "3px",
            left: checked ? "23px" : "3px",
            transition: "left 0.2s",
          }}
        />
      </button>
    </div>
  );
}

function PlanCard({
  name,
  price,
  period,
  features,
  current,
  highlighted,
}: {
  name: string;
  price: string;
  period: string;
  features: string[];
  current?: boolean;
  highlighted?: boolean;
}) {
  return (
    <div
      style={{
        padding: "24px",
        background: highlighted ? "rgba(124, 58, 237, 0.1)" : "rgba(255,255,255,0.02)",
        border: highlighted
          ? "2px solid rgba(124, 58, 237, 0.5)"
          : "1px solid rgba(255,255,255,0.06)",
        borderRadius: "16px",
        position: "relative",
      }}
    >
      {highlighted && (
        <div
          style={{
            position: "absolute",
            top: "-12px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "4px 16px",
            background: "linear-gradient(135deg, #7C3AED 0%, #00D4FF 100%)",
            borderRadius: "100px",
            color: "#fff",
            fontSize: "0.75rem",
            fontWeight: 700,
          }}
        >
          POPULAR
        </div>
      )}

      <h4 style={{ margin: 0, color: "#F0F6FC", fontSize: "1.1rem", fontWeight: 600 }}>{name}</h4>
      <div style={{ margin: "16px 0" }}>
        <span style={{ color: "#F0F6FC", fontSize: "2rem", fontWeight: 700 }}>{price}</span>
        <span style={{ color: "#8B949E", fontSize: "0.9rem" }}>{period}</span>
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: "20px 0" }}>
        {features.map((feature, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#C9D1D9",
              fontSize: "0.9rem",
              marginBottom: "10px",
            }}
          >
            <span style={{ color: "#10B981" }}>✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        disabled={current}
        style={{
          width: "100%",
          padding: "12px",
          background: current
            ? "rgba(255,255,255,0.05)"
            : highlighted
            ? "linear-gradient(135deg, #7C3AED 0%, #00D4FF 100%)"
            : "rgba(255,255,255,0.05)",
          border: current ? "1px solid rgba(255,255,255,0.1)" : "none",
          borderRadius: "10px",
          color: current ? "#8B949E" : "#fff",
          fontWeight: 600,
          fontSize: "0.9rem",
          cursor: current ? "not-allowed" : "pointer",
        }}
      >
        {current ? "Plano Atual" : "Selecionar"}
      </button>
    </div>
  );
}

