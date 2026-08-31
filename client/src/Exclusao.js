import React from 'react'

import { excluirBanda } from './api'

function Exclusao(props) {
  const bandas = props.bandas

  function remover(banda) {
    if (!window.confirm('Excluir "' + banda.nome + '"?')) {
      return
    }

    props.setErro(null)
    excluirBanda(banda.id)
      .then(function () {
        props.recarregar()
      })
      .catch(function (e) {
        props.setErro(e.message)
      })
  }

  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-4 border-b border-zinc-200 pb-3 text-xl font-semibold text-zinc-800">
        Excluir bandas
      </h2>

      {props.erro && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {props.erro}
        </div>
      )}

      <p className="mb-4 rounded border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Atencao: a exclusao eh definitiva e nao tem como desfazer.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-300 bg-zinc-100 text-xs uppercase tracking-wide text-zinc-600">
              <th className="px-3 py-2 font-semibold">ID</th>
              <th className="px-3 py-2 font-semibold">Banda</th>
              <th className="px-3 py-2 font-semibold">Inicio</th>
              <th className="px-3 py-2 font-semibold">Estilos</th>
              <th className="px-3 py-2 font-semibold">Disco mais vendido</th>
              <th className="px-3 py-2 text-right font-semibold">
                Recorde de publico
              </th>
              <th className="px-3 py-2 text-right font-semibold">Acoes</th>
            </tr>
          </thead>
          <tbody>
            {props.carregando && (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-zinc-500">
                  Carregando...
                </td>
              </tr>
            )}

            {!props.carregando && bandas.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-zinc-500">
                  Nenhuma banda cadastrada.
                </td>
              </tr>
            )}

            {!props.carregando &&
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
                  <td className="px-3 py-2 text-zinc-700">{banda.estilos}</td>
                  <td className="px-3 py-2 text-zinc-700">{banda.disco}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-zinc-700">
                    {Number(banda.publico).toLocaleString('pt-BR')}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-right">
                    <button
                      onClick={() => remover(banda)}
                      className="rounded bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
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

      <div className="mt-6 border-t border-zinc-200 pt-6">
        <button
          onClick={() => props.irPara('listagem')}
          className="rounded border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
        >
          Voltar para a listagem
        </button>
      </div>
    </div>
  )
}

export default Exclusao
