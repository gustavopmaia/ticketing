# 🎟️ Ticketing — Event-Driven Microservices Platform
 
A distributed ticketing and sales platform built with a microservices architecture, event-driven communication, and production-grade infrastructure. The project focuses on **service design**, **data consistency**, **scalability**, and **resilience** in distributed systems.
 
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![NATS](https://img.shields.io/badge/NATS-27AAE1?style=flat&logo=natsdotio&logoColor=white)
 
---
 
## Overview
 
The platform is composed of independent services, each owning its own database (MongoDB) with clearly defined responsibilities. Inter-service communication uses **NATS Streaming (event-driven)**, reducing coupling and enabling independent evolution of each service.
 
---
 
## Architecture
 
Each service is independently deployable, with its own MongoDB instance and event contracts defined in a shared `common` package.
 
```
┌──────────────────────────────────────────────────────┐
│                    Ingress (NGINX)                   │
└────────────┬──────────────┬──────────────┬───────────┘
             │              │              │
        ┌────▼────┐   ┌─────▼────┐  ┌─────▼────┐
        │  Auth   │   │ Tickets  │  │  Orders  │
        │ Service │   │ Service  │  │ Service  │
        └────┬────┘   └─────┬────┘  └─────┬────┘
             │              │              │
             └──────────────▼──────────────┘
                     NATS Streaming
                    (Event Bus)
                          │
                   ┌──────▼──────┐
                   │  Expiration │
                   │   Service   │
                   └─────────────┘
```
 
### Services
 
| Service | Responsibility |
|---|---|
| **Auth** | User authentication and authorization, JWT issuance and validation |
| **Tickets** | Ticket lifecycle management — create, update, list, and query |
| **Orders** | Purchase order management and ticket reservation |
| **Payments** | Payment processing and order fulfillment |
| **Expiration** | Order expiration via delayed event scheduling |
| **Client** | Next.js frontend consuming the backend services |
 
### Communication
 
- **Synchronous:** HTTP/REST for commands and queries
- **Asynchronous:** Events via NATS Streaming, ensuring decoupling and reliability across services
---
 
## Key Technical Decisions
 
- **Event-driven architecture** to eliminate direct dependencies between services
- **Database-per-service** pattern (isolated MongoDB per service) for independent scalability
- **JWT** for authentication and identity propagation across service boundaries
- **Optimistic concurrency control** to handle out-of-order events correctly
- **Kubernetes + Skaffold** for a local dev workflow that mirrors production
- **Docker** for packaging and portability
---
 
## Tech Stack
 
| Layer | Technology |
|---|---|
| Backend | Node.js, TypeScript |
| Frontend | React, Next.js |
| Database | MongoDB (per service) |
| Messaging | NATS Streaming Server |
| Orchestration | Kubernetes |
| Dev Workflow | Skaffold |
| Containerization | Docker |
| CI/CD | GitHub Actions |
 
---
 
## Running Locally
 
### Prerequisites
 
- Docker
- Kubernetes (Docker Desktop or Minikube)
- `kubectl`
- Skaffold
### 1. Clone the repository
 
```bash
git clone https://github.com/gustavopmaia/ticketing.git
cd ticketing
```
 
### 2. Configure local domain
 
Add the following entry to your `/etc/hosts` file:
 
```
127.0.0.1 ticketing.dev
```
 
### 3. Install Ingress-NGINX
 
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
```
 
### 4. Create required secrets
 
```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your_jwt_secret
kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=your_stripe_key
```
 
### 5. Start the application
 
```bash
skaffold dev
```
 
The app will be available at **http://ticketing.dev**
 
---
 
## Environment Variables
 
Secrets and configuration are managed via Kubernetes Secrets and ConfigMaps per service.
 
| Variable | Description |
|---|---|
| `JWT_KEY` | Secret key for JWT signing |
| `MONGO_URI` | MongoDB connection URI for each service |
| `NATS_URL` | NATS Streaming server URL |
| `NATS_CLUSTER_ID` | NATS cluster ID |
| `NATS_CLIENT_ID` | Client ID (auto-generated in Kubernetes) |
| `STRIPE_KEY` | Stripe API key (payments service) |
 
---
 
## API Reference
 
### Auth Service
 
| Method | Route | Description |
|---|---|---|
| POST | `/api/users/signup` | Register a new user |
| POST | `/api/users/signin` | Authenticate and receive JWT |
| POST | `/api/users/signout` | Invalidate session |
| GET | `/api/users/currentuser` | Return the current authenticated user |
 
### Tickets Service
 
| Method | Route | Description |
|---|---|---|
| POST | `/api/tickets` | Create a ticket |
| GET | `/api/tickets` | List all tickets |
| GET | `/api/tickets/:id` | Fetch a ticket by ID |
| PUT | `/api/tickets/:id` | Update a ticket |
 
### Orders Service
 
| Method | Route | Description |
|---|---|---|
| POST | `/api/orders` | Place an order |
| GET | `/api/orders` | List all orders for the current user |
| GET | `/api/orders/:id` | Fetch an order by ID |
| DELETE | `/api/orders/:id` | Cancel an order |
 
---
 
## CI/CD
 
The repository includes GitHub Actions workflows for automated testing and deployment. On every push, the pipeline runs tests across all services before building and pushing Docker images.
