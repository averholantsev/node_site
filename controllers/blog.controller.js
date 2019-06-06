const Blog = require('../models/blog.model');

exports.blog_list = (req, res) => {
    var pageNo = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    var query = {};
    if(pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response);
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;

    Blog.countDocuments({}, (err, totalCount) => {
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"}
        };
        Blog.find({}, {}, query).sort('-date').exec((err, blogs) => {
            if (err) {
                return next (err);
            };
            var totalPages = Math.ceil(totalCount / size);
            res.render('blog-list', {
                title: 'Блог',
                titleId: 'blog',
                monthsList: ['янв','фвр','мрт','апр','май','инь','иль','авг','снт','окт','нбр','дек'],
                blogs,
                totalPages,
                pageNo,
                size
            });
        });
    });
};

exports.blog_record = (req, res) => {
    var id = req.query.id;
    Blog.findById(id).exec((err, record) => {
        if (err) {
            return next (err);
        };
        res.render('blog-record', {
            title: record.title + ' | Блог',
            titleId: 'record',
            monthsList: ['янв','фвр','мрт','апр','май','инь','иль','авг','снт','окт','нбр','дек'],
            record
        });
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