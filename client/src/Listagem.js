import React, { useState } from 'react'

function Listagem(props) {
  const bandas = props.bandas

  const [bandaDoModal, setBandaDoModal] = useState(null)

  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-4 border-b border-zinc-200 pb-3 text-xl font-semibold text-zinc-800">
        Listagem de bandas
      </h2>

      {props.erro && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {props.erro}
        </div>
      )}

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
                      onClick={() => setBandaDoModal(banda)}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      Ver
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

      {/* Os 2 botoes que levam para as outras paginas */}
      <div className="mt-6 flex flex-wrap gap-3 border-t border-zinc-200 pt-6">
        <button
          onClick={() => props.irPara('edicao')}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Ir para editar bandas
        </button>
        <button
          onClick={() => props.irPara('exclusao')}
          className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Ir para excluir bandas
        </button>
      </div>

      {/* Modal com as informacoes de uma banda so */}
      {bandaDoModal !== null && (
        <div
          onClick={() => setBandaDoModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
          >
            <h3 className="mb-4 border-b border-zinc-200 pb-3 text-lg font-semibold text-zinc-900">
              {bandaDoModal.nome}
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  ID
                </span>
                <p className="text-zinc-800">{bandaDoModal.id}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Inicio
                </span>
                <p className="text-zinc-800">{bandaDoModal.inicio}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Estilos
                </span>
                <p className="text-zinc-800">{bandaDoModal.estilos}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Disco mais vendido
                </span>
                <p className="text-zinc-800">{bandaDoModal.disco}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Recorde de publico
                </span>
                <p className="text-zinc-800">
                  {Number(bandaDoModal.publico).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>

            <button
              onClick={() => setBandaDoModal(null)}
              className="mt-6 w-full rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Listagem
