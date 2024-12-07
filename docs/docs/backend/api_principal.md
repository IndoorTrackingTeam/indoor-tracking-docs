---
sidebar_position: 1
toc_mim_heading_level: 1
toc_max_heading_level: 4
---

# API Principal

A API Principal foi desenvolvida para fornecer uma interface de comunicação eficiente entre o frontend e o backend, permitindo o gerenciamento de dados relacionados aos usuários, equipamentos e roteadores envolvidos no sistema de rastreamento indoor. Esta API também lida com o processamento de dados para o treinamento de modelos de Machine Learning, além de realizar a inferência de localizações dos dispositivos monitorados.

Desenvolvida com o framework **FastAPI**, uma das principais prioridades dessa API é a alta performance e simplicidade, facilitando a integração com o frontend e outros serviços. Toda a estrutura está otimizada para ser hospedada no **Google Cloud Platform (GCP)**, utilizando o **MongoDB Atlas** como nosso banco de dados.

## Instruções para Executar a API

Esta seção fornece as instruções para iniciar a API desenvolvida com **FastAPI**. Você pode executar a aplicação diretamente com **Python** ou utilizando **Docker Compose**.

Primeiramente, clone o repositorio:
```
git clone https://github.com/IndoorTrackingTeam/indoor-tracking-backend.git
```

### Executando com Python
Para executar a API localmente utilizando **Python**, siga os passos abaixo:

1. **Instale as dependências:**

	Dentro do diretório `api`, instale as dependências listadas no arquivo `requirements.txt`:
    ```
	pip install -r requirements.txt
    ```

2. **Inicie a aplicação:**

	Execute o comando abaixo para iniciar o servidor FastAPI:
	
    ```python
    python main.py
    ```

	Por padrão, a API estará disponível em: http://localhost:8000.

	Se desejar customizar a execução, você pode rodar o servidor utilizando uvicorn diretamente:

    ```python
	uvicorn main:api --host 0.0.0.0 --port 8000 --reload
    ```

### Executando com Docker Compose    

Caso prefira utilizar **Docker Compose** para gerenciar a execução da API e suas dependências, siga os seguintes passos:

