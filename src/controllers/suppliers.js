const Supplier = require('../models/supplier');

//GET (Read)
//all products
exports.getSuppliers = (req, res, next) => {
    Supplier.find()
    .then(suppliers => {
      res
        .status(200)
        .json({ message: 'Fetched suppliers successfully.', suppliers: suppliers });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
  };

exports.getSingleSupplier = (req, res, next) => {
    const supplierId = req.params.supplierId;
    Supplier.findById(supplierId)
    .then(supplier => {
      if (!supplier) {
        const error = new Error('Could not find the supplier.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Post fetched.', supplier: supplier });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};