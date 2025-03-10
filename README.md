### PROJET-SECU-4A

Ce projet de sécurité d'école d'ingénieurs avait pour objectif de développer un serveur de fichiers sécurisé avec un accès contrôlé sur les dossiers/répertoires en fonction des droits et des rôles des différents utilisateurs.

Install PostgreSQL

Create a database with the ProjetSecu.sql script

### Run keycloak if you have created the docker volume keycloak_data

sudo docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin -v keycloak_data:/opt/keycloak/data quay.io/keycloak/keycloak:24.0.4 start-dev

### Configure keycloak

https://www.keycloak.org/getting-started/getting-started-docker

### Then execute the following commands, at the root of the project:sudo systemctl start curity

sudo apt install docker-compose
docker-compose up --build

