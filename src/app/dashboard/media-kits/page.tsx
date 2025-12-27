"use client";

import React, { useState } from "react";

// Ícones
const Icons = {
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Grid: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  List: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  Eye: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Edit: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Share: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  Trash: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3,6 5,6 21,6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  ),
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Copy: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  ),
  MoreVertical: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  ),
  FileText: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
};

// Dados mockados
const mediaKits = [
  {
    id: 1,
    name: "Media Kit - Q4 2025",
    description: "Kit principal com todas as métricas atualizadas",
    thumbnail: null,
    views: 234,
    status: "published",
    lastEdit: "2025-12-25",
    slug: "mana-q4-2025",
  },
  {
    id: 2,
    name: "Proposta Nike Brasil",
    description: "Kit personalizado para parceria com Nike",
    thumbnail: null,
    views: 89,
    status: "draft",
    lastEdit: "2025-12-20",
    slug: "proposta-nike",
  },
  {
    id: 3,
    name: "Parceria Samsung",
    description: "Proposta de conteúdo tecnológico",
    thumbnail: null,
    views: 156,
    status: "published",
    lastEdit: "2025-12-22",
    slug: "samsung-tech",
  },
  {
    id: 4,
    name: "Kit Gaming",
    description: "Focado no nicho de games e entretenimento",
    thumbnail: null,
    views: 78,
    status: "published",
    lastEdit: "2025-12-18",
    slug: "gaming-kit",
  },
  {
    id: 5,
    name: "Collab Influencers",
    description: "Kit para propostas de collab",
    thumbnail: null,
    views: 45,
    status: "draft",
    lastEdit: "2025-12-15",
    slug: "collab-kit",
  },
];

