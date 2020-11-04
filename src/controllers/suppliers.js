const ObjectId = require('mongoose').Types.ObjectId;
const Supplier = require('../models/supplier');

function IsObjectId (supposedObjectId) {
    if ( ObjectId.isValid(supposedObjectId) ) {
        if ( String(new ObjectId(supposedObjectId)) === supposedObjectId) {
            console.log(String(new ObjectId(supposedObjectId)));
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

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

  //get particular supplier
exports.getSupplier = (req, res, next) => {
    const supplierId = req.params.supplierId;
    if ( !IsObjectId(supplierId) ) {
        try {
            var err = new Error('Id provided is not valid ID');
            err.statusCode = 404;
            throw err;
        }
        catch(err) {
            console.error('Error:\n', err);
            res.status(404).json({ error: err.message});
            //process.exit();
        };
        //res.status(404).json({ error: 'Provided ID value is not a valid supplier ObjectId'}); //instead of throwing error, works good 
        //next(err);
    }
    /*Supplier.findById(supplierId)
    .then(supplier => {
        if (!supplier) {
            var error = new Error('Could not find the supplier with specified ID');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Supplier found.', supplier: supplier });
    })
    .catch(err => {
        console.error('Error:\n', err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(404).json({ error: err.message});
    });
*/
    
    //alternative findById function:
    Supplier.findById(supplierId, function (err, docs) {
        if (err) {
            console.error(err);
        }
        else {
            console.log('Result: ', docs);
            res.status(200).json({ message: 'Supplier found.', supplier: docs });
        }
    });
    
};

//create supplier
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

//update supplier
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

//delete supplier
exports.deleteSupplier = (req, res, next) => {
    const supplierId = req.params.supplierId;
    Supplier.findById(supplierId)
    .then(supplier => {
      if (!supplier) {
        const error = new Error('Could not find supplier.');
        error.statusCode = 404;
        throw error;
      }
      return Supplier.findByIdAndRemove(supplierId);
    })
    .then(result => {
        res.status(200).json({ message: 'Supplier deleted successfully'});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};