# Banco API Tests

Projeto de testes automatizados para uma API bancária, usando Mocha, Chai, Supertest e Mochawesome.

## Tecnologias

- Node.js
- Mocha
- Chai
- Supertest
- Dotenv
- Mochawesome

## Estrutura do projeto

```text
.
├── fixtures/
│   └── postTransferencias.json
├── helpers/
│   └── autenticacao.js
├── test/
│   ├── login.test.js
│   └── transferencia.test.js
├── .env
├── package.json
└── README.md
```

## Pré-requisitos

- Node.js instalado
- NPM instalado
- API bancária disponível para receber as requisições

## Configuração

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto com a URL base da API:

```env
BASE_URL=http://localhost:3000
```

Ajuste o valor de `BASE_URL` conforme o endereço onde a API estiver rodando.

## Como executar os testes

Execute todos os testes:

```bash
npm test
```

O comando roda os arquivos `*.test.js` dentro da pasta `test/` com timeout de `200000ms` e gera o relatório com Mochawesome.

## Relatório

Após a execução, o relatório é gerado na pasta:

```text
mochawesome-report/
```

O arquivo HTML principal pode ser aberto em:

```text
mochawesome-report/mochawesome.html
```

## Cenários cobertos

### Login

- `POST /login`
  - Deve retornar status `200` e um token em string ao usar credenciais válidas.

### Transferências

- `POST /transferencias`
  - Deve retornar status `201` quando o valor da transferência for igual ou maior que R$ 10,00.
  - Deve retornar status `422` quando o valor da transferência for menor que R$ 10,00.

- `GET /transferencias/{id}`
  - Deve retornar status `200` e os detalhes de uma transferência existente.

## Massa de dados

A massa usada para criação de transferências fica em:

```text
fixtures/postTransferencias.json
```

Exemplo:

```json
{
  "contaOrigem": 1,
  "contaDestino": 2,
  "valor": 11.00,
  "token": ""
}
```

## Autenticação

O helper `helpers/autenticacao.js` centraliza a obtenção do token via endpoint `POST /login`.

Nos testes de transferência, o token é obtido antes de cada cenário e enviado no header:

```http
Authorization: Bearer <token>
```

## Observações

- O arquivo `.env` não deve ser versionado.
- A pasta `node_modules/` não deve ser versionada.
- A pasta `mochawesome-report/` é gerada automaticamente após a execução dos testes.
