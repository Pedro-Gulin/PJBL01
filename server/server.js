require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bandasRouter = require('./routes/bandas')

const app = express()

app.use(cors())         
app.use(express.json()) 
app.use('/api/bandas', bandasRouter)

app.use('/api', (req, res) => {
  res.status(404).json({ erro: 'Rota nao encontrada' })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ erro: 'Erro interno no servidor' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`))
