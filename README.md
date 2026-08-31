# PJBL01 — Cadastro de Bandas de Rock

Aplicação web full-stack desenvolvida para a disciplina de **Experiência Criativa (PUC)**.
O sistema é um CRUD completo de bandas de rock: cada banda tem nome, ano de início,
estilos musicais, disco principal e público estimado. Os dados ficam persistidos em um
banco MySQL.

O projeto é dividido em duas partes independentes:

- **`server/`** — API REST em Node.js + Express, conectada ao MySQL com `mysql2`.
- **`client/`** — interface em React (Create React App) estilizada com Tailwind CSS.

## As 3 páginas

A interface é dividida em três páginas. A troca entre elas é feita por botões, usando
uma variável de estado no `App.js` (o projeto não usa biblioteca de rotas).

| Página | Arquivo | O que faz |
| --- | --- | --- |
| 1. Listagem | `client/src/Listagem.js` | Tabela com todas as bandas. O botão **Ver** de cada linha abre um modal com os dados daquela banda. No fim da tabela, dois botões levam para as páginas de edição e exclusão. |
| 2. Edição | `client/src/Edicao.js` | Lista as bandas com um botão **Editar** em cada linha, que carrega os dados no formulário acima. Com o formulário vazio, ele cadastra uma banda nova. |
| 3. Exclusão | `client/src/Exclusao.js` | Lista as bandas com um botão **Excluir** em cada linha, pedindo confirmação antes de apagar. |

## Funcionalidades

- Listar todas as bandas cadastradas (ordenadas por nome)
- Buscar uma banda pelo id
- Ver os dados de uma banda isolada em um modal
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
│       ├── App.js          # casca do site: carrega os dados e troca de página
│       ├── Listagem.js     # página 1 - tabela + modal
│       ├── Edicao.js       # página 2 - formulário + botão Editar por linha
│       ├── Exclusao.js     # página 3 - botão Excluir por linha
│       └── api.js          # funções de acesso à API
├── server/                 # API REST
│   ├── server.js           # configuração do Express
│   ├── db.js               # pool de conexões MySQL
│   ├── schema.sql          # criação do banco + dados iniciais
│   ├── migration_estilos.sql  # adiciona a coluna "estilos" em banco já existente
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

> **Já tinha o banco criado antes da coluna `estilos` existir?**
> O `CREATE TABLE IF NOT EXISTS` não altera uma tabela que já existe, então rode a
> migração uma única vez para adicionar a coluna e preencher as bandas de exemplo:
>
> ```bash
> mysql -u root -p < server/migration_estilos.sql
> ```

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
  "estilos": "Rock Progressivo, Rock Psicodelico",
  "disco": "The Dark Side of the Moon",
  "publico": 200000
}
```

Todos os campos são obrigatórios, exceto `publico` (assume `0` se omitido).

Exemplo de erro de validação (`400`):

```json
{ "erros": ["nome e obrigatorio", "inicio deve ser um ano entre 1900 e 2026"] }
```

### Testando pelo terminal

```bash
curl http://localhost:5000/api/bandas
```

```bash
curl -X POST http://localhost:5000/api/bandas -H "Content-Type: application/json" -d '{"nome":"Nirvana","inicio":1987,"estilos":"Grunge, Rock Alternativo","disco":"Nevermind","publico":300000}'
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
- **`Unknown column 'estilos' in 'field list'`** — o banco é anterior à coluna `estilos`;
  rode o `server/migration_estilos.sql` descrito no passo 2.
- **`Duplicate column name 'estilos'`** — a migração já foi aplicada; não precisa rodar de novo.
- **Front-end carrega mas a lista fica vazia com erro de rede** — a API não está no ar
  ou está em uma porta diferente da configurada no `proxy` do `client/package.json`.

## Autor

Pedro Gulin — PUC, Experiência Criativa.
