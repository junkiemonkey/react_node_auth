import pug from 'pug';

export default (ctx, next) => {

  ctx.locals = {
    /* at the time of this middleware, user is unknown, so we make it a getter */
    get user() {
      return ctx.req.user; // passport sets this
    }
  };

  ctx.render = componentHTML => {
    return pug.renderFile('./server/templates/index.pug', {
      template: componentHTML
    }, false);
  };

  next();
};
