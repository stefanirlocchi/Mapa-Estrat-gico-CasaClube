const steps = [
  {
    title: "Área da cliente",
    summary: "Entrada inicial para acessar o mapa estratégico e iniciar o preenchimento.",
    intro: `
      <strong>Bem-vinda à sua área.</strong><br><br>
      Este é o ponto de entrada do seu Mapa Estratégico Casa Clube®. Aqui você vai navegar pelas etapas da mentoria,
      registrar suas respostas e acompanhar a evolução do diagnóstico.
      <br><br>
      Quando quiser começar, avance para a próxima etapa. Tudo que você preencher ficará salvo neste navegador.
    `,
    fields: []
  },
  {
    title: "Boas-vindas",
    summary: "Contextualiza a metodologia e prepara o terreno para a mentoria.",
    intro: `
      <strong>MAPA ESTRATÉGICO CASA CLUBE®</strong><br><br>
      Muito prazer. Antes de falarmos sobre sua empresa, quero falar sobre você.
      <br><br>
      Empresas quase nunca deixam de crescer por falta de trabalho. Elas deixam de crescer porque continuam tomando decisões sem clareza.
      <br><br>
      Meu papel nesta mentoria não é entregar respostas prontas. É ajudar você a enxergar o seu negócio sob uma nova perspectiva.
      <br><br>
      Este Mapa Estratégico será a base de todo o nosso trabalho. Quanto mais sinceras forem suas respostas, mais estratégica será nossa construção.
    `,
    fields: []
  },
  {
    title: "A Primeira Pergunta",
    summary: "Abre espaço para a questão mais importante do diagnóstico.",
    intro: `
      Essa costuma ser a resposta mais importante de todo o diagnóstico.
      Muitas vezes, ela revela mais do que todas as outras perguntas juntas.
    `,
    specialClass: "big-question",
    fields: [
      ["textarea", "Se você pudesse me fazer apenas UMA pergunta sobre o seu negócio, e eu tivesse que responder com total sinceridade, qual seria essa pergunta?"]
    ]
  },
  {
    title: "Como funciona",
    summary: "Explica o fluxo antes, durante e depois da mentoria.",
    intro: `
      <strong>O Mapa Estratégico acontece em três momentos.</strong><br><br>
      <strong>01 — Antes:</strong> você responde este diagnóstico. Assim, começamos falando de estratégia, e não apenas coletando informações básicas.<br><br>
      <strong>02 — Durante:</strong> nos encontros, registrarei percepções, hipóteses, oportunidades e decisões dentro do seu Mapa Estratégico.<br><br>
      <strong>03 — Depois:</strong> ao final da mentoria, você receberá o Relatório Estratégico Casa Clube®, com diagnóstico, oportunidades, prioridades, plano de ação, recomendações e próximos passos.
    `,
    fields: []
  },
  {
    title: "Expectativas",
    summary: "Entende o gatilho da busca pela mentoria e o valor esperado.",
    intro: "Aqui eu quero entender por que este é o momento certo para começarmos.",
    fields: [
      ["textarea", "O que fez você buscar esta mentoria agora?"],
      ["textarea", "Existe algum acontecimento recente que motivou essa decisão?"],
      ["textarea", "O que você espera que aconteça ao final da mentoria?"],
      ["textarea", "O que faria você dizer: essa mentoria valeu cada minuto?"],
      ["checkbox", "Em quais temas você acredita que eu posso gerar mais valor?", [
        "Estratégia Comercial", "Posicionamento da Marca", "Visual Merchandising", "Experiência da Loja",
        "Curadoria e Mix", "Compras", "Calendário Comercial", "Marketing",
        "Organização da Operação", "Crescimento", "Gestão", "Outro"
      ]],
      ["textarea", "Existe alguma decisão importante que gostaria de tomar durante esse processo?"],
      ["textarea", "Existe algum assunto que prefere não abordar?"],
      ["textarea", "Como você aprende melhor?"],
      ["textarea", "O que espera de mim como mentora?"]
    ]
  },
  {
    title: "Origem",
    summary: "Registra história, legado e base da empresa.",
    intro: "Quem é sua empresa, de onde ela veio e o que precisa ser preservado.",
    fields: [
      ["textarea", "Como nasceu a empresa?"],
      ["textarea", "Quais foram os momentos mais importantes da história da empresa?"],
      ["textarea", "Quais foram os maiores desafios enfrentados?"],
      ["textarea", "O que nunca mudou desde a fundação?"],
      ["textarea", "Qual legado deseja preservar?"],
      ["textarea", "Do que você mais se orgulha na empresa?"]
    ]
  },
  {
    title: "Essência",
    summary: "Investiga percepção de marca, promessa e sentimentos desejados.",
    intro: "Aqui buscamos entender o que a marca representa e como deseja ser lembrada.",
    fields: [
      ["textarea", "Se sua marca fosse uma pessoa, como ela seria?"],
      ["textarea", "Quais sentimentos sua marca deve transmitir?"],
      ["textarea", "Como acredita que o mercado percebe sua empresa hoje?"],
      ["textarea", "Como gostaria que a empresa fosse percebida?"],
      ["textarea", "O que jamais deve mudar na empresa?"],
      ["textarea", "O que acredita que precisa evoluir?"]
    ]
  },
  {
    title: "Momento Atual",
    summary: "Mapeia o cenário presente, travas e forças do negócio.",
    intro: "Sua empresa vive um momento específico. É ele que precisamos entender.",
    fields: [
      ["textarea", "O que hoje está funcionando muito bem?"],
      ["textarea", "O que deixou de funcionar?"],
      ["textarea", "O que mudou no mercado?"],
      ["textarea", "O que mais preocupa você?"],
      ["textarea", "Se nada mudar nos próximos 12 meses, o que pode acontecer?"],
      ["textarea", "Qual decisão você está adiando?"],
      ["textarea", "O que você acredita que está fazendo certo?"],
      ["textarea", "O que você acredita que está fazendo errado?"]
    ]
  },
  {
    title: "Cliente",
    summary: "Define quem compra, por que compra e quem queremos atrair.",
    intro: "Entender quem compra, quem queremos atrair e por que continuam comprando.",
    fields: [
      ["textarea", "Quem é seu melhor cliente?"],
      ["textarea", "O que esse cliente mais valoriza?"],
      ["textarea", "Por que ele escolhe comprar da sua empresa?"],
      ["textarea", "O que faz um cliente continuar comprando por muitos anos?"],
      ["textarea", "Existe algum perfil de cliente que gostaria de conquistar?"]
    ]
  },
  {
    title: "Produto",
    summary: "Avalia mix, categorias e oportunidades de posicionamento.",
    intro: "Produto não é apenas mercadoria. Produto comunica posicionamento, valor e estratégia.",
    fields: [
      ["textarea", "Como você define seu mix?"],
      ["textarea", "Quais produtos representam sua marca?"],
      ["textarea", "Quais produtos vendem melhor?"],
      ["textarea", "Quais produtos já não fazem mais sentido?"],
      ["textarea", "Se precisasse reduzir 20% do mix, o que sairia?"],
      ["textarea", "Que oportunidade de categoria ainda não foi explorada?"],
      ["textarea", "O que a empresa faz melhor do que qualquer concorrente?"]
    ]
  },
  {
    title: "Loja",
    summary: "Observa jornada, experiência e narrativa do espaço.",
    intro: "A loja precisa vender, encantar e contar uma história coerente com a marca.",
    fields: [
      ["textarea", "Descreva a jornada do cliente dentro da loja."],
      ["textarea", "Sua loja conta uma história ou apenas expõe produtos?"],
      ["textarea", "Qual espaço encanta?"],
      ["textarea", "Qual espaço precisa ser repensado?"],
      ["textarea", "Como gostaria que sua loja fosse lembrada?"],
      ["textarea", "Quais mudanças de visual merchandising poderiam melhorar a experiência?"]
    ]
  },
  {
    title: "Comercial",
    summary: "Revisa venda, relacionamento, fidelização e ritmo comercial.",
    intro: "Aqui observamos venda, relacionamento, fidelização e crescimento.",
    fields: [
      ["textarea", "Hoje você vende por preço, produto, relacionamento, experiência ou marca? Explique."],
      ["textarea", "Como fideliza clientes?"],
      ["textarea", "Como acompanha resultados comerciais?"],
      ["textarea", "Existe calendário comercial? Como ele é construído?"],
      ["textarea", "Se as vendas aumentassem 30% amanhã, sua operação suportaria?"]
    ]
  },
  {
    title: "Gestão",
    summary: "Aponta dependências, processos e pontos de trava.",
    intro: "Crescimento precisa de clareza, processo e tomada de decisão.",
    fields: [
      ["textarea", "Quais processos dependem exclusivamente de você?"],
      ["textarea", "Quais processos precisam ser organizados?"],
      ["textarea", "Como a equipe participa das decisões?"],
      ["textarea", "Como gostaria que os colaboradores descrevessem a empresa?"],
      ["textarea", "O que hoje mais trava a gestão?"]
    ]
  },
  {
    title: "Futuro",
    summary: "Transforma desejo em direção estratégica de médio prazo.",
    intro: "Aqui transformamos desejo em direção.",
    fields: [
      ["textarea", "Onde você imagina a empresa daqui a cinco anos?"],
      ["textarea", "E daqui a dez anos?"],
      ["textarea", "Quais oportunidades considera mais promissoras?"],
      ["textarea", "Quais desafios precisarão ser superados?"],
      ["textarea", "O que significa sucesso para você?"]
    ]
  },
  {
    title: "Prioridades",
    summary: "Força a escolha do que vem primeiro para evitar dispersão.",
    intro: "Crescer também é escolher o que vem primeiro.",
    fields: [
      ["textarea", "Liste todas as dores que existem hoje."],
      ["textarea", "Agora escolha apenas três."],
      ["textarea", "Qual delas devemos atacar primeiro?"],
      ["textarea", "Se pudesse mudar apenas UMA coisa amanhã, qual seria?"],
      ["textarea", "Existe alguma pergunta que você espera que eu responda durante a mentoria?"]
    ]
  },
  {
    title: "Documentos",
    summary: "Organiza materiais de apoio para a leitura estratégica.",
    intro: "Envie ou liste materiais que ajudem na análise estratégica.",
    fields: [
      ["file", "Fotos da fachada, vitrine e interior da loja"],
      ["file", "Vídeo caminhando pela loja"],
      ["file", "Instagram, site e canais de venda"],
      ["file", "Catálogo, apresentação comercial ou mix de produtos"],
      ["file", "Calendário comercial, relatórios ou materiais de venda"],
      ["textarea", "Observações sobre os materiais enviados"]
    ]
  },
  {
    title: "Reflexão Final",
    summary: "Consolida identidade, orgulho e visão de legado.",
    intro: "Complete as frases com sinceridade.",
    fields: [
      ["textarea", "Minha empresa existe para..."],
      ["textarea", "Tenho orgulho dela porque..."],
      ["textarea", "Nunca devemos perder..."],
      ["textarea", "Se minha empresa deixasse de existir amanhã, os clientes sentiriam falta de..."],
      ["textarea", "Daqui a cinco anos gostaria que ela fosse lembrada como..."]
    ]
  },
  {
    title: "Observações da Mentora",
    summary: "Área interna para hipóteses, prioridades e próximos passos.",
    intro: "Área interna para registrar percepções durante os encontros.",
    fields: [
      ["textarea", "Hipóteses iniciais"],
      ["textarea", "Pontos fortes observados"],
      ["textarea", "Oportunidades de melhoria"],
      ["textarea", "Prioridades sugeridas"],
      ["textarea", "Decisões tomadas durante os encontros"],
      ["textarea", "Ações de curto prazo"],
      ["textarea", "Ações de médio e longo prazo"],
      ["textarea", "Próximos passos para o relatório final"]
    ]
  },
  {
    title: "Gerar relatório final",
    summary: "Última etapa para revisar o mapa e exportar o PDF consolidado.",
    intro: `
      <strong>Etapa final do Mapa Estratégico.</strong><br><br>
      Revise o diagnóstico, confirme as observações e gere o relatório em PDF quando tudo estiver pronto.
      <br><br>
      O arquivo final reunirá todas as respostas registradas ao longo do processo.
    `,
    fields: []
  }
];

