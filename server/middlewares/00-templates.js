var pug = require('pug');
var config = require('config');
var path = require('path');

module.exports = function* (next) {

  var ctx = this;


  /* default helpers */
  this.locals = {
    /* at the time of this middleware, user is unknown, so we make it a getter */
    get user() {
      return ctx.req.user; // passport sets this
    }
  };

  this.render = function(templateName, locals) {

    console.log(locals);
    locals = locals || {};
    // warning!
    // _.assign does NOT copy defineProperty
    // so I use this.locals as a root and merge all props in it, instead of cloning this.locals
    var localsFull = Object.create(this.locals);

    for(var key in locals) {
      localsFull[key] = locals[key];
    }

    var templatePathResolved = path.join('./server/templates', templateName + '.pug');

    return pug.renderFile(templatePathResolved, localsFull, false);
  };

  yield* next;

};

