process.env.NODE_CONFIG_DIR = './server/config';
// process.env.NODE_ENV = 'production';
require('babel-core/register');
require('babel-polyfill');
require('./server');


