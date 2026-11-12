# TP CI/CD — API Express + MongoDB avec Docker et GitHub Actions

Petite API REST Node.js qui sert de support à une chaîne **CI/CD** complète : à chaque push sur `main`, GitHub Actions construit l'image Docker et la publie sur Docker Hub.

![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)

## Le pipeline

```
git push (main)
   │
   ▼
GitHub Actions ──► docker build ──► docker push ──► Docker Hub (dongui21/tp-ci-cd)
                                                         │
                                                         ▼
                                         docker compose up (app + MongoDB)
```

- **Workflow** : [`.github/workflows/docker-image.yml`](.github/workflows/docker-image.yml)
- **Secrets utilisés** : `DOCKER_USERNAME` et `DOCKER_PASSWORD`, stockés dans *Settings → Secrets and variables → Actions*, jamais dans le code.
- **Image** : construite à partir de [`Dockerfile`](Dockerfile) (Node 20 Alpine, dépendances de production uniquement).

## L'API

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/items` | Liste tous les éléments |
| `POST` | `/items` | Crée un élément — corps JSON : `{ "name": "…" }` |

## Lancer le projet

### Avec Docker (recommandé)

```bash
docker compose up
```

L'API est disponible sur <http://localhost:3000> et MongoDB tourne dans son propre conteneur.

### En local

Prérequis : Node.js 20 et une base MongoDB qui tourne.

```bash
npm install
cp .env.example .env   # adapter MONGO_URI si besoin
npm start
```

### Tester

```bash
curl -X POST http://localhost:3000/items -H "Content-Type: application/json" -d '{"name":"Premier élément"}'
curl http://localhost:3000/items
```

## Structure

```
├── index.js                         API Express + modèle Mongoose
├── Dockerfile                       image de l'application
├── docker-compose.yml               application + MongoDB
└── .github/workflows/docker-image.yml   build et publication automatiques
```

## Auteur

**OUATTARA Dongui** — [@xavi-ouattaradongui](https://github.com/xavi-ouattaradongui)
