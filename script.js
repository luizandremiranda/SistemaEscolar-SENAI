// =============================================
// DADOS INICIAIS
// =============================================

const MATERIAS = ["Matemática", "Português", "Ciências", "História", "Geografia"];
const MEDIA_APROVACAO = 6;

function gerarMatricula() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function notasVazias() {
  const obj = {};
  MATERIAS.forEach(m => {
    obj[m] = { t1: null, t2: null, t3: null, t4: null };
  });
  return obj;
}

// Dados base dos 20 alunos distribuídos nas 4 turmas (5 por turma)
const dadosIniciais = {
  6: [
    { nome: "Luiz",      turno: "Dia",   responsavel: "Maria Silva",    contato: "(11) 91111-1111", frequencia: 92 },
    { nome: "André",     turno: "Dia",   responsavel: "Carlos André",   contato: "(11) 92222-2222", frequencia: 88 },
    { nome: "Renata",    turno: "Noite", responsavel: "Joana Renata",   contato: "(11) 93333-3333", frequencia: 95 },
    { nome: "Luiza",     turno: "Dia",   responsavel: "Pedro Luiza",    contato: "(11) 94444-4444", frequencia: 78 },
    { nome: "Daiane",    turno: "Noite", responsavel: "Ana Daiane",     contato: "(11) 95555-5555", frequencia: 85 },
  ],
  7: [
    { nome: "Luciana",   turno: "Dia",   responsavel: "Roberto Silva",  contato: "(11) 96666-6666", frequencia: 90 },
    { nome: "Yasmim",    turno: "Noite", responsavel: "Fernanda Lima",  contato: "(11) 97777-7777", frequencia: 82 },
    { nome: "Luiz Carlos", turno: "Dia", responsavel: "Marcos Costa",  contato: "(11) 98888-8888", frequencia: 76 },
    { nome: "Eugenia",   turno: "Noite", responsavel: "José Eugênio",   contato: "(11) 99999-9999", frequencia: 93 },
    { nome: "Everton",   turno: "Dia",   responsavel: "Sandra Melo",    contato: "(11) 90000-0000", frequencia: 87 },
  ],
  8: [
    { nome: "Rafael",    turno: "Dia",   responsavel: "Cláudia Rafael", contato: "(21) 91111-2222", frequencia: 91 },
    { nome: "Rodrigo",   turno: "Noite", responsavel: "Patrícia Souza", contato: "(21) 92222-3333", frequencia: 80 },
    { nome: "Thiago",    turno: "Dia",   responsavel: "Alexandre Neto", contato: "(21) 93333-4444", frequencia: 74 },
    { nome: "Wanderley", turno: "Noite", responsavel: "Beatriz Lima",   contato: "(21) 94444-5555", frequencia: 96 },
    { nome: "Roberta",   turno: "Dia",   responsavel: "Luís Roberta",   contato: "(21) 95555-6666", frequencia: 89 },
  ],
  9: [
    { nome: "Marta",     turno: "Dia",   responsavel: "Juliana Marta",  contato: "(31) 91111-7777", frequencia: 84 },
    { nome: "Lucas",     turno: "Noite", responsavel: "Eduardo Campos", contato: "(31) 92222-8888", frequencia: 77 },
    { nome: "Natan",     turno: "Dia",   responsavel: "Regina Natan",   contato: "(31) 93333-9999", frequencia: 98 },
    { nome: "Davi",      turno: "Noite", responsavel: "Simone Alves",   contato: "(31) 94444-0000", frequencia: 83 },
    { nome: "Mirian",    turno: "Dia",   responsavel: "Tânia Mirian",   contato: "(31) 95555-1111", frequencia: 91 },
  ],
};

// Monta o banco de dados completo
const DB = { 6: [], 7: [], 8: [], 9: [] };

Object.entries(dadosIniciais).forEach(([turma, lista]) => {
  lista.forEach(d => {
    DB[turma].push({
      id:          gerarMatricula(),
      nome:        d.nome,
      turma:       Number(turma),
      turno:       d.turno,
      responsavel: d.responsavel,
      contato:     d.contato,
      frequencia:  d.frequencia,
      notas:       notasVazias(),
    });
  });
});

// Popula algumas notas de exemplo para demonstração
function notaRand(min = 4, max = 10) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

