const http = require('http');
const env = require('dotenv').config({path: './config/.env'});

//const app = express();
//app.set('view engine', 'ejs');
//app.set('views', 'views');

const routes = require('./routes/index');

const server = http.createServer(routes.handler);

const portToListen = process.env.NODE_PORT;
server.listen(portToListen);

const db = require('./db/database');

db.execute('SELECT * FROM statuses')
    .then( result => {
        console.log(result[0], result[1], result[2]);
    })
    .catch( err => {
        console.log(err);
    });

