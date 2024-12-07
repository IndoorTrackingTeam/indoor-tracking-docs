---
sidebar_position: 2
---

# API Machine Learning

Encargada de todo o processo de treinamento do modelo, essa API utiliza os dados armazenados no banco para realizar a inferência da localização dos equipamentos. Ela é requisitada periodicamente por uma Cloud Function, que chama seu endpoint em intervalos regulares para atualizar as localizações no sistema.

## Instruções para Executar a API

Esta seção fornece as instruções para iniciar a API desenvolvida com **FastAPI**. Você pode executar a aplicação diretamente com **Python**.

Primeiramente, clone o repositorio:
```
git clone https://github.com/IndoorTrackingTeam/indoor-tracking-machine-learning.git
```

### Executando com Python
Antes de executar a API localmente é preciso realizar o treinamento do modelo, para realizá-lo siga os passos abaixo:

1. **Instalando Dependências para o Treinamento:**

	Acesse o diretório `training` e instale as dependências listadas no arquivo     `requirements.txt`:
    ```
	pip install -r requirements.txt
    ```

2. **Realizando o Treinamento e Configurando Variáveis de Ambiente**

    Após instalar as dependências, execute o treinamento para gerar os modelos. Isso criará o diretório AutogluonModels, onde os modelos treinados serão armazenados.

    ```
    python model_training_service.py
    ```

    Depois crie um arquivo `.env` e adicione as seguintes variáveis ambientes:
    ```
    MODEL_PATH=[caminho para o diretorio do Autogloun]
    MODEL=[nome do modelo que será usado]
    ```


3. **Iniciando a API:**

	Acesse o diretório `api`, instale as dependências necessárias e inicie a API:
    ```
	pip install -r requirements.txt
    python main.py
    ```

	Por padrão, a API estará disponível em: http://localhost:8000.

	Se desejar customizar a execução, você pode rodar o servidor utilizando uvicorn diretamente:

    ```python
	uvicorn main:api --host 0.0.0.0 --port 8000 --reload
    ```

### Testando a API

Após a execução, você pode acessar a documentação interativa da API fornecida pelo **Swagger** diretamente pelo navegador no seguinte endereço:
[http://localhost:8000/docs](http://localhost:8000/docs)

Essa interface permite que você visualize e teste todos os endpoints expostos pela API.