let currentStep = Number(localStorage.getItem("cc_currentStep")) || 0;
let mentorMode = sessionStorage.getItem("cc_mentor_unlocked") === "true";
let appMode = sessionStorage.getItem("cc_app_mode") || "landing";
let mentorClients = [];

const CLIENT_ACCESS_CODE = "2026";
const USE_LOCAL_API = window.location.protocol === "file:" || window.location.port === "8000";
const API_BASE_URL = USE_LOCAL_API ? "http://127.0.0.1:5000" : window.location.origin;

const menu = document.getElementById("menu");
const formArea = document.getElementById("formArea");
const stepTitle = document.getElementById("stepTitle");
const stepSummary = document.getElementById("stepSummary");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const stepCount = document.getElementById("stepCount");
const answerCount = document.getElementById("answerCount");

function slug(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function save(id, value) {
  localStorage.setItem("cc_" + id, value);
}

function load(id) {
  return localStorage.getItem("cc_" + id) || "";
}

function loadAny(prefix, fallback = "") {
  return localStorage.getItem("cc_" + prefix) || fallback;
}

function savedAnswerCount() {
  return Object.keys(localStorage).filter(key => key.startsWith("cc_") && key !== "cc_currentStep" && load(key.slice(3)).trim() !== "").length;
}

function clientProfile() {
  return {
    name: load("client_name"),
    company: load("client_company"),
    clientId: load("client_id"),
    sessionId: load("session_id"),
  };
}

function currentSessionId() {
  return load("session_id");
}

async function saveAnswerRemote(stepKey, fieldKey, answer) {
  const sessionId = currentSessionId();

  if (!sessionId) {
    return;
  }

  try {
    await apiRequest(`/api/sessions/${sessionId}/answers`, {
      method: "POST",
      body: JSON.stringify({
        step_key: stepKey,
        field_key: fieldKey,
        answer,
      }),
    });
  } catch (error) {
    console.error("Failed to save answer", error);
  }
}

async function saveMentorNoteRemote(stepKey, note) {
  const sessionId = currentSessionId();

  if (!sessionId) {
    return;
  }

  try {
    await apiRequest(`/api/sessions/${sessionId}/notes`, {
      method: "POST",
      body: JSON.stringify({
        step_key: stepKey,
        note,
      }),
    });
  } catch (error) {
    console.error("Failed to save mentor note", error);
  }
}

function hydrateHistory(history) {
  const answers = history.answers || [];
  const notes = history.notes || [];

  answers.forEach(item => {
    save(item.field_key, item.answer || "");
  });

  notes.forEach(item => {
    save(`observacao_mentora_${item.step_key}`, item.note || "");
  });

  const session = history.session || {};
  if (session.client_id) {
    save("client_id", String(session.client_id));
  }
}

function formatDateTime(value) {
  if (!value) {
    return "—";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function buildReportUrl(reportPath) {
  return reportPath ? `${API_BASE_URL}/api/reports/${encodeURIComponent(reportPath)}` : "";
}

function buildReportDownloadUrl(reportPath) {
  return reportPath ? `${API_BASE_URL}/api/reports/${encodeURIComponent(reportPath)}/download` : "";
}

function buildStepSummaryMap(items = []) {
  const summary = new Map();

  items.forEach(item => {
    if (!summary.has(item.step_key)) {
      summary.set(item.step_key, []);
    }

    summary.get(item.step_key).push(item);
  });

  return summary;
}

async function fetchMentorClientDashboard(clientId, sessionId = null) {
  const client = await apiRequest(`/api/clients/${clientId}`, { method: "GET" });
  const sessions = await apiRequest(`/api/clients/${clientId}/sessions`, { method: "GET" });
  const sessionList = sessions.sessions || [];
  const selectedSession = sessionId
    ? sessionList.find(item => String(item.id) === String(sessionId)) || null
    : (sessionList.length ? sessionList[0] : null);

  if (!selectedSession) {
    return { client, sessions: [], history: null };
  }

  const history = await apiRequest(`/api/sessions/${selectedSession.id}/history`, { method: "GET" });
  return { client, sessions: sessionList, history, selectedSessionId: selectedSession.id };
}

async function getOrCreateSession(clientId) {
  const latest = await apiRequest(`/api/clients/${clientId}/sessions/latest`, {
    method: "GET",
  });

  if (latest.session && latest.session.id && latest.session.status === "open") {
    const history = await apiRequest(`/api/sessions/${latest.session.id}/history`, {
      method: "GET",
    });

    hydrateHistory(history);
    save("session_id", String(latest.session.id));
    return latest.session;
  }

  const session = await apiRequest("/api/sessions", {
    method: "POST",
    body: JSON.stringify({ client_id: clientId }),
  });

  save("session_id", String(session.id));
  return session;
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.error || `request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

function setAppMode(mode) {
  appMode = mode;
  sessionStorage.setItem("cc_app_mode", mode);
}

function renderLanding() {
  const profile = clientProfile();

  stepTitle.textContent = "Portal Casa Clube";
  stepSummary.textContent = "Escolha a área de acesso para continuar.";

  formArea.innerHTML = `
    <div class="landing-card">
      <p class="landing-kicker">Acesso inicial</p>
      <h2>Selecione a sua área.</h2>
      <p>
        A cliente entra com o acesso dela para preencher o mapa. A mentora entra com senha para ver todas as respostas.
      </p>

      <div class="landing-form">
        <label for="clientName">Nome da cliente</label>
        <input id="clientName" type="text" placeholder="Digite seu nome" value="${escapeHtml(profile.name)}">

        <label for="clientCompany">Nome da empresa</label>
        <input id="clientCompany" type="text" placeholder="Digite o nome da empresa" value="${escapeHtml(profile.company)}">

        <label for="clientAccessCode">Código de acesso da cliente</label>
        <input id="clientAccessCode" type="password" inputmode="numeric" placeholder="Digite o código de acesso" value="${escapeHtml(load("client_access_code"))}">

        <p class="landing-form-hint">
          Esses dados serão usados no relatório final e na área da mentora.
        </p>
      </div>

      <div class="landing-grid">
        <article class="landing-option">
          <span>Cliente</span>
          <strong>Minha área</strong>
          <p>Digite seu acesso para iniciar o preenchimento do mapa estratégico.</p>
          <button id="clientAccessBtn">Acessar área da cliente</button>
        </article>

        <article class="landing-option">
          <span>Mentora</span>
          <strong>Área interna</strong>
          <p>Acesso interno para visualizar todas as respostas e observações.</p>
          <label for="mentorAccessCode" class="landing-mini-label">Senha da mentora</label>
          <input id="mentorAccessCode" type="password" placeholder="Digite a senha" value="${escapeHtml(load("mentor_access_code"))}">
          <button id="mentorAccessBtn" class="outline">Acessar área da mentora</button>
        </article>
      </div>
    </div>
  `;

  const clientName = document.getElementById("clientName");
  const clientCompany = document.getElementById("clientCompany");
  const clientAccessCode = document.getElementById("clientAccessCode");
  const mentorAccessCode = document.getElementById("mentorAccessCode");

  clientName.addEventListener("input", e => save("client_name", e.target.value));
  clientCompany.addEventListener("input", e => save("client_company", e.target.value));
  clientAccessCode.addEventListener("input", e => save("client_access_code", e.target.value));
  mentorAccessCode.addEventListener("input", e => save("mentor_access_code", e.target.value));

  document.getElementById("clientAccessBtn").onclick = () => {
    const entered = clientAccessCode.value.trim();

    if (entered.trim() !== CLIENT_ACCESS_CODE) {
      window.alert("Acesso da cliente incorreto.");
      return;
    }

    const clientNameValue = clientName.value.trim();
    const clientCompanyValue = clientCompany.value.trim();

    if (!clientNameValue || !clientCompanyValue) {
      window.alert("Preencha o nome da cliente e o nome da empresa antes de entrar.");
      return;
    }

    (async () => {
      try {
        const clientResult = await apiRequest("/api/clients/resolve", {
          method: "POST",
          body: JSON.stringify({
            name: clientNameValue,
            company: clientCompanyValue,
            access_code: CLIENT_ACCESS_CODE,
          }),
        });

        const sessionResult = await getOrCreateSession(clientResult.client.id);

        save("client_name", clientResult.client.name);
        save("client_company", clientResult.client.company);
        save("client_id", String(clientResult.client.id));
        save("session_id", String(sessionResult.id));

        currentStep = 0;
        setAppMode("client");
        mentorMode = false;
        render();
      } catch (error) {
        window.alert(`Não foi possível salvar a cliente: ${error.message}`);
      }
    })();
  };

  document.getElementById("mentorAccessBtn").onclick = () => {
    const entered = mentorAccessCode.value.trim();

    if (entered === "2809") {
      setAppMode("mentor");
      mentorMode = true;
      sessionStorage.setItem("cc_mentor_unlocked", "true");
      render();
      return;
    }

    window.alert("Senha incorreta.");
  };
}

function renderMentorPanel() {
  stepTitle.textContent = "Área da mentora";
  stepSummary.textContent = "Selecione uma cliente para ver histórico, respostas e observações.";

  formArea.innerHTML = `
    <div class="intro mentor-intro">
      <strong>Acesso liberado.</strong><br><br>
      Aqui você pode revisar todas as respostas registradas no mapa estratégico, cliente por cliente.
    </div>
    <div class="mentor-dashboard">
      <aside class="mentor-client-list" id="mentorClientList">
        <div class="mentor-list-loading">Carregando clientes...</div>
      </aside>
      <section class="mentor-history" id="mentorHistoryPanel">
        <div class="mentor-list-loading">Selecione uma cliente para abrir o histórico.</div>
      </section>
    </div>
    <div class="mentor-actions">
      <button id="mentorExitBtn" class="outline">Voltar ao mapa</button>
      <button id="mentorLockBtn" class="outline">Bloquear acesso</button>
    </div>
  `;

  const mentorClientList = document.getElementById("mentorClientList");
  const mentorHistoryPanel = document.getElementById("mentorHistoryPanel");
  let activeClientId = null;
  let activeSessionId = null;

  const renderHistory = dashboard => {
    const historyData = dashboard.history;
    const sessions = dashboard.sessions || [];

    if (!historyData || !historyData.session) {
      mentorHistoryPanel.innerHTML = '<div class="mentor-list-loading">Nenhum histórico encontrado para esta cliente.</div>';
      return;
    }

    const session = historyData.session;
    const answers = historyData.answers || [];
    const notes = historyData.notes || [];
    const notesByStep = buildStepSummaryMap(notes);
    const answersByStep = buildStepSummaryMap(answers);
    const reportUrl = buildReportUrl(session.last_report_path);
    const reportDownloadUrl = buildReportDownloadUrl(session.last_report_path);

    const sessionButtons = sessions.map(item => {
      const isActive = String(item.id) === String(activeSessionId || session.id);
      const reportState = Number(item.report_count || 0) > 0 ? "Relatório gerado" : "Relatório pendente";
      return `
        <button class="mentor-session-card ${isActive ? "active" : ""}" data-session-id="${item.id}">
          <strong>Sessão #${escapeHtml(item.id)}</strong>
          <span>${escapeHtml(item.status || "—")}</span>
          <small>${escapeHtml(reportState)} · ${escapeHtml(formatDateTime(item.updated_at))}</small>
        </button>
      `;
    }).join("");

    const sections = steps.map(step => {
      const stepAnswers = answersByStep.get(step.title) || [];
      const stepNotes = notesByStep.get(step.title) || [];
      const answerItems = stepAnswers.map(item => `
        <div class="answer-item">
          <strong>${escapeHtml(item.field_key)}</strong>
          <p>${escapeHtml(item.answer || "—")}</p>
        </div>
      `).join("");

      const noteItems = stepNotes.map(item => `
        <div class="answer-item mentor-note-card">
          <strong>Observação da mentora</strong>
          <p>${escapeHtml(item.note || "—")}</p>
        </div>
      `).join("");

      if (!answerItems && !noteItems) {
        return "";
      }

      return `
        <article class="mentor-section">
          <div class="mentor-section-head">
            <h2>${escapeHtml(step.title)}</h2>
            <span>${stepAnswers.length} resposta(s)</span>
          </div>
          <p class="mentor-summary">${escapeHtml(step.summary || "")}</p>
          <div class="mentor-items">
            ${answerItems || '<div class="answer-item empty"><strong>Sem respostas</strong><p>Não há respostas nesta etapa.</p></div>'}
            ${noteItems}
          </div>
        </article>
      `;
    }).filter(Boolean).join("");

    mentorHistoryPanel.innerHTML = `
      <div class="mentor-history-head">
        <div>
          <p class="landing-kicker">Histórico selecionado</p>
          <h2>${escapeHtml(session.client_name || "—")}</h2>
          <p>${escapeHtml(session.client_company || "—")}</p>
        </div>
        <div class="mentor-history-meta">
          <div><span>Sessão</span><strong>#${escapeHtml(session.id)}</strong></div>
          <div><span>Início</span><strong>${escapeHtml(formatDateTime(session.started_at))}</strong></div>
          <div><span>Atualizado</span><strong>${escapeHtml(formatDateTime(session.updated_at))}</strong></div>
          <div><span>Status</span><strong>${escapeHtml(session.status || "—")}</strong></div>
          <div><span>Relatório</span><strong>${Number(session.report_count || 0) > 0 ? "Gerado" : "Pendente"}</strong></div>
          <div><span>Último PDF</span><strong>${escapeHtml(formatDateTime(session.last_report_generated_at))}</strong></div>
        </div>
      </div>
      <div class="mentor-session-list">
        <div class="mentor-session-list-head">
          <p class="landing-kicker">Sessões do cliente</p>
          <span>${sessions.length} sessão(ões)</span>
        </div>
        <div class="mentor-session-grid">
          ${sessionButtons || '<div class="mentor-list-loading">Nenhuma sessão encontrada para esta cliente.</div>'}
        </div>
      </div>
      ${reportUrl ? `
        <section class="mentor-report-panel">
          <div class="mentor-report-panel-head">
            <div>
              <p class="landing-kicker">Relatório salvo</p>
              <h3>Arquivo PDF da sessão #${escapeHtml(session.id)}</h3>
              <p>Abra, baixe ou compartilhe o relatório final desta sessão.</p>
            </div>
            <div class="mentor-report-state">
              <strong>${Number(session.report_count || 0) > 0 ? "Gerado" : "Pendente"}</strong>
              <span>${escapeHtml(formatDateTime(session.last_report_generated_at))}</span>
            </div>
          </div>
          <div class="mentor-report-actions">
            <a class="mentor-report-link" href="${reportUrl}" target="_blank" rel="noopener noreferrer">Abrir PDF</a>
            <a class="mentor-report-link outline-link" href="${reportDownloadUrl}" download>Baixar PDF</a>
            <button class="mentor-report-link ghost-link" type="button" data-copy-report-link>Copiar link</button>
            <button class="mentor-report-link ghost-link" type="button" data-share-report>Compartilhar</button>
          </div>
        </section>
      ` : ""}
      <div class="mentor-grid">
        ${sections || '<div class="mentor-list-loading">Esta sessão ainda não tem respostas.</div>'}
      </div>
    `;

    const copyReportLinkBtn = mentorHistoryPanel.querySelector("[data-copy-report-link]");
    if (copyReportLinkBtn) {
      copyReportLinkBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(reportUrl);
          copyReportLinkBtn.textContent = "Link copiado";
          window.setTimeout(() => {
            copyReportLinkBtn.textContent = "Copiar link";
          }, 1800);
        } catch (error) {
          window.alert(`Não foi possível copiar o link: ${error.message}`);
        }
      });
    }

    const shareReportBtn = mentorHistoryPanel.querySelector("[data-share-report]");
    if (shareReportBtn) {
      shareReportBtn.addEventListener("click", async () => {
        try {
          if (navigator.share) {
            await navigator.share({
              title: `Relatório Casa Clube - ${session.client_name || "cliente"}`,
              text: `Relatório final da sessão #${session.id}`,
              url: reportUrl,
            });
            return;
          }

          await navigator.clipboard.writeText(reportUrl);
          shareReportBtn.textContent = "Link copiado";
          window.setTimeout(() => {
            shareReportBtn.textContent = "Compartilhar";
          }, 1800);
        } catch (error) {
          window.alert(`Não foi possível compartilhar o relatório: ${error.message}`);
        }
      });
    }

    mentorHistoryPanel.querySelectorAll("[data-session-id]").forEach(button => {
      button.addEventListener("click", () => {
        mentorHistoryPanel.querySelectorAll(".mentor-session-card").forEach(card => card.classList.remove("active"));
        button.classList.add("active");
        const sessionId = button.getAttribute("data-session-id");
        activeSessionId = sessionId;
        void activateSession(sessionId);
      });
    });
  };

  const activateSession = async sessionId => {
    if (!activeClientId) {
      return;
    }

    mentorHistoryPanel.innerHTML = '<div class="mentor-list-loading">Carregando histórico...</div>';
    try {
      const dashboard = await fetchMentorClientDashboard(activeClientId, sessionId);
      activeSessionId = dashboard.selectedSessionId || sessionId;
      renderHistory(dashboard);
    } catch (error) {
      mentorHistoryPanel.innerHTML = `<div class="mentor-list-loading">${escapeHtml(error.message)}</div>`;
    }
  };

  const activateClient = async (clientId, preferredSessionId = null) => {
    activeClientId = clientId;
    mentorHistoryPanel.innerHTML = '<div class="mentor-list-loading">Carregando histórico...</div>';
    try {
      const dashboard = await fetchMentorClientDashboard(clientId, preferredSessionId);
      activeSessionId = dashboard.selectedSessionId || preferredSessionId || null;
      renderHistory(dashboard);
    } catch (error) {
      mentorHistoryPanel.innerHTML = `<div class="mentor-list-loading">${escapeHtml(error.message)}</div>`;
    }
  };

  const renderMentorClientList = async clients => {
    if (!clients.length) {
      mentorClientList.innerHTML = '<div class="mentor-list-loading">Nenhuma cliente cadastrada.</div>';
      return;
    }

    mentorClientList.innerHTML = clients.map((client, index) => `
      <button class="mentor-client-card ${index === 0 ? "active" : ""}" data-client-id="${client.id}">
        <strong>${escapeHtml(client.name)}</strong>
        <span>${escapeHtml(client.company)}</span>
        <small>ID ${escapeHtml(client.id)} · ${escapeHtml(client.access_code)}</small>
      </button>
    `).join("");

    mentorClientList.querySelectorAll("[data-client-id]").forEach(button => {
      button.addEventListener("click", () => {
        mentorClientList.querySelectorAll(".mentor-client-card").forEach(card => card.classList.remove("active"));
        button.classList.add("active");
        const clientId = button.getAttribute("data-client-id");
        void activateClient(clientId);
      });
    });
  };

  void (async () => {
    try {
      const response = await apiRequest("/api/clients", { method: "GET" });
      mentorClients = response.clients || [];
      await renderMentorClientList(mentorClients);

      const currentClientId = currentSessionId() ? load("client_id") : "";
      const currentMentorSessionId = currentSessionId() ? load("session_id") : "";
      if (currentClientId) {
        await activateClient(currentClientId, currentMentorSessionId || null);
      } else if (mentorClients[0]) {
        await activateClient(mentorClients[0].id);
      } else {
        mentorHistoryPanel.innerHTML = '<div class="mentor-list-loading">Nenhuma cliente cadastrada ainda.</div>';
      }
    } catch (error) {
      mentorClientList.innerHTML = `<div class="mentor-list-loading">${escapeHtml(error.message)}</div>`;
    }
  })();

  document.getElementById("mentorExitBtn").onclick = () => {
    mentorMode = false;
    sessionStorage.removeItem("cc_mentor_unlocked");
    render();
  };

  document.getElementById("mentorLockBtn").onclick = () => {
    mentorMode = false;
    sessionStorage.removeItem("cc_mentor_unlocked");
    render();
  };
}

