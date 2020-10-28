exports.getProducts = (req, res, next) => {
    console.log(req.body.title);
    res.status(200).json({posts: [{title: 'Post title', content: 'This is the content of the post.'}]});
};

exports.getSingleProduct = (req, res, next) => {
    console.log(req.body.title);
    res.status(200).json({posts: [{title: 'Post title', content: 'This is the content of the post.'}]});
};

exports.postProduct = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    res.status(201).json({
        message: 'Product created successfully',
        post: {id: new Date().toISOString(), title: title, content: content}
    });
};