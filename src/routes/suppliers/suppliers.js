const express = require('express');
const router = express.Router();

const suppliersController = require('../../controllers/suppliers');

//GET (Read)
router.get('/', suppliersController.getSuppliers);

router.get('/:supplierId', suppliersController.getSupplier);

//POST (Create)
router.post('/', suppliersController.postSupplier);

//PUT (Update)
router.put('/:supplierId', suppliersController.putSupplier);

//DELETE (Delete)
router.delete('/:supplierId', suppliersController.deleteSupplier);

module.exports = router;