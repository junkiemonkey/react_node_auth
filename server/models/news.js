const mongoose = require('../db/mongoose');
const Shcema = mongoose.Schema;

var newsSchema = new Shcema({
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
    required: true
  }
});

module.exports = mongoose.model('News', newsSchema);