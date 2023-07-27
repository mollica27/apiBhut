# apiBhut
# API de Carros - Passo a Passo

A API de Carros é uma aplicação Node.js que permite criar carros, listar carros da API externa, salvar logs de chamadas efetuadas à API externa e postar informações de carros criados em uma fila. Este documento fornece um guia passo a passo de como usar a API.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

1. Node.js (https://nodejs.org)
2. MongoDB (https://www.mongodb.com/try/download/community)
3. Insomnia (ou outra ferramenta de teste de API) (https://insomnia.rest/download)

## Instalação e Execução

1. Clone este repositório em sua máquina local:

```
git clone git@github.com:mollica27/apiBhut.git
git clone https://github.com/mollica27/apiBhut.git

```

2. Acesse a pasta do projeto:

```
cd api-carros
```

3. Instale as dependências:

```
npm install
```

4. Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis de ambiente:

```
CONNECTIONSTRING=<<sua_uri_do_mongodb>>
PORT=<<porta_backend>>
```

Substitua `<<sua_uri_do_mongodb>>` pela URI de conexão com o MongoDB.
Substitua `<<porta_backend>>` Porta utilizada para conexão do backend.

5. Inicie o servidor:

```
npm run dev
```

Se tudo estiver correto, você verá a mensagem "Servidor rodando na porta 3000" no console.

## Uso da API

### Endpoints

A API possui os seguintes endpoints:

1. `GET /api/listCars`: Retorna a lista de carros da API externa.
2. `POST /api/createCar`: Cria um novo carro na API externa e salva um registro de log no MongoDB.
3. `GET /api/logs`: Retorna a lista de registros de log salvos no MongoDB.

## Webhook

A API possui um endpoint para receber webhooks de eventos externos. O endpoint é `POST /webhook`. Quando um webhook é recebido, a API processa os dados e os exibe no navegador.

### Testando a API com o Insomnia

1. Abra o Insomnia ou outra ferramenta de teste de API.

2. Crie uma requisição para listar os carros da API externa:

- Método: GET
- URL: http://localhost:3000/api/listCars

3. Execute a requisição e verifique a lista de carros retornada.

4. Crie uma requisição para criar um novo carro:

- Método: POST
- URL: http://localhost:3000/api/createCar
- Corpo da requisição (JSON):
  ```json
  {
    "title": "Civic",
    "brand": "Honda",
    "price": "250000",
    "age": 2023
  }
  ```

5. Execute a requisição e verifique a resposta. O novo carro será criado na API externa e um registro de log será salvo no MongoDB.

6. Crie uma requisição para listar os registros de log:

- Método: GET
- URL: http://localhost:3000/api/logs

7. Execute a requisição e verifique a lista de registros de log retornada.

## Considerações Finais

Este é um guia básico de como usar a API de Carros. Você pode explorar os endpoints e as funcionalidades adicionais da API para atender às suas necessidades específicas. Para mais detalhes sobre cada endpoint e suas funcionalidades, consulte o código-fonte do projeto.

Se você tiver alguma dúvida ou encontrar problemas ao usar a API, sinta-se à vontade para abrir uma issue no repositório do projeto. Esperamos que este guia tenha sido útil e que você possa aproveitar a API de Carros em seus projetos!


