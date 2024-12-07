---
sidebar_position: 3
---

# Function Trigger ML

Esta Function é responsável por chamar o endpoint da API de Machine Learning e, ao receber a nova localização dos equipamentos, atualiza os dados no banco de dados.

## Instruções para Executar a Function

Esta seção fornece as instruções para executar a function desenvolvida com **Python**.

1. **Primeiramente, clone o repositorio:**
    ```
    git clone https://github.com/IndoorTrackingTeam/indoor-tracking-functions.git
    ```

2. **Instale as dependências:**

	Na raiz do projeto, instale as dependências listadas no arquivo     `requirements.txt`:
    ```
	pip install -r requirements.txt
    ```

3. **Execute:**
    Vá pra o diretório `functions` e execute:
    ```
    python main.py
    ```