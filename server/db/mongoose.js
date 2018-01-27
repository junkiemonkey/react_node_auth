import mongoose from 'mongoose';
// mongoose.set('debug', true);
import config from 'config';

if (process.env.MONGOOSE_DEBUG) {
  mongoose.set('debug', true);
}

mongoose.connect(config.mongoose.uri, config.mongoose.options);

module.exports = mongoose;