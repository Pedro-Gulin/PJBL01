import React, { useEffect, useState } from 'react'

import { listarBandas, criarBanda, atualizarBanda, excluirBanda } from './api'

function App() {
  const [bandas, setBandas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const [nome, setNome] = useState('')
  const [inicio, setInicio] = useState('')
  const [disco, setDisco] = useState('')
  const [publico, setPublico] = useState('')

  const [editandoId, setEditandoId] = useState(null)
  const [salvando, setSalvando] = useState(false)

  function carregar() {
    setCarregando(true)
    setErro(null)
    listarBandas()
      .then(function (lista) {
        setBandas(lista)
        setCarregando(false)
      })
      .catch(function (e) {
        setErro(e.message)
        setCarregando(false)
      })
  }

  useEffect(() => {
    carregar()
  }, [])

  function limparForm() {
    setNome('')
    setInicio('')
    setDisco('')
    setPublico('')
    setEditandoId(null)
  }

  function salvar(evento) {
    evento.preventDefault()
    setSalvando(true)
    setErro(null)

    var banda = {
      nome: nome,
      inicio: Number(inicio),
      disco: disco,
      publico: Number(publico || 0),
    }

    if (editandoId !== null) {
      atualizarBanda(editandoId, banda)
        .then(function () {
          limparForm()
          carregar()
          setSalvando(false)
        })
        .catch(function (e) {
          setErro(e.message)
          setSalvando(false)
        })
    } else {
      criarBanda(banda)
        .then(function () {
          limparForm()
          carregar()
          setSalvando(false)
        })
        .catch(function (e) {
          setErro(e.message)
          setSalvando(false)
        })
    }
  }

  function editar(banda) {
    setEditandoId(banda.id)
    setNome(banda.nome)
    setInicio(String(banda.inicio))
    setDisco(banda.disco)
    setPublico(String(banda.publico))
  }

  function remover(banda) {
    if (!window.confirm('Excluir "' + banda.nome + '"?')) {
      return
    }
    setErro(null)
    excluirBanda(banda.id)
      .then(function () {
        if (editandoId === banda.id) {
          limparForm()
        }
        carregar()
      })
      .catch(function (e) {
        setErro(e.message)
      })
  }

  var textoBotao = 'Adicionar banda'
  if (salvando) {
    textoBotao = 'Salvando...'
  } else if (editandoId !== null) {
    textoBotao = 'Salvar alteracoes'
  }

  return (
    <div className="relative flex min-h-screen flex-1 flex-col">
      <div className="absolute inset-0 -z-20 bg-zinc-950" />

      <div className="absolute inset-x-0 top-0 -z-10 h-screen overflow-hidden">
        <img
          src="/fundo.jpeg"
          alt=""
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-zinc-950" />
      </div>

      <header className="absolute inset-x-0 top-0 border-b border-white/20 bg-black/40 px-6 py-5">
        <h1 className="text-center text-4xl font-bold tracking-wide text-white">
          Bandas de Rock
        </h1>
        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-lg text-white/80">
          Pedro Gulin
        </span>
      </header>

      <main className="px-6 pb-16 pt-[88vh]">
        <div className="mx-auto w-full max-w-4xl rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-4 border-b border-zinc-200 pb-3 text-xl font-semibold text-zinc-800">
            Bandas de Rock
          </h2>

          {erro && (
            <div className="mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {erro}
            </div>
          )}

          <form
            onSubmit={salvar}
            className="mb-6 grid gap-4 rounded-md border border-zinc-200 bg-zinc-50 p-4 md:grid-cols-2"
          >
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Banda
              </span>
              <input
                required
                maxLength={120}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="rounded border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Inicio
              </span>
              <input
                required
                type="number"
                min={1900}
                max={new Date().getFullYear()}
                value={inicio}
                onChange={(e) => setInicio(e.target.value)}
                className="rounded border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Disco mais vendido
              </span>
              <input
                required
                maxLength={160}
                value={disco}
                onChange={(e) => setDisco(e.target.value)}
                className="rounded border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Recorde de publico
              </span>
              <input
                type="number"
                min={0}
                value={publico}
                onChange={(e) => setPublico(e.target.value)}
                className="rounded border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900"
              />
            </label>

            <div className="flex gap-2 md:col-span-2">
              <button
                type="submit"
                disabled={salvando}
                className="rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
              >
                {textoBotao}
              </button>

              {editandoId !== null && (
                <button
                  type="button"
                  onClick={limparForm}
                  className="rounded border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-300 bg-zinc-100 text-xs uppercase tracking-wide text-zinc-600">
                  <th className="px-3 py-2 font-semibold">ID</th>
                  <th className="px-3 py-2 font-semibold">Banda</th>
                  <th className="px-3 py-2 font-semibold">Inicio</th>
                  <th className="px-3 py-2 font-semibold">Disco mais vendido</th>
                  <th className="px-3 py-2 text-right font-semibold">
                    Recorde de publico
                  </th>
                  <th className="px-3 py-2 text-right font-semibold">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {carregando && (
                  <tr>
                    <td colSpan={6} className="px-3 py-6 text-center text-zinc-500">
                      Carregando...
                    </td>
                  </tr>
                )}

                {!carregando && bandas.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-3 py-6 text-center text-zinc-500">
                      Nenhuma banda cadastrada.
                    </td>
                  </tr>
                )}

                {!carregando &&
                  bandas.map((banda) => (
                    <tr
                      key={banda.id}
                      className="border-b border-zinc-200 hover:bg-zinc-50"
                    >
                      <td className="px-3 py-2 text-zinc-500">{banda.id}</td>
                      <td className="px-3 py-2 font-medium text-zinc-900">
                        {banda.nome}
                      </td>
                      <td className="px-3 py-2 text-zinc-700">{banda.inicio}</td>
                      <td className="px-3 py-2 text-zinc-700">{banda.disco}</td>
                      <td className="px-3 py-2 text-right tabular-nums text-zinc-700">
                        {Number(banda.publico).toLocaleString('pt-BR')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-right">
                        <button
                          onClick={() => editar(banda)}
                          className="mr-3 text-sm font-medium text-blue-600 hover:underline"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => remover(banda)}
                          className="text-sm font-medium text-red-600 hover:underline"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-zinc-400">
            {bandas.length} bandas cadastradas
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
