const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new Schema ({
  autor: {type: String, required: true},
  date: {type: Date, required: true},
  main_img_path: {type: String, required: true},
  tag_array: [
    {tag_name: String}
  ],
  title: {type: String, required: true},
  description: {type: String, required: true}
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);