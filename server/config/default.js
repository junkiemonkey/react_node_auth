module.exports = {
  mongoose: {
    uri: 'mongodb://localhost/users',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize: 5
      }
    }
  },
};