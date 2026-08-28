const express = require('express')
const pool = require('../db')

const router = express.Router()


function validar(body) {
  const erros = []
  const nome = String(body.nome ?? '').trim()
  const disco = String(body.disco ?? '').trim()
  const inicio = Number(body.inicio)
  const publico = Number(body.publico ?? 0)

  const anoAtual = new Date().getFullYear()

  if (!nome) erros.push('nome e obrigatorio')
  if (nome.length > 120) erros.push('nome deve ter no maximo 120 caracteres')
  if (!disco) erros.push('disco e obrigatorio')
  if (disco.length > 160) erros.push('disco deve ter no maximo 160 caracteres')
  if (!Number.isInteger(inicio) || inicio < 1900 || inicio > anoAtual) {
    erros.push(`inicio deve ser um ano entre 1900 e ${anoAtual}`)
  }
  if (!Number.isInteger(publico) || publico < 0) {
    erros.push('publico deve ser um inteiro maior ou igual a zero')
  }

  return { erros, valores: { nome, inicio, disco, publico } }
}

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nome, inicio, disco, publico FROM bandas_rock ORDER BY nome'
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nome, inicio, disco, publico FROM bandas_rock WHERE id = ?',
      [req.params.id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Banda nao encontrada' })
    }
    res.json(rows[0])
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { erros, valores } = validar(req.body)
    if (erros.length > 0) return res.status(400).json({ erros })

    const [resultado] = await pool.query(
      'INSERT INTO bandas_rock (nome, inicio, disco, publico) VALUES (?, ?, ?, ?)',
      [valores.nome, valores.inicio, valores.disco, valores.publico]
    )
    res.status(201).json({ id: resultado.insertId, ...valores })
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { erros, valores } = validar(req.body)
    if (erros.length > 0) return res.status(400).json({ erros })

    const [resultado] = await pool.query(
      'UPDATE bandas_rock SET nome = ?, inicio = ?, disco = ?, publico = ? WHERE id = ?',
      [valores.nome, valores.inicio, valores.disco, valores.publico, req.params.id]
    )
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Banda nao encontrada' })
    }
    res.json({ id: Number(req.params.id), ...valores })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const [resultado] = await pool.query(
      'DELETE FROM bandas_rock WHERE id = ?',
      [req.params.id]
    )
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Banda nao encontrada' })
    }
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
