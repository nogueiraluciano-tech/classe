// ============================================================
// FRONTEND — consome a API de Pessoas e mostra o resultado
// ------------------------------------------------------------
// Este arquivo já está pronto. Depois de completar o backend
// (server.js e models/Pessoa.js), rode "npm start" e abra
// http://localhost:3000 para ver o resultado aqui na tela.
// ============================================================

const form = document.getElementById('form-pessoa');
const lista = document.getElementById('lista-pessoas');

async function carregarPessoas() {
  const resposta = await fetch('/api/pessoas');
  const pessoas = await resposta.json();
  renderizar(pessoas);
}

function renderizar(pessoas) {
  lista.innerHTML = '';

  pessoas.forEach((pessoa, indice) => {
    const item = document.createElement('li');
    item.innerHTML = `
      <span><strong>${pessoa.nome}</strong> — ${pessoa.idade} anos (nasc. ${pessoa.dataNascimento})</span>
      <button class="btn-remover" data-indice="${indice}">Remover</button>
    `;
    lista.appendChild(item);
  });
}

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const nome = document.getElementById('nome').value;
  const dataNascimento = document.getElementById('dataNascimento').value;

  await fetch('/api/pessoas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, dataNascimento }),
  });

  form.reset();
  carregarPessoas();
});

lista.addEventListener('click', async (evento) => {
  if (evento.target.classList.contains('btn-remover')) {
    const indice = evento.target.dataset.indice;
    await fetch(`/api/pessoas/${indice}`, { method: 'DELETE' });
    carregarPessoas();
  }
});

carregarPessoas();
