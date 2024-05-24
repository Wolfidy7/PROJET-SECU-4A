
-- Suppresion des tables si elles ont été créées
DROP TABLE IF EXISTS droit;
DROP TABLE IF EXISTS file;
DROP TABLE IF EXISTS filetype;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;
DROP DATABASE IF EXISTS projetsecu;
--Création de la base de données
CREATE DATABASE projetsecu;

-- Connection à la base de données nouvellement créée
-- Mettre les informations de Connection
-- Connexion à la base de données nouvellement créée
-- Connexion à la base de données nouvellement créée
\c projetsecu
-- Création de la table Roles
CREATE TABLE roles (
    id_role VARCHAR(50) PRIMARY KEY ,
    nom VARCHAR(100)
);

-- Création de la table Users
CREATE TABLE users (
    id_user VARCHAR(50) PRIMARY KEY ,
    login VARCHAR(100),
    id_role VARCHAR(50),
    FOREIGN KEY (id_Role) REFERENCES roles (id_role)

);


-- Création de la table FileType
CREATE TABLE filetype (
    id_type VARCHAR(50) PRIMARY KEY,
    nom VARCHAR(100)
);

-- Création de la table File
CREATE TABLE file (
    id_file VARCHAR(50) PRIMARY KEY,
    nom VARCHAR(100),
    id_type VARCHAR(50),
    FOREIGN KEY (id_type) REFERENCES filetype (id_type)
);


-- Création de la table Droit
CREATE TABLE droit(
    id_role VARCHAR(50),
    id_type VARCHAR(50),
    lecture BOOLEAN,
    ecriture BOOLEAN,
    PRIMARY KEY (id_role, id_type),
    FOREIGN KEY (id_role) REFERENCES roles (id_role),
    FOREIGN KEY (id_type) REFERENCES filetype (id_type)

);
