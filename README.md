# PROJET S7 METN

> Projet de site web pour le semestre 7.

## Création d'une base de données locale

Les commandes suivantes sont effectués sur le shell mongo.
Pour l'activer il faut utiliser : 
```bash
mongo
```

```bash
# Installation 
https://www.mongodb.com/try/download/community
Après l'installation, rajouter le chemin d'accès aux binaires "CHEMIN\MongoDB\Server\5.0\bin" 
dans la variable d'environnement PATH de Windows. 

# Création de la database app_stage
use app_stage
db.utilisateurs.insert({nom: "nom", prenom: "prenom", email: "email", mot_de_passe: "toto", date_inscription: "", role: "admin"})

# Création d'un user de test
db.createUser({user:"admin", pwd:"admin", roles: [ "readWrite", "dbAdmin" ]});
```

## Démarrage rapide

```bash
# Installer les dépendances de l'application.
npm install

# Démarrer le serveur node et la compilation tailwind.
npm run dev

# Build pour le production
npm run build

# Démarrer seulement le serveur node (build et watch).
npm run server:build
npm run server:watch

# Compiler tailwind (build et watch).
npm run tailwind:build
npm run tailwind:watch

# Le serveur est en écoute sur l'adresse http://localhost:5000
```
