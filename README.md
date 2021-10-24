# PROJET S7 METN

> Projet de site web pour le semestre 7.

## Démarrage rapide

Ajouter "MONGOURI", "MONGO_DB_NAME" et "JWTSECRET" au fichier "backend\.env".

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