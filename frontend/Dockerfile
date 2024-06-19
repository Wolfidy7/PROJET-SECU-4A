# Étape de construction
# Utiliser une image de base officielle Node.js pour construire l'application
FROM node:16 as builder

# Définir le répertoire de travail dans le conteneur pour construire l'application
WORKDIR /front

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

#Installation de Bootstrap
RUN npm install bootstrap

RUN npm install react-router-dom

RUN npm install primereact primeicons primeflex

RUN npm install keycloak-js



# Copier les fichiers de l'application React
COPY . .

# Construire l'application pour la production
RUN npm run build

# # Étape de production
# # Utiliser une image de base Nginx pour servir l'application
# FROM nginx:alpine

# # Copier les fichiers de construction statiques dans le dossier de serveur Nginx
# COPY --from=builder /app/build /usr/share/nginx/html

# # Exposer le port 5000 pour l'application
EXPOSE 3000

# # Lancer Nginx et maintenir le service actif
CMD ["yarn", "start"]
