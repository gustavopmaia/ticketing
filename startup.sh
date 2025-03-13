#!/bin/bash

# Verifica se o Minikube está rodando
if ! minikube status | grep -q "Running"; then
  echo "Minikube não está rodando. Iniciando..."
  minikube start
else
  echo "Minikube já está rodando."
fi

# Remover configuração de webhook do Ingress NGINX
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission

# Iniciar Skaffold
skaffold dev
