// -- -- -- -- -- -- -- -- --  -- IMPORTS -- -- -- -- -- -- -- -- --  -- \\

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
// import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';

// -- -- -- -- -- -- -- -- --  -- ROUTES -- -- -- -- -- -- -- -- --  -- \\

import authRoutes from './backend/routes/api/auth.js';
import itemRoutes from './backend/routes/api/items.js';
import userRoutes from './backend/routes/api/users.js';
import cvthequeRoutes from './backend/routes/cvtheque.js';
import soutenancesRoutes from './backend/routes/soutenance.js'

dotenv.config({ path: 'backend/.env' });

const app = express();

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(
    import.meta.url));

app.set('view engine', 'html');


// -- -- -- -- -- -- -- -- --  -- MIDDLEWARES -- -- -- -- -- -- -- -- --  -- \\

// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan('dev'));
// Bodyparser Middleware
app.use(express.json());


// -- -- -- -- -- -- -- -- --  -- DATABASE -- -- -- -- -- -- -- -- --  -- \\

// DB Config
const db = `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`;

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }) // Adding new mongo url parser
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// -- -- -- -- -- -- -- -- --  -- ROUTING API -- -- -- -- -- -- -- -- --  -- \\

// Use Routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Static folder
app.use(express.static(__dirname + '/frontend'));


// -- -- -- -- -- -- -- -- --  -- ROUTING -- -- -- -- -- -- -- -- --  -- \\

// Page d'accueil
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/frontend/index.html');
});

// Page de contact
app.get('/contact', function(req, res) {
    res.sendFile(__dirname + '/frontend/contact.html');
});

// Page de connexion
app.get('/connexion', function(req, res) {
    res.sendFile(__dirname + '/frontend/connexion.html');
});

// Page d'inscription
app.get('/inscription', function(req, res) {
    res.sendFile(__dirname + '/frontend/inscription.html');
});

// Page des offres
app.get('/offres', function(req, res) {
    res.sendFile(__dirname + '/frontend/offres.html');
});

// Page de profil
app.get('/profil', function(req, res) {
    res.sendFile(__dirname + '/frontend/profil.html');
});

// Send a mail
app.post('/mail', function(req, res) {
    res.send('Soutenances Page');
});

// Page de la CVthèque
app.use('/cvtheque', cvthequeRoutes);

// Page des soutenances
app.use('/soutenances', soutenancesRoutes)

// Page d'erreur 404 (mettre en dernière route)
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/frontend/error404.html', 404);
});


// -- -- -- -- -- -- -- -- --  -- DEMARRAGE SERVEUR -- -- -- -- -- -- -- -- --  -- \\

app.listen(process.env.PORT, () => console.log(`Server started on http://localhost:${process.env.PORT}`));