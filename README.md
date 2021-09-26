# PROJET S7 MERN

> Projet de site web pour le semestre 7.

## Quick Start

Ajouter le MONGO_URI au fichier default.json. Setup la var "env" et le "jwtSecret" avant de déployer.

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

## Deployment

There is a Heroku post build script so that you do not have to compile your React frontend manually, it is done on the server. Simply push to Heroku and it will build and load the client index.html page