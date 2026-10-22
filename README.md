# Portfolio

Portfólio pessoal interativo desenvolvido com Next.js, desenhado sob a estética **Glassmorphism Tech / Neon Terminal**. O projeto conta com um painel administrativo integrado ao Supabase para gerenciamento em tempo real de projetos, certificados, habilidades, formação acadêmica e áreas de interesse.

## Tecnologias Utilizadas

- **Front-end:** Next.js (Pages Router), React, CSS Variables (Tema Escuro/Claro nativo).
- **Back-end & Banco de Dados:** Supabase (PostgreSQL, Row Level Security e Storage para arquivos PDF/Imagens).
- **Tipografia & Estilização:** Google Fonts (Fira Code), FontAwesome, Efeitos Glassmorphism e Neon.

## Funcionalidades Principais

- **Interface Responsiva:** Design dinâmico com suporte a temas Escuro e Claro salvos via LocalStorage.
- **Preview de Documentos:** Pré-visualização integrada de certificados em PDF utilizando `iframe`.
- **Painel Administrativo (/admin/dashboard):** Módulos com controle CRUD (Criar, Ler e Deletar) autenticado via Supabase Auth para:
  - Projetos (Imagens, Links de GitHub e Deploy)
  - Certificados (Upload de PDFs e Imagens)
  - Habilidades Técnicas e Comportamentais (Barras de progresso dinâmicas)
  - Estudos e Cursos (Indicadores de status acadêmico)
  - Áreas de Interesse (Cards dinâmicos com ícones)

## Estrutura do Projeto

```text
src/
├── components/     # Header e Footer reutilizaveis
├── config/         # Conexao com a API do Supabase
├── pages/          # Paginas publicas (Home, Projetos, Certificados, etc.)
│   └── admin/      # Painel administrativo protegido
└── styles/         # Estilos globais e variaveis CSS de tema
```

## Configuração Local

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/NicolasAlmir-Eng/portfolio.git](https://github.com/NicolasAlmir-Eng/portfolio.git)
   cd portfolio
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente (.env.local):**
   Crie um arquivo `.env.local` na raiz do projeto com as chaves do seu banco Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
   ```

4. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

---

Desenvolvido por **Nicolas Almir** — Estudante de Engenharia da Computação e Licenciatura em Matemática na UFPA.