function renderMenu() {
  menu.innerHTML = "";

  const homeBtn = document.createElement("button");
  homeBtn.textContent = "Página inicial";
  homeBtn.className = appMode === "landing" ? "active" : "";
  homeBtn.onclick = () => {
    mentorMode = false;
    setAppMode("landing");
    render();
  };
  menu.appendChild(homeBtn);

  if (appMode === "landing") {
    return;
  }

  const mentorBtn = document.createElement("button");
  mentorBtn.textContent = mentorMode ? "Área da mentora (aberta)" : "Área da mentora";
  mentorBtn.className = mentorMode ? "active mentor-tab" : "mentor-tab";
  mentorBtn.onclick = () => {
    if (mentorMode) {
      renderMentorPanel();
      return;
    }

    const mentorAccessCode = document.getElementById("mentorAccessCode");
    if (mentorAccessCode) {
      mentorAccessCode.focus();
    }
  };
  menu.appendChild(mentorBtn);

  steps.forEach((step, index) => {
    const btn = document.createElement("button");
    btn.textContent = `${index + 1}. ${step.title}`;
    btn.className = index === currentStep ? "active" : "";
    btn.onclick = () => {
      currentStep = index;
      localStorage.setItem("cc_currentStep", currentStep);
      render();
    };
    menu.appendChild(btn);
  });
}

