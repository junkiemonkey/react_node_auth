module.exports = {
  secret:   'secret',
  mongoose: {
    uri: 'mongodb://127.0.0.1:27017/app',
    options: {
      // server: {
      //   socketOptions: {
      //     keepAlive: 1
      //   }
      // },
      keepAlive: 1,
      poolSize: 5
    }
  },
  server: {
    url: '127.0.0.1',
    port: 8080
  },
  crypto: {
    hash: {
      length:     128,
      // may be slow(!): iterations = 12000 take ~60ms to generate strong password
      iterations: 100
    }
  },
  routes: {
    all: '*',
    news: {
      all: '/api/news/',
      byId: '/api/news/:newsById',
      bySlug: '/api/news/:newsBySlug'
    },
    auth: {
      login: '/api/login/',
      logout: '/api/logout/',
      reg: '/api/registration/',
      username: '/api/user/name/',
      userpass: '/api/user/pass/',
      check: '/api/check/'
    }
  }
};