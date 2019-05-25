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
      main_img_path: req.body.main_img_path,
      tag_name: req.body.tag_name,
      title: req.body.title,
      description: req.body.description
  });

  blog.save((err) => {
      if (err) {
          return next (err);
      };
      res.send('Blog created successfully');
  });
};