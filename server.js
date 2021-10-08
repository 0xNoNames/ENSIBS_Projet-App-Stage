import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from './config/index.js';

// routes
import authRoutes from './routes/api/auth.js';
import itemRoutes from './routes/api/items.js';
import userRoutes from './routes/api/users.js';
import cvthequeRoutes from './routes/cvtheque.js';
import soutenancesRoutes from './routes/soutenance.js'

const { MONGO_URI, MONGO_DB_NAME } = config;

const app = express();

import { dirname } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));


app.set('view engine', 'html');


// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan('dev'));
// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }) // Adding new mongo url parser
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

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
app.use(express.static(__dirname + '/public'));


const { PORT } = config;




// Routing

// Main Page
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});


// Contact Page
app.get('/contact', function(req, res) {
  res.sendFile(__dirname + '/client/contact.html');
});


// Pages de la CVtheque
app.use('/cvtheque', cvthequeRoutes);


// Pages des soutenances
app.use('/soutenances',soutenancesRoutes)


// Send a mail
app.post('/mail', function(req, res) {
  res.send('Soutenances Page');
});


// Profil page
app.get('/profil', function(req, res) {
  res.sendFile(__dirname + '/client/profil.html');
});


//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.sendFile(__dirname + '/client/error404.html', 404);
});




app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));