const BASE = '/api/bandas'

async function tratar(resposta) {
  if (resposta.status === 204) return null

  const dados = await resposta.json().catch(() => null)

  if (!resposta.ok) {
    const mensagem =
      dados?.erros?.join(', ') || dados?.erro || `Erro ${resposta.status}`
    throw new Error(mensagem)
  }
  return dados
}

export function listarBandas() {
  return fetch(BASE).then(tratar)
}

export function criarBanda(banda) {
  return fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(banda),
  }).then(tratar)
}

export function atualizarBanda(id, banda) {
  return fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(banda),
  }).then(tratar)
}

export function excluirBanda(id) {
  return fetch(`${BASE}/${id}`, { method: 'DELETE' }).then(tratar)
}
