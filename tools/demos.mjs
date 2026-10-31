// Demos animadas de cada case, desenhadas em HTML/CSS. O motor fica em assets/site.js.
// Elementos com data-s="N" aparecem no passo N; data-x="N" apaga no passo N;
// data-type="texto" é digitado quando o elemento aparece; data-count="de>para" conta no passo data-at;
// data-cur="N" leva o cursor até o elemento no passo N e clica.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const bars = (n) => Array.from({ length: n }, (_, i) => `<i style="--h:${[40, 70, 55, 90, 35, 80, 60, 95, 45, 75, 50, 85][i % 12]}%"></i>`).join('');
const cursor = '<svg class="cur" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 8-6 2-3 6z" fill="currentColor"/></svg>';
const wrap = (id, ms, label, inner, extra = '') => `<div class="demo dm-${id}" data-demo="${id}" data-ms="${ms}" role="img" aria-label="${esc(label)}" data-ui><div class="dm-in" aria-hidden="true">${inner}</div>${extra}${cursor}</div>`;

const S = {
  en: {
    wallet: { label: 'Animation: a payment request goes through the idempotency check, a serializable transaction and the cache, and the balances update.', req: 'Idempotency-Key: 7f3a', idem: 'Idempotency', idemV: 'New key, go on', tx: 'Transaction', txV: 'SERIALIZABLE, wallets locked in order', commit: 'Commit', commitV: 'Alice to Bob, 100.00', redis: 'Redis', redisV: 'Cache refreshed, response stored', alice: 'Alice', bob: 'Bob', again: 'Same request, same key', replay: 'Replay', replayV: 'Stored response returned. No second transfer.' },
    expurgos: { label: 'Animation: a savings statement enters the tool, the plan indices are applied, the calculation runs and the report is ready to copy.', file: 'savings-statement.pdf', sample: 'Sample file', go: 'Analyze', read: 'Fields read', f1: 'Bank', f2: 'Account', f3: 'Base date', f4: 'Balance', plans: ['Bresser plan', 'Verao plan', 'Collor I and II plans'], applied: 'Index applied', total: 'Base value and discount band', band: 'Band found', report: 'Report ready', copy: 'Copy report', copied: 'Copied' },
    ocr: { label: 'Animation: a court PDF enters, plain-text pages are dropped, scanned pages are read with OCR and AI, and the fields come out as JSON.', pdf: 'court-file.pdf', pages: '300+ pages', filter: 'Local filter drops plain-text pages', ocr: 'OCR and vision model read the scanned pages', fields: ['Holder', 'Bank', 'Account', 'Period', 'Previous balance'], match: 'Only the named client is kept', sheet: 'Added to the report' },
    agent: { label: 'Animation: a WhatsApp message arrives, the AI understands the intent, books a time and the CRM updates.', c1: 'Hi, do you have a time on Thursday?', intent: 'Intent: book a time', a1: 'Thursday I have 09:40 or 10:30. Which one?', c2: '09:40, please', booked: 'Thu 09:40, booked in the clinic system', stages: ['Lead', 'In talk', 'Booked'], follow: 'Reminder queued inside allowed hours', chat: 'WhatsApp', crm: 'CRM' },
    manga: { label: 'Animation: a manga page is loaded, speech balloons are detected, the translated text is fitted in the right font and size, and the pages are exported.', page: 'Page 12', go: 'Typeset', detect: 'Balloons detected', t1: 'Where are you going?', t2: 'To the library. I will be back soon.', fit: 'Font and size fitted', out: 'Exported', outV: 'Editable pages, ready for review' },
    channels: { label: 'Animation: a script becomes a voice track, then a video, then a scheduled upload, then a sales funnel.', nodes: ['Script', 'Voice', 'Video', 'Publish', 'Funnel'], script: 'Find 3 words in 30 seconds', sched: 'Scheduled for 17:00', read: 'Read back to confirm', funnel: ['Video', 'Site', 'Checkout'] },
    semplay: { label: 'Animation: a WhatsApp voice note is turned into text under the audio, with the date and place separated.', who: 'Rafael', audio: 'Voice note', go: 'Transcribe', text: 'Good morning! I got the key to the apartment on Flower Street. Can the visit be tomorrow at 10?', when: 'When', whenV: 'Tomorrow, 10:00', where: 'Where', whereV: 'Flower Street', copied: 'Copied', unheard: 'Still unheard for the sender' },
  },
  pt: {
    wallet: { label: 'Animação: uma requisição de pagamento passa pela checagem de idempotência, por uma transação serializável e pelo cache, e os saldos são atualizados.', req: 'Idempotency-Key: 7f3a', idem: 'Idempotência', idemV: 'Chave nova, segue', tx: 'Transação', txV: 'SERIALIZABLE, carteiras travadas em ordem', commit: 'Commit', commitV: 'Alice para Bob, 100,00', redis: 'Redis', redisV: 'Cache atualizado, resposta guardada', alice: 'Alice', bob: 'Bob', again: 'Mesma requisição, mesma chave', replay: 'Repetição', replayV: 'Resposta guardada devolvida. Sem segunda transferência.' },
    expurgos: { label: 'Animação: um extrato de poupança entra na ferramenta, os índices dos planos são aplicados, o cálculo roda e o relatório fica pronto para copiar.', file: 'extrato-poupanca.pdf', sample: 'Arquivo de exemplo', go: 'Analisar', read: 'Campos lidos', f1: 'Banco', f2: 'Conta', f3: 'Data-base', f4: 'Saldo', plans: ['Plano Bresser', 'Plano Verão', 'Planos Collor I e II'], applied: 'Índice aplicado', total: 'Valor base e faixa de desconto', band: 'Faixa encontrada', report: 'Relatório pronto', copy: 'Copiar relatório', copied: 'Copiado' },
    ocr: { label: 'Animação: um PDF de processo entra, as páginas só de texto são descartadas, as páginas escaneadas são lidas com OCR e IA, e os campos saem em JSON.', pdf: 'processo.pdf', pages: '300+ páginas', filter: 'Filtro local descarta páginas só de texto', ocr: 'OCR e modelo de visão leem as páginas escaneadas', fields: ['Titular', 'Banco', 'Conta', 'Período', 'Saldo anterior'], match: 'Só o cliente indicado fica', sheet: 'Entra no relatório' },
    agent: { label: 'Animação: uma mensagem chega no WhatsApp, a IA entende a intenção, agenda um horário e o CRM é atualizado.', c1: 'Oi, tem horário na quinta?', intent: 'Intenção: agendar horário', a1: 'Na quinta tenho 09h40 ou 10h30. Qual prefere?', c2: '09h40, por favor', booked: 'Qui 09h40, agendado no sistema da clínica', stages: ['Lead', 'Em conversa', 'Agendado'], follow: 'Lembrete na fila, dentro da janela de horário', chat: 'WhatsApp', crm: 'CRM' },
    manga: { label: 'Animação: uma página de mangá é carregada, os balões são detectados, o texto traduzido é encaixado na fonte e no tamanho certos e as páginas são exportadas.', page: 'Página 12', go: 'Diagramar', detect: 'Balões detectados', t1: 'Aonde você vai?', t2: 'Para a biblioteca. Volto logo.', fit: 'Fonte e tamanho ajustados', out: 'Exportado', outV: 'Páginas editáveis, prontas para revisão' },
    channels: { label: 'Animação: um roteiro vira voz, depois vídeo, depois um envio agendado, depois um funil de vendas.', nodes: ['Roteiro', 'Voz', 'Vídeo', 'Publicação', 'Funil'], script: 'Ache 3 palavras em 30 segundos', sched: 'Agendado para 17:00', read: 'Lido de volta para confirmar', funnel: ['Vídeo', 'Site', 'Checkout'] },
    semplay: { label: 'Animação: um áudio do WhatsApp vira texto embaixo do balão, com data e local separados.', who: 'Rafael', audio: 'Áudio', go: 'Transcrever', text: 'Bom dia! Consegui a chave do apartamento da Rua das Flores. A visita pode ser amanhã às 10h?', when: 'Quando', whenV: 'Amanhã, 10:00', where: 'Onde', whereV: 'Rua das Flores', copied: 'Copiado', unheard: 'Continua como não ouvido para quem mandou' },
  },
};

