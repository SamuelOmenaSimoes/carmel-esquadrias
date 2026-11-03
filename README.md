# Carmel — Esquadrias de alumínio e vidro

Next.js App Router + TypeScript + Tailwind CSS + Framer Motion. Preparado para Vercel. Conteúdo em português do Brasil; imagens externas não são utilizadas.

## Executar
Node 22.18 ou superior. `npm ci`, `npm run dev`; abrir http://localhost:3000. Produção: `npm run build` e `npm start`. Verificar tipos: `npm run typecheck`. Testes de segurança: `npm test`.

Build configurado com Webpack por incompatibilidade observada do Turbopack com subprocessos neste Windows. Fontes incluídas localmente via Fontsource, sem download do Google durante o build.

## Conteúdo sem alterar componentes
Edite os arquivos JSON em `content/` usando um editor de texto ou a interface de edição de arquivos do GitHub. Preserve a sintaxe JSON (aspas duplas e vírgulas). Não é necessário alterar arquivos TSX. Mudanças entram no ar após novo deploy. Não há CMS visual nesta entrega.

### Adicionar produto
Em `content/products.json`, duplique um objeto. Use `slug` único, minúsculo, sem acentos e com hífens. Preencha `title`, `summary`, `openings` (lista), `applications`, `glass` (lista), `finishes` (lista), `lines` (lista) e `image`. Marque `available: true` apenas após confirmar o fornecimento. A página `/produtos/slug` e o sitemap são gerados automaticamente. Categorias iniciais são referências para consulta, não oferta confirmada. Confirme e remova as categorias que não serão fornecidas. Product schema não inclui preço nem avaliações fictícias.

### Adicionar obra
Inclua um objeto em `content/works.json` (inicialmente `[]`):
```json
{
  "slug": "nome-da-obra",
  "title": "Nome autorizado da obra",
  "product": "Janelas de alumínio",
  "type": "Residencial",
  "description": "Descrição factual do projeto.",
  "line": "Linha confirmada",
  "glass": "Vidro e espessura confirmados",
  "color": "Acabamento confirmado",
  "location": "Bairro / cidade autorizados",
  "images": [{"src": "/obras/nome-da-obra-01.webp", "alt": "Descrição objetiva da esquadria e do ambiente"}]
}
```
Tipos: `Residencial`, `Comercial` ou `Condomínio`. O campo opcional `testimonial` só deve conter depoimento real autorizado. Os filtros e a página `/obras/slug` acompanham o arquivo automaticamente. `content/testimonials.json` fica reservado para depoimentos futuros; não é exibido sem implementação editorial.

### Trocar fotos
Copie somente fotos autorizadas para `public/obras/` ou `public/fabrica/`. Prefira WebP/JPG com 1600–2200 px na maior dimensão, peso otimizado e nomes sem espaços. Atualize os caminhos em `heroImage` e `factoryImage` de `content/company.json`, `image` dos produtos e `images` das obras. Caminhos públicos começam com `/obras/` ou `/fabrica/`. Campo vazio mantém o placeholder identificado. Next/Image gera versões responsivas e carrega sob demanda, exceto a foto principal.

### Empresa
`content/company.json`: contatos, domínio, endereço, horário, Instagram e região de atendimento. Endereço e horário vazios ficam ocultos. O mapa só aparece quando houver endereço confirmado. Use apenas benefícios comprovados em `verifiedBenefits`. O arquivo `public/carmel-logo.svg` é uma reconstrução vetorial da referência enviada pelo cliente, com tipografia aproximada. Substituir pelo vetor oficial para fidelidade tipográfica exata. Cabeçalho e rodapé usam a composição vertical em fundo carvão. História detalhada, equipe e fotos reais aguardam material. `qualityEnabled` está `false`; só ativar com `qualityText` aprovado e comprovação documental. Não há alegação de certificação ou desempenho ensaiado.

## E-mail e segurança
Copie `.env.example` para `.env.local`. Configure Resend (domínio verificado), `QUOTE_FROM`, `QUOTE_TO` e Upstash Redis REST. Nenhum segredo usa prefixo NEXT_PUBLIC. O formulário envia por Route Handler: Zod, consentimento obrigatório, honeypot, verificação de Origin e rate limit atômico de 5 tentativas por 10 minutos. Falha na configuração ou no limitador bloqueia envio por e-mail; o WhatsApp com resumo continua disponível após a tentativa. O sucesso só é mostrado se o Resend aceitar o envio; isso não comprova entrega na caixa de entrada.

Até 3 arquivos JPG/PNG/WebP de 1 MB, com conferência MIME e assinatura; limite de leitura total de 3,5 MB, abaixo do limite da função Vercel. SVG não é aceito. As imagens são anexadas ao e-mail, sem armazenamento público. Uploads são opcionais e não seguem automaticamente para WhatsApp. Não registre corpos de requisição ou dados pessoais em logs. Configure alertas de falhas nos provedores e retenção nas caixas de e-mail.

O IP é obtido do cabeçalho fornecido pela Vercel; em desenvolvimento todas as solicitações usam a chave `local`. Para outra hospedagem, adaptar a origem confiável do IP. Não substituir por cabeçalho arbitrário. O `SITE_URL` deve coincidir exatamente com o Origin, sem barra final, inclusive no preview. Configure as variáveis por ambiente.

## Deploy na Vercel
Importe o repositório, selecione Next.js e a versão de Node suportada. Configure as variáveis e faça deploy. Cadastre `carmelesquadrias.com.br` e escolha um único host canônico; redirecione www para esse host. Atualize `company.url` e `SITE_URL` se necessário. Esta entrega não altera DNS e não foi publicada numa conta Vercel. Use proteção de preview e bloqueie indexação até aprovação do conteúdo.

## SEO, acessibilidade e analytics
Metadata por rota, Open Graph gerado localmente, LocalBusiness, Product sem ofertas inventadas, sitemap e robots. As páginas de categoria incluem Mogi das Cruzes nos metadados; outras cidades só devem ser adicionadas com atendimento confirmado e conteúdo próprio. Fontes via next/font, foco visível, navegação móvel, skip link e respeito a reduced motion. SVGs são esquemas sem escala e podem ser ativados por foco. O movimento é educativo, não um desenho executivo.

GA4/Meta estão desativados: procure `TODO` em `components/shell.tsx` e `.env.example`. Eventos previstos: `whatsapp_click`, `quote_start`, `quote_submit`. Antes de ativar, implementar consentimento de analytics independente e atualizar a política. Não enviar dados pessoais aos pixels.

Lighthouse mobile 90+ é uma meta, não resultado certificado. Auditar o deploy final com fotos reais, fontes, integrações e condições móveis. Revisar contraste, teclado, leitor de tela, iOS/Android e fluxo de e-mail com credenciais reais antes de liberar anúncios. Nenhuma medição Lighthouse foi alegada nesta entrega.

## Material necessário do cliente
- Logo vetorial e manual da marca; aprovação das cores e assinatura.
- Fotos reais de obras e fábrica, descrição e autorização de uso.
- Lista de produtos e linhas efetivamente fornecidos; aberturas, cores e vidros compatíveis.
- Fichas de obras: produtos, linha, vidro, acabamento, bairro e tipo; depoimentos autorizados.
- Endereço, horário, região atendida e redes oficiais.
- História, equipe e descrição factual da fabricação.
- Condições comprovadas de visita, medição, instalação, frete, prazos e garantia.
- Comprovações de normas/certificações, caso se pretenda publicar alegações.
- Acesso Vercel/DNS, conta Resend com domínio verificado e Upstash.
- Razão social, identificação do controlador, política interna de retenção e revisão da política de privacidade antes da publicação.

## Verificação desta entrega
Build de produção concluído, checagem TypeScript aprovada e 9 testes automatizados aprovados. HTTP 200 nas páginas representativas, sitemap, robots e Open Graph; API retornou 403 sem Origin e 503 sem credenciais. Página inicial inspecionada visualmente em desktop. Automação do fluxo de formulário foi interrompida por timeout do navegador; teste móvel, Lighthouse e envio real de e-mail seguem pendentes.
