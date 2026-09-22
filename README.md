# floowlabs

Landing page da Floow Labs — design, tecnologia e automação inteligente para fazer seu negócio fluir.

## Deploy no Vercel

Este projeto já está configurado para deploy no Vercel.

### Método 1: CLI do Vercel

```bash
npm i -g vercel
vercel --prod
```

### Método 2: GitHub + Vercel Dashboard

1. Push para o GitHub
2. Crie um projeto no [Vercel Dashboard](https://vercel.com/new)
3. Importe o repositório
4. Configure as variáveis de ambiente (veja abaixo)
5. Deploy automático a cada push

### Configuração do build

O build é definido em `vercel.json`:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "vite build",
  "outputDirectory": "dist/public",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- `buildCommand`: `vite build` — só compila o frontend. O bundling do Express (`esbuild`) não é usado no Vercel.
- `outputDirectory`: `dist/public`, pois `vite.config.ts` define `root: "client"` e `build.outDir: "dist/public"`.
- `rewrites`: fallback para `/index.html` (necessário para o client-side routing do `wouter`). Segundo a [ordem de routing do Vercel](https://vercel.com/docs/routing), as *File System Routes* são avaliadas **antes** das *Rewrites*, então arquivos reais em `/assets/*` continuam sendo servidos normalmente.

### Variáveis de ambiente

Todas são opcionais (veja `.env.example`). Configure em Vercel → Project → Settings → Environment Variables:

| Variável | Descrição |
|---|---|
| `VITE_ANALYTICS_ENDPOINT` | Endpoint do Umami, usado no `client/index.html` |
| `VITE_ANALYTICS_WEBSITE_ID` | ID do site no Umami |
| `VITE_OAUTH_PORTAL_URL` | Usada apenas por `getLoginUrl()` (hoje sem uso) |
| `VITE_APP_ID` | Usada apenas por `getLoginUrl()` (hoje sem uso) |

Sem `VITE_ANALYTICS_*` o Vite emite um aviso no build e o script de analytics não carrega; o restante da aplicação não é afetado.

### Requisitos

- Node.js `>=22.12.0` (declarado em `engines`; exigido pelo Vite 7).
- pnpm, detectado automaticamente pelo Vercel via `packageManager` + `pnpm-lock.yaml`.

### Observações

- `server/index.ts` (Express) apenas serve `dist/public` com fallback de rotas. No Vercel isso é feito pela hospedagem estática + `rewrites`, então nenhum servidor é necessário.
- O fluxo original `pnpm build` (frontend + bundle do Express) e `pnpm start` continua válido para hosts Node tradicionais (VPS, Docker).

