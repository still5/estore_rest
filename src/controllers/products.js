const Product = require('../models/product');
const Supplier = require('../models/supplier');
const Category = require('../models/category');

//GET (Read)
//all products
exports.getProducts = (req, res, next) => {
  Product.find()
  .then(products => {
    res
      .status(200)
      .json({ message: 'Fetched products successfully.', products: products });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

//single product
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      if (!product) {
        const error = new Error('Could not find product.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Product found.', product: product });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//POST (Create)
exports.postProduct = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const category_ref = req.body.category_ref;
  const image = req.body.image;
  const status = req.body.status;
  const supplier_ref = req.body.supplier_ref;
  const expiryDate = req.body.expiryDate;
  const measurement = req.body.measurement;
  const quantity = req.body.quantity;

  const product = new Product({
    title: title,
    description: description,
    price: price,
    category_ref: category_ref,
    image: image,
    status: status,
    supplier_ref: supplier_ref,
    expiryDate: expiryDate,
    measurement: measurement,
    quantity: quantity
  });
  product
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Product created successfully!',
        product: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//PUT (Update)
exports.putProduct = (req, res, next) => {
  const productId = req.params.productId;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const category_ref = req.body.category_ref;
  const image = req.body.image;
  const status = req.body.status;
  const supplier_ref = req.body.supplier_ref;
  const expiryDate = req.body.expiryDate;
  const measurement = req.body.measurement;
  const quantity = req.body.quantity;
  Product.findById(productId)
    .then(product => {
      if (!product) {
        const error = new Error('Could not find product.');
        error.statusCode = 404;
        throw error;
      }
      product.title = title;
      product.description = description;
      product.price = price;
      product.category_ref = category_ref;
      product.image = image;
      product.status = status;
      product.supplier_ref = supplier_ref;
      product.expiryDate = expiryDate;
      product.measurement = measurement;
      product.quantity = quantity;
      return product.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Product updated', product: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//DELETE (Delete)
exports.deleteProduct = (req, res, next) => {
  
};