export function demo(id, lang, prefix = '') {
  const t = S[lang][id];
  switch (id) {
    case 'wallet':
      return wrap(id, 1000, t.label, `
        <div class="dm-row" data-s="1"><code>POST /v1/transfers</code><span><code>${esc(t.req)}</code></span></div>
        <div class="dm-row" data-s="2"><b>${esc(t.idem)}</b><span>${esc(t.idemV)}</span></div>
        <div class="dm-row" data-s="3"><b>${esc(t.tx)}</b><span>${esc(t.txV)}</span></div>
        <div class="dm-row" data-s="4"><b>${esc(t.commit)}</b><span>${esc(t.commitV)}</span></div>
        <div class="dm-row" data-s="5"><b>${esc(t.redis)}</b><span>${esc(t.redisV)}</span></div>
        <div class="dm-bal"><p><span>${esc(t.alice)}</span><b data-count="1000>900" data-at="5">900.00</b></p><p><span>${esc(t.bob)}</span><b data-count="500>600" data-at="5">600.00</b></p></div>
        <div class="dm-row dm-again" data-s="7"><code>POST /v1/transfers</code><span>${esc(t.again)}</span></div>
        <div class="dm-row" data-s="8"><b>${esc(t.replay)}</b><span>${esc(t.replayV)}</span></div>`);
    case 'expurgos':
      return wrap(id, 1000, t.label, `
        <div class="dm-row dm-file" data-s="1"><span>${esc(t.file)}</span><em>${esc(t.sample)}</em><button type="button" tabindex="-1" data-cur="2">${esc(t.go)}</button></div>
        <div class="dm-fields" data-s="3"><p class="dm-h">${esc(t.read)}</p><p><span>${esc(t.f1)}</span><u></u></p><p><span>${esc(t.f2)}</span><u></u></p><p><span>${esc(t.f3)}</span><u></u></p><p><span>${esc(t.f4)}</span><u></u></p></div>
        <div class="dm-plans">${t.plans.map((p, i) => `<div class="dm-row" data-s="${4 + i}"><b>${esc(p)}</b><span>${esc(t.applied)}</span></div>`).join('')}</div>
        <div class="dm-row" data-s="7"><b>${esc(t.total)}</b><span>${esc(t.band)}</span></div>
        <div class="dm-row dm-report" data-s="8"><b>${esc(t.report)}</b><button type="button" tabindex="-1" data-cur="9">${esc(t.copy)}</button><em data-s="10">${esc(t.copied)}</em></div>`);
    case 'ocr':
      return wrap(id, 1000, t.label, `
        <div class="dm-head" data-s="1"><code>${esc(t.pdf)}</code><span>${esc(t.pages)}</span></div>
        <div class="dm-pages" data-s="1">${Array.from({ length: 16 }, (_, i) => `<i class="${[0, 1, 2, 4, 5, 7, 8, 10, 11, 13].includes(i) ? 'txt' : 'scan'}"${[0, 1, 2, 4, 5, 7, 8, 10, 11, 13].includes(i) ? ' data-x="2"' : ''}></i>`).join('')}<b class="dm-sweep" data-s="3"></b></div>
        <p class="dm-cap" data-s="2">${esc(t.filter)}</p>
        <p class="dm-cap" data-s="3">${esc(t.ocr)}</p>
        <div class="dm-fields" data-s="4">${t.fields.map((f, i) => `<p data-s="${4 + i}"><span>${esc(f)}</span><u style="--w:${[62, 38, 46, 54, 30][i]}%"></u></p>`).join('')}</div>
        <pre class="dm-json" data-s="9"><code>{ "status": "ok",
  "titular": "...",
  "banco": "...",
  "saldo_anterior_base": ... }</code></pre>
        <p class="dm-cap" data-s="10">${esc(t.match)}. ${esc(t.sheet)}.</p>`);
    case 'agent':
      return wrap(id, 1000, t.label, `
        <div class="dm-split">
          <div class="dm-chat"><p class="dm-tag">${esc(t.chat)}</p>
            <p class="b in" data-s="1" data-type="${esc(t.c1)}">${esc(t.c1)}</p>
            <p class="dm-chip" data-s="2">${esc(t.intent)}</p>
            <p class="b out" data-s="3" data-type="${esc(t.a1)}">${esc(t.a1)}</p>
            <p class="b in" data-s="4" data-type="${esc(t.c2)}">${esc(t.c2)}</p>
            <p class="dm-chip" data-s="5">${esc(t.booked)}</p></div>
          <div class="dm-crm"><p class="dm-tag">${esc(t.crm)}</p>
            <div class="dm-stages">${t.stages.map((s, i) => `<span class="${i === 0 ? 'now' : ''}" ${i === 1 ? 'data-at="3"' : ''}${i === 2 ? 'data-at="5"' : ''}>${esc(s)}</span>`).join('')}</div>
            <div class="dm-slot" data-s="5"><span>09:40</span></div>
            <p class="dm-chip" data-s="6">${esc(t.follow)}</p></div>
        </div>`);
    case 'manga':
      return wrap(id, 1000, t.label, `
        <div class="dm-head"><span>${esc(t.page)}</span><button type="button" tabindex="-1" data-cur="2">${esc(t.go)}</button></div>
        <div class="dm-page">
          <div class="dm-art"></div>
          <div class="bl b1"><i></i><i></i><i></i><span data-s="4" data-type="${esc(t.t1)}">${esc(t.t1)}</span><em class="box" data-s="3"></em></div>
          <div class="bl b2"><i></i><i></i><i></i><i></i><span data-s="5" data-type="${esc(t.t2)}">${esc(t.t2)}</span><em class="box" data-s="3"></em></div>
        </div>
        <p class="dm-cap" data-s="3">${esc(t.detect)}</p>
        <p class="dm-chip" data-s="6">${esc(t.fit)}</p>
        <div class="dm-row" data-s="7"><b>${esc(t.out)}</b><span>${esc(t.outV)}</span></div>`);
    case 'channels':
      return wrap(id, 1100, t.label, `
        <div class="dm-flow">
          <div class="nd" data-s="1"><b>${esc(t.nodes[0])}</b><p data-type="${esc(t.script)}" data-s="1"></p></div>
          <div class="ln" data-s="2"></div>
          <div class="nd" data-s="2"><b>${esc(t.nodes[1])}</b><div class="wave">${bars(12)}</div></div>
          <div class="ln" data-s="3"></div>
          <div class="nd" data-s="3"><b>${esc(t.nodes[2])}</b><img src="${prefix}assets/img/channel-short-poster.webp" alt="" width="540" height="960" loading="lazy"></div>
          <div class="ln" data-s="4"></div>
          <div class="nd" data-s="4"><b>${esc(t.nodes[3])}</b><p>${esc(t.sched)}</p><p class="dm-chip" data-s="5">${esc(t.read)}</p></div>
          <div class="ln" data-s="6"></div>
          <div class="nd" data-s="6"><b>${esc(t.nodes[4])}</b><p class="fn">${t.funnel.map((f) => `<span>${esc(f)}</span>`).join('')}</p></div>
        </div>`);
    case 'semplay':
      return wrap(id, 1000, t.label, `
        <div class="dm-chat sp">
          <p class="dm-tag">${esc(t.who)}</p>
          <div class="aud"><span class="play"></span><div class="wave">${bars(18)}</div><em>3:58</em></div>
          <button type="button" tabindex="-1" data-cur="2">${esc(t.go)}</button>
          <p class="tr" data-s="3" data-type="${esc(t.text)}">${esc(t.text)}</p>
          <div class="chips" data-s="4"><span><i>${esc(t.when)}</i>${esc(t.whenV)}</span><span><i>${esc(t.where)}</i>${esc(t.whereV)}</span></div>
          <p class="dm-chip" data-s="5">${esc(t.copied)}</p>
          <p class="dm-cap" data-s="6">${esc(t.unheard)}</p>
        </div>`);
    default:
      return '';
  }
}
