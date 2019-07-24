const Blog = require('../models/blog.model');
const fs = require('fs');

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

exports.blog_search = (req, res, next) => {
    Blog.find({title: { '$regex' : req.query.query_req, '$options' : 'i' } }).exec((err, blogs) => {
        if (err) {
            return next(err);
        }
        res.send(blogs);
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

exports.blog_create = (req, res, next) => {
    let sampleFile = req.files.fileup;

    sampleFile.mv(`./public/src/${sampleFile.name}`, (err) => {
        if (err)
            return res.status(500).send(err);
    });
    var blog = new Blog({
        autor: req.body.autor,
        date: req.body.date,
        main_img_path: `/src/${sampleFile.name}`,
        tag_array: [],
        title: req.body.title,
        description: req.body.description
    });
    var array_tags = req.body.tag_name.split(' ');
    
    for (var i=0; i<array_tags.length; i++){
        blog.tag_array.push({tag_name: array_tags[i]});
    }

     blog.save((err) => {
        if (err) {
            return next (err);
        };
        res.send('Blog created successfully');
    });
};

exports.blog_insert = (req, res) => {
    res.render('blog-list-add', {
        title: 'Блог',
        titleId: 'blog_insert'
    });
}