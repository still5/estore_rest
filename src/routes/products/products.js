const express = require('express');

const router = express.Router();

const productsController = require('../../controllers/products');

//GET (Read)
router.get('/', productsController.getProducts);

router.get('/:productId', productsController.getProduct);

//POST (Create)
router.post('/', productsController.postProduct);

//PUT (Update)
router.put('/:productId', productsController.putProduct);

//DELETE (Delete)
router.delete('/:productId', productsController.deleteProduct);


module.exports = router;