# Utiliser une image de base Node.js (spécifier la version de Node que vous voulez, ici nous utilisons 16)
FROM node:16

# Installer nano
RUN apt-get update && apt-get install -y nano

# Définir le répertoire de travail dans le conteneur
WORKDIR /backend

# Copier le fichier package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installer les dépendances de l'application
# Note : npm clean-install est utilisé pour correspondre exactement avec package-lock.json s'il existe
#RUN npm clean-install
RUN npm install keycloak-connect express-session react-router-dom body-parser express-fileupload

RUN npm install cors

RUN npm install chokidar

RUN npm install ws



# Copier tous les fichiers sources de l'application dans le conteneur
COPY . .

# Exposer le port sur lequel l'application s'exécute (ici 3000)
EXPOSE 3000

# Définir la commande pour démarrer l'application
CMD ["node", "server.js"]
