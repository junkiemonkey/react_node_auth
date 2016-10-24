var prod = process.env.NODE_ENV === 'production';
// console.log(prod);
// console.log(process.env);
module.exports = {
  secret:   'secret',
  mongoose: {
    uri: 'mongodb://127.0.0.1:27017/app',
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
    port: prod ? 8080 : 3000
  },
  crypto: {
    hash: {
      length:     128,
      // may be slow(!): iterations = 12000 take ~60ms to generate strong password
      iterations: 10
    }
  },
};