# ZoAI Steam - Backend

API responsável por gerar piadas com base nos perfis da Steam, autenticar usuários e gerenciar histórico de respostas.

## Rodando localmente

### Pré-requisitos:

- Node.js >= 20
- Docker + Docker Compose
- **Steam API Key**: necessária para acessar os dados dos jogos dos usuários da Steam.
    - Crie a sua em: [Steam Web API Key](https://steamcommunity.com/dev/apikey)
- **OpenRouter API Key**: necessária para gerar as respostas com IA.
    - Crie a sua em: [OpenRouter](https://openrouter.ai/)

### Passos

```bash

# Clone o repositório
git clone https://github.com/1-AkM-0/zoai-steam.git

# Entre na pasta do projeto
cd zoai-steam

# Crie o arquivo contendo as variáveis de ambiente
cp .env.example .env

# Inicie o docker com
docker compose up --build

```

## Tecnologias e Arquitetura
- Node.js + Express para a API
- MongoDB → armazenamento dos logs de piadas
- PostgreSQL (Prisma) → persistência de usuários e piadas
- Redis → cache das respostas da IA (evita exceder limite da OpenRouter)
- JWT → autenticação (access + refresh tokens)
- Swagger → documentação interativa
- Docker Compose → orquestração dos serviços

### Banco de dados relacional

O gerenciamento dos dados relacionais é feito com o **Prisma ORM**, que facilita a modelagem, migração e consultas ao banco.  
Ele está configurado para utilizar **PostgreSQL** via Docker.

### Collections

A única collection é a `Logs`, definida como no exemplo abaixo:

```json
{
  "_id": {
    "$oid": "68ab8eb98733e503afe72ac4"
  },
  "steamId": "76561198918812796",
  "joke": "Ah, então você é o famoso 'Mestre do Rush B e do Minerando no Subsolo', hein? Quase 2300 horas no CS2? Aposto que já decorou todos os pixels do mapa e ainda morre pro cara camperando no cantinho...",
  "model": "google/gemini-2.0-flash-exp:free",
  "createdAt": {
    "$date": "2025-08-24T22:14:17.493Z"
  },
  "__v": 0
}

```

### Autenticação
A API usa JWT (access + refresh tokens).
- O login (POST /auth/login) retorna os tokens.
- O access token é usado em rotas protegidas via header Authorization: Bearer < token>.
- O refresh token permite obter um novo access token quando o atual expira.

### Validadores de input
Para validação de inputs eu utilizei o `express-validator` e criei funções de validação e sanatização de username, senha e perfil da steam

### Middlewares
Implementei 3 middlewares:
- rate-limiter: Usando a biblioteca `express-rate-limit` setei um limite de requisições que um usuário pode fazer num período de tempo
- maybeAuth: Verifica se o usuário da requisição está autenticado. É importante para gerenciar como as respostas da IA serão salvas.
- authorization: Verifica se o usuário que está fazendo a requisição é dono do recurso. Útil para evitar que usuário deletem respostas de outros. 

### Testes automatizados
A aplicação conta tanto com testes unitários como testes de rotas, testando as principais funcionalidades do sistema:


![image](https://github.com/user-attachments/assets/8ddfc62d-8384-4eb5-8954-40057fa1db06)
![image](https://github.com/user-attachments/assets/1dd70b6f-4f68-4f27-951e-010f1a8e6651)


### Documentação (Swagger)
A documentação completa da API pode ser acessada em `http://localhost:3000/api-docs`: 

![image](https://github.com/user-attachments/assets/412b835b-10c7-4f44-9450-7f1e3af01796)

### Redis
Como existe um limite de 50 requisições por dia no plano free da Open Router, o redis foi utilizado para o sistema de cache. Após o usuário mandar um perfil da steam válido, é extraido o id do perfil enviado e checado se existe alguma resposta já salva no banco de dados do Redis relacionado àquele id, se existir, a resposta salva no Redis é retornada, caso contrário, uma nova é gerada.  


### Docker compose

3 serviços estão presentes no `docker-compose.dev.yml`:
- Redis(porta 6379)
- PostgreSQL(porta 5432)
- MongoDB(porta 27017)


## Frontend

Você pode encontrar o frontend da API aqui: [Frontend](https://github.com/1-AkM-0/zoai-steam-front)


## Próximos Passos
- [ ] Tipos de respostas personalizadas
- [ ] Adicionar opção de favoritar as respostas
- [ ] Migrar para TypeScript
- [ ] Melhorar logs e métricas
- [ ] Implementar um sistema de roles(admin, user)
