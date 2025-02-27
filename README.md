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

Cada serviço possui variáveis de ambiente específicas que precisam ser configuradas. Por exemplo, o serviço de autenticação (`auth`) requer uma chave JWT para assinatura de tokens. Certifique-se de definir todas as variáveis necessárias antes de iniciar os serviços.

## Scripts Úteis

- **startup.sh**: Script para inicializar os serviços e configurar o ambiente automaticamente. Para executá-lo:

  ```bash
  ./startup.sh
  ```
