import { Shcema, model } from '../db/mongoose';

const NewsSchema = new Shcema({
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

export default model('News', NewsSchema);