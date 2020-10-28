const express = require('express');

const router = express.Router();

const categoriesController = require('../../controllers/categories');

//GET (Read)
router.get('/', categoriesController.getCategories);

router.get('/:categoryId', categoriesController.getCategory);

//POST (Create)
router.post('/', categoriesController.postCategory);

//PUT (Update)
router.put('/:categoryId', categoriesController.putCategory);

//DELETE (Delete)
router.delete('/:categoryId', categoriesController.deleteCategory);

module.exports = router;