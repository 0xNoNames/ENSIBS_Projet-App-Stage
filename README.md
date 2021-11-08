# PROJET S7 METN

> Projet de site web pour le semestre 7.
> 
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

Puis rajoutez des utilisateurs pour l'environnement de dev :

- Ajout utilisateur étudiant (email : etudiant@dev.fr, mdp : test)
```bash 
db.utilisateurs.insert({nom: "Nom", prenom: "Etudiant", email: "etudiant@dev.fr", mot_de_passe: "$2a$12$oQixXLPKOQWpnxyEuUWujOQA9oKbVsnQflgKb3Wzm0zcTzcijtrpO", role: "etudiant", date_inscription:  ISODate("2021-11-07T02:37:57.529Z"), __v: 0})
```

- Ajout utilisateur entreprise (email : entreprise@dev.fr, mdp : test)
```bash 
db.utilisateurs.insert({nom: "Nom", prenom: "Entreprise", email: "entreprise@dev.fr", mot_de_passe: "$2a$12$oQixXLPKOQWpnxyEuUWujOQA9oKbVsnQflgKb3Wzm0zcTzcijtrpO", role: "entreprise", date_inscription:  ISODate("2021-11-07T02:37:57.529Z"), __v: 0})
```

- Ajout utilisateur administrateur (email : admin@dev.fr, mdp : test)
```bash 
db.utilisateurs.insert({nom: "Nom", prenom: "Administrateur", email: "admin@dev.fr", mot_de_passe: "$2a$12$oQixXLPKOQWpnxyEuUWujOQA9oKbVsnQflgKb3Wzm0zcTzcijtrpO", role: "administrateur", date_inscription:  ISODate("2021-11-07T02:37:57.529Z"), __v: 0})
```

- Ajout utilisateur en attente de vérification de compte (email : verif@dev.fr, mdp : test)
```bash 
db.utilisateurs.insert({nom: "Nom", prenom: "Vérification", email: "verif@dev.fr", mot_de_passe: "$2a$12$oQixXLPKOQWpnxyEuUWujOQA9oKbVsnQflgKb3Wzm0zcTzcijtrpO", role: "verification", date_inscription:  ISODate("2021-11-07T02:37:57.529Z"), __v: 0})
```

- Ajout utilisateur en attente de validation par un administrateur (email : valide@dev.fr, mdp : test)
```bash 
db.utilisateurs.insert({nom: "Nom", prenom: "Validation", email: "valide@dev.fr", mot_de_passe: "$2a$12$oQixXLPKOQWpnxyEuUWujOQA9oKbVsnQflgKb3Wzm0zcTzcijtrpO", role: "validation", date_inscription:  ISODate("2021-11-07T02:37:57.529Z"), __v: 0})
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
