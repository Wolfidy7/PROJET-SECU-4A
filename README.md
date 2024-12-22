# PROJET-SECU-4A

Ce projet de sécurité d'école d'ingénieurs avait pour objectif de développer un serveur de fichiers sécurisé avec un accès contrôlé sur les dossiers/répertoires en fonction des droits et des rôles des différents utilisateurs.

Dependencies download:

* pip install flask
* pip install flask_sqlalchemy


Start application:

* go to /front folder
* Open your command prompt and use the following command : yarn start

/!\ If you have the error "No such file or directory:'install'" then follow the steps below:

* sudo apt remove cmdtest
* sudo apt remove yarn
* curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
* echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
* sudo apt-get update
* sudo apt-get install yarn -y
* yarn install
* yarn start

