var prod = process.env.NODE_ENV == 'production';
console.log(prod);
console.log(process.env.NODE_ENV);
module.exports = {
  secret:   'secret',
  mongoose: {
    uri: 'mongodb://localhost/app',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize: 5
      }
    }
  },
  server: {
    url: prod ? '10.129.1.206' : 'localhost',
    port: prod ? 80 : 3000
  },
  crypto: {
    hash: {
      length:     128,
      // may be slow(!): iterations = 12000 take ~60ms to generate strong password
      iterations: 10
    }
  },
};