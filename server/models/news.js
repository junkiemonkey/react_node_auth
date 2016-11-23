const mongoose = require('../db/mongoose');
const Shcema = mongoose.Schema;

var NewsSchema = new Shcema({
  title: {
    type: String,
    required: 'Title is required'
  },
  text: {
    type: String,
    required: 'Text is required'
  },
  image: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: 'Author is Required!'
  }
});

module.exports = mongoose.model('News', NewsSchema);