1. **Certifique-se de ter o Docker e Docker Compose instalados:**

    [Instruções para instalar o Docker](https://docs.docker.com/get-docker/)

    [Instruções para instalar o Docker Compose](https://docs.docker.com/compose/install/)

2. **Construa e execute os contêineres:**

    Navegue até o diretório `api` (onde está localizado o arquivo `docker-compose.yml`) e execute:
    ```
    docker-compose up --build
    ```

    O comando acima irá construir a imagem Docker e iniciar os contêineres.

3. **Acesse a API**:

    Após a execução, a API estará disponível em: http://localhost:8000.

### Testando a API

Após a execução, você pode acessar a documentação interativa da API fornecida pelo **Swagger** diretamente pelo navegador no seguinte endereço:
[http://localhost:8000/docs](http://localhost:8000/docs)

Essa interface permite que você visualize e teste todos os endpoints expostos pela API.

## Rotas

A seguir, estão listados os principais endpoints da API, divididos por suas responsabilidades.

### Principais Endpoints:

#### /user

    **Descrição**: Gerencia as operações relacionadas aos usuários do sistema.

    **Rotas:**

    <span class="highlight-blue">GET</span> `/user/read-all`: Retorna a lista de todos os usuários cadastrados.

    <span class="highlight-blue">GET</span> `/user/get-user?id={id}`: Retorna os detalhes de um usuário específico identificado por seu ID.

    <span class="highlight-blue">GET</span> `/user/send-email/redefine-password?email={email}`: Envia um email para realizar a redefinição de senha do usuário (esse endpoint é assíncrono). 

    <span class="highlight-green">POST</span> `/user/create`: Cria um novo usuário.
    - Corpo da requisição:
    ```json
    {
        "name": "string",
        "email": "string",
        "password": "string"
    }
    ```

    <span class="highlight-green">POST</span> `/user/login`: Faz a autenticação do login.
    - Corpo da requisição: 
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```

    <span class="highlight-green">POST</span> `/user/change-user-admin`: Altera o campo de administração do usuário (false/true).
    - Corpo da requisição: 
    ```json
    {
        "email": "string",
        "isAdmin": false
    }
    ```

    <span class="highlight-orange">PUT</span> `/user/update`: Atualiza as informações de um usuário.
    - Corpo da requisição: 
    ```json
    {
        "name": "string",
        "email": "string",
        "password": "string"
    }
    ```

    <span class="highlight-orange">PUT</span> `/user/update-photo`: Atualiza a foto de um usuário.
    - Corpo da requisição: 
    ```json
    {
        "_id": "string",
        "photo": "string"
    }
    ```

    <span class="highlight-orange">PUT</span> `/user/redefine-password`: Atualiza a senha de um usuário.
    - Corpo da requisição: 
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```

    <span class="highlight-red">DELETE</span> `/user/delete?user_email={user_email}`: Exclui um usuário.  

#### /equipment

    **Descrição**: Gerencia as operações relacionadas aos equipamentos do sistema deste de o CRUD até atualizações da localização do equipamento.

    **Rotas:**

    <span class="highlight-blue">GET</span> `/equipment/read-all`: Retorna todos os equipamentos cadastrados.

    <span class="highlight-blue">GET</span> `/equipment/read-one?register_={register_}`: Retorna um equipamento específico.

    <span class="highlight-blue">GET</span> `/equipment/historic`: Retorna o histórico de todos os equipamento cadastrados.

    <span class="highlight-blue">GET</span> `/equipment/get-equipments-by-current-room?current_room={current_room}`: Retorna os equipamentos encontrados em uma determinada sala.

    <span class="highlight-green">POST</span> `/equipment/create`: Adiciona um novo equipamento ao sistema.
    - Corpo da requisição: 
    ```json
    {
        "name": "string",
        "register": "string",
        "maintenance": false,
        "c_room": "string",
        "c_date": "YYYY-MM-DDTHH:MM:SS.SSSZ",
        "esp_id": "string",
        "image": "string"
    }
    ```

    <span class="highlight-green">POST</span> `/equipment/update-equipments-position`: Para cada equiamento cadastrado, ele verifica a sua localização atual e depois atualiza a sala atual e o histórico do equipamento.

    :: !question
    Não lembro se ainda é utilizado esse endpoint
    
    <span class="highlight-orange">PUT</span> `/equipment/update-maintenance`: Atualiza informações de um equipamento.
    - Corpo da requisição: 
    ```json
    {
        "register": "string",
        "maintenance": false
    }
    ```
    ::

    <span class="highlight-orange">PUT</span> `/equipment/update-image`: Atualiza informações de um equipamento.
    - Corpo da requisição: 
    ```json
    {
        "register": "string",
        "image": "string"
    }
    ```

    <span class="highlight-red">DELETE</span> `/equipment/delete?register_={register_}`: Remove um equipamento do sistema.

#### /router/training-data

	**Descrição**: Gerencia os dados de treinamento dos modelos de Machine Learning, armazenando os dados necessários para inferência futura.
		
    **Rotas:**
    
    <span class="highlight-blue">GET</span> `/router/training-data/get-data-for-training`: Retorna os dados de treinamento armazenados separados em dados de treino e dados de teste para realizar o treinamento do modelo.

    <span class="highlight-blue">GET</span> `/router/training-data/get-all-macs-in-training`: Retorna todos os macs encontrados nos dados de treinamento.

    <span class="highlight-green">POST</span> `/router/training-data/create`: Insere novos dados de treinamento para o modelo.
    - Corpo da requisição: 
    ```json
    {
        "room": "string",
        "networks": [
            {
            "mac": "string",
            "name_router": "string",
            "rssi": 0,
            "esp_id": "string"
            }
        ]
    }
    ```

#### /router/data

    **Descrição**: Lida com o armazenamento e consulta de dados dos roteadores capturados para posteriormente encontrar sua localização.

    **Rotas**:

    <span class="highlight-blue">GET</span> `/router/data/get-last-datafrom-esp-id?esp_id={esp_id}`: Retorna o ultimo dados cadastrado pelo esp.
    
    <span class="highlight-green">POST</span> `/router/data/create`: Insere dados capturados por um esp.
    - Corpo da requisição: 
    ```json
    {
        "esp_id": "string",
        "networks": [
            {
            "mac": "string",
            "name_router": "string",
            "rssi": 0
            }
        ]
    }
    ```
    - Corpo da requisição: 
    ```json
    {
        "esp_id": "string",
        "networks": [
            {
            "mac": "string",
            "name_router": "string",
            "rssi": 0
            }
        ]
    }
    ```

#### /settings

    **Descrição**: Gerencia as configurações do hospital, permitindo o gerenciamento dos ESPs que serão considerados para realizar o treinamento do modelo.

    **Rotas:**

    <span class="highlight-blue">GET</span> `/settings/get-mac-list`: Retorna a lista de MACs que serão reconhecidos para o treinamento do modelo.

    <span class="highlight-green">POST</span> `/settings/create-mac-list`: Inseri a lista de MACs.
    - Corpo da requisição: 
    ```json
    {
        "hospital_name": "string",
        "macs": {
            "00:00:00:00:00:00" : "string",
            "00:00:00:00:00:00" : "string"
        }
    }
    ```

    <span class="highlight-orange">PUT</span> `/settings/update-mac-list`: Atualiza a lista de MACs.
    - Corpo da requisição: 
    ```json
    {
        "hospital_name": "string",
        "macs": {
            "00:00:00:00:00:00" : "string",
            "00:00:00:00:00:00" : "string"
        }
    }
    ```

## Testes

Para garantir a robustez e confiabilidade da API Principal, foram desenvolvidos testes **unitários** e **de integração**, utilizando o framework **pytest**.

### Ferramentas utilizadas

**pytest**: Framework de testes utilizado para criar e executar os testes.

**TestClient** (da FastAPI): Cliente usado para simular chamadas HTTP às rotas da API, permitindo testar a aplicação de forma simples e eficiente.

**MongoClient** (da PyMongo): Cliente utilizado para gerenciar a conexão com o MongoDB durante os testes.

**pytest-cov**: Plugin para pytest utilizado para gerar relatórios de cobertura de testes.

### Estrutura dos testes

#### 1. Testes Unitários:

Os testes unitários têm o foco em testar cada componente da API de maneira isolada, sem a dependência de serviços externos, como o banco de dados.

#### 2. Testes de Integração:

Os testes de integração têm como objetivo validar o comportamento da API em cenários que envolvem a interação com o banco de dados MongoDB. Nesses testes, utilizamos o **MongoClient** para manipular e verificar os dados reais no banco e também usamos o **TestClient** do FastAPI para simular as requisições HTTP e validar o comportamento esperado.

#### 3.	Configuração e Mock de Banco de Dados:

Durante os testes de integração, para evitar manipular os dados em um banco de dados real, usamos o **pytest fixtures** para criar um ambiente isolado. Utilizamos o MongoClient para conectar ao banco de dados durante os testes, garantindo que os dados sejam limpos após cada teste para manter a consistência.

### Cobertura de Testes

A cobertura dos testes é gerada utilizando o **pytest-cov**, o que nos permite monitorar o quanto do código está sendo testado. 


### Execução dos Testes

Dentro do diretório `api`, podemos executar os testes com o comando:

```
pytest --cov=src test/
```

Esse comando rodará todos os testes e gerará um relatório de cobertura, permitindo verificar quais partes do código estão sendo testadas e identificar possíveis áreas não cobertas.