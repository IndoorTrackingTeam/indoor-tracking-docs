---
id: esp32-collection
title: Coleta de dados
description: Como configurar o código do ESP32 para coletar dados.
slug: /esp32-collection
sidebar_position: 3
---

# Coleta de dados

:::info
Este guia irá ajudá-lo a configurar o código do ESP32 para coletar dados e enviá-los ao banco de dados para posteriormente serem usados na localização do equipamento.
:::

### Passo 1: Inicialize as bibliotecas necessárias

```C
#include <WiFi.h>
#include <WiFiClientSecure.h>
```

### Passo 2: Configure os dados de acesso da rede e da API

```C
const char* ssid = "NOME DA REDE";
const char* password = "SENHA DA REDE";
const char* host = "run-api-dev-131050301176.us-east1.run.app";
const char* url = "/router/data/create";
String esp_id = "NUMERO DE ID ESP";
```

### Passo 3: Adicione a configuração da saida serial e da conexão com o Wi-Fi

```C
void setup() {
  Serial.begin(115200);
  delay(10);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  Serial.println("WiFi connected");
}
```

### Passo 4: Adicione o envio de dados para o banco via API

```C
void sendDataToAPI(String esp_id, int networks) {

  WiFiClientSecure client;
  client.setInsecure();

  if (!client.connect(host, 443)) {
    Serial.println("Connection failed");
    return;
  }

  String payload = "{";
  payload += "\"esp_id\": \"" + esp_id + "\",";
  payload += "\"networks\": [";

  for (int i = 0; i < networks; ++i) {
    String mac = WiFi.BSSIDstr(i);
    String ssid = WiFi.SSID(i);
    int rssi = WiFi.RSSI(i);  

    payload += "{\"mac\": \"" + mac + "\", \"name_router\": \"" + ssid +  "\", \"rssi\": " + String(rssi) + "}";

    if (i < networks - 1) {
      payload += ",";
    }
  }

  payload += "]}";

  client.print(String("POST ") + url + " HTTP/1.1\r\n" + 
               "Host: " + host + "\r\n" + 
               "Content-Type: application/json\r\n" + 
               "Content-Length: " + String(payload.length()) + "\r\n" + 
               "Connection: close\r\n\r\n" + 
               payload);

  Serial.println(client.readStringUntil('\n'));

  client.stop();

  delay(5000);
}
```

### Passo 4: Adicione o loop principal

```C
void loop() {
  String ssid;
  String bssid;
  int rssi = 0;

  int networks = WiFi.scanNetworks();
  if (networks > 0) {
    sendDataToAPI(esp_id, networks);
  }

  delay(5000);
}
```

### Codigo completo

:::info
Rodando este código os dados captados pelo ESP32 serão enviados a cada 10 segundos para o banco de dados via API. (O delay de envio de dados pode ser alterado na função de ```loop```)
:::

```C
#include <WiFi.h>
#include <WiFiClientSecure.h>

const char* ssid = "NOME DA REDE";
const char* password = "SENHA DA REDE";
const char* host = "run-api-dev-131050301176.us-east1.run.app";
const char* url = "/router/data/create";
String esp_id = "NUMERO DE ID ESP";

void setup() {
  Serial.begin(115200);
  delay(10);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  Serial.println("WiFi connected");
}

void sendDataToAPI(String esp_id, int networks) {

  WiFiClientSecure client;
  client.setInsecure();

  if (!client.connect(host, 443)) {
    Serial.println("Connection failed");
    return;
  }

  String payload = "{";
  payload += "\"esp_id\": \"" + esp_id + "\",";
  payload += "\"networks\": [";

  for (int i = 0; i < networks; ++i) {
    String mac = WiFi.BSSIDstr(i);
    String ssid = WiFi.SSID(i);
    int rssi = WiFi.RSSI(i);  

    payload += "{\"mac\": \"" + mac + "\", \"name_router\": \"" + ssid +  "\", \"rssi\": " + String(rssi) + "}";

    if (i < networks - 1) {
      payload += ",";
    }
  }

  payload += "]}";

  client.print(String("POST ") + url + " HTTP/1.1\r\n" + 
               "Host: " + host + "\r\n" + 
               "Content-Type: application/json\r\n" + 
               "Content-Length: " + String(payload.length()) + "\r\n" + 
               "Connection: close\r\n\r\n" + 
               payload);

  Serial.println(client.readStringUntil('\n'));

  client.stop();

  delay(5000);
}


void loop() {
  String ssid;
  String bssid;
  int rssi = 0;

  int networks = WiFi.scanNetworks();
  if (networks > 0) {
    sendDataToAPI(esp_id, networks);
  }

  delay(5000);
}
```