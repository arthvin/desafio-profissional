# Agenda de Contatos - API (NestJS)


## Requisitos
- Node 18+
- PostgreSQL


## Instalação
1. `git clone <repo>`
2. `npm install`
3. configurar variáveis de ambiente: DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME
4. `npm run start:dev`


## Endpoints principais
- POST /contacts -> criar contato
- GET /contacts -> listar com query params: page, limit, name, email, phone
- GET /contacts/:id -> buscar por id
- PATCH /contacts/:id -> atualizar
- DELETE /contacts/:id -> remover


## Testes
`npm run test`