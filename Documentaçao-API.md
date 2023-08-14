# Documentação do Projeto - Gerenciador de Tarefas - BackEnd

## Visão Geral

API desenvolvida usando Node.js, TypeScript e Firebase Firestore. O aplicativo permite a criação, atualização, exclusão e busca de tarefas. As tarefas podem ser filtradas por status e prioridade, e a paginação é suportada para retornar um número específico de tarefas por página.

## Tecnologias

- Nodejs
- Typescript
- Zod
- Firebase com Firestore (nosql)
- Express

# Estrutura de Diretórios

### src

- config -> Configuração do Firebase
- controllers -> Controladores da lógica de negócios
- models -> Esquemas de dados usando Zod
- types -> Definições de tipos personalizados
- validation -> Middlewares de validação
- main -> Arquivos de inicialização
- app.ts -> Configuração do Express
- index.ts -> Ponto de entrada do aplicativo

## Controller: TaskController

O TaskController é responsável por lidar com as operações relacionadas a tarefas, como criação, leitura, atualização e exclusão de tarefas. Ele também suporta filtragem, paginação e busca de tarefas.

## Métodos

- createTask(req: Request, res: Response): Cria uma nova tarefa no Firestore Database com base nos dados fornecidos pelo cliente. (Tem a opção de torna-la uma rota protegida, conforme está comentado no próprio código)

- getTasks(req: Request, res: Response): Retorna uma lista paginada de tarefas com opções de filtragem por status, prioridade e busca por título. (status, priority, title)

- getTaskById(req: Request, res: Response): Retorna os detalhes de uma tarefa específica com base no ID fornecido.

- updateTask(req: Request, res: Response): Atualiza um campo específico de uma tarefa com base nos dados fornecidos pelo cliente. (rota criada apenas para ter mesmo mas, não é utilizada).

- completeTask(req: Request, res: Response): Marca uma tarefa como concluída.

- deleteTask(req: Request, res: Response): Exclui uma tarefa com base no ID fornecido.

# Modelos de Dados

- _CreateTaskSchema_:
  Define o esquema de validação para criar uma nova tarefa.

- status: Status da tarefa (concluída ou pendente).
- priority: Prioridade da tarefa (baixa, média ou alta).
- title: Título da tarefa (máximo de 20 caracteres).
- description: Descrição da tarefa (máximo de 30 caracteres).
- _UpdateTaskSchema_:
  Define o esquema de validação para atualizar uma tarefa existente. (Criado com o mesmo próposito do endpoint 'updateTask'. Não esta sendo utilizado.)

- id: ID da tarefa a ser atualizada.
- fieldToUpdate: Campo a ser atualizado (por exemplo, \* status, priority).
- value: Novo valor do campo.

# Arquivo app.ts

- _O app.ts_: é responsável pela configuração do Express, incluindo a inicialização de middlewares e controladores. Ele também define o método listen() para iniciar o servidor.

- _express_: Instância do Express.
  port: Número da porta na qual o servidor será executado.
  Arquivo index.ts
  O index.ts é o ponto de entrada do aplicativo. Ele cria uma instância do App e inicia o servidor na porta especificada.

- PORT: Número da porta de acordo com a variável de ambiente ou 5000 por padrão.
- app: Instância da classe App, que é configurada com o controlador TaskController.

# Instalação e Execução

- Certifique-se de ter o Node.js e o npm instalados.
- Clone o repositório do projeto.
- Instale as dependências usando npm install ou yarn.
- Configure as credenciais do Firebase no diretório src/- config/firebase.ts.
- Execute o aplicativo usando npm run dev ou yarn dev.

# Endpoints da API

- GET /tasks: Retorna a lista paginada de tarefas com opções de filtragem e busca.
- GET /tasks/:id: Retorna os detalhes de uma tarefa específica.
- POST /tasks/create: Cria uma nova tarefa. (opçao de ser protegida)
- PUT /tasks/:id: Atualiza um campo específico de uma tarefa.
- DELETE /tasks/:id: Exclui uma tarefa.
- PUT /tasks/:id/complete: Marca uma tarefa como concluída

# Considerações Finais

Esta documentação cobre a estrutura e os principais componentes da API do projeto.

- IMPORTANTE: Certifique-se de ter as credenciais do Firebase corretamente configuradas.
