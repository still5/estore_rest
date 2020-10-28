const express = require('express');
const router = express.Router();
const productsRoutes = require('./products/products');
const suppliersRoutes = require('./suppliers/suppliers');
const categoriesRoutes = require('./categories/categories');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.use('/categories', categoriesRoutes);
router.use('/products', productsRoutes);
router.use('/suppliers', suppliersRoutes);

router.get('/', (req, res, next) => {
    res.send('<h1>Some root main page</h1>');
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
