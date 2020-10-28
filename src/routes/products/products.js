const express = require('express');
const router = express.Router();

const productsController = require('../../controllers/products');

router.get('/products', productsController.getProducts);

router.get('/add-product', (req, res, next) => {
    res.send('<form action="/products" method="POST"><input type="text" name="title"><button type="submit">Add P</button></form>');
});

router.post('/products', productsController.postProduct);
router.get('/products/:productId', productsController.getProducts);

module.exports = router;