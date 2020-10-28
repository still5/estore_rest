const express = require('express');
const router = express.Router();
const productsRoutes = require('./products/products');
const suppliersRoutes = require('./suppliers/suppliers');
const bodyParser = require('body-parser');

//router.use('/products', productsRoutes);
//router.use('/suppliers', suppliersRoutes);
//router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.use(productsRoutes);
router.use(suppliersRoutes);

router.get('/', (req, res, next) => {
    res.send('<h1>Hello from Express index!</h1>');
});

// catch 404 and forward to error handler
router.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  router.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    console.log(err);
    res.send('<p>Page not found...</p><br><a href="/">Click to return to valid page</a>');
  });

module.exports = router;

/* ===================
Below is obsolete code 
=================== */

/*const fs = require('fs');
//const { timeStamp } = require('console');

const routesHandler = (req,res ) => {
    const url = req.url;
    const method = req.method;
    //const status = req.statusCode;

    //var today = new Date();
    //var time = today.getHours() + ':' + today.getMinutes();
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message"><input type="submit" name="Submit"></form></body>'
        );
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    //console.log(req.url, req.method, req.headers);
    //process.exit();
    //console.log('request ',time);
}

module.exports.handler = routesHandler;
*/