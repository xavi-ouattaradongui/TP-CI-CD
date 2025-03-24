# Utiliser Node.js comme image de base
FROM node:16

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tous les fichiers du projet
COPY . .

# Exposer le port 3000
EXPOSE 3000

# Commande pour démarrer l’application
CMD ["node", "index.js"]
