const Category = require('../models/category');

exports.getCategories = (req, res, next) => {
    //
};

exports.getCategory = (req, res, next) => {
    const categoryId = req.params.postId;
    Category.findById(categoryId)
      .then(category => {
        if (!category) {
          const error = new Error('Could not find category.');
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({ message: 'Category fetched.', category: category });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };