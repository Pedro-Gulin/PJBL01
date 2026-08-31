import React, { useEffect, useState } from 'react'

import { listarBandas } from './api'
import Listagem from './Listagem'
import Edicao from './Edicao'
import Exclusao from './Exclusao'

function App() {
  const [pagina, setPagina] = useState('listagem')

  const [bandas, setBandas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

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

  function irPara(novaPagina) {
    setPagina(novaPagina)
    carregar()
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
        {pagina === 'listagem' && (
          <Listagem
            bandas={bandas}
            carregando={carregando}
            erro={erro}
            irPara={irPara}
          />
        )}

        {pagina === 'edicao' && (
          <Edicao
            bandas={bandas}
            carregando={carregando}
            erro={erro}
            setErro={setErro}
            recarregar={carregar}
            irPara={irPara}
          />
        )}

        {pagina === 'exclusao' && (
          <Exclusao
            bandas={bandas}
            carregando={carregando}
            erro={erro}
            setErro={setErro}
            recarregar={carregar}
            irPara={irPara}
          />
        )}
      </main>
    </div>
  )
}

export default App
