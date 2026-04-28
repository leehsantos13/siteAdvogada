# Site Dra. Júlia Cabral

Projeto Next.js da página institucional da advogada Dra. Júlia Cabral.

## Visão geral

- Aplicação criada em `Next.js 16.2.4`
- Frontend em `app/page.tsx` e estilos globais em `app/globals.css`
- Ativos públicos em `public/` e imagens em `public/picture/`
- Favicon customizado configurado em `app/layout.tsx`

## Comandos

```bash
npm install
npm run dev
```

Abra em `http://localhost:3000` para ver o site em desenvolvimento.

Para gerar a versão de produção:

```bash
npm run build
npm run start
```

## Estrutura principal

- `app/layout.tsx` — layout padrão, metadados e fontes
- `app/page.tsx` — página principal com conteúdo da home
- `app/globals.css` — estilos globais do site
- `public/picture/` — imagens do site, incluindo `capa.jpg` e `foto.jpg`

## Observações

- O form de contato funciona como demonstração local; não há backend de envio configurado.
- Se o favicon ainda não aparecer corretamente, limpe o cache do navegador.

## Desenvolvimento

Edite `app/page.tsx` para atualizar o conteúdo da página e use `app/globals.css` para ajustar estilos.

## Publicação

O deploy pode ser feito em qualquer plataforma compatível com Next.js. O projeto já está preparado para rodar em produção com `npm run build`.
