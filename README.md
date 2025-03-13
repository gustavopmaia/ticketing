# Ticketing - Aplicação de Microserviços

Este projeto é uma aplicação de gerenciamento de ingressos desenvolvida com uma arquitetura de microserviços. O objetivo é fornecer uma plataforma escalável e resiliente para a venda e administração de ingressos.

## Arquitetura

A aplicação é composta por vários serviços, cada um responsável por uma funcionalidade específica:

- **Auth**: Gerencia a autenticação e autorização de usuários.
- **Tickets**: Lida com a criação, atualização e exclusão de ingressos.
- **Orders**: Gerencia as ordens de compra de ingressos.
- **Client**: Frontend da aplicação, desenvolvido em React, que interage com os serviços backend.

A comunicação entre os serviços é realizada através do **NATS Streaming**, garantindo a entrega confiável de mensagens.

## Tecnologias Utilizadas

- **Backend**: Node.js com TypeScript.
- **Frontend**: React com Next.js.
- **Banco de Dados**: MongoDB para todos os serviços.
- **Mensageria**: NATS Streaming Server.
- **Orquestração**: Kubernetes para gerenciamento de contêineres.
- **Empacotamento**: Docker para criação de imagens dos serviços.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- Docker
- Kubernetes
- Skaffold

## Configuração do Ambiente

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/gustavopmaia/ticketing.git
   cd ticketing
   ```

2. **Atualize o arquivo `/etc/hosts`**:

   Adicione a seguinte linha para mapear o domínio local:

   ```
   127.0.0.1 ticketing.dev
   ```

3. **Instale o Ingress-NGINX**:

   O Ingress-NGINX é utilizado para gerenciar o tráfego externo para os serviços dentro do cluster Kubernetes. Para instalá-lo, execute:

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
   ```

   Se encontrar erros relacionados ao `ingress-nginx-admission`, execute:

   ```bash
   kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
   ```

4. **Inicie o Skaffold**:

   O Skaffold facilitará o desenvolvimento contínuo, gerenciando o ciclo de vida dos aplicativos Kubernetes. Para iniciá-lo, execute:

   ```bash
   skaffold dev
   ```

## Variáveis de Ambiente

Cada serviço possui variáveis de ambiente específicas que precisam ser configuradas. As principais variáveis de ambiente são:

- `NATS_URL`: URL do servidor NATS.
- `NATS_CLUSTER_ID`: ID do cluster NATS.
- `NATS_CLIENT_ID`: ID do cliente NATS (gerado automaticamente pelo Kubernetes).
- `JWT_KEY`: Chave secreta para assinatura dos tokens JWT.
- `MONGO_URI`: URI do banco de dados MongoDB.

## Documentação das Rotas

### **Auth Service**

#### **Registrar Usuário**

- **Método:** `POST`
- **URL:** `/api/users/signup`
- **Body (JSON):**
  ```json
  {
    "email": "usuario@example.com",
    "password": "senha123"
  }
  ```
- **Resposta:**
  ```json
  {
    "id": "user123",
    "email": "usuario@example.com",
    "token": "jwt-token"
  }
  ```

#### **Login**

- **Método:** `POST`
- **URL:** `/api/users/signin`
- **Body (JSON):**
  ```json
  {
    "email": "usuario@example.com",
    "password": "senha123"
  }
  ```

---

### **Tickets Service**

#### **Criar Ingresso**

- **Método:** `POST`
- **URL:** `/api/tickets`
- **Body (JSON):**
  ```json
  {
    "title": "Show do Coldplay",
    "price": 250
  }
  ```
- **Resposta:**
  ```json
  {
    "id": "abc123",
    "title": "Show do Coldplay",
    "price": 250,
    "userId": "user123"
  }
  ```

#### **Listar Ingressos**

- **Método:** `GET`
- **URL:** `/api/tickets`
- **Resposta:**
  ```json
  [
    {
      "id": "abc123",
      "title": "Show do Coldplay",
      "price": 250
    },
    {
      "id": "def456",
      "title": "Teatro Stand-Up",
      "price": 100
    }
  ]
  ```

#### **Buscar Ingresso por ID**

- **Método:** `GET`
- **URL:** `/api/tickets/:id`

#### **Atualizar Ingresso**

- **Método:** `PUT`
- **URL:** `/api/tickets/:id`
- **Body (JSON):**
  ```json
  {
    "title": "Show do U2",
    "price": 300
  }
  ```

---

### **Orders Service**

#### **Criar Pedido**

- **Método:** `POST`
- **URL:** `/api/orders`
- **Body (JSON):**
  ```json
  {
    "ticketId": "abc123"
  }
  ```

#### **Listar Pedidos**

- **Método:** `GET`
- **URL:** `/api/orders`
