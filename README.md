# ✓ Provly

**Prove seu valor.**

Media kits profissionais que transformam métricas em parcerias. Crie seu Provly e mostre para marcas porque vale a pena trabalhar com você.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?logo=supabase)
![Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?logo=google)

---

## ✨ Features

- 🎬 **Sync com YouTube** - Puxa métricas automaticamente (inscritos, views, engajamento)
- 🤖 **IA Narrativa** - Gera "Minha História" e "Pitch para Marcas" com Gemini
- 📊 **Dashboard Visual** - Gráficos de performance dos últimos vídeos
- 👤 **Demografia** - Idade, gênero e localização da audiência (via YouTube Analytics)
- 💰 **Tabela de Preços** - Pacotes de parceria editáveis
- 📥 **Export PDF** - Media Kit pronto para enviar
- 🔗 **URL Pública** - `provly.io/seu-nome`

---

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com)
- API Key do [YouTube Data API v3](https://console.cloud.google.com/)
- API Key do [Google Gemini](https://makersuite.google.com/app/apikey)

### 1. Clone e Instale

```bash
git clone https://github.com/seu-usuario/provly.git
cd provly
npm install
```

### 2. Configure as Variáveis de Ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key

# APIs
YOUTUBE_API_KEY=sua-youtube-api-key
GEMINI_API_KEY=sua-gemini-api-key
```

### 3. Configure o Banco de Dados

Execute as migrations no Supabase SQL Editor (em ordem):

```bash
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_video_performance.sql
supabase/migrations/003_profile_extensions.sql
```

### 4. Rode o Projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura do Projeto

```
provly/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [slug]/             # Página pública do Media Kit
│   │   ├── api/                # API Routes
│   │   └── page.tsx            # Landing/Cadastro
│   │
│   ├── components/             # Componentes React
│   │   ├── ProfileHeader.tsx   # Header com avatar e socials
│   │   ├── MetricCard.tsx      # Cards de métricas
│   │   ├── VideoChart.tsx      # Gráfico de performance
│   │   ├── EditableStory.tsx   # Story editável com IA
│   │   ├── PricingTable.tsx    # Tabela de preços
│   │   └── CaseStudies.tsx     # Cases de marca
│   │
│   └── lib/                    # Utilitários e serviços
│       ├── actions.ts          # Server Actions (YouTube sync, AI)
│       ├── supabase.ts         # Cliente Supabase (browser)
│       ├── supabase-admin.ts   # Cliente Supabase (server/admin)
│       ├── ai.ts               # Geração de narrativa local
│       └── data.ts             # Queries de dados
│
├── supabase/
│   └── migrations/             # SQL migrations ordenadas
│
└── public/                     # Assets estáticos
```

---

## 🔌 APIs Utilizadas

| API | Uso |
|-----|-----|
| **YouTube Data API v3** | Estatísticas do canal, vídeos recentes, thumbnails |
| **YouTube Analytics API** | Demografia da audiência (requer OAuth) |
| **Google Gemini** | Geração de narrativa e descoberta de nicho |
| **Supabase** | Banco de dados PostgreSQL + Auth |

---

## 🛠️ Scripts Disponíveis

```bash
npm run dev       # Desenvolvimento com hot reload
npm run build     # Build de produção
npm run start     # Servidor de produção
npm run lint      # Linter ESLint
```

---

## 📝 Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anônima do Supabase | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de serviço (admin) | ✅ |
| `YOUTUBE_API_KEY` | API Key do YouTube Data API | ✅ |
| `GEMINI_API_KEY` | API Key do Google Gemini | ✅ |

---

## 🎨 Brand

### Cores

- **Primary:** `#00D4FF` (Electric Cyan)
- **Secondary:** `#7C3AED` (Deep Purple)
- **Background:** `#0D1117` (Deep Ocean)

### Tipografia

- **Display:** Outfit (700, 800, 900)
- **Body:** Plus Jakarta Sans (400-700)
- **Mono:** JetBrains Mono (métricas)

### Tagline

> "Prove seu valor."

---

## 🚢 Deploy

### Vercel (Recomendado)

1. Conecte o repositório na [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

---

## 📄 Licença

MIT © 2025 Provly

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

**Prove seu valor. 🚀**
