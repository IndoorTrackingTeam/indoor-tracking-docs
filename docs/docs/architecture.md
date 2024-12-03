---
sidebar_position: 2
---

# Arquitetura

---

## Arquitetura Geral

A arquitetura geral é composta pela integração do front-end com o back-end por meio de uma API principal. Os dados são coletados pelo dispositivo ESP32 e enviados, via API, para o banco de dados MongoDB. Após a coleta, o modelo de machine learning pode ser treinado utilizando a API Machine Learning. Após cada treinamento, em intervalos de 5 minutos, a função é acionada para atualizar a localização de cada equipamento. O front-end tem acesso constante a essas informações por meio da API principal.

<p align="center">
  ![Arquitetura geral](/img/architeture.png)
</p>


---

## Diagrama de Casos de Uso

O diagrama de casos de uso representa as funcionalidades das aplicações mobile e desktop, diferenciadas pelas cores roxa e amarela. As funcionalidades principais disponíveis para o usuário são destacadas em roxo para ambas as aplicações, enquanto as funcionalidades adicionais acessíveis na aplicação desktop, incluindo permissões específicas para administradores e funções de gerenciamento avançado, são mostradas em amarelo.

<p align="center">
  ![Diagrama de Casos de Uso](/img/diagrama.png)
</p>

---

## API Principal

A API principal foi desenvolvida para facilitar a conexão entre o front-end e o back-end, oferecendo endpoints que suportam a comunicação com as versões mobile e desktop. A seguir, apresentamos os principais grupos de endpoints e suas funções:

### Usuários

Esse grupo de endpoints foi criado para facilitar o controle de usuários, permitindo a criação e atualização de dados, a mudança de administradores e a atualização de senhas e imagens.

<p align="center">
  ![Endpoints de Usuários](/img/user.png)
</p>

### Equipamentos

Esse grupo de endpoints foi desenvolvido para gerenciar e visualizar os equipamentos. Esses endpoints permitem o acesso às informações de cada equipamento, a atualização de dados e a modificação de suas localizações. Essa estrutura proporciona um controle aprimorado sobre as informações de cada equipamento, além de oferecer flexibilidade nas atualizações.

<p align="center">
  ![Endpoints de Equipamentos](/img/equipament.png)
</p>

### Dados de Treinamento

Esse grupo de endpoints foi desenvolvido para auxiliar o ESP32 na captura dos dados de cada rede Wi-Fi e no envio dessas informações para o banco de dados. Além disso, esses endpoints transformam os dados para treinamento e permitem a verificação da lista de endereços MAC necessários.

<p align="center">
  ![Endpoints de Treinamento](/img/training.png)
</p>

### Dados de Localização

Esse grupo de endpoints foi desenvolvido para auxiliar o ESP32 na captura dos dados de cada rede Wi-Fi e no envio dessas informações para o banco de dados. Esses dados serão utilizados especificamente para atualizar a localização de cada equipamento.

<p align="center">
  ![Endpoints de Localização](/img/collection.png)
</p>

### Configurações MAC

Esse grupo de endpoints foi desenvolvido para auxiliar nas aplicações mobile e desktop, permitindo a criação e atualização da lista de endereços MAC para o treinamento de dados.

<p align="center">
  ![Endpoints de Configurações](/img/settings.png)
</p>

---

## API Machine Learning

A API de Machine Learning foi desenvolvida para facilitar o treinamento de modelos e a localização de equipamentos. Ela realiza o treinamento utilizando dados armazenados no MongoDB e também permite a localização de equipamentos com base nesses dados.

<p align="center">
  ![Arquitetura da API Machine Learning](/img/machine_learning.png)
</p>

---

## Conclusão

A arquitetura apresentada foi projetada com foco na integração e eficiência, permitindo uma comunicação robusta entre os dispositivos, APIs e o banco de dados. Com a combinação de tecnologias modernas como o ESP32, MongoDB e modelos de Machine Learning, o sistema oferece uma solução completa para a gestão e localização de equipamentos.

O design das APIs e das aplicações foi pensado para proporcionar facilidade de uso, escalabilidade e flexibilidade, garantindo que o sistema possa evoluir conforme as necessidades dos usuários e as demandas do mercado. Seja no aplicativo mobile, desktop ou nas APIs subjacentes, cada componente desempenha um papel crucial no funcionamento da solução, consolidando um sistema integrado e eficiente.