DB[6].forEach(a => {
  MATERIAS.forEach(m => {
    a.notas[m] = { t1: notaRand(5,10), t2: notaRand(5,10), t3: notaRand(5,10), t4: notaRand(4,10) };
  });
});
DB[7].forEach(a => {
  MATERIAS.forEach(m => {
    a.notas[m] = { t1: notaRand(4,10), t2: notaRand(4,10), t3: notaRand(5,10), t4: notaRand(4,10) };
  });
});

// =============================================
// ESTADO DA APLICAÇÃO
// =============================================

let turmaSelecionada  = 6;
let filtroSituacao    = "";
let filtroMateria     = "";
let filtroBusca       = "";
let alunoEditandoId   = null;
let alunoExcluindoId  = null;

// =============================================
// HELPERS
// =============================================

function calcMediaMateria(notas) {
  const vals = [notas.t1, notas.t2, notas.t3, notas.t4].filter(v => v !== null && v !== "");
  if (vals.length === 0) return null;
  return vals.reduce((a, b) => a + Number(b), 0) / vals.length;
}

function calcMediaGeral(aluno, materia = null) {
  if (materia) {
    return calcMediaMateria(aluno.notas[materia]);
  }
  const medias = MATERIAS.map(m => calcMediaMateria(aluno.notas[m])).filter(v => v !== null);
  if (medias.length === 0) return null;
  return medias.reduce((a, b) => a + b, 0) / medias.length;
}

function situacaoAluno(aluno, materia = null) {
  const media = calcMediaGeral(aluno, materia);
  if (media === null) return "Pendente";
  return media >= MEDIA_APROVACAO ? "Aprovado" : "Reprovado";
}

function fmtNota(v) {
  if (v === null || v === "" || v === undefined) return "—";
  return Number(v).toFixed(1);
}

function getAlunoById(id) {
  for (const turma of [6, 7, 8, 9]) {
    const a = DB[turma].find(x => x.id === id);
    if (a) return a;
  }
  return null;
}

// =============================================
// RENDERIZAÇÃO DA TABELA
// =============================================

