### PROJET-SECU-4A

Install PostgreSQL
Create a database 

### Run keycloak if you have created the docker volume keycloak_data

sudo docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin -v keycloak_data:/opt/keycloak/data quay.io/keycloak/keycloak:24.0.4 start-dev

### Configure keycloak

https://www.keycloak.org/getting-started/getting-started-docker

### Then execute the following commands, at the root of the project:sudo systemctl start curity

sudo apt install docker-compose
docker-compose up --build

