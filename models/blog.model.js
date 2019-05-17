const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new Schema ({
  autor: {type: String, required: true},
  date: {type: Date, required: true},
  img: [{
    path: {type: String, required: true},
    order: {type: Number, required: false},
    main: {type: Boolean, required: false}
  }],
  tag: [{
    name: {type: String, required: true}
  }],
  title: {type: String, required: true},
  description: {type: String, required: true}
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);