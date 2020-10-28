const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

module.exports = pool.promise();

/*const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://db-user-2:TnGVb3hMs1em4@cluster0.jxr3n.mongodb.net/<dbname>?retryWrites=true&w=majority', {useUnifiedTopology: true})
    .then(client => {
        console.log('DB connected');
        callback(client);
    })
    .catch(err => {
        console.log('Not connected');
    });
}

module.exports = mongoConnect;*/

const env = require('dotenv').config({path: './config/.env'});
const mongoose = require('mongoose');

const mongooseConnect = callback => {
mongoose
.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
        console.log('DB connected');
        //app.listen(portToListen);
        callback(client);
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = mongooseConnect;