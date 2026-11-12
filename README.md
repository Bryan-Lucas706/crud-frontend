# CRUD Frontend

Frontend de uma aplicação para gerenciamento de usuários. A interface permite visualizar os usuários cadastrados e criar, editar e excluir registros com nome, idade e e-mail.

## Sobre o backend

Back-end desenvolvido pelo professor Victor Raphael, Instituto 3C+, publicado com autorização. 
Front-end e integração de minha autoria.

## Funcionalidades

- Lista os usuários retornados pela API.
- Cria novos usuários.
- Edita usuários existentes: envia uma atualização completa quando todos os campos mudam e uma atualização parcial quando apenas alguns mudam.
- Solicita confirmação antes de excluir um usuário.
- Atualiza a lista após as operações e exibe mensagens de erro recebidas da API.
- Adapta o layout para telas menores.

## Tecnologias

- HTML, CSS e JavaScript (módulos ES).
- Axios para as requisições HTTP.
- Nginx e Docker Compose para servir a interface.

## Como executar

É necessário ter Docker e Docker Compose instalados. Na raiz deste projeto, inicie o backend e o frontend em terminais separados:

```bash
docker compose -f crud-backend/compose.yaml up --build
```

```bash
docker compose up --build
```

Depois, acesse **http://localhost:8080**. O frontend se comunica com a API em **http://localhost:8000/api/users**, então o backend também precisa estar em execução.

Para encerrar cada serviço, pressione `Ctrl+C` no terminal correspondente.