function renderTabela() {
  const turma    = turmaSelecionada;
  const turmaMap = { 6: "6º Ano", 7: "7º Ano", 8: "8º Ano", 9: "9º Ano" };
  document.getElementById("tituloTurma").textContent = turmaMap[turma];

  // cabeçalho matéria
  const thMat = document.getElementById("thMateria");
  thMat.textContent = filtroMateria ? filtroMateria : "Média Geral";

  let lista = [...(DB[turma] || [])];

  // filtro busca
  if (filtroBusca.trim()) {
    const q = filtroBusca.trim().toLowerCase();
    lista = lista.filter(a => a.nome.toLowerCase().includes(q));
  }

  // filtro situação
  if (filtroSituacao) {
    lista = lista.filter(a => situacaoAluno(a, filtroMateria || null) === filtroSituacao);
  }

  document.getElementById("totalAlunos").textContent =
    lista.length === 1 ? "1 aluno" : `${lista.length} alunos`;

  const tbody = document.getElementById("tbodyAlunos");
  tbody.innerHTML = "";

  if (lista.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="7">Nenhum aluno encontrado.</td></tr>`;
    return;
  }

  lista.forEach(aluno => {
    const media    = calcMediaGeral(aluno, filtroMateria || null);
    const situacao = situacaoAluno(aluno, filtroMateria || null);

    const tagClass =
      situacao === "Aprovado"  ? "tag-aprovado"  :
      situacao === "Reprovado" ? "tag-reprovado" : "tag-pendente";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${aluno.id}</td>
      <td><span class="td-nome" data-id="${aluno.id}">${aluno.nome}</span></td>
      <td>${aluno.turno}</td>
      <td>${media !== null ? Number(media).toFixed(1) : "—"}</td>
      <td>${media !== null ? Number(media).toFixed(1) : "—"}</td>
      <td><span class="tag-situacao ${tagClass}">${situacao}</span></td>
      <td>
        <div class="td-acoes">
          <button class="btn-icon btn-icon-edit" title="Editar notas" data-id="${aluno.id}" data-action="edit">✏️</button>
          <button class="btn-icon btn-icon-del"  title="Excluir aluno" data-id="${aluno.id}" data-action="del">🗑️</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// =============================================
// MODAL: FICHA DO ALUNO
// =============================================

function abrirFicha(id) {
  const aluno = getAlunoById(id);
  if (!aluno) return;

  const turmaMap = { 6: "6º Ano", 7: "7º Ano", 8: "8º Ano", 9: "9º Ano" };

  document.getElementById("dNome").textContent       = aluno.nome;
  document.getElementById("dMatricula").textContent  = aluno.id;
  document.getElementById("dTurma").textContent      = turmaMap[aluno.turma];
  document.getElementById("dTurno").textContent      = aluno.turno;
  document.getElementById("dResponsavel").textContent= aluno.responsavel;
  document.getElementById("dContato").textContent    = aluno.contato;
  document.getElementById("dFrequencia").textContent = `${aluno.frequencia}%`;

  // Notas
  const container = document.getElementById("notasContainer");
  container.innerHTML = "";

  MATERIAS.forEach(mat => {
    const n    = aluno.notas[mat];
    const media = calcMediaMateria(n);
    const ok   = media !== null && media >= MEDIA_APROVACAO;
    const mediaCls = media === null ? "nd" : (ok ? "ok" : "nok");
    const mediaStr = media !== null ? media.toFixed(1) : "S/N";
    const situStr  = media === null ? "" : (ok ? "✓ Aprovado" : "✗ Reprovado");

    container.innerHTML += `
      <div class="nota-card">
        <div class="nota-card-header">
          <span class="nota-materia-name">${mat}</span>
          <span class="nota-media ${mediaCls}">
            Média: ${mediaStr} ${situStr}
          </span>
        </div>
        <div class="nota-trimestres">
          ${["t1","t2","t3","t4"].map((t, i) => `
            <div class="nota-trim-item">
              <span class="nota-trim-label">${i+1}º Trim.</span>
              <span class="nota-trim-value">${fmtNota(n[t])}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  });

  alunoEditandoId = id;
  abrirModal("modalDetalhes");
}

// =============================================
// MODAL: EDITAR NOTAS
// =============================================

function abrirEditarNotas(id) {
  const aluno = getAlunoById(id);
  if (!aluno) return;

  alunoEditandoId = id;
  document.getElementById("editNomeAluno").textContent = aluno.nome;

  const form = document.getElementById("formNotas");
  form.innerHTML = "";

  MATERIAS.forEach(mat => {
    const n = aluno.notas[mat];
    const div = document.createElement("div");
    div.className = "form-notas-materia";
    div.innerHTML = `
      <h4>${mat}</h4>
      <div class="form-notas-trims">
        ${["t1","t2","t3","t4"].map((t, i) => `
          <label>
            ${i+1}º Trimestre
            <input type="number" min="0" max="10" step="0.1"
              id="nota_${mat}_${t}"
              value="${n[t] !== null ? n[t] : ""}"
              placeholder="0–10"
            />
          </label>
        `).join("")}
      </div>
    `;
    form.appendChild(div);
  });

  abrirModal("modalNotas");
}

function salvarNotas() {
  const aluno = getAlunoById(alunoEditandoId);
  if (!aluno) return;

  MATERIAS.forEach(mat => {
    ["t1","t2","t3","t4"].forEach(t => {
      const el  = document.getElementById(`nota_${mat}_${t}`);
      const val = el.value.trim();
      if (val === "") {
        aluno.notas[mat][t] = null;
      } else {
        const num = parseFloat(val);
        aluno.notas[mat][t] = isNaN(num) ? null : Math.min(10, Math.max(0, num));
      }
    });
  });

  fecharModal("modalNotas");
  renderTabela();

  // Se a ficha estiver aberta, atualiza
  if (document.getElementById("modalDetalhes").classList.contains("open")) {
    abrirFicha(alunoEditandoId);
  }
}

// =============================================
// MODAL: ADICIONAR ALUNO
// =============================================

function abrirAddAluno() {
  document.getElementById("addNome").value        = "";
  document.getElementById("addTurma").value       = String(turmaSelecionada);
  document.getElementById("addTurno").value       = "Dia";
  document.getElementById("addResponsavel").value = "";
  document.getElementById("addContato").value     = "";
  document.getElementById("addFrequencia").value  = "100";
  abrirModal("modalAddAluno");
}

function salvarAluno() {
  const nome        = document.getElementById("addNome").value.trim();
  const turma       = Number(document.getElementById("addTurma").value);
  const turno       = document.getElementById("addTurno").value;
  const responsavel = document.getElementById("addResponsavel").value.trim();
  const contato     = document.getElementById("addContato").value.trim();
  const frequencia  = Number(document.getElementById("addFrequencia").value) || 100;

  if (!nome) { alert("Informe o nome do aluno."); return; }
  if (!responsavel) { alert("Informe o nome do responsável."); return; }
  if (!contato) { alert("Informe o contato do responsável."); return; }

  DB[turma].push({
    id:          gerarMatricula(),
    nome,
    turma,
    turno,
    responsavel,
    contato,
    frequencia,
    notas:       notasVazias(),
  });

  fecharModal("modalAddAluno");
  turmaSelecionada = turma;
  document.getElementById("selTurma").value = String(turma);
  renderTabela();
}

// =============================================
// MODAL: EXCLUIR ALUNO
// =============================================

function abrirConfirmDel(id) {
  const aluno = getAlunoById(id);
  if (!aluno) return;
  alunoExcluindoId = id;
  document.getElementById("confirmNome").textContent = aluno.nome;
  abrirModal("modalConfirm");
}

function confirmarExclusao() {
  if (!alunoExcluindoId) return;
  for (const turma of [6, 7, 8, 9]) {
    const idx = DB[turma].findIndex(a => a.id === alunoExcluindoId);
    if (idx !== -1) { DB[turma].splice(idx, 1); break; }
  }
  alunoExcluindoId = null;
  fecharModal("modalConfirm");
  renderTabela();
}

// =============================================
// UTILITÁRIOS DE MODAL
// =============================================

function abrirModal(id) {
  document.getElementById(id).classList.add("open");
  document.body.style.overflow = "hidden";
}

function fecharModal(id) {
  document.getElementById(id).classList.remove("open");
  const algumAberto = document.querySelectorAll(".modal-overlay.open").length > 0;
  if (!algumAberto) document.body.style.overflow = "";
}

function fecharTodosModais() {
  document.querySelectorAll(".modal-overlay.open").forEach(m => m.classList.remove("open"));
  document.body.style.overflow = "";
}

// =============================================
// EVENT LISTENERS
// =============================================

document.addEventListener("DOMContentLoaded", () => {

  // Seletores e busca
  document.getElementById("selTurma").addEventListener("change", e => {
    turmaSelecionada = Number(e.target.value);
    renderTabela();
  });

  document.getElementById("selSituacao").addEventListener("change", e => {
    filtroSituacao = e.target.value;
    renderTabela();
  });

  document.getElementById("selMateria").addEventListener("change", e => {
    filtroMateria = e.target.value;
    renderTabela();
  });

  document.getElementById("inputBusca").addEventListener("input", e => {
    filtroBusca = e.target.value;
    renderTabela();
  });

  // Adicionar aluno
  document.getElementById("btnAddAluno").addEventListener("click", abrirAddAluno);
  document.getElementById("btnSalvarAluno").addEventListener("click", salvarAluno);
  document.getElementById("btnCancelarAdd").addEventListener("click", () => fecharModal("modalAddAluno"));
  document.getElementById("btnCloseAdd").addEventListener("click",    () => fecharModal("modalAddAluno"));

  // Ficha do aluno
  document.getElementById("btnCloseDetalhes").addEventListener("click", () => fecharModal("modalDetalhes"));
  document.getElementById("btnFecharFicha").addEventListener("click",   () => fecharModal("modalDetalhes"));

  document.getElementById("btnEditarNotas").addEventListener("click", () => {
    fecharModal("modalDetalhes");
    abrirEditarNotas(alunoEditandoId);
  });

  // Editar notas
  document.getElementById("btnSalvarNotas").addEventListener("click",   salvarNotas);
  document.getElementById("btnCancelarNotas").addEventListener("click", () => fecharModal("modalNotas"));
  document.getElementById("btnCloseNotas").addEventListener("click",    () => fecharModal("modalNotas"));

  // Confirmar exclusão
  document.getElementById("btnConfirmDel").addEventListener("click",  confirmarExclusao);
  document.getElementById("btnCancelDel").addEventListener("click",   () => fecharModal("modalConfirm"));

  // Fechar modal ao clicar no overlay
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", e => {
      if (e.target === overlay) fecharModal(overlay.id);
    });
  });

  // Delegação de eventos na tabela
  document.getElementById("tbodyAlunos").addEventListener("click", e => {
    // clique no nome
    const nome = e.target.closest(".td-nome");
    if (nome) { abrirFicha(nome.dataset.id); return; }

    // botões de ação
    const btn = e.target.closest(".btn-icon");
    if (!btn) return;

    const { id, action } = btn.dataset;
    if (action === "edit") abrirEditarNotas(id);
    if (action === "del")  abrirConfirmDel(id);
  });

  // Render inicial
  renderTabela();
});
