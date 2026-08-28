# PJBL01 — Cadastro de Bandas de Rock

Aplicação web full-stack desenvolvida para a disciplina de **Experiência Criativa (PUC)**.
O sistema é um CRUD completo de bandas de rock: cada banda tem nome, ano de início,
disco principal e público estimado. Os dados ficam persistidos em um banco MySQL.

O projeto é dividido em duas partes independentes:

- **`server/`** — API REST em Node.js + Express, conectada ao MySQL com `mysql2`.
- **`client/`** — interface em React (Create React App) estilizada com Tailwind CSS.

## Funcionalidades

- Listar todas as bandas cadastradas (ordenadas por nome)
- Buscar uma banda pelo id
- Cadastrar uma nova banda
- Editar uma banda existente
- Excluir uma banda
- Validação no servidor (campos obrigatórios, limites de tamanho, ano entre 1900 e o ano atual, público não negativo)

## Tecnologias

| Camada | Stack |
| --- | --- |
| Front-end | React 19, Tailwind CSS 3, Create React App |
| Back-end | Node.js, Express 5, CORS, dotenv |
| Banco | MySQL 8 (driver `mysql2`) |

## Estrutura do projeto

```
PJBL01/
├── client/                 # aplicação React
│   └── src/
│       ├── App.js          # tela principal (lista + formulário)
│       └── api.js          # funções de acesso à API
├── server/                 # API REST
│   ├── server.js           # configuração do Express
│   ├── db.js               # pool de conexões MySQL
│   ├── schema.sql          # criação do banco + dados iniciais
│   ├── routes/bandas.js    # rotas do CRUD
│   └── .env.example        # modelo de variáveis de ambiente
└── logs/
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior (inclui o npm)
- [MySQL](https://dev.mysql.com/downloads/) 8 rodando localmente

## Como rodar

### 1. Clonar o repositório

```bash
git clone https://github.com/Pedro-Gulin/PJBL01.git && cd PJBL01
```

### 2. Criar o banco de dados

O arquivo `server/schema.sql` cria o banco `bandas`, a tabela `bandas_rock` e já insere
sete bandas de exemplo (só na primeira execução — se a tabela já tiver dados, nada é duplicado).

```bash
mysql -u root -p < server/schema.sql
```

### 3. Configurar as variáveis de ambiente

Copie o arquivo de exemplo e preencha com os dados do seu MySQL:

```bash
cp server/.env.example server/.env
```

O `.env` esperado:

| Variável | Descrição | Exemplo |
| --- | --- | --- |
| `DB_HOST` | host do MySQL | `localhost` |
| `DB_PORT` | porta do MySQL | `3306` |
| `DB_USER` | usuário do banco | `root` |
| `DB_PASSWORD` | senha do usuário | — |
| `DB_NAME` | nome do banco | `bandas` |
| `PORT` | porta da API | `5000` |

> O `.env` está no `.gitignore` e **nunca** deve ser versionado.

### 4. Subir a API

```bash
cd server && npm install && npm run dev
```

A API sobe em `http://localhost:5000`. Use `npm start` no lugar de `npm run dev`
se não quiser o reload automático do nodemon.

### 5. Subir o front-end

Em **outro terminal**, a partir da raiz do projeto:

```bash
cd client && npm install && npm start
```

A interface abre em `http://localhost:3000`. O `package.json` do client já tem
`"proxy": "http://localhost:5000"`, então as chamadas para `/api/bandas` são
redirecionadas para a API automaticamente — não é preciso configurar mais nada.

## Endpoints da API

Base: `http://localhost:5000/api/bandas`

| Método | Rota | Descrição | Resposta |
| --- | --- | --- | --- |
| `GET` | `/api/bandas` | Lista todas as bandas | `200` + array |
| `GET` | `/api/bandas/:id` | Busca uma banda | `200` + objeto / `404` |
| `POST` | `/api/bandas` | Cria uma banda | `201` + objeto criado / `400` |
| `PUT` | `/api/bandas/:id` | Atualiza uma banda | `200` + objeto / `400` / `404` |
| `DELETE` | `/api/bandas/:id` | Remove uma banda | `204` / `404` |

Corpo esperado no `POST` e no `PUT`:

```json
{
  "nome": "Pink Floyd",
  "inicio": 1965,
  "disco": "The Dark Side of the Moon",
  "publico": 200000
}
```

Exemplo de erro de validação (`400`):

```json
{ "erros": ["nome e obrigatorio", "inicio deve ser um ano entre 1900 e 2026"] }
```

### Testando pelo terminal

```bash
curl http://localhost:5000/api/bandas
```

```bash
curl -X POST http://localhost:5000/api/bandas -H "Content-Type: application/json" -d '{"nome":"Nirvana","inicio":1987,"disco":"Nevermind","publico":300000}'
```

## Build de produção do front-end

```bash
cd client && npm run build
```

Os arquivos estáticos são gerados em `client/build/` (pasta ignorada pelo git).

## Solução de problemas

- **`Erro interno no servidor` ao listar bandas** — a API não conseguiu falar com o MySQL.
  Confira se o serviço está rodando e se as credenciais no `server/.env` estão corretas.
- **`Table 'bandas.bandas_rock' doesn't exist`** — o passo 2 não foi executado; rode o `schema.sql`.
- **Front-end carrega mas a lista fica vazia com erro de rede** — a API não está no ar
  ou está em uma porta diferente da configurada no `proxy` do `client/package.json`.

## Autor

Pedro Gulin — PUC, Experiência Criativa.
