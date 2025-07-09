# Municípios Brasileiros

Projeto fullstack desenvolvido como trabalho final da disciplina **Projeto e Arquitetura de Software**, com foco em **boas práticas de desenvolvimento**, **arquitetura MVC** e uso de tecnologias modernas para criar uma aplicação web funcional e escalável.

---

## Objetivo

Criar uma aplicação que permita a **consulta e análise de dados dos municípios brasileiros** a partir da base de dados do IBGE, com filtros avançados, listagens dinâmicas e total aderência ao modelo de desenvolvimento em **camadas** (MVC), promovendo uma estrutura limpa, modular e reutilizável.

---

## Tecnologias Utilizadas

### 🔹 Frontend
- [Angular](https://angular.io/) 17
- [Angular Material](https://material.angular.io/) (UI)
- Consumo de API via `HttpClient`
- Arquitetura em **componentes**, **serviços** e **mocks** com organização clara

### 🔹 Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [pg (node-postgres)](https://node-postgres.com/) para integração com o banco
- Arquitetura **MVC + Repository + DAO**
- Importação de dados a partir de um arquivo CSV real do IBGE

### 🔹 Banco de Dados
- [PostgreSQL](https://www.postgresql.org/) local e na nuvem via [Neon](https://neon.tech)
- Tabelas criadas e populadas automaticamente a partir de script
- Consultas otimizadas com agregações e filtros avançados

---

## Estrutura do Projeto

```plaintext
website-municipios/
├── backend/
│   ├── controllers/
│   ├── models/         # DAOs
│   ├── repositories/   # Regras de negócio
│   ├── routes/
│   ├── db/
│   ├── scripts/        # importMunicipios.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── mocks/
│   │   │   └── ...
│   └── angular.json
├── .env
├── .gitignore
└── README.md
```

## Funcionalidades
###  Funcionalidades básicas
- Buscar município pelo nome
- Buscar município pelo estado
- Listar todas as capitais
- Apresentar população total de um estado

### Consultas avançadas
- Listar municípios com população acima de um valor
- Listar municípios com população entre dois valores
- Para estados cuja capital não é a cidade mais populosa: mostrar a cidade com maior população
- Apresentar os 10 municípios mais populosos que não são capitais

## Como Executar Localmente
### Requisitos
- Node.js
- PostgreSQL
- Angular CLI (npm install -g @angular/cli)

## Rodar o Backend
```bash
cd backend
npm install
node server.js
```
(Configure o .env com os dados do PostgreSQL local ou da Neon)

## Rodar o Frontend
```bash
cd frontend
npm install
ng serve
```
Acesse em: http://localhost:4200

## Autor
- Lucas Antônio Lorencetti
- Graduando em Ciência da Computação
- Contato: [LinkedIn](https://www.linkedin.com/in/lucasalorencetti/)