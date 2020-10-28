const express = require('express');
const router = express.Router();

router.get('/add-supplier', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Supplier</button></form>');
});

router.post('/suppliers', (req, res, next) => {
    console.log(req.body.title);
    res.redirect('/');
});

module.exports = router;