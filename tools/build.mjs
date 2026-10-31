// Gera index.html (EN) e pt/index.html (PT) a partir do conteúdo abaixo.
// Uso: node tools/build.mjs   (rodar na raiz do repositório)
// Estilo e comportamento ficam em assets/site.css e assets/site.js. As demos animadas ficam em tools/demos.mjs.
// O número de WhatsApp fica em assets/config.js (único lugar de configuração).
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { demo } from './demos.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BRAND = JSON.parse(readFileSync(join(ROOT, 'tools', 'brand.json'), 'utf8'));
const BASE = 'https://lucasguilhermessilva.github.io';
const EMAIL = 'filhosantoslucas@gmail.com';

const LINKS = {
  linkedin: 'https://www.linkedin.com/in/lucasguilhermessilva/',
  github: 'https://github.com/lucasguilhermessilva',
  fastia: 'https://fast-ia.com',
  nuxio: 'https://nuxio-app.vercel.app',
  expurgos: 'https://app-expurgos.vercel.app',
  oab: 'https://lucasguilhermessilva.github.io/simulado-oab-80/',
  furia: 'https://lucasguilhermessilva.github.io/ChatBot-FuriaEsports/',
};

const T = {
  en: {
    lang: 'en', htmlLang: 'en', path: '/',
    title: 'Lucas Santos | Full-stack developer, CTO at Fast IA and founder of Nuxio',
    desc: 'Full-stack developer, CTO at Fast IA and founder of Nuxio: websites, custom business systems and AI automation for companies in Brazil and abroad.',
    jobTitle: 'Full-stack developer, CTO at Fast IA and founder of Nuxio',
    skip: 'Skip to content',
    nav: { services: 'Services', work: 'Work', stack: 'Stack', process: 'Process', contact: 'Contact' },
    langLabel: 'Language',
    h1: ['Websites, systems', 'and automation.'],
    role: 'Full-stack developer. CTO at Fast IA. Founder of Nuxio.',
    lede: 'I build websites, custom business systems and AI automation for companies in Brazil and abroad.',
    cta: 'Start a project', ctaSecondary: 'See the work', gh: 'GitHub',
    meta: 'Recife, Brazil', metaTail: 'English and Portuguese',
    photoAlt: 'Portrait of Lucas Santos',
    services: [
      { id: 'websites', phrase: 'Websites', text: 'Company sites and landing pages that read well on a phone and send visitors straight to your WhatsApp or inbox.', more: 'In Portuguese, English or both.', seen: 'Seen in', links: [['Nuxio', '#nuxio'], ['Channel automation', '#channels']] },
      { id: 'systems', phrase: 'Custom systems', text: 'Software built around how your company already works: scheduling, clients, stock, deliveries, finance.', more: 'Your team keeps its routine and drops the spreadsheets.', seen: 'Seen in', links: [['Fast IA platform', '#fastia'], ['Nuxio', '#nuxio'], ['Payment wallet API', '#wallet']] },
      { id: 'automation', phrase: 'Automation & AI', text: 'Assistants that answer on WhatsApp, tools that read documents and audio, and routines that do the repeat work.', more: 'I use AI where it has a clear job, and keep a person checking where a mistake costs money.', seen: 'Seen in', links: [['Fast IA platform', '#fastia'], ['Sem Play', '#semplay'], ['Document reader', '#ocr']] },
    ],
    workTitle: 'Selected work',
    workIntro: 'Each case starts with the business problem, then what I built and what shows it works. Fast IA comes first, without clients, screens or numbers.',
    labels: { problem: 'The problem', built: 'What I built', proof: 'What shows it works', stack: 'Stack' },
    groupFast: { title: 'At Fast IA', text: 'I am the CTO. Fast IA applies AI to business: WhatsApp agents for clinics and companies, a CRM with AI and custom systems. I design the architecture and write much of the code.' },
    groupOwn: { title: 'My products and client projects', text: 'Products I run and maintain myself, and projects built for clients. Each note says which.' },
    fast: [
      {
        id: 'fastia', name: 'AI agents on WhatsApp, as a platform', meta: 'Fast IA. I am the CTO.',
        problem: 'Clinics and companies lose customers when nobody answers on WhatsApp, and agents built one by one are hard to keep right once they are live.',
        built: 'A multi-tenant platform where each company has its own AI agents. An orchestrator reads the conversation and picks the intent, and an executor does the job: answers, books a time in the clinic\'s own system or hands the chat to a person. Leads that go quiet get an automatic follow-up inside allowed hours. Messages come in through the official Meta API and through Z-API. Data lives in Postgres with row-level security, and the logic runs in Edge Functions.',
        proof: 'Agents running in production for clinics and companies. Client names, screens and numbers stay private.',
        stack: 'Supabase (Postgres, Edge Functions, RLS), TypeScript, Deno, n8n, Meta Cloud API, Z-API, OpenAI, Claude',
        cap: 'The flow of one conversation, animated. Sample messages.',
        demo: 'agent',
      },
    ],
    ledgerTitle: 'More from Fast IA',
    ledger: [
      { id: 'crm', name: 'CRM with AI for sales teams', text: 'Leads, conversations and follow-up in one place, built on the same platform, so the team works from what the AI already collected.', stack: 'Supabase, TypeScript, React' },
      { id: 'evals', name: 'Evaluation suites for agents', text: 'A golden dataset, multi-turn conversation simulation and cost per conversation, so a prompt or model change is measured before it reaches a customer.', stack: 'TypeScript, Deno, LLM evaluation' },
      { id: 'leadfactory', name: 'Landing page and video per lead', text: 'A pipeline that collects a local business\'s public data with Apify, builds a preview landing page and renders a video from it, automatically.', stack: 'Apify, Playwright, ffmpeg, Python' },
      { id: 'panels', name: 'Management dashboards', text: 'Panels for the team: platform health, agent activity and cost in one view.', stack: 'TypeScript, SQL, Supabase' },
    ],
    nuxio: {
      name: 'Nuxio', meta: 'My company. Live.',
      lede: 'Custom management systems with AI, for companies that still run on paper, spreadsheets and WhatsApp.',
      problem: 'Off-the-shelf software asks a small company to change how it works, so the spreadsheet wins.',
      built: 'The Nuxio website with live demos: example systems for law firms, clinics, barbershops, pallet control and delivery routes, each running on sample data. Behind it sits the internal system my partner and I use to run the company: sales funnel, prospecting, deliveries, tasks and finance.',
      proof: 'A live site with working demos for five kinds of business, and the internal system we use to run the company.',
      stack: 'Next.js, TypeScript, Tailwind CSS, Supabase (Postgres), Vercel',
      link: 'Visit nuxio-app.vercel.app', note: 'The code is private.',
      img: { src: 'nuxio-demo.webp', w: 1136, h: 418, alt: 'Example owner dashboard from the Nuxio demo, in Portuguese: revenue today, receivables, tomorrow\'s schedule, stock alerts and a morning summary, all on sample data.', cap: 'A demo dashboard on the live site. Sample data, Portuguese interface.' },
    },
    own: [
      {
        id: 'semplay', name: 'Sem Play', meta: 'My product. In development.',
        problem: 'Voice notes pile up in WhatsApp, you cannot always listen, and playing one tells the sender it was heard.',
        built: 'A Chrome extension (Manifest V3) that turns WhatsApp Web voice notes into text inside the conversation, without playing them. It pulls out the date, time, address, amount and phone number so you can copy them. A Supabase backend handles accounts, usage limits and transcription, and Pix and card payments run in test mode.',
        proof: 'The extension, the backend and the payment flow each have automated tests. Not on the Chrome Web Store yet.',
        stack: 'JavaScript, Chrome extension (Manifest V3), Supabase (Postgres, Edge Functions), speech-to-text through OpenRouter, Asaas payments, Playwright',
        cap: 'The audio becomes text. Sample message.', demo: 'semplay',
      },
      {
        id: 'manga', name: 'Manga and manhwa translation and typesetting automation', meta: 'My engineering project. In use.',
        problem: 'Typesetting a chapter means placing the translated text inside every speech balloon, page after page, by hand in Photoshop.',
        built: 'A desktop app and engine in Python. It reads the balloons on each page, fits the translated text in the right font and size, and exports the pages as editable files ready for review. It drives Photoshop through COM and uses an AI model to match each sentence to its balloon.',
        proof: 'A measured quality gate compares every result with chapters typeset by hand before a version ships.',
        stack: 'Python, PySide6, Photoshop automation (COM), OCR, OpenRouter',
        cap: 'A page goes in, typeset pages come out. Sample text.', demo: 'manga',
      },
      {
        id: 'channels', name: 'YouTube channel automation', meta: 'My project. Running since October 2026.',
        problem: 'Keeping a channel fed means making, scheduling and checking a steady stream of videos. By hand, that does not scale.',
        built: 'A Python pipeline that generates puzzle, quiz and history content, renders vertical Shorts and long videos with ffmpeg, adds narration and subtitles, and schedules the uploads through the YouTube API. Around it sit the channels\' websites, a Kiwify sales funnel and a small local dashboard on SQLite.',
        proof: 'Running since October 2026: about 22,000 lines of Python in 82 files, and every upload is read back from the YouTube API to confirm it.',
        stack: 'Python, ffmpeg, YouTube Data and Analytics APIs, SQLite, faster-whisper, ElevenLabs, Next.js sites',
        cap: 'From script to sales funnel. The video frame is a real output of the pipeline.', demo: 'channels',
      },
      {
        id: 'expurgos', name: 'Calculation engine for inflation-plan claims', meta: 'Client work. Live.',
        problem: 'A social-security law firm had to read decades-old savings statements and apply the rules of each economic plan by hand, then copy the balances into a calculator.',
        built: 'A web tool where an intern uploads a statement and gets the bank, account, base date and balance, the indices of the Bresser, Verao and Collor plans applied, a discount band under the agreement rules and a text report to copy. It runs on a serverless function and shows a reminder to double-check every number.',
        proof: 'Live at app-expurgos.vercel.app. A person stays in charge: the tool tells the user to confirm every number before using it.',
        stack: 'JavaScript, Node.js on Vercel, a vision AI model',
        link: { href: LINKS.expurgos, text: 'Open the tool', note: 'The interface is in Portuguese.' },
        cap: 'The process, animated. Sample file and sample values.', demo: 'expurgos',
      },
      {
        id: 'ocr', name: 'Document reader with OCR and AI', meta: 'Client work.',
        problem: 'The same firm\'s court files run to 300 pages or more, and the few pages that matter are scanned statements buried among petitions.',
        built: 'A Python app that splits the PDF into pages, drops pages that are plainly text with a local filter, reads the scanned pages with OCR and a vision model, keeps only the statements that belong to the named client and returns the fields as structured data. It retries by itself when the AI service is busy.',
        proof: 'Plain-text pages never reach the AI, which cuts the number of paid calls on a long file. The app has no public page.',
        stack: 'Python, Streamlit, PyMuPDF, asyncio, a vision AI model',
        cap: 'From a 300-page PDF to a few fields. Names and values are not shown.', demo: 'ocr',
      },
      {
        id: 'wallet', name: 'Payment wallet API', meta: 'Reference project. Built to show backend fundamentals.',
        problem: 'In a payments API, a client retry or two simultaneous requests must never move money twice or leave balances out of sync.',
        built: 'A digital wallet REST API in Go. Each transfer runs in one SERIALIZABLE Postgres transaction, with row locks taken in a fixed order so two transfers between the same wallets cannot deadlock each other. A repeated Idempotency-Key returns the stored response from Redis instead of moving money again. It also has JWT auth, a worker pool and a Docker Compose setup.',
        proof: 'Unit tests cover the service, worker and auth layers.',
        stack: 'Go, Fiber, PostgreSQL, Redis, JWT, Docker',
        cap: 'One payment request, then the same request again. Sample data.', demo: 'wallet',
      },
    ],
    alsoTitle: 'Also built',
    also: [
      { name: 'Simulado OAB', src: 'oab.webp', alt: 'Cover of the OAB practice exam page, in Portuguese.', text: '80 original practice questions for the first phase of the Brazilian bar exam, with an explanation for each answer and a performance report at the end. One static page, no build step.', href: LINKS.oab, link: 'Open the exam' },
      { name: 'FURIA fan bot', src: 'furia.webp', alt: 'The FURIA fan bot chat page.', text: 'A chat interface for fans of FURIA Esports with results, schedule and roster. A fan project with scripted answers, in plain HTML, CSS and JavaScript.', href: LINKS.furia, link: 'Open the bot' },
    ],
    stackTitle: 'What I work with every day',
    stackGroups: [
      ['Languages', 'Python, TypeScript and JavaScript, Go, SQL (PostgreSQL and MySQL) and Deno.'],
      ['Web', 'React, Next.js, Tailwind CSS and Node.js.'],
      ['Backend and infrastructure', 'Supabase (Edge Functions and row-level security), Vercel, Railway, Docker and Redis.'],
      ['AI', 'Claude (Anthropic), OpenAI, OpenRouter and ElevenLabs for voice, plus agent design and LLM evaluation.'],
      ['Automation', 'n8n, Playwright, Apify and ffmpeg.'],
      ['WhatsApp', 'Meta Cloud API, Z-API and Evolution API.'],
    ],
    processTitle: 'How a project goes',
    steps: [
      ['First, we talk.', 'A short call or WhatsApp chat about how your company works today and where it gets stuck. I tell you what is worth building first, even when the answer is a simple site.'],
      ['Then, a written proposal.', 'Scope, timeline and price on paper before I start. You know what you get and when.'],
      ['Then, I build it while you watch.', 'You see each stage working and approve what goes live.'],
      ['Last, it goes live and I stay.', 'I publish it, train your team and keep adjusting after launch.'],
    ],
    contactTitle: 'Tell me what your company needs.',
    askLabel: 'What do you need?', askPlaceholder: 'A site, a system, an assistant', askButton: 'Send by email',
    askNote: 'Opens your email app with the message ready.',
    mailSubject: 'Project inquiry from your portfolio', mailSign: 'Sent from lucasguilhermessilva.github.io',
    reach: { email: 'Email', whatsapp: 'WhatsApp', waText: 'Message me on WhatsApp', github: 'GitHub', where: 'Based in', whereVal: 'Recife, Brazil', langs: 'Languages', langsVal: 'English and Portuguese' },
    footNav: 'Sections', footLinks: 'Elsewhere',
    legal: '© 2026 Lucas Santos. Recife, Brazil.', top: 'Back to top',
    waMsg: 'Hi Lucas, I found your portfolio and would like to talk about a project.',
  },
  pt: {
    lang: 'pt', htmlLang: 'pt-BR', path: '/pt/',
    title: 'Lucas Santos | Desenvolvedor full stack, CTO da Fast IA e fundador da Nuxio',
    desc: 'Desenvolvedor full stack, CTO da Fast IA e fundador da Nuxio: sites, sistemas sob medida e automação com IA para empresas no Brasil e no exterior.',
    jobTitle: 'Desenvolvedor full stack, CTO da Fast IA e fundador da Nuxio',
    skip: 'Ir para o conteúdo',
    nav: { services: 'Serviços', work: 'Trabalhos', stack: 'Stack', process: 'Como trabalho', contact: 'Contato' },
    langLabel: 'Idioma',
    h1: ['Sites, sistemas', 'e automação.'],
    role: 'Desenvolvedor full stack. CTO da Fast IA. Fundador da Nuxio.',
    lede: 'Faço sites, sistemas sob medida e automação com IA para empresas no Brasil e no exterior.',
    cta: 'Começar um projeto', ctaSecondary: 'Ver os trabalhos', gh: 'GitHub',
    meta: 'Recife, Brasil', metaTail: 'Português e inglês',
    photoAlt: 'Retrato de Lucas Santos',
    services: [
      { id: 'websites', phrase: 'Sites', text: 'Sites institucionais e páginas de venda que funcionam bem no celular e levam o visitante direto para o seu WhatsApp ou e-mail.', more: 'Em português, inglês ou nos dois.', seen: 'Veja em', links: [['Nuxio', '#nuxio'], ['Automação de canais', '#channels']] },
      { id: 'systems', phrase: 'Sistemas sob medida', text: 'Software feito em cima do jeito que a sua empresa já trabalha: agenda, clientes, estoque, entregas, financeiro.', more: 'Sua equipe mantém a rotina e larga as planilhas.', seen: 'Veja em', links: [['Plataforma da Fast IA', '#fastia'], ['Nuxio', '#nuxio'], ['API de carteira digital', '#wallet']] },
      { id: 'automation', phrase: 'Automação e IA', text: 'Assistentes que respondem no WhatsApp, ferramentas que leem documentos e áudios e rotinas que fazem o trabalho repetido.', more: 'Uso IA onde ela tem uma tarefa clara e deixo uma pessoa conferindo onde um erro custa dinheiro.', seen: 'Veja em', links: [['Plataforma da Fast IA', '#fastia'], ['Sem Play', '#semplay'], ['Leitor de documentos', '#ocr']] },
    ],
    workTitle: 'Trabalhos selecionados',
    workIntro: 'Cada case começa pelo problema do negócio, depois o que eu construí e o que mostra que funciona. A Fast IA vem primeiro, sem clientes, telas ou números.',
    labels: { problem: 'O problema', built: 'O que eu construí', proof: 'O que mostra que funciona', stack: 'Tecnologias' },
    groupFast: { title: 'Na Fast IA', text: 'Sou o CTO. A Fast IA aplica IA em negócios: agentes de WhatsApp para clínicas e empresas, CRM com IA e sistemas sob medida. Eu desenho a arquitetura e escrevo boa parte do código.' },
    groupOwn: { title: 'Meus produtos e projetos para clientes', text: 'Produtos que eu mesmo toco e mantenho, e projetos feitos para clientes. Cada nota diz qual é.' },
    fast: [
      {
        id: 'fastia', name: 'Agentes de IA no WhatsApp, como plataforma', meta: 'Fast IA. Sou o CTO.',
        problem: 'Clínicas e empresas perdem clientes quando ninguém responde no WhatsApp, e agentes feitos um a um são difíceis de manter certos depois que entram no ar.',
        built: 'Uma plataforma multiempresa em que cada empresa tem os seus agentes de IA. Um orquestrador lê a conversa e escolhe a intenção, e um executor faz o trabalho: responde, agenda um horário no sistema da própria clínica ou passa a conversa para uma pessoa. Lead que some recebe um follow-up automático dentro de uma janela de horário permitida. As mensagens entram pela API oficial da Meta e pela Z-API. Os dados ficam em Postgres com segurança por linha (RLS) e a lógica roda em Edge Functions.',
        proof: 'Agentes rodando em produção para clínicas e empresas. Nomes de clientes, telas e números ficam privados.',
        stack: 'Supabase (Postgres, Edge Functions, RLS), TypeScript, Deno, n8n, Meta Cloud API, Z-API, OpenAI, Claude',
        cap: 'O fluxo de uma conversa, animado. Mensagens de exemplo.',
        demo: 'agent',
      },
    ],
    ledgerTitle: 'Mais da Fast IA',
    ledger: [
      { id: 'crm', name: 'CRM com IA para equipe comercial', text: 'Leads, conversas e follow-up num lugar só, construído sobre a mesma plataforma, para a equipe trabalhar com o que a IA já coletou.', stack: 'Supabase, TypeScript, React' },
      { id: 'evals', name: 'Suítes de avaliação de agentes', text: 'Um dataset dourado, simulação de conversa em vários turnos e custo por conversa, para medir a troca de um prompt ou de um modelo antes de chegar ao cliente.', stack: 'TypeScript, Deno, avaliação de LLM' },
      { id: 'leadfactory', name: 'Landing page e vídeo por lead', text: 'Um pipeline que coleta os dados públicos de um negócio local com o Apify, monta uma landing page de prévia e renderiza um vídeo a partir dela, de forma automática.', stack: 'Apify, Playwright, ffmpeg, Python' },
      { id: 'panels', name: 'Painéis de gestão', text: 'Painéis para a equipe: saúde da plataforma, atividade dos agentes e custo numa visão só.', stack: 'TypeScript, SQL, Supabase' },
    ],
    nuxio: {
      name: 'Nuxio', meta: 'Minha empresa. No ar.',
      lede: 'Sistemas de gestão sob medida com IA, para empresas que ainda funcionam no papel, na planilha e no WhatsApp.',
      problem: 'O software de prateleira pede que a pequena empresa mude o jeito de trabalhar, e a planilha acaba ganhando.',
      built: 'O site da Nuxio com demonstrações ao vivo: sistemas de exemplo para escritórios de advocacia, clínicas, barbearias, controle de paletes e rotas de entrega, cada um rodando com dados fictícios. Por trás, o sistema interno que eu e meu sócio usamos para tocar a empresa: funil de vendas, prospecção, entregas, tarefas e financeiro.',
      proof: 'Um site no ar com demonstrações funcionando para cinco tipos de negócio, e o sistema interno que usamos para tocar a empresa.',
      stack: 'Next.js, TypeScript, Tailwind CSS, Supabase (Postgres), Vercel',
      link: 'Visitar nuxio-app.vercel.app', note: 'O código é privado.',
      img: { src: 'nuxio-demo.webp', w: 1136, h: 418, alt: 'Painel de exemplo do dono na demonstração da Nuxio: entradas de hoje, a receber, agenda de amanhã, alertas de estoque e um resumo da manhã, tudo com dados fictícios.', cap: 'Painel de demonstração do site no ar. Dados fictícios.' },
    },
    own: [
      {
        id: 'semplay', name: 'Sem Play', meta: 'Produto meu. Em desenvolvimento.',
        problem: 'Os áudios se acumulam no WhatsApp, nem sempre dá para ouvir, e dar play avisa quem mandou que o áudio foi ouvido.',
        built: 'Uma extensão do Chrome (Manifest V3) que transforma os áudios do WhatsApp Web em texto dentro da conversa, sem tocar o áudio. Ela separa data, horário, endereço, valor e telefone para copiar. Um servidor em Supabase cuida das contas, dos limites de uso e da transcrição, e os pagamentos por Pix e cartão rodam em modo de teste.',
        proof: 'A extensão, o servidor e o fluxo de pagamento têm testes automatizados. Ainda não está na loja do Chrome.',
        stack: 'JavaScript, extensão do Chrome (Manifest V3), Supabase (Postgres, Edge Functions), transcrição de voz pelo OpenRouter, pagamentos Asaas, Playwright',
        cap: 'O áudio vira texto. Mensagem de exemplo.', demo: 'semplay',
      },
      {
        id: 'manga', name: 'Automação de tradução e diagramação de mangá e manhwa', meta: 'Meu projeto de engenharia. Em uso.',
        problem: 'Diagramar um capítulo é colocar o texto traduzido dentro de cada balão, página por página, à mão no Photoshop.',
        built: 'Um app de desktop e um motor em Python. Ele lê os balões de cada página, encaixa o texto traduzido na fonte e no tamanho certos e exporta as páginas em arquivos editáveis, prontas para revisão. Controla o Photoshop por COM e usa um modelo de IA para casar cada frase com o seu balão.',
        proof: 'Um portão de qualidade medido compara cada resultado com capítulos feitos à mão antes de uma versão sair.',
        stack: 'Python, PySide6, automação do Photoshop (COM), OCR, OpenRouter',
        cap: 'Uma página entra, páginas diagramadas saem. Texto de exemplo.', demo: 'manga',
      },
      {
        id: 'channels', name: 'Automação de canais do YouTube', meta: 'Projeto meu. Rodando desde outubro de 2026.',
        problem: 'Manter um canal alimentado exige fazer, agendar e conferir um fluxo constante de vídeos. À mão, isso não escala.',
        built: 'Um pipeline em Python que gera conteúdo de passatempos, quiz e história, renderiza Shorts verticais e vídeos longos com ffmpeg, coloca narração e legendas e agenda os envios pela API do YouTube. Em volta ficam os sites dos canais, um funil de vendas na Kiwify e um painel local pequeno em SQLite.',
        proof: 'Rodando desde outubro de 2026: cerca de 22 mil linhas de Python em 82 arquivos, e cada envio é lido de volta pela API do YouTube para confirmar.',
        stack: 'Python, ffmpeg, APIs de Dados e de Analytics do YouTube, SQLite, faster-whisper, ElevenLabs, sites em Next.js',
        cap: 'Do roteiro ao funil de vendas. O quadro do vídeo é uma saída real do pipeline.', demo: 'channels',
      },
      {
        id: 'expurgos', name: 'Motor de cálculo de expurgos inflacionários', meta: 'Trabalho para cliente. No ar.',
        problem: 'Um escritório de advocacia previdenciária precisava ler extratos de poupança de décadas atrás e aplicar à mão as regras de cada plano econômico, depois copiar os saldos para uma calculadora.',
        built: 'Uma ferramenta web em que o estagiário envia o extrato e recebe banco, conta, data-base e saldo, os índices dos planos Bresser, Verão e Collor aplicados, a faixa de desconto pelas regras do acordo e um relatório em texto para copiar. Roda numa função serverless e mostra o aviso de conferir todos os números.',
        proof: 'No ar em app-expurgos.vercel.app. Uma pessoa continua no comando: a ferramenta pede para conferir cada número antes de usar.',
        stack: 'JavaScript, Node.js na Vercel, um modelo de visão de IA',
        link: { href: LINKS.expurgos, text: 'Abrir a ferramenta', note: 'A interface é em português.' },
        cap: 'O processo, animado. Arquivo e valores de exemplo.', demo: 'expurgos',
      },
      {
        id: 'ocr', name: 'Leitor de documentos com OCR e IA', meta: 'Trabalho para cliente.',
        problem: 'Os processos do mesmo escritório passam de 300 páginas, e as poucas páginas que importam são extratos escaneados no meio de petições.',
        built: 'Um app em Python que divide o PDF em páginas, descarta as páginas só de texto com um filtro local, lê as páginas escaneadas com OCR e um modelo de visão, guarda só os extratos do cliente indicado e devolve os campos como dados estruturados. Tenta de novo sozinho quando o serviço de IA está ocupado.',
        proof: 'Página só de texto nunca chega à IA, o que reduz o número de chamadas pagas num arquivo longo. O app não tem página pública.',
        stack: 'Python, Streamlit, PyMuPDF, asyncio, um modelo de visão de IA',
        cap: 'De um PDF de 300 páginas a poucos campos. Nomes e valores não aparecem.', demo: 'ocr',
      },
      {
        id: 'wallet', name: 'API de carteira digital', meta: 'Projeto de referência. Feito para mostrar fundamentos de backend.',
        problem: 'Numa API de pagamentos, uma nova tentativa do cliente ou duas requisições ao mesmo tempo nunca podem mover o dinheiro duas vezes nem deixar os saldos fora de sincronia.',
        built: 'Uma API REST de carteira digital em Go. Cada transferência roda numa única transação SERIALIZABLE do Postgres, com os bloqueios de linha tomados sempre na mesma ordem, para que duas transferências entre as mesmas carteiras não travem uma à outra. Uma Idempotency-Key repetida devolve a resposta guardada no Redis em vez de mover o dinheiro de novo. Tem também autenticação JWT, um pool de workers e ambiente com Docker Compose.',
        proof: 'Testes unitários cobrem as camadas de serviço, worker e autenticação.',
        stack: 'Go, Fiber, PostgreSQL, Redis, JWT, Docker',
        cap: 'Uma requisição de pagamento e depois a mesma de novo. Dados de exemplo.', demo: 'wallet',
      },
    ],
    alsoTitle: 'Também construí',
    also: [
      { name: 'Simulado OAB', src: 'oab.webp', alt: 'Página do simulado da OAB.', text: '80 questões autorais para a primeira fase do Exame de Ordem, com comentário em cada resposta e um relatório de desempenho no final. Uma página estática, sem etapa de build.', href: LINKS.oab, link: 'Abrir o simulado' },
      { name: 'Bot de fãs da FURIA', src: 'furia.webp', alt: 'Página do chat de fãs da FURIA.', text: 'Uma interface de chat para fãs da FURIA Esports com resultados, calendário e elenco. Projeto de fã com respostas roteirizadas, em HTML, CSS e JavaScript puros.', href: LINKS.furia, link: 'Abrir o bot' },
    ],
    stackTitle: 'O que uso no dia a dia',
    stackGroups: [
      ['Linguagens', 'Python, TypeScript e JavaScript, Go, SQL (PostgreSQL e MySQL) e Deno.'],
      ['Web', 'React, Next.js, Tailwind CSS e Node.js.'],
      ['Backend e infraestrutura', 'Supabase (Edge Functions e segurança por linha), Vercel, Railway, Docker e Redis.'],
      ['IA', 'Claude (Anthropic), OpenAI, OpenRouter e ElevenLabs para voz, mais desenho de agentes e avaliação de LLM.'],
      ['Automação', 'n8n, Playwright, Apify e ffmpeg.'],
      ['WhatsApp', 'Meta Cloud API, Z-API e Evolution API.'],
    ],
    processTitle: 'Como um projeto anda',
    steps: [
      ['Primeiro, a gente conversa.', 'Uma conversa rápida, por chamada ou WhatsApp, sobre como a sua empresa funciona hoje e onde ela trava. Eu digo o que vale fazer primeiro, mesmo quando a resposta é um site simples.'],
      ['Depois, uma proposta por escrito.', 'Escopo, prazo e valor no papel antes de eu começar. Você sabe o que recebe e quando.'],
      ['Depois, eu construo com você olhando.', 'Você vê cada etapa funcionando e aprova o que vai ao ar.'],
      ['Por fim, vai ao ar e eu continuo.', 'Eu publico, treino a sua equipe e sigo ajustando depois do lançamento.'],
    ],
    contactTitle: 'Conte o que a sua empresa precisa.',
    askLabel: 'Do que você precisa?', askPlaceholder: 'Um site, um sistema, um assistente', askButton: 'Enviar por e-mail',
    askNote: 'Abre o seu app de e-mail com a mensagem pronta.',
    mailSubject: 'Contato pelo portfólio', mailSign: 'Enviado de lucasguilhermessilva.github.io',
    reach: { email: 'E-mail', whatsapp: 'WhatsApp', waText: 'Chamar no WhatsApp', github: 'GitHub', where: 'Moro em', whereVal: 'Recife, Brasil', langs: 'Idiomas', langsVal: 'Português e inglês' },
    footNav: 'Seções', footLinks: 'Em outros lugares',
    legal: '© 2026 Lucas Santos. Recife, Brasil.', top: 'Voltar ao topo',
    waMsg: 'Oi Lucas, vi o seu portfólio e queria conversar sobre um projeto.',
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function caseHtml(c, t, prefix, i) {
  const mirror = i % 2 === 1 ? ' is-mirror' : '';
  const link = c.link
    ? `<p class="case-link rv"><a class="link" href="${c.link.href}" target="_blank" rel="noopener">${esc(c.link.text)}<span class="arrow" aria-hidden="true">&nearr;</span></a> <span class="case-note">${esc(c.link.note)}</span></p>`
    : '';
  return `<article class="case${mirror}" id="${c.id}">
  <figure class="case-media shape-demo rv">${demo(c.demo, t.lang, prefix)}<figcaption>${esc(c.cap)}</figcaption></figure>
  <div class="case-body">
    <h4 class="case-name rv">${esc(c.name)}</h4>
    <p class="case-meta rv">${esc(c.meta)}</p>
    <dl class="facts">
      <div class="rv"><dt>${esc(t.labels.problem)}</dt><dd>${esc(c.problem)}</dd></div>
      <div class="rv"><dt>${esc(t.labels.built)}</dt><dd>${esc(c.built)}</dd></div>
      <div class="rv"><dt>${esc(t.labels.proof)}</dt><dd>${esc(c.proof)}</dd></div>
      <div class="rv"><dt>${esc(t.labels.stack)}</dt><dd>${esc(c.stack)}</dd></div>
    </dl>
    ${link}
  </div>
</article>`;
}

function page(t) {
  const prefix = t.lang === 'en' ? '' : '../';
  const url = BASE + t.path;
  const n = t.nuxio;
  const ld = {
    '@context': 'https://schema.org', '@type': 'Person', name: 'Lucas Santos', jobTitle: t.jobTitle, url,
    image: `${BASE}/assets/img/lucas.jpg`, email: `mailto:${EMAIL}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Recife', addressCountry: 'BR' },
    worksFor: [{ '@type': 'Organization', name: 'Fast IA', url: LINKS.fastia }, { '@type': 'Organization', name: 'Nuxio', url: LINKS.nuxio }],
    sameAs: [LINKS.linkedin, LINKS.github, LINKS.nuxio, LINKS.fastia],
  };
  const fields = t.services.map((s, i) => `<article class="field f${i + 1}" id="${s.id}" data-chapter="${['light', 'dark2', 'light2'][i]}">
    <div class="field-text rv"><p class="field-main">${esc(s.text)}</p><p class="field-more">${esc(s.more)}</p></div>
    <h2 class="phrase rv">${esc(s.phrase)}</h2>
    <p class="field-see rv">${esc(s.seen)} ${s.links.map(([nm, h]) => `<a class="link" href="${h}">${esc(nm)}</a>`).join(', ')}</p>
  </article>`).join('\n  ');
  const steps = t.steps.map(([h, p], i) => `<li class="step s${i + 1} rv"><h3 class="step-line">${esc(h)}</h3><p class="step-text">${esc(p)}</p></li>`).join('\n      ');
  const ledger = t.ledger.map((l) => `<li class="ledger-row rv" id="${l.id}"><h5 class="ledger-name">${esc(l.name)}</h5><p class="ledger-text">${esc(l.text)}</p><p class="ledger-stack">${esc(l.stack)}</p></li>`).join('\n        ');
  const stackRows = t.stackGroups.map(([k, v]) => `<div class="stack-row rv"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('\n      ');

  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.desc)}">
<meta name="theme-color" content="#09090a">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${BASE}/">
<link rel="alternate" hreflang="pt-BR" href="${BASE}/pt/">
<link rel="alternate" hreflang="x-default" href="${BASE}/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Lucas Santos">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${BASE}/assets/img/og.png">
<meta property="og:locale" content="${t.lang === 'en' ? 'en_US' : 'pt_BR'}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="${prefix}assets/fonts/geist-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${prefix}assets/site.css">
<script>document.documentElement.classList.add('js')</script>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<a class="skip" href="#main">${esc(t.skip)}</a>
<header class="bar" id="bar" data-theme="dark">
  <a class="mark" href="#top" aria-label="Lucas Santos">Lucas Santos</a>
  <nav class="bar-nav" aria-label="${t.lang === 'en' ? 'Sections' : 'Seções'}">
    <a href="#services">${esc(t.nav.services)}</a>
    <a href="#work">${esc(t.nav.work)}</a>
    <a href="#stack">${esc(t.nav.stack)}</a>
    <a href="#process">${esc(t.nav.process)}</a>
    <a href="${LINKS.github}" target="_blank" rel="noopener">${esc(t.gh)}<span class="arrow" aria-hidden="true">&nearr;</span></a>
  </nav>
  <div class="bar-end">
    <div class="lang" role="group" aria-label="${esc(t.langLabel)}">
      <a href="${t.lang === 'en' ? './' : '../'}" hreflang="en" lang="en"${t.lang === 'en' ? ' aria-current="true"' : ''}>EN</a>
      <a href="${t.lang === 'en' ? 'pt/' : './'}" hreflang="pt-BR" lang="pt-BR"${t.lang === 'pt' ? ' aria-current="true"' : ''}>PT</a>
    </div>
    <a class="btn btn-sm" href="#contact">${esc(t.nav.contact)}</a>
  </div>
</header>
<main id="main">
  <section class="hero" id="top" data-chapter="dark">
    <h1 class="display"><span class="l1">${esc(t.h1[0])}</span> <span class="l2">${esc(t.h1[1])}</span></h1>
    <div class="hero-text">
      <p class="role">${esc(t.role)}</p>
      <p class="lede">${esc(t.lede)}</p>
      <div class="actions">
        <a class="btn" href="#contact">${esc(t.cta)}</a>
        <a class="link link-lg" href="#work">${esc(t.ctaSecondary)}</a>
        <a class="link link-lg" href="${LINKS.github}" target="_blank" rel="noopener">${esc(t.gh)}<span class="arrow" aria-hidden="true">&nearr;</span></a>
      </div>
    </div>
    <figure class="hero-photo"><img src="${prefix}assets/img/lucas.webp" width="460" height="460" alt="${esc(t.photoAlt)}" fetchpriority="high"></figure>
    <p class="hero-meta"><span>${esc(t.meta)}</span><span class="clock" id="clock"></span><span>${esc(t.metaTail)}</span></p>
  </section>

  <section class="fields" id="services" aria-label="${esc(t.nav.services)}">
  ${fields}
  </section>

  <section class="work" id="work" data-chapter="dark" aria-labelledby="work-title">
    <header class="work-head">
      <h2 class="title rv" id="work-title">${esc(t.workTitle)}</h2>
      <p class="statement rv">${esc(t.workIntro)}</p>
    </header>
    <div class="group">
      <h3 class="group-title rv">${esc(t.groupFast.title)}</h3>
      <p class="group-text rv">${esc(t.groupFast.text)}</p>
    </div>
    ${t.fast.map((c, i) => caseHtml(c, t, prefix, i)).join('\n    ')}
    <div class="ledger">
      <h4 class="ledger-title rv">${esc(t.ledgerTitle)}</h4>
      <ul class="ledger-list">
        ${ledger}
      </ul>
    </div>
  </section>

  <section class="nuxio" id="nuxio" data-chapter="light" aria-labelledby="nuxio-title">
    <div class="nx-mark">
      <svg viewBox="${BRAND.glyphViewBox}" role="img" aria-label="Nuxio" fill="currentColor" overflow="visible"><path class="mark-trace" d="${BRAND.glyph}" fill-rule="evenodd" pathLength="1" stroke="currentColor" stroke-width="12" stroke-linejoin="round"/></svg>
    </div>
    <div class="nx-body">
      <h2 class="title rv" id="nuxio-title">${esc(n.name)}</h2>
      <p class="nx-meta rv">${esc(n.meta)}</p>
      <p class="nx-lede rv">${esc(n.lede)}</p>
      <dl class="facts">
        <div class="rv"><dt>${esc(t.labels.problem)}</dt><dd>${esc(n.problem)}</dd></div>
        <div class="rv"><dt>${esc(t.labels.built)}</dt><dd>${esc(n.built)}</dd></div>
        <div class="rv"><dt>${esc(t.labels.proof)}</dt><dd>${esc(n.proof)}</dd></div>
        <div class="rv"><dt>${esc(t.labels.stack)}</dt><dd>${esc(n.stack)}</dd></div>
      </dl>
      <p class="nx-cta rv"><a class="btn" href="${LINKS.nuxio}" target="_blank" rel="noopener">${esc(n.link)}<span class="arrow" aria-hidden="true">&nearr;</span></a> <span class="case-note">${esc(n.note)}</span></p>
    </div>
    <figure class="nx-shot rv"><img src="${prefix}assets/img/${n.img.src}" width="${n.img.w}" height="${n.img.h}" alt="${esc(n.img.alt)}" loading="lazy" decoding="async"><figcaption>${esc(n.img.cap)}</figcaption></figure>
  </section>

  <section class="work projects" id="projects" data-chapter="dark" aria-labelledby="projects-title">
    <div class="group group-own">
      <h3 class="group-title rv" id="projects-title">${esc(t.groupOwn.title)}</h3>
      <p class="group-text rv">${esc(t.groupOwn.text)}</p>
    </div>
    ${t.own.map((c, i) => caseHtml(c, t, prefix, i)).join('\n    ')}
    <div class="also">
      <h4 class="also-title rv">${esc(t.alsoTitle)}</h4>
      <div class="also-grid">
        ${t.also.map((a) => `<article class="also-item rv"><img src="${prefix}assets/img/${a.src}" width="1440" height="900" alt="${esc(a.alt)}" loading="lazy" decoding="async"><h5>${esc(a.name)}</h5><p>${esc(a.text)}</p><a class="link" href="${a.href}" target="_blank" rel="noopener">${esc(a.link)}<span class="arrow" aria-hidden="true">&nearr;</span></a></article>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="stack" id="stack" data-chapter="dark2" aria-labelledby="stack-title">
    <h2 class="title rv" id="stack-title">${esc(t.stackTitle)}</h2>
    <dl class="stack-list">
      ${stackRows}
    </dl>
  </section>

  <section class="process" id="process" data-chapter="light" aria-labelledby="process-title">
    <h2 class="title rv" id="process-title">${esc(t.processTitle)}</h2>
    <ol class="steps">
      ${steps}
    </ol>
  </section>

  <section class="contact" id="contact" data-chapter="dark" aria-labelledby="contact-title">
    <h2 class="title rv" id="contact-title">${esc(t.contactTitle)}</h2>
    <form class="ask rv" id="ask" action="mailto:${EMAIL}" method="get" data-subject="${esc(t.mailSubject)}" data-sign="${esc(t.mailSign)}">
      <input type="hidden" name="subject" value="${esc(t.mailSubject)}">
      <label class="ask-label" for="need">${esc(t.askLabel)}</label>
      <div class="ask-row">
        <input id="need" name="body" type="text" autocomplete="off" placeholder="${esc(t.askPlaceholder)}" aria-describedby="ask-note">
        <button class="btn" type="submit">${esc(t.askButton)}</button>
      </div>
      <p class="note" id="ask-note">${esc(t.askNote)}</p>
    </form>
    <ul class="reach">
      <li class="rv"><span class="reach-k">${esc(t.reach.email)}</span><a class="link link-lg" href="mailto:${EMAIL}">${EMAIL}</a></li>
      <li class="rv" id="wa-row" hidden><span class="reach-k">${esc(t.reach.whatsapp)}</span><a class="link link-lg" id="wa" href="#" data-msg="${esc(t.waMsg)}" target="_blank" rel="noopener">${esc(t.reach.waText)}</a></li>
      <li class="rv"><span class="reach-k">${esc(t.reach.github)}</span><a class="link link-lg" href="${LINKS.github}" target="_blank" rel="noopener">github.com/lucasguilhermessilva</a></li>
      <li class="rv"><span class="reach-k">${esc(t.reach.where)}</span><span>${esc(t.reach.whereVal)}</span></li>
      <li class="rv"><span class="reach-k">${esc(t.reach.langs)}</span><span>${esc(t.reach.langsVal)}</span></li>
    </ul>
  </section>
</main>

<footer class="foot" data-chapter="light">
  <div class="foot-top">
    <div>
      <p class="foot-h">${esc(t.footNav)}</p>
      <ul>
        <li><a href="#services">${esc(t.nav.services)}</a></li>
        <li><a href="#work">${esc(t.nav.work)}</a></li>
        <li><a href="#stack">${esc(t.nav.stack)}</a></li>
        <li><a href="#process">${esc(t.nav.process)}</a></li>
        <li><a href="#contact">${esc(t.nav.contact)}</a></li>
      </ul>
    </div>
    <div>
      <p class="foot-h">${esc(t.footLinks)}</p>
      <ul>
        <li><a href="${LINKS.github}" target="_blank" rel="noopener">GitHub</a></li>
        <li><a href="${LINKS.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
        <li><a href="${LINKS.fastia}" target="_blank" rel="noopener">Fast IA</a></li>
        <li><a href="${LINKS.nuxio}" target="_blank" rel="noopener">Nuxio</a></li>
        <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
      </ul>
    </div>
  </div>
  <p class="foot-name" aria-hidden="true">Lucas Santos</p>
  <div class="foot-end">
    <p class="legal">${esc(t.legal)}</p>
    <a class="link" href="#top">${esc(t.top)}</a>
  </div>
</footer>
<script src="${prefix}assets/config.js"></script>
<script src="${prefix}assets/site.js" defer></script>
</body>
</html>
`;
}

mkdirSync(join(ROOT, 'pt'), { recursive: true });
writeFileSync(join(ROOT, 'index.html'), page(T.en));
writeFileSync(join(ROOT, 'pt', 'index.html'), page(T.pt));
console.log('ok: index.html, pt/index.html');
