# Mini Projeto de API com Node.js, Express e Prisma

Este é um mini projeto de API RESTful desenvolvido com Node.js, Express e Prisma ORM, focado na autenticação de usuários.

## 📋 Descrição

A API fornece endpoints para:
- Registro de usuários (sign-up)
- Autenticação de usuários (sign-in)
- Acesso ao perfil do usuário autenticado (profile)

O projeto utiliza TypeScript para tipagem estática, Prisma como ORM para interação com o banco de dados PostgreSQL, e JWT para autenticação.

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Express.js** - Framework web para Node.js
- **Prisma ORM** - ORM moderno para Node.js e TypeScript
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerização da aplicação e serviços
- **JSON Web Tokens (JWT)** - Para autenticação stateless
- **bcrypt** - Para hash seguro de senhas
- **Zod** - Para validação de dados
- **dotenv** - Para gerenciamento de variáveis de ambiente
- **tsx** - Para execução direta de TypeScript

## 📁 Estrutura do Projeto

```
src/
├── @types/                 # Definições de tipos TypeScript
├── app/
│   ├── errors/             # Classes de erro customizadas
│   └── use-cases/          # Casos de uso da aplicação (business logic)
├── infra/
│   ├── controllers/        # Controladores HTTP
│   ├── middlewares/        # Middlewares Express (autenticação, tratamento de erros)
│   └── routes/             # Definição das rotas da API
├── lib/
│   └── prisma/             # Configuração e cliente Prisma
└── index.ts                # Ponto de entrada da aplicação
prisma/
└── schema.prisma           # Modelo de dados Prisma
```

## 🔧 Como Executar

### Pré-requisitos

- Node.js (versão 18+)
- npm ou yarn
- PostgreSQL instalado e em execução

### Passos para Execução

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd aula1
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   Copie o arquivo `.env.example` para `.env` e preencha os valores necessários:
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
   JWT_SECRET="sua_chave_secreta_aqui"
   SALT_ROUNDS=10
   ```

4. **Execute as migrações do banco de dados**
   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor em modo desenvolvimento**
   ```bash
   npm run dev
   ```

O servidor estará disponível em `http://localhost:3333`

## 📡 Endpoints da API

### Autenticação

#### Registrar Usuário
```
POST /sign-up
```
**Corpo da requisição:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```
**Resposta de sucesso:**
```json
{
  "user": {
    "id": "uuid-do-usuario",
    "email": "usuario@exemplo.com",
    "password": "hash-da-senha",
    "createdAt": "2026-05-20T10:00:00.000Z"
  }
}
```

#### Fazer Login
```
POST /sign-in
```
**Corpo da requisição:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```
**Resposta de sucesso:**
```json
{
  "accessToken": "token.jwt.aqui"
}
```

### Usuário Autenticado

#### Obter Perfil
```
GET /profile
```
**Headers:**
```
Authorization: Bearer token.jwt.aqui
```
**Resposta de sucesso:**
```json
{
  "user": {
    "id": "uuid-do-usuario",
    "email": "usuario@exemplo.com",
    "createdAt": "2026-05-20T10:00:00.000Z"
  }
}
```

## 🗃️ Modelo de Dados

O modelo de dados definido em `prisma/schema.prisma`:

```prisma
model User {
  id    String    @id @default(uuid())
  email String  @unique
  password String
  createdAt DateTime @default(now()) @map("created_at")

  @@map("users")
}
```

## 🔐 Segurança

- Senhas são armazenadas como hashes usando bcrypt com salt configurável
- Rotas protegidas utilizam middleware de autenticação JWT
- Variáveis sensíveis são mantidas em variáveis de ambiente
- Validação de entrada usando Zod nos casos de uso

## 📦 Dependências Principais

### Dependências de Produção
- `@prisma/client` - Cliente Prisma para acesso ao banco
- `bcrypt` - Hash de senhas
- `dotenv` - Carregamento de variáveis de ambiente
- `express` - Framework web
- `jsonwebtoken` - Geração e verificação de JWT
- `pg` - Driver PostgreSQL
- `zod` - Validação de esquemas

### Dependências de Desenvolvimento
- `@types/*` - Tipos TypeScript para diversas bibliotecas
- `prisma` - CLI do Prisma
- `tsx` - Executor TypeScript
- `typescript` - Linguagem TypeScript

## 🚀 Funcionalidades Implementadas

1. **Registro de Usuário** com validação de e-mail único
2. **Autenticação JWT** com geração de tokens de acesso
3. **Proteção de Rotas** através de middleware de autenticação
4. **Hash Seguro de Senhas** usando bcrypt
5. **Tratamento de Erros** centralizado
6. **Integração com Prisma ORM** para operações de banco de dados
7. **Tipagem Estrita** com TypeScript em toda a aplicação

## 🧠 Arquitetura

O projeto segue uma arquitetura organizada em camadas:

- **Controllers**: Recebem requisições HTTP e delegam para os use-cases
- **Use Cases**: Contêm a lógica de negócio da aplicação
- **Infraestrutura**: Contém controladores, middlewares e rotas
- **Lib**: Configurações internas como o cliente Prisma
- **Prisma**: Definição do modelo de dados e migrações

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 👏 Agradecimentos

- Trilha Node.js da Rocketseat
- Documentação do Prisma ORM
- Comunidade TypeScript

---
*Desenvolvido como parte do mini projeto de API para fins educacionais.*
