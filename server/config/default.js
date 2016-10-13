module.exports = {
  secret:   'mysecret',
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
  crypto: {
    hash: {
      length:     128,
      // may be slow(!): iterations = 12000 take ~60ms to generate strong password
      iterations: 1
    }
  },
};