# 🎟️ Ticketing — Aplicação de Microserviços (Node.js + TypeScript)

Aplicação de gerenciamento e venda de ingressos construída com arquitetura de microserviços, comunicação orientada a eventos e deploy em Kubernetes.  
O foco do projeto é demonstrar **design de serviços**, **consistência**, **escalabilidade** e **resiliência** em sistemas distribuídos.

---

## 🧭 Visão Geral
A plataforma é composta por serviços independentes, cada um com seu próprio banco de dados (MongoDB) e responsabilidades bem definidas.  
A comunicação entre serviços ocorre via **NATS Streaming (event-driven)**, reduzindo acoplamento e facilitando evolução do sistema.

---

## 🧩 Arquitetura

### Serviços
- **Auth Service**  
  Responsável por autenticação e autorização de usuários, emissão e validação de JWT.

- **Tickets Service**  
  Gerenciamento de ingressos (criação, atualização, listagem e consulta).

- **Orders Service**  
  Gerenciamento de ordens de compra e reserva de ingressos.

- **Client (Frontend)**  
  Aplicação frontend em **React + Next.js**, responsável pela interação com os serviços backend.

### Comunicação
- **Síncrona:** HTTP/REST para comandos e consultas.
- **Assíncrona:** Eventos via **NATS Streaming**, garantindo desacoplamento e confiabilidade entre serviços.

---

## ✅ Principais decisões técnicas
- Arquitetura **orientada a eventos** para reduzir dependências diretas entre serviços.
- **Database per service** (MongoDB isolado por serviço).
- **JWT** para autenticação e propagação de identidade.
- **Kubernetes + Skaffold** para fluxo de desenvolvimento local próximo ao ambiente produtivo.
- **Docker** para empacotamento e portabilidade dos serviços.

---

## 🛠️ Stack Tecnológica
- **Backend:** Node.js + TypeScript  
- **Frontend:** React + Next.js  
- **Banco de Dados:** MongoDB  
- **Mensageria:** NATS Streaming Server  
- **Orquestração:** Kubernetes  
- **Dev Workflow:** Skaffold  
- **Containerização:** Docker  

---

## 🚀 Como executar localmente (Kubernetes + Skaffold)

### Pré-requisitos
- Docker
- Kubernetes (Docker Desktop ou Minikube)
- kubectl
- Skaffold

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/gustavopmaia/ticketing.git
cd ticketing
```

### 2️⃣ Configurar domínio local

Adicione no arquivo `/etc/hosts`:

```
127.0.0.1 ticketing.dev
```

### 3️⃣ Instalar Ingress-NGINX

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
```

### 4️⃣ Subir a aplicação

```bash
skaffold dev
```

Após a inicialização, a aplicação estará disponível em:

* **[http://ticketing.dev](http://ticketing.dev)**

---

## 🔐 Variáveis de Ambiente

As variáveis são configuradas via **Kubernetes Secrets / Manifests** por serviço.

Principais variáveis:

* `JWT_KEY` — chave secreta para assinatura de tokens JWT
* `MONGO_URI` — URI do MongoDB do serviço
* `NATS_URL` — URL do servidor NATS
* `NATS_CLUSTER_ID` — ID do cluster NATS
* `NATS_CLIENT_ID` — ID do cliente (gerado automaticamente no Kubernetes)

---

## 📚 Documentação de API (Resumo)

### Auth Service

* **POST** `/api/users/signup` — registro de usuário
* **POST** `/api/users/signin` — login de usuário

### Tickets Service

* **POST** `/api/tickets` — criar ingresso
* **GET** `/api/tickets` — listar ingressos
* **GET** `/api/tickets/:id` — buscar ingresso por ID
* **PUT** `/api/tickets/:id` — atualizar ingresso

### Orders Service

* **POST** `/api/orders` — criar pedido
* **GET** `/api/orders` — listar pedidos

---

## 🧪 Próximos passos / Roadmap

* Testes automatizados por serviço (unitários e integração)
* Observabilidade (logs estruturados e métricas)
* Políticas de retry e tratamento de falhas em eventos
* Evolução do fluxo de compra (pagamentos, cancelamentos)

---

## 📌 Sobre o projeto

Projeto educacional com foco em **arquitetura de microserviços**, **mensageria** e **boas práticas de backend** utilizando Node.js e TypeScript.
