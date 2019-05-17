const Blog = require('../models/blog.model');

exports.blog_list = (req, res) => {
  Blog.find({}, (err, blog) => {
      if (err) {
          return next (err);
      };
      res.send(blog);
      console.log(blog);
  });
};