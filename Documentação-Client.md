# Documentação do Projeto: Aplicação Web de Gerenciamento de Tarefas

## Visão Geral

- Front end complementando a API feita em Node, para a Aplicação de Gerenciamento de Tarefas. Este documento busca oferecer uma visão detalhada da arquitetura, dos componentes e da funcionalidade da aplicação, criada usando Next.js, TypeScript, Material UI, Zustand, Axios, Zod, Firebase e React Hook Form.

<!-- Pilha de Tecnologia
Estrutura do Projeto
Autenticação e Autorização
Componentes e Funcionalidades
HeroSection
PaginationComponent
TaskList
TaskCard
SearchBar
Obtenção de Dados
Gerenciamento de Estado Global
Tematização
Uso e Implantação
Conclusão -->

# Tecnologias

- NextJS 13
- TypeScript
- Material UI
- Zustand
- Axios
- Zod
- Firebase
- React Hook Form

# Estrutura do Projeto

### src

- app - Página core do NextJs, com Layout, page, e uma Notfound page costumizada.
  - api/
    - tasks - responsável por fornecer todas as requições para a API
- auth/

  - firebase - config.ts - errorMessages.ts - login.ts - registerUser.ts
    - _Toda lógica envolvendo o firebase e sua autênticação_

- components/ - Componentes genéricos
  - Filters - Todos os componentes relacionados aos filtros(Searchbar, radios, checkbox e afins)
  - Modals - Modal base e AuthModal (Login/Register)
  - Task - Todos os componentes relacionados a tasks (Card, list, form).
- providers - Provedores evitando errors de hidratação
  - CustomThemeProvider.tsx - ModalsProvider.tsx
- shared/hooks - gerenciamento de estado global (zustand)
- styles - globals.css - theme.ts
- utils - criação da instância do axios (api.ts), função para ver se o usuário está logado/autênticado (isAuth.ts) e module declaration paras satisfazer as tipagens da theme.ts (mui-declaration.d.ts)

# Autenticação e Autorização

A aplicação utiliza o Firebase para autenticação. Os usuários podem se registrar, fazer login e sair. Após o login ou registro bem-sucedido, dois cookies são armazenados: Token e UserID.
Token, quando presente, é sempre utilizado nas requisiçoes do axios, devido a instância que foi criada em api.ts. Ele pode ser usado para testar a rota protegida, como explicado na documentação da API.
O cookie userId também é usado para a rota protegida e, é responsável por dizer se o usuário está logado ou não (auth.ts).

# Componentes e Funcionalidades

## HeroSection

- O painel principal da aplicação, exibindo tarefas pendentes e concluídas. O componente recebe as tarefas atráves do arquivo page.tsx, onde é feita a requição pelo lado do servidor, facilitando o cache, caso queria, melhorando performance e deixando a manutenção mais fácil, pois toda a lógica de busca de tarefas está concentrada lá. Ele também inclui o TaskForm responsável por criar novas tarefas, seguido da barra de buscas, listas de tarefas (pendentes e concluídas).
  Ele também é responsável por pegar todas as tarefas e fazer criar dois arrays a partir delas: array de tarefas pendentes e tarefas concluídas, onde esses são passados para os TaskList.

## Paginação

- Lógica de paginação consiste em setar a o número página atual na url, onde esse número é recebido pelo page.tsx via params e usado para fazer uma nova requisição, via server side. Dessa forma, as novas tarefas são passadas para o HeroSection e toda a lógica se repete.

## TaskList

Exibe uma lista de tarefas, que podem sesr filtradas por prioridade.

## TaskCard

É utulizado dentro do TaskList. Exibe detalhes individuais de uma tarefa. Os usuários podem excluir ou marcar tarefas como concluídas. Toda ação é refletida automáticamente no TaskList.

## SearchBar

Permite aos usuários pesquisar tarefas com base no título, status e prioridade. O debounce é usado para melhorar a experiência de pesquisa e evitar muitas requisições no banco de dados. Sugestões são exibidas em um dropdown.

# Gerenciamento de Estado Global

O Zustand é usado para o gerenciamento de estado global, especialmente para controlar o estado do modal de formulários de registro e login.

# Theme.ts

A estilização necessária é salva e utilizada para manter um design consistente e atraente em toda a aplicação.

Uso e Implantação
Para executar a aplicação localmente:

# Instalação e Execução

-
- Clone o repositório do projeto.
- Instale as dependências usando npm install ou yarn.
- Configure o Firebase em auth/firebase/config.ts com suas credênciais.
- Execute a aplicação usando npm run dev.

## OBS: certifique-se de ter a seguinte opção no next.config.js:

```
experimental: {
    serverActions: true,
  },

```
