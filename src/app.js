//const http = require('http');
const express = require('express');
const app = express();
const indexRoutes = require('./routes/index');
const env = require('dotenv').config({path: './config/.env'});
const mongoose = require('mongoose');
const portToListen = process.env.NODE_PORT;


//app.set('view engine', 'ejs');
//app.set('views', 'views');

//To test CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(indexRoutes);

/*
mongoose
.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log('DB connected');
        app.listen(portToListen);
    })
    .catch(err => {
        console.log(err);
    });
*/

const mongooseConnect = require('./db/database');

mongooseConnect(client => {
    //console.log(client);
    app.listen(portToListen);
})

/*db.execute('SELECT * FROM statuses')
    .then( result => {
        console.log(result[0], result[1], result[2]);
    })
    .catch( err => {
        console.log(err);
    });
*/
