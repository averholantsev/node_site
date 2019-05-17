const Blog = require('../models/blog.model');

exports.blog_list = (req, res) => {
  Blog.find({}, (err, blog) => {
      if (err) {
          return next (err);
      };
      res.send(blog);
  });
};

exports.blog_create = (req, res) => {
  let blog = new Blog({
      autor: req.body.autor,
      date: req.body.date,
      img: [
        {
          path: req.body.path,
          order: req.body.order,
          main: req.body.main
        }
      ],
      tag: [
        {
          name: req.body.name
        }
      ],
      title: req.body.title,
      description: req.body.description
  });

  product.save((err) => {
      if (err) {
          return next (err);
      };
      res.send('Blog created successfully');
  });
};