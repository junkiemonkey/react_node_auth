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
  slug: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('News', NewsSchema);