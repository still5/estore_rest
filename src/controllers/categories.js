const Category = require('../models/category');

//GET (Read)
//get all categories
exports.getCategories = (req, res, next) => {
  Category.find()
    .then(categories => {
      res
        .status(200)
        .json({ message: 'Fetched categories successfully.', categories: categories });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//get particular category
exports.getCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId)
      .then(category => {
        if (!category) {
          const error = new Error('Could not find category.');
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({ message: 'Category found.', category: category });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

//create category
exports.postCategory = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
  
    const category = new Category({
      title: title,
      description: description
    });
    category
      .save()
      .then(result => {
        res.status(201).json({
          message: 'Category created successfully',
          category: result
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};

//update category
exports.putCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    const title = req.body.title;
    const description = req.body.description;
    Category.findById(categoryId)
      .then(category => {
        if (!category) {
          const error = new Error('Could not find category.');
          error.statusCode = 404;
          throw error;
        }
        category.title = title;
        category.description = description;
        return category.save();
      })
      .then(result => {
        res.status(200).json({ message: 'Category updated', category: result });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });    
};

//delete
exports.deleteCategory = (req, res, next) => {
};
