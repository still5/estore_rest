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
        //Updating particular Supplier to put a Product array link
      const createdProductId = product._id;
      console.log('THIS IS THE NEW P:\n', product);
      supplier = Supplier.findById(supplier_ref)
      .then(supplier => {
      if (!supplier) {
        const error = new Error('Could not find THE SUPPLIER.');
        error.statusCode = 404;
        throw error;
      }
      supplier.products.push(product);
      supplier.save();
    });
        //Updating particular Category to put a Product array link
      category = Category.findById(category_ref)
      .then(category => {
        if (!category) {
          const error = new Error('Could not find THE CATEGORY.');
          error.statusCode = 404;
          throw error;
        }
      category.products.push(product);
      category.save();
      });
      const creationSuccessMessage = 'Product created successfully! ID=' + createdProductId;
      res.status(201).json({
        message: creationSuccessMessage,
        product: product
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
      /*if categories in request and in existing object are different, deleting a link in that cat and create a link with the new cat */
      if (product.category_ref !== category_ref) {
        category = Category.findById(product.category_ref)
          .then(category => {
            if (!category) {
              const error = new Error('Could not find THE CATEGORY.');
              error.statusCode = 404;
              throw error;
            }
            category.products.pull(productId);
            category.save();
        });
        category = Category.findById(category_ref)
          .then(category => {
            if (!category) {
              const error = new Error('Could not find THE CATEGORY.');
              error.statusCode = 404;
              throw error;
            }
            category.products.push(product);
            category.save();
          });
        product.category_ref = category_ref;
      }
      product.image = image;
      product.status = status;
      /*if supplier IDs in request and in existing object are different, deleting a link in that supplier and create a link with the new supplier */
      if (product.supplier_ref != supplier_ref) {
        supplier = Supplier.findById(product.supplier_ref)
          .then(supplier => {
            if (!supplier) {
              const error = new Error('Could not find THE SUPPLIER.');
              error.statusCode = 404;
              throw error;
            }
            supplier.products.pull(productId);
            supplier.save();
        });
        supplier = Supplier.findById(supplier_ref)
          .then(supplier => {
            if (!supplier) {
              const error = new Error('Could not find THE SUPPLIER.');
              error.statusCode = 404;
              throw error;
            }
            supplier.products.push(product);
            supplier.save();
          });
        product.supplier_ref = supplier_ref;
      }
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
  const productId = req.params.productId;
  let categoryId;
  let supplierId;
  Product.findById(productId)
    .then(product => {
      if (!product) {
        const error = new Error('Product not found');
        error.statusCode = 404;
        throw error;
      }
      categoryId = product.category_ref;
      supplierId = product.supplier_ref;
      const prodId = product._id;
      console.log('Product data:\nCateg = ',categoryId,'\nSupplier = ',supplierId,'\nprodId = ',prodId);
      return Product.findByIdAndRemove(productId);
    })
    .then(result => {
       //Deleting Product link from particular Supplier
       console.log('Product data from Supplier level:\nCateg = ',categoryId,'\nSupplier = ',supplierId);
       supplier = Supplier.findById(supplierId)
       .then(supplier => {
       if (!supplier) {
         const error = new Error('Could not find THE SUPPLIER.');
         error.statusCode = 404;
         throw error;
       }
       supplier.products.pull(productId);
       supplier.save();
     });
      //Deleting Product link from particular Category
      category = Category.findById(categoryId)
      .then(category => {
        if (!category) {
          const error = new Error('Could not find THE CATEGORY.');
          error.statusCode = 404;
          throw error;
        }
      category.products.pull(productId);
      category.save();
      });
      res.status(200).json({message: 'Product deleted.'});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};




