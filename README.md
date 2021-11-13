# PROJET S7 METN

> Projet de site web pour le semestre 7.

## Création d'une base de données locale

Les commandes suivantes sont effectués sur le shell mongo.

Pour l'activer il faut utiliser :
`mongo`

# Installation de MongoDB

https://www.mongodb.com/try/download/community

Après l'installation, rajouter le chemin d'accès aux binaires "CHEMIN\MongoDB\Server\5.0\bin"
dans la variable d'environnement "PATH" de Windows.

# Création de la collection "app_stage"

Utilisez la commande `use app_stage` pour créer la collection.

Puis rajoutez les types possible de comptes pour l'environnement de dev :

- Utilisateur étudiant (email : etudiant@dev.fr, mdp : test)

- Utilisateur entreprise (email : entreprise@dev.fr, mdp : test)

- Utilisateur administrateur (email : admin@dev.fr, mdp : test)

- Utilisateur en attente de vérification de compte (email : verif@dev.fr, mdp : test)

- Utilisateur en attente de validation par un administrateur (email : valide@dev.fr, mdp : test)

```bash
db.comptes.insertMany([   {     nom: "Nom",     prenom: "Entreprise",     email: "entreprise@dev.fr",     mot_de_passe: "$2a$12$oQixXLPKOQWpnxyEuUWujOQA9oKbVsnQflgKb3Wzm0zcTzcijtrpO",     statut: "entreprise",     estVerifie: true,     estAttribue: true,     date_inscription: ISODate("2021-11-07T02:37:57.529Z"),     __v: 0,   },   {     nom: "Nom",     prenom: "cyberlog",     email: "cyberlog@dev.fr",     mot_de_passe: "$2a$12$oQixXLPKOQWpnxyEuUWujOQA9oKbVsnQflgKb3Wzm0zcTzcijtrpO",     statut: "cyberlog",     estVerifie: true,     estAttribue: true,     date_inscription: ISODate("2021-11-07T02:37:57.529Z"),     __v: 0,   }, {     nom: "Nom",     prenom: "cyberdata",     email: "cyberdata@dev.fr",     mot_de_passe: "$2a$12$oQixXLPKOQWpnxyEuUWujOQA9oKbVsnQflgKb3Wzm0zcTzcijtrpO",     statut: "cyberdata",     estVerifie: true,     estAttribue: true,     date_inscription: ISODate("2021-11-07T02:37:57.529Z"),     __v: 0,   },  {     nom: "Nom",     prenom: "Administrateur",     email: "admin@dev.fr",     mot_de_passe: "$2a$12$oQixXLPKOQWpnxyEuUWujOQA9oKbVsnQflgKb3Wzm0zcTzcijtrpO",     statut: "administrateur",     estVerifie: true,     estAttribue: true,     date_inscription: ISODate("2021-11-07T02:37:57.529Z"),     __v: 0,   },   {     nom: "Nom",     prenom: "Vérification",     email: "verif@dev.fr",     mot_de_passe: "$2a$12$oQixXLPKOQWpnxyEuUWujOQA9oKbVsnQflgKb3Wzm0zcTzcijtrpO",     statut: "cyberdata",     estVerifie: false,     estAttribue: false,     date_inscription: ISODate("2021-11-07T02:37:57.529Z"),     __v: 0,   },   {     nom: "Nom",     prenom: "Validation",     email: "valide@dev.fr",     mot_de_passe: "$2a$12$oQixXLPKOQWpnxyEuUWujOQA9oKbVsnQflgKb3Wzm0zcTzcijtrpO",     statut: "cyberdata",     estVerifie: true,     estAttribue: false,     date_inscription: ISODate("2021-11-07T02:37:57.529Z"),     __v: 0,   }, ]);
```

- Pour mettre à jour une ligne :

```bash
db.comptes.updateOne({email: "email@dev.fr"},{$set: { "estVerifie" : true}})
```

- Pour supprimer la collection :

```bash
db.comptes.drop()
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