function render() {
  if (appMode === "landing") {
    mentorMode = false;
    renderLanding();
    renderMenu();
    progressText.textContent = "Entrada";
    progressBar.style.width = "0%";
    stepCount.textContent = `0/${steps.length}`;
    answerCount.textContent = String(savedAnswerCount());
    document.getElementById("prevBtn").disabled = true;
    document.getElementById("nextBtn").textContent = "Entrar na área";
    document.getElementById("pdfBtn").hidden = true;
    return;
  }

  if (mentorMode) {
    renderMentorPanel();
    renderMenu();
    progressText.textContent = "Acesso da mentora";
    progressBar.style.width = "100%";
    stepCount.textContent = `${steps.length}/${steps.length}`;
    answerCount.textContent = String(savedAnswerCount());
    document.getElementById("prevBtn").disabled = true;
    document.getElementById("nextBtn").textContent = "Área da mentora";
    document.getElementById("pdfBtn").hidden = true;
    return;
  }

  const step = steps[currentStep];
  stepTitle.textContent = step.title;
  stepSummary.textContent = step.summary || "";

  formArea.innerHTML = `<div class="intro">${step.intro}</div>`;

  if (currentStep === 0) {
    formArea.innerHTML += `
      <div class="client-home-card">
        <div>
          <p class="client-home-label">Área da cliente</p>
          <h2>Seu espaço de entrada no mapa estratégico.</h2>
          <p>
            Aqui você inicia o diagnóstico, acompanha as etapas e avança de forma guiada até o relatório final.
          </p>
        </div>
        <div class="client-home-boxes">
          <div>
            <strong>Privado</strong>
            <span>Respostas salvas localmente e no banco</span>
          </div>
          <div>
            <strong>Guiado</strong>
            <span>Etapas organizadas em sequência</span>
          </div>
          <div>
            <strong>Final</strong>
            <span>Relatório consolidado no fim</span>
          </div>
        </div>
      </div>
    `;
  }

  step.fields.forEach(([type, label, options]) => {
    const id = slug(label);
    const box = document.createElement("div");
    box.className = "question " + (step.specialClass || "");

    if (type === "textarea") {
      box.innerHTML = `<label>${label}</label><textarea>${load(id)}</textarea>`;
      box.querySelector("textarea").addEventListener("input", e => {
        const value = e.target.value;
        save(id, value);
        void saveAnswerRemote(step.title, id, value);
      });
    }

    if (type === "checkbox") {
      const saved = load(id).split("|");
      box.innerHTML = `<label>${label}</label><div class="check-grid"></div>`;
      const grid = box.querySelector(".check-grid");

      options.forEach(option => {
        const checked = saved.includes(option) ? "checked" : "";
        grid.innerHTML += `<label><input type="checkbox" value="${option}" ${checked}> ${option}</label>`;
      });

      grid.addEventListener("change", () => {
        const values = [...grid.querySelectorAll("input:checked")].map(input => input.value);
        const serialized = values.join("|");
        save(id, serialized);
        void saveAnswerRemote(step.title, id, serialized);
      });
    }

    if (type === "file") {
      box.innerHTML = `
        <label>${label}</label>
        <input type="file" multiple>
        <p>Obs.: nesta versão, o portal registra os nomes dos arquivos. Para upload online real, será necessário conectar banco de dados.</p>
        <textarea placeholder="Arquivos enviados ou observações">${load(id)}</textarea>
      `;
      const input = box.querySelector("input");
      const textarea = box.querySelector("textarea");

      input.addEventListener("change", e => {
        const names = [...e.target.files].map(file => file.name).join(", ");
        textarea.value = names;
        save(id, names);
        void saveAnswerRemote(step.title, id, names);
      });

      textarea.addEventListener("input", e => {
        const value = e.target.value;
        save(id, value);
        void saveAnswerRemote(step.title, id, value);
      });
    }

    formArea.appendChild(box);
  });

  const noteId = slug("observacao_mentora_" + step.title);
  const note = document.createElement("div");
  note.className = "mentor-note";
  note.innerHTML = `<label>Observação da mentora sobre esta etapa</label><textarea>${load(noteId)}</textarea>`;
  note.querySelector("textarea").addEventListener("input", e => {
    const value = e.target.value;
    save(noteId, value);
    void saveMentorNoteRemote(step.title, value);
  });
  formArea.appendChild(note);

  const progress = Math.round(((currentStep + 1) / steps.length) * 100);
  progressText.textContent = progress + "% concluído";
  progressBar.style.width = progress + "%";
  stepCount.textContent = `${currentStep + 1}/${steps.length}`;
  answerCount.textContent = String(savedAnswerCount());

  document.getElementById("prevBtn").disabled = currentStep === 0;
  const isFinalStep = currentStep === steps.length - 1;
  const nextBtn = document.getElementById("nextBtn");
  const pdfBtn = document.getElementById("pdfBtn");

  nextBtn.textContent = isFinalStep ? "Gerar relatório final" : "Próxima etapa";
  pdfBtn.hidden = !isFinalStep;
  pdfBtn.textContent = "Gerar PDF final";

  renderMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("nextBtn").onclick = () => {
  if (appMode === "landing") {
    const clientAccessBtn = document.getElementById("clientAccessBtn");

    if (clientAccessBtn) {
      clientAccessBtn.click();
    }

    return;
  }

  if (mentorMode) {
    return;
  }

  if (currentStep < steps.length - 1) {
    currentStep++;
    localStorage.setItem("cc_currentStep", currentStep);
    render();
    return;
  }

  document.getElementById("pdfBtn").click();
};

document.getElementById("prevBtn").onclick = () => {
  if (appMode === "landing") {
    return;
  }

  if (mentorMode) {
    mentorMode = false;
    sessionStorage.removeItem("cc_mentor_unlocked");
    setAppMode("client");
    render();
    return;
  }

  if (currentStep > 0) {
    currentStep--;
    localStorage.setItem("cc_currentStep", currentStep);
    render();
  }
};


document.getElementById("pdfBtn").onclick = () => {
  const profile = clientProfile();
  const previewWindow = window.open("", "_blank", "noopener,noreferrer");

  (async () => {
    try {
      const sessionId = currentSessionId();
      if (sessionId) {
        const response = await apiRequest(`/api/sessions/${sessionId}/reports`, {
          method: "POST",
          body: JSON.stringify({ report_path: "server-pdf" }),
        });

        const downloadUrl = `${API_BASE_URL}${response.download_url}`;
        if (previewWindow) {
          previewWindow.location = downloadUrl;
        } else {
          window.open(downloadUrl, "_blank", "noopener,noreferrer");
        }

        render();
        return;
      }
    } catch (error) {
      if (previewWindow) {
        previewWindow.close();
      }
      console.error("Failed to save final report", error);
      window.alert(`Não foi possível gerar o PDF: ${error.message}`);
      return;
    }
  })();
};

render();
