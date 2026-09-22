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

### Variáveis de ambiente (Build Command)

O comando de build padrão usado pelo Vercel é `pnpm run vercel-build`, que executa apenas o `vite build` (sem o bundling do servidor Express, já que o Vercel serve arquivos estáticos nativamente).

### Variáveis de ambiente

Copie `.env.example` e configure no Vercel Dashboard → Settings → Environment Variables:

| Variável | Descrição |
|---|---|
| `VITE_ANALYTICS_ENDPOINT` | URL do endpoint do Umami (analytics) |
| `VITE_ANALYTICS_WEBSITE_ID` | ID do site no Umami |
| `VITE_OAUTH_PORTAL_URL` | URL do portal OAuth |
| `VITE_APP_ID` | ID da aplicação OAuth |

### Como funciona

- **Build**: Vite compila o React para `dist/public`
- **Servidor estático**: Vercel serve os arquivos de `dist/public`
- **Routing SPA**: `rewrites` no `vercel.json` fazem fallback para `/index.html` em todas as rotas, permitindo que `wouter` faça o client-side routing
