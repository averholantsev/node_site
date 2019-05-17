const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tagSchema = new Schema ({
  name: {type: String, required: true}
});
let imgSchema = new Schema ({
  path: {type: String, required: true},
  order: {type: Number, required: false},
  main: {type: Boolean, required: false}
});
let blogSchema = new Schema ({
  autor: {type: String, required: true},
  date: {type: Date, required: true},
  img: [imgSchema],
  tag: [tagSchema],
  title: {type: String, required: true},
  description: {type: String, required: true}
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);