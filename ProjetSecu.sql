
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
    nom VARCHAR(100),
    id_type VARCHAR(50),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (nom, id_type),
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

-- Table roles
INSERT INTO roles (id_role, nom) VALUES ('R1', 'Admin');
INSERT INTO roles (id_role, nom) VALUES ('R2', 'User');
INSERT INTO roles (id_role, nom) VALUES ('R3', 'Manager');
INSERT INTO roles (id_role, nom) VALUES ('R4', 'Guest');

-- Table users
INSERT INTO users (id_user, login, id_role) VALUES ('U1', 'alice', 'R1');
INSERT INTO users (id_user, login, id_role) VALUES ('U2', 'bob', 'R2');
INSERT INTO users (id_user, login, id_role) VALUES ('U3', 'charlie', 'R3');
INSERT INTO users (id_user, login, id_role) VALUES ('U4', 'david', 'R4');
INSERT INTO users (id_user, login, id_role) VALUES ('U5', 'eve', 'R1');
INSERT INTO users (id_user, login, id_role) VALUES ('U6', 'frank', 'R2');
INSERT INTO users (id_user, login, id_role) VALUES ('U7', 'grace', 'R2');

-- table FileType
INSERT INTO filetype (id_type, nom) VALUES ('FT1', 'Public');
INSERT INTO filetype (id_type, nom) VALUES ('FT2', 'Interne');
INSERT INTO filetype (id_type, nom) VALUES ('FT3', 'Confidentiel');
INSERT INTO filetype (id_type, nom) VALUES ('FT4', 'Restreint');

--table file
INSERT INTO file (id_file, nom, id_type) VALUES ('F1', 'BudgetReport', 'FT3');
INSERT INTO file (id_file, nom, id_type) VALUES ('F2', 'CompanyPresentation', 'FT1');
INSERT INTO file (id_file, nom, id_type) VALUES ('F3', 'ProjectPlan', 'FT2');
INSERT INTO file (id_file, nom, id_type) VALUES ('F4', 'MeetingNotes', 'FT4');
INSERT INTO file (id_file, nom, id_type) VALUES ('F5', 'TeamPhoto', 'FT1');
INSERT INTO file (id_file, nom, id_type) VALUES ('F6', 'TrainingVideo', 'FT2');
INSERT INTO file (id_file, nom, id_type) VALUES ('F7', 'AnnualReport', 'FT1');

-- table Droit
INSERT INTO droit (id_role, id_type, lecture, ecriture) VALUES ('R1', 'FT1', TRUE, TRUE);  -- Admin - Public
INSERT INTO droit (id_role, id_type, lecture, ecriture) VALUES ('R1', 'FT2', TRUE, TRUE);  -- Admin - Interne
INSERT INTO droit (id_role, id_type, lecture, ecriture) VALUES ('R1', 'FT3', TRUE, TRUE);  -- Admin - Confidentiel
INSERT INTO droit (id_role, id_type, lecture, ecriture) VALUES ('R1', 'FT4', TRUE, TRUE);  -- Admin - Restreint

INSERT INTO droit (id_role, id_type, lecture, ecriture) VALUES ('R2', 'FT1', TRUE, FALSE);  -- User - Public
INSERT INTO droit (id_role, id_type, lecture, ecriture) VALUES ('R2', 'FT2', TRUE, FALSE);  -- User - Interne
INSERT INTO droit (id_role, id_type, lecture, ecriture) VALUES ('R2', 'FT3', FALSE, FALSE); -- User - Confidentiel
INSERT INTO droit (id_role, id_type, lecture, ecriture) VALUES ('R2', 'FT4', FALSE, FALSE); -- User - Restreint

INSERT INTO droit (id_role, id_type, lecture, ecriture) VALUES ('R3', 'FT1', TRUE, TRUE);  -- Manager - Public
INSERT INTO droit (id_role, id_type, lecture, ecriture) VALUES ('R3', 'FT2', TRUE, TRUE);  -- Manager - Interne
INSERT INTO droit (id_role, id_type, lecture, ecriture) VALUES ('R3', 'FT3', TRUE, TRUE);  -- Manager - Confidentiel
INSERT INTO droit (id_role, id_type, lecture, ecriture) VALUES ('R3', 'FT4', FALSE, FALSE); -- Manager - Restreint

INSERT INTO droit (id_role, id_type, lecture, ecriture) VALUES ('R4', 'FT1', TRUE, FALSE);  -- Guest - Public
INSERT INTO droit (id_role, id_type, lecture, ecriture) VALUES ('R4', 'FT2', FALSE, FALSE); -- Guest - Interne
INSERT INTO droit (id_role, id_type, lecture, ecriture) VALUES ('R4', 'FT3', FALSE, FALSE); -- Guest - Confidentiel
INSERT INTO droit (id_role, id_type, lecture, ecriture) VALUES ('R4', 'FT4', FALSE, FALSE); -- Guest - Restreint