export default function MediaKitsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  const filteredKits = mediaKits.filter((kit) => {
    const matchesSearch = kit.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || kit.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h2 style={{ margin: 0, color: "#F0F6FC", fontSize: "1.75rem", fontWeight: 700 }}>
            Meus Media Kits
          </h2>
          <p style={{ margin: "8px 0 0", color: "#8B949E", fontSize: "1rem" }}>
            {mediaKits.length} kits criados • {mediaKits.filter((k) => k.status === "published").length} publicados
          </p>
        </div>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
            border: "none",
            borderRadius: "12px",
            color: "#0D1117",
            fontWeight: 600,
            fontSize: "0.95rem",
            cursor: "pointer",
          }}
        >
          <Icons.Plus />
          Criar Novo Media Kit
        </button>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        {/* Search */}
        <div
          style={{
            flex: "1 1 300px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#8B949E",
            }}
          >
            <Icons.Search />
          </div>
          <input
            type="text"
            placeholder="Buscar media kits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px 12px 48px",
              background: "#161B22",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "#F0F6FC",
              fontSize: "0.95rem",
              outline: "none",
            }}
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | "published" | "draft")}
          style={{
            padding: "12px 16px",
            background: "#161B22",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            color: "#C9D1D9",
            fontSize: "0.95rem",
            cursor: "pointer",
            minWidth: "140px",
          }}
        >
          <option value="all">Todos</option>
          <option value="published">Publicados</option>
          <option value="draft">Rascunhos</option>
        </select>

        {/* View Toggle */}
        <div
          style={{
            display: "flex",
            background: "#161B22",
            borderRadius: "12px",
            padding: "4px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <button
            onClick={() => setViewMode("grid")}
            style={{
              padding: "8px 12px",
              background: viewMode === "grid" ? "rgba(0, 212, 255, 0.15)" : "transparent",
              border: "none",
              borderRadius: "8px",
              color: viewMode === "grid" ? "#00D4FF" : "#8B949E",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icons.Grid />
          </button>
          <button
            onClick={() => setViewMode("list")}
            style={{
              padding: "8px 12px",
              background: viewMode === "list" ? "rgba(0, 212, 255, 0.15)" : "transparent",
              border: "none",
              borderRadius: "8px",
              color: viewMode === "list" ? "#00D4FF" : "#8B949E",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icons.List />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Create New Card */}
          <div
            style={{
              background: "rgba(0, 212, 255, 0.05)",
              border: "2px dashed rgba(0, 212, 255, 0.3)",
              borderRadius: "16px",
              padding: "40px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              cursor: "pointer",
              transition: "all 0.2s",
              minHeight: "280px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "rgba(0, 212, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#00D4FF",
              }}
            >
              <Icons.Plus />
            </div>
            <p style={{ margin: 0, color: "#00D4FF", fontWeight: 600, fontSize: "1rem" }}>
              Criar Novo Media Kit
            </p>
            <p style={{ margin: 0, color: "#8B949E", fontSize: "0.85rem", textAlign: "center" }}>
              Comece do zero ou use um template
            </p>
          </div>

          {/* Media Kit Cards */}
          {filteredKits.map((kit) => (
            <MediaKitCard key={kit.id} kit={kit} />
          ))}
        </div>
      ) : (
        /* List View */
        <div
          style={{
            background: "#161B22",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                <th style={thStyle}>Nome</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Visualizações</th>
                <th style={thStyle}>Última Edição</th>
                <th style={{ ...thStyle, width: "150px" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredKits.map((kit) => (
                <tr key={kit.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          background: "linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#00D4FF",
                        }}
                      >
                        <Icons.FileText />
                      </div>
                      <div>
                        <p style={{ margin: 0, color: "#F0F6FC", fontWeight: 600 }}>{kit.name}</p>
                        <p style={{ margin: "4px 0 0", color: "#8B949E", fontSize: "0.85rem" }}>
                          {kit.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <StatusBadge status={kit.status} />
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#C9D1D9" }}>
                      <Icons.Eye />
                      {kit.views}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ color: "#8B949E" }}>
                      {new Date(kit.lastEdit).toLocaleDateString("pt-BR")}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <ActionButton icon={<Icons.Edit />} tooltip="Editar" />
                      <ActionButton icon={<Icons.Share />} tooltip="Compartilhar" />
                      <ActionButton icon={<Icons.Download />} tooltip="Download PDF" />
                      <ActionButton icon={<Icons.Trash />} tooltip="Excluir" danger />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Componente Card para Grid View
function MediaKitCard({ kit }: { kit: typeof mediaKits[0] }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      style={{
        background: "#161B22",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        transition: "all 0.2s",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          height: "140px",
          background: "linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(124, 58, 237, 0.15) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div style={{ color: "#8B949E" }}>
          <Icons.FileText />
        </div>
        
        {/* Status Badge */}
        <div style={{ position: "absolute", top: "12px", left: "12px" }}>
          <StatusBadge status={kit.status} />
        </div>

        {/* Menu Button */}
        <div style={{ position: "absolute", top: "12px", right: "12px" }}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "rgba(0,0,0,0.4)",
              border: "none",
              color: "#C9D1D9",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icons.MoreVertical />
          </button>
          
          {showMenu && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                background: "#21262D",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "8px",
                minWidth: "160px",
                zIndex: 10,
              }}
            >
              <MenuOption icon={<Icons.Edit />} label="Editar" />
              <MenuOption icon={<Icons.Copy />} label="Duplicar" />
              <MenuOption icon={<Icons.Share />} label="Compartilhar" />
              <MenuOption icon={<Icons.Download />} label="Download PDF" />
              <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "8px 0" }} />
              <MenuOption icon={<Icons.Trash />} label="Excluir" danger />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px" }}>
        <h3 style={{ margin: 0, color: "#F0F6FC", fontSize: "1.1rem", fontWeight: 600 }}>
          {kit.name}
        </h3>
        <p style={{ margin: "8px 0 0", color: "#8B949E", fontSize: "0.9rem", lineHeight: 1.5 }}>
          {kit.description}
        </p>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#8B949E", fontSize: "0.85rem" }}>
            <Icons.Eye />
            {kit.views} views
          </div>
          <span style={{ color: "#8B949E", fontSize: "0.85rem" }}>
            {new Date(kit.lastEdit).toLocaleDateString("pt-BR")}
          </span>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <button
            style={{
              flex: 1,
              padding: "10px",
              background: "rgba(0, 212, 255, 0.1)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              borderRadius: "10px",
              color: "#00D4FF",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Editar
          </button>
          <button
            style={{
              flex: 1,
              padding: "10px",
              background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
              border: "none",
              borderRadius: "10px",
              color: "#0D1117",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Visualizar
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isPublished = status === "published";
  return (
    <span
      style={{
        padding: "6px 12px",
        borderRadius: "100px",
        fontSize: "0.75rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        background: isPublished ? "rgba(16, 185, 129, 0.15)" : "rgba(139, 148, 158, 0.15)",
        color: isPublished ? "#10B981" : "#8B949E",
      }}
    >
      {isPublished ? "Publicado" : "Rascunho"}
    </span>
  );
}

function ActionButton({ icon, tooltip, danger }: { icon: React.ReactNode; tooltip: string; danger?: boolean }) {
  return (
    <button
      title={tooltip}
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: danger ? "#FF6B6B" : "#8B949E",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </button>
  );
}

function MenuOption({ icon, label, danger }: { icon: React.ReactNode; label: string; danger?: boolean }) {
  return (
    <button
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 12px",
        background: "none",
        border: "none",
        borderRadius: "8px",
        color: danger ? "#FF6B6B" : "#C9D1D9",
        fontSize: "0.9rem",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "16px 20px",
  color: "#8B949E",
  fontSize: "0.8rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const tdStyle: React.CSSProperties = {
  padding: "16px 20px",
  verticalAlign: "middle",
};

