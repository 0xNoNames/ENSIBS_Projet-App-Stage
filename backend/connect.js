const mongoose = require('mongoose');

mongoose.connect("mongoose://localhost/admin:admin@localhost");

mongoose.connection
    .once('open', () => console.log("Connected to db"))
    .on('error', (error) => {
        console.log("Connection error : ", error);
    });