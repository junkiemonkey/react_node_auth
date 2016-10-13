var mongoose = require('mongoose');
mongoose.set('debug', true);
var config = require('config');

// if (process.env.MONGOOSE_DEBUG) {
//   mongoose.set('debug', true);
// }

mongoose.connect(config.mongoose.uri, config.mongoose.options);

module.exports = mongoose;