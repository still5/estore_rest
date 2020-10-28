const Product = require('../models/product');

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
      res.status(200).json({ message: 'Post fetched.', product: product });
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error('No image provided.');
    error.statusCode = 422;
    throw error;
  }
  const image = req.file.path;
  const title = req.body.title;
  const description = req.body.description;
  const product = new Product({
    title: title,
    description: description,
    image: image,
    creator: { name: 'User' }
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let image = req.body.image;
  if (req.file) {
    image = req.file.path;
  }
  if (!image) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }
  Product.findById(productId)
    .then(product => {
      if (!product) {
        const error = new Error('Could not find product.');
        error.statusCode = 404;
        throw error;
      }
      if (image !== product.image) {
        clearImage(product.image);
      }
      product.title = title;
      product.image = image;
      product.description = description;
      return product.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Product updated!', product: result });
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




