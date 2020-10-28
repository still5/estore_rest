const Supplier = require('../models/supplier');

//GET (Read)
//all suppliers
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

exports.getSupplier = (req, res, next) => {
    const supplierId = req.params.supplierId;
    Supplier.findById(supplierId)
    .then(supplier => {
      if (!supplier) {
        //res.status(404).json({ message: 'Could not find the supplier with specified ID'});
        const error = new Error('Could not find the supplier.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Supplier found.', supplier: supplier });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postSupplier = (req, res, next) => {
    const title = req.body.title;
    const details = req.body.details;
    const address = req.body.address;
  
    const supplier = new Supplier({
      title: title,
      details: details,
      address: address
    });
    supplier
      .save()
      .then(result => {
        res.status(201).json({
          message: 'Supplier created successfully',
          supplier: result
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};

exports.putSupplier = (req, res, next) => {
    const supplierId = req.params.supplierId;
    const title = req.body.title;
    const details = req.body.details;
    const address = req.body.address;
    Supplier.findById(supplierId)
      .then(supplier => {
        if (!supplier) {
          const error = new Error('Could not find supplier.');
          error.statusCode = 404;
          throw error;
        }
        supplier.title = title;
        supplier.details = details;
        supplier.address = address;
        return supplier.save();
      })
      .then(result => {
        res.status(200).json({ message: 'Supplier updated', supplier: result });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });    
};

exports.deleteSupplier = (req, res, next) => {
};